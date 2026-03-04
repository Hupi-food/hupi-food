-- ═══════════════════════════════════════════════════════════════════════
-- Hupit — Inserción Robusta de Super Administrador
-- ═══════════════════════════════════════════════════════════════════════

-- Asegurar que pgcrypto esté disponible para el hashing manual
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1. Limpiar registros previos si existen para evitar conflictos
DELETE FROM auth.users WHERE email = 'admin@hupifood.com';

-- 2. Insertar el usuario en auth.users con metadatos y 'aud' requeridos por GoTrue
-- Credenciales: admin@hupifood.com / admin
INSERT INTO auth.users (
    id, 
    instance_id, 
    email, 
    encrypted_password, 
    email_confirmed_at, 
    raw_app_meta_data, 
    raw_user_meta_data, 
    created_at, 
    updated_at, 
    role, 
    aud, 
    confirmation_token, 
    recovery_token, 
    email_change_token_new, 
    email_change
)
VALUES (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000000',
    'admin@hupifood.com',
    crypt('admin', gen_salt('bf')),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{"name":"Super Administrativo Hupit","role":"super_admin"}',
    NOW(),
    NOW(),
    'authenticated',
    'authenticated',
    '',
    '',
    '',
    ''
);

-- 3. Sincronizar con la tabla public.profiles
-- Usamos el email para encontrar el ID recién generado
INSERT INTO public.profiles (
    id, 
    name, 
    email, 
    role, 
    created_at, 
    updated_at
)
SELECT 
    id, 
    'Super Administrativo Hupit', 
    'admin@hupifood.com', 
    'super_admin', 
    NOW(), 
    NOW()
FROM auth.users 
WHERE email = 'admin@hupifood.com'
ON CONFLICT (id) DO UPDATE SET role = 'super_admin';
