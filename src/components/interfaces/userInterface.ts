import type { User } from "@supabase/supabase-js";

interface UserProfile extends User {
  full_name: string;
  avatar_url: string;
  role: "Miembro" | "Project Manager";
}

export type { UserProfile };
