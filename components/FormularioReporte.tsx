"use client";

import { useActionState, useState, useRef } from "react";
import Image from "next/image";
import {
  PawPrint,
  MapPin,
  Calendar,
  User,
  Camera,
  Upload,
  X,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { crearReporte, type ReporteResult } from "@/app/reportar/actions";
import { MapaPickerWrapper } from "./MapaPickerWrapper";
import { BARRIOS_CABA, RAZAS_COMUNES, COLORES_COMUNES } from "@/lib/constants";

type PreviewFoto = { file: File; url: string };

export function FormularioReporte() {
  const [state, formAction, pending] = useActionState<
    ReporteResult | null,
    FormData
  >(crearReporte, null);

  const [tipo, setTipo] = useState<"perdido" | "encontrado" | "">("");
  const [coords, setCoords] = useState<{ lat: number | null; lng: number | null }>(
    { lat: null, lng: null }
  );
  const [razaSel, setRazaSel] = useState("");
  const [colorSel, setColorSel] = useState("");
  const [fotos, setFotos] = useState<PreviewFoto[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const nuevos = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setFotos((prev) => [...prev, ...nuevos].slice(0, 5));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFoto = (idx: number) => {
    setFotos((prev) => {
      URL.revokeObjectURL(prev[idx].url);
      return prev.filter((_, i) => i !== idx);
    });
  };

  const err = state?.fieldErrors ?? {};
  const hoy = new Date().toISOString().slice(0, 10);

  return (
    <form
      action={(formData) => {
        // Inyectar las fotos del estado al FormData
        fotos.forEach(({ file }) => formData.append("fotos", file));
        return formAction(formData);
      }}
      className="space-y-6"
    >
      {state?.error && !state.fieldErrors && (
        <ErrorBanner mensaje={state.error} />
      )}
      {state?.fieldErrors && (
        <ErrorBanner mensaje={state.error ?? "Hay campos con errores"} />
      )}

      {/* Sección 1: Tipo de reporte */}
      <Seccion
        numero="1"
        icono={<PawPrint className="h-5 w-5" />}
        titulo="¿Qué pasó?"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <RadioCard
            value="perdido"
            checked={tipo === "perdido"}
            onChange={(v) => setTipo(v as "perdido")}
            name="tipo"
            titulo="Perdí a mi perro"
            descripcion="Tu perro se escapó o desapareció"
            emoji="🔴"
          />
          <RadioCard
            value="encontrado"
            checked={tipo === "encontrado"}
            onChange={(v) => setTipo(v as "encontrado")}
            name="tipo"
            titulo="Encontré un perro"
            descripcion="Viste o tenés un perro que no es tuyo"
            emoji="🟢"
          />
        </div>
        {err.tipo && <ErrorMsg msg={err.tipo} />}
      </Seccion>

      {/* Sección 2: Datos del perro */}
      <Seccion
        numero="2"
        icono={<PawPrint className="h-5 w-5" />}
        titulo="Sobre el perro"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Campo
            label={tipo === "encontrado" ? "Nombre (si tiene chapita)" : "Nombre"}
            opcional
          >
            <input
              type="text"
              name="perro_nombre"
              placeholder="Ej: Toto"
              className={inputClass}
            />
          </Campo>

          <Campo label="Raza" requerido error={err.perro_raza}>
            <select
              name="perro_raza"
              value={razaSel}
              onChange={(e) => setRazaSel(e.target.value)}
              className={inputClass}
              required
            >
              <option value="">Elegir...</option>
              {RAZAS_COMUNES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
              <option value="Otra">Otra (escribir)</option>
            </select>
            {razaSel === "Otra" && (
              <input
                type="text"
                name="perro_raza_otra"
                placeholder="Escribí la raza"
                className={`${inputClass} mt-2`}
                required
              />
            )}
          </Campo>

          <Campo label="Color principal" requerido error={err.perro_color}>
            <select
              name="perro_color"
              value={colorSel}
              onChange={(e) => setColorSel(e.target.value)}
              className={inputClass}
              required
            >
              <option value="">Elegir...</option>
              {COLORES_COMUNES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
              <option value="Otro">Otro (escribir)</option>
            </select>
            {colorSel === "Otro" && (
              <input
                type="text"
                name="perro_color_otro"
                placeholder="Escribí el color"
                className={`${inputClass} mt-2`}
                required
              />
            )}
          </Campo>

          <Campo label="Tamaño" requerido error={err.perro_tamano}>
            <select name="perro_tamano" className={inputClass} required>
              <option value="">Elegir...</option>
              <option value="pequeno">Pequeño (hasta 10kg)</option>
              <option value="mediano">Mediano (10-25kg)</option>
              <option value="grande">Grande (más de 25kg)</option>
            </select>
          </Campo>

          <Campo label="Sexo">
            <select name="perro_sexo" className={inputClass} defaultValue="desconocido">
              <option value="macho">Macho</option>
              <option value="hembra">Hembra</option>
              <option value="desconocido">No sé</option>
            </select>
          </Campo>

          <Campo label="Edad aproximada" opcional>
            <input
              type="text"
              name="perro_edad_aproximada"
              placeholder="Ej: 3 años, cachorro, adulto..."
              className={inputClass}
            />
          </Campo>
        </div>

        <Campo
          label="Descripción"
          requerido
          error={err.perro_descripcion}
          ayuda="Personalidad, salud, qué hacía cuando se escapó/lo encontraste..."
        >
          <textarea
            name="perro_descripcion"
            rows={3}
            minLength={10}
            placeholder="Es muy cariñoso, responde a su nombre. Tiene una cicatriz en la pata..."
            className={inputClass}
            required
          />
        </Campo>

        <Campo
          label="Características únicas"
          opcional
          ayuda="Collar, manchas, cicatrices, microchip — lo que lo distinga de otros perros de la misma raza"
        >
          <input
            type="text"
            name="perro_caracteristicas_unicas"
            placeholder="Collar rojo con chapita dorada"
            className={inputClass}
          />
        </Campo>
      </Seccion>

      {/* Sección 3: Ubicación */}
      <Seccion
        numero="3"
        icono={<MapPin className="h-5 w-5" />}
        titulo="¿Dónde?"
      >
        <Campo
          label={tipo === "encontrado" ? "Dónde lo encontraste" : "Dónde se perdió"}
          requerido
          error={err.ubicacion}
          ayuda="Hacé click en el mapa para marcar la ubicación exacta"
        >
          <MapaPickerWrapper
            lat={coords.lat}
            lng={coords.lng}
            onPick={(lat, lng) => setCoords({ lat, lng })}
          />
          {coords.lat !== null && coords.lng !== null ? (
            <p className="mt-2 text-xs text-stone-500">
              📍 Ubicación: {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}
            </p>
          ) : (
            <p className="mt-2 text-xs text-stone-500">
              Tocá el mapa para marcar el punto donde ocurrió
            </p>
          )}
          <input type="hidden" name="ubicacion_lat" value={coords.lat ?? ""} />
          <input type="hidden" name="ubicacion_lng" value={coords.lng ?? ""} />
        </Campo>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <Campo label="Barrio" requerido error={err.ubicacion_barrio}>
            <select name="ubicacion_barrio" className={inputClass} required>
              <option value="">Elegir...</option>
              {BARRIOS_CABA.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </Campo>

          <Campo label="Dirección aproximada" opcional>
            <input
              type="text"
              name="ubicacion_direccion_aproximada"
              placeholder="Ej: Plaza Italia, Av. Cabildo y Juramento"
              className={inputClass}
            />
          </Campo>
        </div>
      </Seccion>

      {/* Sección 4: Fecha */}
      <Seccion
        numero="4"
        icono={<Calendar className="h-5 w-5" />}
        titulo="¿Cuándo?"
      >
        <Campo
          label={tipo === "encontrado" ? "Fecha del encuentro" : "Fecha del extravío"}
          requerido
          error={err.fecha_evento}
        >
          <input
            type="date"
            name="fecha_evento"
            defaultValue={hoy}
            max={hoy}
            className={inputClass}
            required
          />
        </Campo>
      </Seccion>

      {/* Sección 5: Contacto */}
      <Seccion
        numero="5"
        icono={<User className="h-5 w-5" />}
        titulo="¿Cómo te contactamos?"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Campo label="Tu nombre" requerido error={err.contacto_nombre}>
            <input
              type="text"
              name="contacto_nombre"
              autoComplete="name"
              placeholder="Ej: María González"
              className={inputClass}
              required
            />
          </Campo>

          <Campo label="Teléfono / WhatsApp" opcional>
            <input
              type="tel"
              name="contacto_telefono"
              autoComplete="tel"
              placeholder="+5491145678901"
              className={inputClass}
            />
          </Campo>

          <Campo label="Email" opcional error={err.contacto}>
            <input
              type="email"
              name="contacto_email"
              autoComplete="email"
              placeholder="vos@email.com"
              className={inputClass}
            />
          </Campo>

          <Campo label="Preferencia">
            <select name="contacto_preferencia" className={inputClass} defaultValue="whatsapp">
              <option value="whatsapp">WhatsApp</option>
              <option value="telefono">Llamada</option>
              <option value="email">Email</option>
            </select>
          </Campo>
        </div>

        {tipo === "perdido" && (
          <Campo
            label="Recompensa"
            opcional
            ayuda="Opcional — algunos usuarios ofrecen una recompensa para motivar la búsqueda"
          >
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500">$</span>
              <input
                type="number"
                name="recompensa"
                min="0"
                step="1000"
                placeholder="50000"
                className={`${inputClass} pl-7`}
              />
            </div>
          </Campo>
        )}
      </Seccion>

      {/* Sección 6: Fotos */}
      <Seccion
        numero="6"
        icono={<Camera className="h-5 w-5" />}
        titulo="Fotos"
      >
        <p className="text-sm text-stone-600 mb-4">
          Subí hasta 5 fotos del perro. Mientras más claras y recientes, mejor las chances de que alguien lo reconozca.
        </p>

        {fotos.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
            {fotos.map((foto, idx) => (
              <div
                key={foto.url}
                className="relative aspect-square rounded-lg overflow-hidden border border-stone-200 group"
              >
                <Image
                  src={foto.url}
                  alt={`Foto ${idx + 1}`}
                  fill
                  sizes="200px"
                  className="object-cover"
                  unoptimized
                />
                <button
                  type="button"
                  onClick={() => removeFoto(idx)}
                  className="absolute top-2 right-2 h-9 w-9 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white shadow-md sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                  aria-label="Quitar foto"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
        )}

        {fotos.length < 5 && (
          <label
            htmlFor="fotos-input"
            className="flex flex-col items-center justify-center gap-2 px-4 py-8 border-2 border-dashed border-stone-300 rounded-xl text-stone-600 hover:border-brand-400 hover:bg-brand-50/50 cursor-pointer transition-colors"
          >
            <Upload className="h-7 w-7" />
            <span className="text-sm font-semibold">
              {fotos.length === 0 ? "Subir fotos" : `Agregar más (${fotos.length}/5)`}
            </span>
            <span className="text-xs text-stone-500">JPG, PNG o WEBP · máx. 5MB por foto</span>
            <input
              id="fotos-input"
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        )}
      </Seccion>

      {/* Submit */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-brand-500 hover:bg-brand-600 disabled:bg-stone-400 text-white text-base font-semibold px-8 py-3.5 rounded-lg shadow-sm transition-colors"
        >
          {pending ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Publicando...
            </>
          ) : (
            <>Publicar reporte</>
          )}
        </button>
      </div>
    </form>
  );
}

// =============================================
// Helper components
// =============================================

const inputClass =
  "w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none bg-white";

function Seccion({
  numero,
  icono,
  titulo,
  children,
}: {
  numero: string;
  icono: React.ReactNode;
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white rounded-2xl border border-stone-200 p-6 transition-shadow hover:shadow-sm">
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-100 to-brand-50 text-brand-600 ring-1 ring-brand-200/50">
          {icono}
        </div>
        <div>
          <div className="text-[11px] font-bold text-brand-600 uppercase tracking-wider">
            Paso {numero}
          </div>
          <h2 className="text-lg font-bold text-stone-900 leading-tight">
            {titulo}
          </h2>
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Campo({
  label,
  requerido,
  opcional,
  error,
  ayuda,
  children,
}: {
  label: string;
  requerido?: boolean;
  opcional?: boolean;
  error?: string;
  ayuda?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-1.5">
        {label}
        {requerido && <span className="text-red-500">*</span>}
        {opcional && <span className="text-xs font-normal text-stone-400">(opcional)</span>}
      </label>
      {children}
      {ayuda && !error && <p className="mt-1 text-xs text-stone-500">{ayuda}</p>}
      {error && <ErrorMsg msg={error} />}
    </div>
  );
}

function ErrorMsg({ msg }: { msg: string }) {
  return (
    <p
      role="alert"
      className="mt-1 flex items-center gap-1 text-xs text-red-600"
    >
      <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
      {msg}
    </p>
  );
}

function ErrorBanner({ mensaje }: { mensaje: string }) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-4 flex items-start gap-3"
    >
      <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
      <div>
        <p className="font-semibold">No pudimos publicar el reporte</p>
        <p className="text-sm mt-0.5">{mensaje}</p>
      </div>
    </div>
  );
}

function RadioCard({
  value,
  checked,
  onChange,
  name,
  titulo,
  descripcion,
  emoji,
}: {
  value: string;
  checked: boolean;
  onChange: (v: string) => void;
  name: string;
  titulo: string;
  descripcion: string;
  emoji: string;
}) {
  return (
    <label
      className={`relative flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
        checked
          ? "border-brand-500 bg-brand-50 shadow-sm"
          : "border-stone-200 bg-white hover:border-brand-300 hover:bg-stone-50"
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      <span className="text-2xl">{emoji}</span>
      <div className="flex-1">
        <div className="font-bold text-stone-900">{titulo}</div>
        <div className="text-sm text-stone-600">{descripcion}</div>
      </div>
      {checked && (
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-white text-xs shrink-0">
          ✓
        </div>
      )}
    </label>
  );
}
