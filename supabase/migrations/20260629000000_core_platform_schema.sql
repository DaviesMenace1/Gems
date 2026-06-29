-- ========================================================================================
-- THE REVAMP UG DIGITAL FLAGSHIP PLATFORM CORE SQL SCHEMA MIGRATION
-- PHASE 12-15: DATA SYSTEM DESIGN, TENANT ISOLATION, AND ROW-LEVEL SECURITY PRIVILEGES
-- GENERATED: 2026-06-29
-- ========================================================================================

-- EXTENSION SETUP
-- Enable cryptographic capabilities for secure token generations
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ----------------------------------------------------------------------------------------
-- 1. TYPE MATRIX DEFINITIONS
-- ----------------------------------------------------------------------------------------
CREATE TYPE user_role_tier AS ENUM ('CLIENT', 'TRADE_PARTNER', 'INSTALLER', 'STUDIO_ADMIN');
CREATE TYPE project_status_node AS ENUM ('INTAKE_BRIEF', 'SCHEMATIC_DESIGN', 'PROCUREMENT_LOCK', 'SITE_MOBILIZATION', 'COMPLETED');
CREATE TYPE order_status_node AS ENUM ('CLEARING_VAULT', 'TRANSIT_PORT', 'SITE_DELIVERY', 'INSTALLED_VERIFIED');

-- ----------------------------------------------------------------------------------------
-- 2. CORE STORAGE SCHEMAS & ENTITY RECORDS
-- ----------------------------------------------------------------------------------------

-- CLIENT & PARTNER PROFILE SCHEMA
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT NOT NULL,
    role user_role_tier NOT NULL DEFAULT 'CLIENT',
    company_name TEXT,
    phone_vector TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ARCHITECTURAL PROJECT LEDGER MATRIX
CREATE TABLE public.projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    owner_id UUID REFERENCES public.profiles(id) ON DELETE RESTRICT NOT NULL,
    project_name TEXT NOT NULL,
    status project_status_node NOT NULL DEFAULT 'INTAKE_BRIEF',
    square_footage NUMERIC CHECK (square_footage > 0),
    site_location TEXT NOT NULL,
    estimated_mobilization_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- PHYSICAL COMMERCE TRANSACTIONAL RECEPTACLE
CREATE TABLE public.order_ledger (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    project_id UUID REFERENCES public.projects(id) ON DELETE RESTRICT NOT NULL,
    client_id UUID REFERENCES public.profiles(id) ON DELETE RESTRICT NOT NULL,
    flutterwave_ref TEXT UNIQUE NOT NULL,
    currency_code VARCHAR(3) NOT NULL DEFAULT 'UGX',
    subtotal_amount NUMERIC(15,2) NOT NULL CHECK (subtotal_amount >= 0),
    logistics_insurance NUMERIC(15,2) NOT NULL DEFAULT 0.00,
    grand_total_binding NUMERIC(15,2) NOT NULL CHECK (grand_total_binding >= 0),
    fulfillment_status order_status_node NOT NULL DEFAULT 'CLEARING_VAULT',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ----------------------------------------------------------------------------------------
-- 3. AUTOMATED PROFILE PROVISIONING TRIGGER LOGIC
-- ----------------------------------------------------------------------------------------
-- Automatically map auth metadata inputs directly into our public profiles registry upon signup
CREATE OR REPLACE FUNCTION public.handle_new_user_genesis()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, role, phone_vector, company_name)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'Bespoke Client Node'),
        COALESCE((NEW.raw_user_meta_data->>'role')::user_role_tier, 'CLIENT'::user_role_tier),
        COALESCE(NEW.raw_user_meta_data->>'phone_vector', '+256700000000'),
        NEW.raw_user_meta_data->>'company_name'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_genesis();

-- ----------------------------------------------------------------------------------------
-- 4. ROW-LEVEL SECURITY (RLS) POLICIES & ENFORCEMENT MATRIX
-- ----------------------------------------------------------------------------------------

-- Enable protective isolation shields across the database layer
ALTER TABLE public.profiles ENABLE ROW-LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW-LEVEL SECURITY;
ALTER TABLE public.order_ledger ENABLE ROW-LEVEL SECURITY;

-- A. PROFILE ACCESS SECURITY
CREATE POLICY "Profiles are readable by authenticated account owners or studio staff."
    ON public.profiles FOR SELECT
    USING (auth.uid() = id OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'STUDIO_ADMIN');

CREATE POLICY "Profiles can only be modified by their respective explicit owner node."
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- B. PROJECT STRUCTURE ACCESSIBILITY CORES
CREATE POLICY "Clients can view their specific project tracks. Admins view globally."
    ON public.projects FOR SELECT
    USING (owner_id = auth.uid() OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'STUDIO_ADMIN');

CREATE POLICY "Only Studio Admins can instantiate or adjust master structural design blueprints."
    ON public.projects FOR ALL
    USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'STUDIO_ADMIN')
    WITH CHECK ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'STUDIO_ADMIN');

-- C. FINANCIAL ORDER LEDGER SECURE MATRIX
CREATE POLICY "Users can review transactional orders cross-linked to their profile."
    ON public.order_ledger FOR SELECT
    USING (client_id = auth.uid() OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'STUDIO_ADMIN');

CREATE POLICY "Flutterwave webhook system automated integrations can inject new clearing records."
    ON public.order_ledger FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');
