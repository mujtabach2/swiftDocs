import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import e from "express";

const initialUser = {
  id: "",
  display_name: "",
  email: "",
  image_url: "",
  created_at: "",
};
function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: authData, error: authError } =
        await supabase.auth.getSession();
      if (authError) {
        console.error(authError);
        setUser(initialUser);
        return;
      }

      if (authData.session?.user) {
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", authData.session.user.id)
          .single();

        if (profileError) {
          console.error(profileError);
          setUser(initialUser);
        } else {
          setUser(profileData);
        }
      } else {
        setUser(initialUser);
      }
    };

    fetchUser();
  }, []);

  return user;
}

export { useUser };
