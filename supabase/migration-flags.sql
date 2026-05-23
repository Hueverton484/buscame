-- =============================================
-- Buscame · Sistema de flags / reportes comunitarios
-- =============================================
-- Ejecutar en SQL Editor de Supabase después del schema inicial
-- Agrega capacidad para que usuarios reporten publicaciones falsas o inapropiadas

-- 1. Agregar campo "oculta" a publicaciones
alter table public.publicaciones
  add column if not exists oculta boolean default false not null;

create index if not exists idx_publicaciones_oculta
  on public.publicaciones(oculta) where oculta = false;

-- 2. Tabla de flags
create table if not exists public.flags_publicacion (
  id uuid primary key default gen_random_uuid(),
  publicacion_id uuid not null references public.publicaciones(id) on delete cascade,
  usuario_id uuid not null references public.perfiles(id) on delete cascade,
  motivo text not null check (motivo in ('falso', 'inapropiado', 'spam', 'duplicado', 'otro')),
  comentario text,
  fecha timestamptz default now(),
  unique (publicacion_id, usuario_id) -- un usuario solo puede flaggear una vez
);

create index if not exists idx_flags_publicacion on public.flags_publicacion(publicacion_id);

alter table public.flags_publicacion enable row level security;

-- Solo el flaggeador ve su propio flag (privacidad)
create policy "Usuarios ven solo sus propios flags"
  on public.flags_publicacion for select
  using (auth.uid() = usuario_id);

-- Solo usuarios logueados pueden flaggear, y solo en nombre propio
create policy "Usuarios logueados pueden flaggear"
  on public.flags_publicacion for insert
  with check (
    auth.uid() = usuario_id
    -- No flagear publicaciones propias
    and auth.uid() != (select usuario_id from public.publicaciones where id = publicacion_id)
  );

-- Permitir borrar (deshacer un flag propio)
create policy "Usuarios pueden borrar sus propios flags"
  on public.flags_publicacion for delete
  using (auth.uid() = usuario_id);

-- 3. Trigger: ocultar/desocultar publicación automáticamente según count de flags
create or replace function public.actualizar_oculta_publicacion()
returns trigger as $$
declare
  pub_id uuid;
begin
  pub_id := coalesce(new.publicacion_id, old.publicacion_id);
  update public.publicaciones
  set oculta = (
    select count(*) >= 3
    from public.flags_publicacion
    where publicacion_id = pub_id
  )
  where id = pub_id;
  return coalesce(new, old);
end;
$$ language plpgsql security definer;

drop trigger if exists flag_changed_check on public.flags_publicacion;
create trigger flag_changed_check
  after insert or delete on public.flags_publicacion
  for each row execute function public.actualizar_oculta_publicacion();
