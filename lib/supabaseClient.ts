import { createClient } from "@supabase/supabase-js";

// These values come from .env.local during development, and from Vercel's
// Environment Variables in production.
//
// The anon key is PUBLIC by design — anything prefixed with NEXT_PUBLIC_ is
// bundled into the browser. That's expected and safe for the anon key.
// The service_role key must NEVER be exposed here or in any NEXT_PUBLIC_ var.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
