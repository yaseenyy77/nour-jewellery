import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabaseClient'; // تأكد من مسار ملف السوبا بيس بتاعك

// 1. كويري لجلب السلايدز (عشان نعرضهم في HeroSlider)
export const useGetSlides = () => {
  return useQuery({
    queryKey: ['hero_slides'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hero_slides')
        .select('*')
        .order('display_order', { ascending: true });
      if (error) throw error;
      return data;
    },
  });
};

// 2. كويري لرفع صورة جديدة (Bucket + SQL)
export const useUploadSlide = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file) => {
      // أ- اسم فريد للملف عشان ميتكررش
      const fileName = `${Date.now()}-${file.name}`;
      
      // ب- الرفع للـ Bucket
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('hero_images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // ج- الحصول على رابط الصورة العام
      const { data: urlData } = supabase.storage
        .from('hero_images')
        .getPublicUrl(uploadData.path);

      // د- تسجيل اللينك في جدول الـ SQL
      const { error: dbError } = await supabase
        .from('hero_slides')
        .insert([{ image_url: urlData.publicUrl }]);

      if (dbError) throw dbError;
    },
    onSuccess: () => {
      // أول ما الرفع يخلص، حدد البيانات عشان السلايدر يتحدث فوراً
      queryClient.invalidateQueries(['hero_slides']);
    },
  });
};