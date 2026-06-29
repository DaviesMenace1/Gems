-- ====================================================================
-- PHASE 1: EXTENSIONS & ENUMS
-- ====================================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE user_role AS ENUM ('ADMIN', 'TRADE', 'CLIENT', 'INSTALLER', 'MEMBER', 'GUEST');
CREATE TYPE project_status AS ENUM ('CONCEPT', 'IN_PROGRESS', 'COMPLETED', 'ARCHIVED');
CREATE TYPE transaction_status AS ENUM ('PENDING', 'SUCCESSFUL', 'FAILED');

-- ====================================================================
-- PHASE 2: TABLES DEFINITION
-- ====================================================================

-- 1. Profiles (Linked to Supabase Auth Users)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    role user_role DEFAULT 'MEMBER'::user_role NOT NULL,
    company_name TEXT,
    phone_number TEXT,
    loyalty_points INT DEFAULT 0 NOT NULL,
    is_verified BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Project Case Studies
CREATE TABLE public.projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    location TEXT NOT NULL,
    completion_year INT NOT NULL,
    status project_status DEFAULT 'CONCEPT'::project_status NOT NULL,
    hero_image_url TEXT NOT NULL,
    gallery_urls TEXT[] DEFAULT '{}'::TEXT[] NOT NULL,
    editorial_text TEXT NOT NULL,
    architects TEXT[] DEFAULT '{}'::TEXT[] NOT NULL,
    meta_title TEXT,
    meta_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Protected Architectural Drawings (AWS S3 Tracker)
CREATE TABLE public.protected_drawings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    file_key TEXT NOT NULL, -- S3 Bucket Key path instead of direct public URL
    file_size INT NOT NULL,
    version TEXT DEFAULT '1.0.0'::text NOT NULL,
    allowed_roles user_role[] DEFAULT '{ADMIN}'::user_role[] NOT NULL,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. Audit Logging System
CREATE TABLE public.audit_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    ip_address TEXT,
    user_agent TEXT,
    payload_before JSONB,
    payload_after JSONB,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ====================================================================
-- PHASE 3: AUTOMATION AND SECURITY (RLS)
-- ====================================================================

-- Modtime Trigger Function
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_modtime
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION update_modified_column();

-- Enable RLS on Sensitive Structural Information
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.protected_drawings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Security Policies: Profiles
CREATE POLICY "Allow public read access to admin/trade identity profiles" ON public.profiles
    FOR SELECT USING (role IN ('ADMIN', 'TRADE'));

CREATE POLICY "Allow users to view their own profile data" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Allow users to modify their own profile details" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Security Policies: Protected Architectural Drawings
CREATE POLICY "Verify architectural drawing clearances" ON public.protected_drawings
    FOR SELECT USING (
        (SELECT role FROM public.profiles WHERE id = auth.uid()) ANY (allowed_roles)
    );

-- Security Policies: System Logs
CREATE POLICY "Restrict logs exclusively to system admins" ON public.audit_logs
    FOR ALL USING (
        (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'ADMIN'
    );
