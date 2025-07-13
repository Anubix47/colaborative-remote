import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import type { Session } from "@supabase/supabase-js";

function App() {
  const [session, setSession] = useState<Session | null>();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return subscription.unsubscribe();
  }, [session]);

  if (!session) {
    return (
      <div style={{ maxWidth: 320, margin: "auto", padding: 20 }}>
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 480, margin: "auto", padding: 20 }} id="dashboard">
      <h1>Bienvenido, {session.user.email}</h1>
      <button onClick={() => supabase.auth.signOut()}>Cerrar sesión</button>
    </div>
  );
}

export default App;
