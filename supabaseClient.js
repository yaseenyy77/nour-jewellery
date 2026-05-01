import { createClient } from '@supabase/supabase-js';

// استخدام الـ Environment Variables بدل القيم المكتوبة مباشرة
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ocfmjccejmsoakdkgjkp.supabase.co'; 
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // كمل المفتاح هنا

export const supabase = createClient(supabaseUrl, supabaseAnonKey);