import { createClient } from '@supabase/supabase-js';

// الرابط والمفتاح الخاص بك من الصور التي أرسلتها
const supabaseUrl = 'https://ocfmjccejmsoakdkgjkp.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jZm1qY2Nlam1zb2FrZGtnamtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0NTMwNzUsImV4cCI6MjA5MzAyOTA3NX0.hAhhreySahlRRXpe2O4AH5gmshJA1dAVge5JjNwDOIg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);