import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zdavikmwcvmaejkpnjwa.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkYXZpa213Y3ZtYWVqa3BuandhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQyODkzMTksImV4cCI6MjAxOTg2NTMxOX0.nGLNhLyjAxb5c8X7BQ1vf1ap9lCI3Av6ReTtXsc_rNw";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
