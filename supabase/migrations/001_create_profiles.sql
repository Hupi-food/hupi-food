-- ═══════════════════════════════════════════════════════════════════════
-- Hupit — Tabla de perfiles de usuario
-- Para ejecutar: copia este SQL y pégalo en el SQL Editor de Supabase
-- https://supabase.com/dashboard/project/byidxxggdljpteiznjdv/sql/new
-- ═══════════════════════════════════════════════════════════════════════

-- 1. Crear tabla profiles
CREATE TABLE public.profiles (
  id uuid NOT NULL,
  name text NOT NULL DEFAULT ''::text,
  email text NOT NULL DEFAULT ''::text,
  role text NOT NULL DEFAULT 'customer'::text CHECK (role = ANY (ARRAY['customer'::text, 'store_owner'::text, 'super_admin'::text])),
  avatar text,
  store_owner_status text CHECK (store_owner_status = ANY (ARRAY['pending_approval'::text, 'active'::text, 'rejected'::text])),
  store_name text,
  store_category text,
  store_address text,
  phone text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);

-- 2. Habilitar Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. Política: los usuarios pueden leer su propio perfil
CREATE POLICY "Users can read own profile"
    ON public.profiles
    FOR SELECT
    USING (auth.uid() = id);

-- 4. Política: los usuarios pueden actualizar su propio perfil
CREATE POLICY "Users can update own profile"
    ON public.profiles
    FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- 5. Política: permitir inserts (para registro)
CREATE POLICY "Allow insert during signup"
    ON public.profiles
    FOR INSERT
    WITH CHECK (auth.uid() = id);

-- 6. Política: super_admin puede ver todos los perfiles
CREATE POLICY "Super admin can read all profiles"
    ON public.profiles
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles p
            WHERE p.id = auth.uid() AND p.role = 'super_admin'
        )
    );

-- 7. Función para crear el perfil automáticamente al registrarse
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    name, 
    email, 
    role, 
    avatar,
    store_owner_status,
    store_name,
    store_category,
    store_address,
    phone
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', ''),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'customer'),
    -- Generar avatar (iniciales)
    UPPER(SUBSTRING(COALESCE(NEW.raw_user_meta_data->>'name', NEW.email), 1, 2)),
    CASE 
      WHEN NEW.raw_user_meta_data->>'role' = 'store_owner' THEN 'pending_approval'
      ELSE NULL
    END,
    NEW.raw_user_meta_data->>'store_name',
    NEW.raw_user_meta_data->>'store_category',
    NEW.raw_user_meta_data->>'store_address',
    NEW.raw_user_meta_data->>'phone'
  )
  ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    role = EXCLUDED.role,
    store_name = EXCLUDED.store_name,
    store_category = EXCLUDED.store_category,
    store_address = EXCLUDED.store_address,
    phone = EXCLUDED.phone;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. Trigger para registro automático
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 9. Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 10. Trigger para updated_at
DROP TRIGGER IF EXISTS set_updated_at ON public.profiles;
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();
