// src/app/ClientProviders.js
"use client";

import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { UserProvider } from './hooks/UserContext';

export default function ClientProviders({ children }) {
  const supabase = createClientComponentClient();

  return (
    <SessionContextProvider supabaseClient={supabase}>
      <UserProvider>
        {children}
      </UserProvider>
    </SessionContextProvider>
  );
}
