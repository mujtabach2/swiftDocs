import supabase from "../config/supabaseClient";

// signing up a user with supabase

function signUp(email, password) {
  const { user, session, error } = supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    console.error("Error signing up", error);
  }
}

function loginWithGoogle() {
  const { user, session, error } = supabase.auth.signIn({
    provider: "google",
  });
  if (error) {
    console.error("Error logging in with Google", error);
  }
}

function login(email, password) {
  const { user, session, error } = supabase.auth.signIn({
    email,
    password,
  });
  if (error) {
    console.error("Error logging in", error);
  }
}

function logout() {
  const { error } = supabase.auth.signOut();
  if (error) {
    console.error("Error logging out", error);
  }
}

export { signUp, login, logout, loginWithGoogle };
