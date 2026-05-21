import { createClient } from '@supabase/supabase-js';

// الرابط والمفتاح بتوعك اللي في الملف اللي بعته[cite: 9]
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://oduuvaugysazkcwkforb.supabase.co/rest/v1/'; 
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kdXV2YXVneXNhemtjd2tmb3JiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTQ5MzI0MSwiZXhwIjoyMDkxMDY5MjQxfQ.Fau9mFGmzYFLEHntIzxvKfQhwF-D93lKThF3TuI7YHs;';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);