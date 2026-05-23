-- =============================================
-- Buscame · Seed de publicaciones iniciales
-- =============================================
-- Ejecutar después de schema.sql
-- Crea 8 publicaciones de muestra con sus fotos
-- Todas son anónimas (sin usuario_id) — luego cualquiera puede agregar las suyas autenticándose

-- Limpia datos previos por si se corre dos veces (solo afecta a las publicaciones seed)
delete from public.publicaciones where id in (
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000004',
  '00000000-0000-0000-0000-000000000005',
  '00000000-0000-0000-0000-000000000006',
  '00000000-0000-0000-0000-000000000007',
  '00000000-0000-0000-0000-000000000008'
);

-- =============================================
-- PUBLICACIONES
-- =============================================

insert into public.publicaciones (
  id, tipo, estado, perro_nombre, perro_raza, perro_color, perro_tamano, perro_sexo,
  perro_edad_aproximada, perro_descripcion, perro_caracteristicas_unicas,
  ubicacion_lat, ubicacion_lng, ubicacion_barrio, ubicacion_direccion_aproximada,
  fecha_evento, fecha_publicacion,
  contacto_nombre, contacto_telefono, contacto_email, contacto_preferencia, recompensa
) values
  (
    '00000000-0000-0000-0000-000000000001',
    'perdido', 'perdido', 'Toto', 'Caniche', 'Blanco', 'pequeno', 'macho',
    '5 años', 'Muy cariñoso, responde a su nombre. Tiene una mancha gris en la oreja izquierda.', 'Collar rojo con chapita dorada con número de teléfono',
    -34.5875, -58.4205, 'Palermo', 'Plaza Italia y alrededores',
    '2026-05-19', '2026-05-19T22:30:00',
    'María González', '+5491156789012', null, 'whatsapp', 50000
  ),
  (
    '00000000-0000-0000-0000-000000000002',
    'perdido', 'avistado', 'Luna', 'Labrador', 'Dorado', 'grande', 'hembra',
    '3 años', 'Muy tímida con extraños pero amigable. Tiene la cola un poco curvada.', 'Pañuelo azul al cuello',
    -34.6118, -58.3960, 'Recoleta', 'Cementerio de Recoleta',
    '2026-05-17', '2026-05-17T18:00:00',
    'Carlos Méndez', '+5491145678901', 'carlos.mendez@example.com', 'telefono', null
  ),
  (
    '00000000-0000-0000-0000-000000000003',
    'encontrado', 'perdido', null, 'Mestizo / Sin raza definida', 'Marrón claro', 'mediano', 'macho',
    'Adulto', 'Lo encontré dando vueltas asustado. Es muy bueno. Lo tengo en mi casa hasta encontrar a su familia.', 'Tiene una cicatriz pequeña sobre el ojo derecho',
    -34.6280, -58.4145, 'Caballito', 'Parque Rivadavia',
    '2026-05-20', '2026-05-20T09:15:00',
    'Lucía Fernández', '+5491134567890', null, 'whatsapp', null
  ),
  (
    '00000000-0000-0000-0000-000000000004',
    'perdido', 'reunido', 'Roco', 'Beagle', 'Tricolor', 'mediano', 'macho',
    '2 años', 'Se escapó por un portón abierto. Muy juguetón.', null,
    -34.5727, -58.4334, 'Belgrano', 'Av. Cabildo y Juramento',
    '2026-05-10', '2026-05-10T14:00:00',
    'Diego Romero', '+5491123456789', null, 'whatsapp', null
  ),
  (
    '00000000-0000-0000-0000-000000000005',
    'perdido', 'perdido', 'Maca', 'Yorkshire Terrier', 'Marrón', 'pequeno', 'hembra',
    '8 años', 'Es mayor y tiene problemas de visión. Necesita medicación diaria.', 'Sweater rosa tejido',
    -34.6033, -58.3817, 'San Nicolás', 'Microcentro, Florida y Lavalle',
    '2026-05-21', '2026-05-21T11:00:00',
    'Patricia Suárez', '+5491112345678', 'patricia.s@example.com', 'whatsapp', 80000
  ),
  (
    '00000000-0000-0000-0000-000000000006',
    'encontrado', 'perdido', null, 'Bulldog Francés', 'Negro', 'pequeno', 'hembra',
    null, 'La encontramos en el parque, muy nerviosa. Sin collar. Está bien cuidada.', null,
    -34.5675, -58.4376, 'Belgrano', 'Barrancas de Belgrano',
    '2026-05-22', '2026-05-22T08:00:00',
    'Federico Álvarez', '+5491101234567', null, 'whatsapp', null
  ),
  (
    '00000000-0000-0000-0000-000000000007',
    'perdido', 'perdido', 'Bruno', 'Pastor Alemán', 'Bicolor', 'grande', 'macho',
    '4 años', 'Es muy obediente y conoce comandos. Tiene microchip.', 'Collar negro de cuero con tachas',
    -34.6420, -58.3736, 'La Boca', 'Caminito',
    '2026-05-18', '2026-05-18T20:00:00',
    'Jorge Acosta', '+5491198765432', null, 'telefono', 100000
  ),
  (
    '00000000-0000-0000-0000-000000000008',
    'perdido', 'perdido', 'Coco', 'Schnauzer', 'Gris', 'mediano', 'macho',
    '6 años', 'Recién bañado y peluqueado. Responde a su nombre.', null,
    -34.5985, -58.4382, 'Villa Crespo', 'Av. Corrientes y Scalabrini Ortiz',
    '2026-05-21', '2026-05-21T17:45:00',
    'Sofía Bertolini', '+5491187654321', 'sofia.b@example.com', 'email', null
  );

-- =============================================
-- FOTOS
-- =============================================

insert into public.fotos_publicacion (publicacion_id, url, orden) values
  ('00000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600', 0),
  ('00000000-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600', 0),
  ('00000000-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600', 0),
  ('00000000-0000-0000-0000-000000000004', 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=600', 0),
  ('00000000-0000-0000-0000-000000000005', 'https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=600', 0),
  ('00000000-0000-0000-0000-000000000006', 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600', 0),
  ('00000000-0000-0000-0000-000000000007', 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=600', 0),
  ('00000000-0000-0000-0000-000000000008', 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=600', 0);

-- =============================================
-- PISTAS de ejemplo
-- =============================================

insert into public.pistas (publicacion_id, autor_nombre, mensaje, fecha) values
  (
    '00000000-0000-0000-0000-000000000002',
    'Vecina anónima',
    'La vi ayer a la tarde cerca de Av. Las Heras y Pueyrredón, parecía perdida.',
    '2026-05-21T15:00:00'
  ),
  (
    '00000000-0000-0000-0000-000000000004',
    'Ana Pérez',
    '¡Lo encontré! Estaba en la veterinaria de Mendoza al 2000. Ya contacté al dueño.',
    '2026-05-12T11:30:00'
  );
