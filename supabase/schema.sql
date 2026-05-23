-- =============================================
-- Buscame · Schema inicial
-- =============================================
-- Ejecutar este script en Supabase: SQL Editor → New query → pegar → Run
-- Crea las tablas, índices, políticas de seguridad (RLS) y el bucket de storage.

-- =============================================
-- 1. ENUMS
-- =============================================

create type tipo_reporte as enum ('perdido', 'encontrado');
create type estado_publicacion as enum ('perdido', 'avistado', 'reunido');
create type tamano_perro as enum ('pequeno', 'mediano', 'grande');
create type sexo_perro as enum ('macho', 'hembra', 'desconocido');
create type preferencia_contacto as enum ('whatsapp', 'telefono', 'email');

-- =============================================
-- 2. TABLA: perfiles
-- Extiende auth.users con datos públicos del usuario
-- =============================================

create table public.perfiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nombre text not null,
  telefono text,
  preferencia_contacto preferencia_contacto default 'whatsapp',
  fecha_registro timestamptz default now()
);

alter table public.perfiles enable row level security;

create policy "Perfiles son públicos para leer"
  on public.perfiles for select
  using (true);

create policy "Usuarios pueden insertar su propio perfil"
  on public.perfiles for insert
  with check (auth.uid() = id);

create policy "Usuarios pueden actualizar su propio perfil"
  on public.perfiles for update
  using (auth.uid() = id);

-- Trigger: crear perfil automáticamente cuando se registra un usuario
create or replace function public.crear_perfil_para_nuevo_usuario()
returns trigger as $$
begin
  insert into public.perfiles (id, nombre, telefono)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'nombre', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'telefono'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.crear_perfil_para_nuevo_usuario();

-- =============================================
-- 3. TABLA: publicaciones
-- =============================================

create table public.publicaciones (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid references public.perfiles(id) on delete set null,
  tipo tipo_reporte not null,
  estado estado_publicacion not null default 'perdido',

  -- Datos del perro
  perro_nombre text,
  perro_raza text not null,
  perro_color text not null,
  perro_tamano tamano_perro not null,
  perro_sexo sexo_perro not null default 'desconocido',
  perro_edad_aproximada text,
  perro_descripcion text not null,
  perro_caracteristicas_unicas text,

  -- Ubicación
  ubicacion_lat double precision not null,
  ubicacion_lng double precision not null,
  ubicacion_barrio text not null,
  ubicacion_direccion_aproximada text,

  -- Fechas
  fecha_evento date not null,
  fecha_publicacion timestamptz default now(),

  -- Contacto (snapshot, permite reportes anónimos)
  contacto_nombre text not null,
  contacto_telefono text,
  contacto_email text,
  contacto_preferencia preferencia_contacto not null default 'whatsapp',

  recompensa integer
);

create index idx_publicaciones_estado on public.publicaciones(estado);
create index idx_publicaciones_tipo on public.publicaciones(tipo);
create index idx_publicaciones_barrio on public.publicaciones(ubicacion_barrio);
create index idx_publicaciones_fecha on public.publicaciones(fecha_publicacion desc);
create index idx_publicaciones_usuario on public.publicaciones(usuario_id);

alter table public.publicaciones enable row level security;

create policy "Publicaciones son públicas para leer"
  on public.publicaciones for select
  using (true);

create policy "Cualquiera puede crear publicaciones"
  on public.publicaciones for insert
  with check (true);

create policy "Solo el dueño puede actualizar"
  on public.publicaciones for update
  using (auth.uid() = usuario_id);

create policy "Solo el dueño puede borrar"
  on public.publicaciones for delete
  using (auth.uid() = usuario_id);

-- =============================================
-- 4. TABLA: fotos_publicacion
-- =============================================

create table public.fotos_publicacion (
  id uuid primary key default gen_random_uuid(),
  publicacion_id uuid not null references public.publicaciones(id) on delete cascade,
  url text not null,
  orden integer not null default 0,
  fecha_subida timestamptz default now()
);

create index idx_fotos_publicacion on public.fotos_publicacion(publicacion_id, orden);

alter table public.fotos_publicacion enable row level security;

create policy "Fotos son públicas para leer"
  on public.fotos_publicacion for select
  using (true);

create policy "Cualquiera puede agregar fotos"
  on public.fotos_publicacion for insert
  with check (true);

create policy "Solo el dueño de la publicación puede borrar fotos"
  on public.fotos_publicacion for delete
  using (
    auth.uid() = (
      select usuario_id from public.publicaciones where id = publicacion_id
    )
  );

-- =============================================
-- 5. TABLA: pistas
-- =============================================

create table public.pistas (
  id uuid primary key default gen_random_uuid(),
  publicacion_id uuid not null references public.publicaciones(id) on delete cascade,
  autor_usuario_id uuid references public.perfiles(id) on delete set null,
  autor_nombre text not null,
  mensaje text not null,

  -- Ubicación opcional del avistamiento
  ubicacion_avistamiento_lat double precision,
  ubicacion_avistamiento_lng double precision,
  ubicacion_avistamiento_barrio text,

  fecha timestamptz default now()
);

create index idx_pistas_publicacion on public.pistas(publicacion_id, fecha desc);

alter table public.pistas enable row level security;

create policy "Pistas son públicas para leer"
  on public.pistas for select
  using (true);

create policy "Cualquiera puede dejar una pista"
  on public.pistas for insert
  with check (true);

create policy "Solo el autor puede borrar su pista"
  on public.pistas for delete
  using (auth.uid() = autor_usuario_id);

-- =============================================
-- 6. STORAGE BUCKET para fotos de perros
-- =============================================

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'fotos-perros',
  'fotos-perros',
  true,
  5242880,  -- 5 MB por foto
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do nothing;

create policy "Fotos públicas para leer"
  on storage.objects for select
  using (bucket_id = 'fotos-perros');

create policy "Cualquiera puede subir fotos"
  on storage.objects for insert
  with check (bucket_id = 'fotos-perros');

create policy "Dueño puede borrar sus fotos"
  on storage.objects for delete
  using (bucket_id = 'fotos-perros' and auth.uid()::text = (storage.foldername(name))[1]);

-- =============================================
-- 7. VISTA: publicaciones_con_fotos
-- Para traer las publicaciones con su array de fotos en una sola query
-- =============================================

create or replace view public.publicaciones_con_fotos as
select
  p.*,
  coalesce(
    (
      select array_agg(f.url order by f.orden)
      from public.fotos_publicacion f
      where f.publicacion_id = p.id
    ),
    array[]::text[]
  ) as fotos
from public.publicaciones p;
