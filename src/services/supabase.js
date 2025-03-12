import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://gnhwkbitkhncboiyvuba.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImduaHdrYml0a2huY2JvaXl2dWJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5MjU2MDIsImV4cCI6MjA1NjUwMTYwMn0.bI8sDrKG9ihsMJtlYpH7nfdqvED67wyvJFst0cshUq4";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;