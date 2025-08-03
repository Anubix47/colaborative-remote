import { supabase } from "../lib/supabase";

const signIn = async (email: string, password: string) => {
  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { error, data };
};

const signUp = async (email: string, password: string) => {
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/dashboard`, // útil si usas magic links
    },
  });

  console.log(email, password, error);
  return error;
};

const resetPassword = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset`,
  });

  return error;
};

export { resetPassword, signIn, signUp };
