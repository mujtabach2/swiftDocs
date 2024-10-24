// frontend/src/app/lib/supabaseServer.js
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export function createServerSupabaseClient() {
  return createRouteHandlerClient({ cookies })
}