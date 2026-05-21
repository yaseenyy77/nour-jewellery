// appearanceService.js
import { supabase } from '../../supabaseClient'; // تأكد من مسار الـ supabase client بتاعك

export const fetchSliders = async () => {
  const { data, error } = await supabase
    .from('hero_sliders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  
  return data;
};