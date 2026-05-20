import { supabase } from '../../supabaseClient'; // تم التصحيح لخطوة واحدة لورا

export const fetchSliders = async () => {
  const { data, error } = await supabase
    .from('hero_sliders')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) throw new Error(error.message);
  return data;
};