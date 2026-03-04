-- ═══════════════════════════════════════════════════════════════════════
-- Hupit — Tabla de perfiles de usuario
-- Para ejecutar: copia este SQL y pégalo en el SQL Editor de Supabase
-- https://supabase.com/dashboard/project/byidxxggdljpteiznjdv/sql/new
-- ═══════════════════════════════════════════════════════════════════════

-- 1. Crear tabla profiles
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL DEFAULT '',
    email TEXT NOT NULL DEFAULT '',
    role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'store_owner', 'super_admin')),
    avatar TEXT,
    store_owner_status TEXT CHECK (store_owner_status IN ('pending_approval', 'active', 'rejected')),
    store_name TEXT,
    store_category TEXT,
    store_address TEXT,
    phone TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
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

-- 7. Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 8. Trigger
DROP TRIGGER IF EXISTS set_updated_at ON public.profiles;
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();
