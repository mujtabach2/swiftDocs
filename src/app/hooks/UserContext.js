"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const sessionResponse = useSession();
  const supabase = useSupabaseClient();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const session = sessionResponse?.data; // Safely access 'data'
  const sessionError = sessionResponse?.error; // Safely access 'error'

  useEffect(() => {
    const fetchUser = async () => {
      if (session?.user) {
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (profileError) {
          console.error("Profile Fetch Error:", profileError);
          setUser(null);
        } else {
          setUser(profileData);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    fetchUser();
  }, [session, supabase]);

  if (sessionError) {
    console.error("Session Error:", sessionError);
  }

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
