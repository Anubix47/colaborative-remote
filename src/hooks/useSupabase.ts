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

//Iniciar sesion con Google y GitHub
const signUpWithOAuth = (provider: "google" | "github") => {
  supabase.auth
    .signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin + "/dashboard",
      },
    })
    .catch((error) => {
      return `Error con ${provider} : ${error.message}`;
    });
};

const resetPassword = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset/password`,
  });

  return error;
};

//Cerrar sesion
const signOut = async () => {
  await supabase.auth.signOut();
};

export { resetPassword, signIn, signUp, signUpWithOAuth, signOut };
