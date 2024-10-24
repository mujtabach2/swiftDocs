import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; // Use environment variablem 
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY; // Use environment variable

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;