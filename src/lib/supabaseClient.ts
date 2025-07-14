import { createClient } from "@supabase/supabase-js";

// Tipos para las variables de entorno
interface SupabaseConfig {
  url: string;
  anonKey: string;
}

const supabaseConfig: SupabaseConfig = {
  url: import.meta.env.VITE_SUPABASE_URL as string,
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY as string,
};

// Validación de configuración
if (!supabaseConfig.url || !supabaseConfig.anonKey) {
  throw new Error("Supabase configuration is missing");
}

export const supabase = createClient(
  supabaseConfig.url,
  supabaseConfig.anonKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: "pkce",
    },
  }
);
