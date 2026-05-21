import { createClient } from '@supabase/supabase-js';

// تم تنظيف الرابط من /rest/v1/ وحذف الفاصلة المنقوطة من داخل المفتاح
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://oduuvaugysazkcwkforb.supabase.co'; 
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kdXV2YXVneXNhemtjd2tmb3JiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0OTMyNDEsImV4cCI6MjA5MTA2OTI0MX0.XrVKeCfy3DhfgoZdfZFCLD_nE_lvu9FeltpAIColVg4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);