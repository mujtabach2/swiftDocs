import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zcspdbakgduizwicutmt.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpjc3BkYmFrZ2R1aXp3aWN1dG10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU5MDI3MjgsImV4cCI6MjAzMTQ3ODcyOH0.9_o4eb2KX77SpooWjhk5jAQ4Vxtul4B7zq-9JdnTe_E";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
