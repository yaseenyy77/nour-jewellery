import React, { useState } from 'react';
import { supabase } from '../../../supabaseClient'; // اضبط مسار الملف حسب مشروعك
import { X, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AddProduct = ({ isOpen, onClose, onSuccess }) => {
  const initialFormState = {
    name: '',
    category: 'rings',
    type: 'Solitaire Ring',
    brand: 'NOUR',
    weight_grams: '',
    karat: '18k',
    material_color: 'Yellow Gold',
    description: '',
    price: '',
    old_price: '',
    stock: 1,
    in_stock: true,
    is_featured: false,
    is_new_arrival: true,
    imageUrlInput: '',
    images: [],
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddImageUrl = () => {
    if (!formData.imageUrlInput.trim()) return;
    setFormData({
      ...formData,
      images: [...formData.images, formData.imageUrlInput.trim()],
      imageUrlInput: '',
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || formData.images.length === 0) {
      alert('الرجاء أدخل اسم المنتج، السعر، وصورة واحدة على الأقل');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        category: formData.category,
        type: formData.type,
        brand: formData.brand || 'NOUR',
        weight_grams: formData.weight_grams ? parseFloat(formData.weight_grams) : null,
        karat: formData.karat,
        material_color: formData.material_color,
        description: formData.description,
        price: parseFloat(formData.price),
        old_price: formData.old_price ? parseFloat(formData.old_price) : null,
        stock: parseInt(formData.stock) || 1,
        in_stock: formData.in_stock,
        is_featured: formData.is_featured,
        is_new_arrival: formData.is_new_arrival,
        images: formData.images,
      };

      const { error } = await supabase.from('products').insert([payload]);
      if (error) throw error;

      alert('تمت إضافة القطعة إلى المعرض بنجاح! ✨');
      setFormData(initialFormState);
      onSuccess();
      onClose();
    } catch (err) {
      alert('حدث خطأ في الإضافة: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" dir="ltr">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl p-8 border border-gray-100"
          >
            <div className="flex items-center justify-between pb-6 border-b border-gray-100 mb-6">
              <h2 className="text-lg font-serif font-bold tracking-widest uppercase text-black">
                Add New Fine Piece
              </h2>
              <button onClick={onClose} className="p-2 text-gray-400 hover:text-black transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                    Piece Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Gold Necklace"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:border-black uppercase font-semibold"
                  >
                    <option value="rings">Rings</option>
                    <option value="necklaces">Necklaces</option>
                    <option value="bracelets">Bracelets</option>
                    <option value="earrings">Earrings</option>
                    <option value="bangles">Bangles</option>
                  </select>
                </div>
              </div>

              {/* Gold Specs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                    Gold Karat
                  </label>
                  <select
                    value={formData.karat}
                    onChange={(e) => setFormData({ ...formData, karat: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:border-black"
                  >
                    <option value="18k">18k Gold</option>
                    <option value="21k">21k Gold</option>
                    <option value="24k">24k Gold</option>
                    <option value="Diamond">Diamond</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                    Weight (Grams)
                  </label>
                  <input
                    type="number"
                    step="0.001"
                    placeholder="e.g. 5.250"
                    value={formData.weight_grams}
                    onChange={(e) => setFormData({ ...formData, weight_grams: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                    Material Color
                  </label>
                  <select
                    value={formData.material_color}
                    onChange={(e) => setFormData({ ...formData, material_color: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:border-black"
                  >
                    <option value="Yellow Gold">Yellow Gold</option>
                    <option value="White Gold">White Gold</option>
                    <option value="Rose Gold">Rose Gold</option>
                  </select>
                </div>
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50/80 p-4 border border-gray-100">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                    Current Price (LE) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 25000"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-200 text-xs focus:outline-none focus:border-black font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                    Old Price (LE) - <span className="text-gray-400 font-normal">Sale badge will show if set</span>
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 30000"
                    value={formData.old_price}
                    onChange={(e) => setFormData({ ...formData, old_price: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-200 text-xs focus:outline-none focus:border-black text-gray-400"
                  />
                </div>
              </div>

              {/* Images */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                  Image URLs (JPG, PNG, WEBP) *
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    placeholder="Paste image link"
                    value={formData.imageUrlInput}
                    onChange={(e) => setFormData({ ...formData, imageUrlInput: e.target.value })}
                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:border-black"
                  />
                  <button
                    type="button"
                    onClick={handleAddImageUrl}
                    className="px-6 bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-800"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-3">
                  {formData.images.map((img, idx) => (
                    <div key={idx} className="relative w-16 h-16 border border-gray-200 rounded overflow-hidden group">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute inset-0 bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="accent-black w-4 h-4"
                  />
                  <span className="font-semibold text-gray-700">Show on Home Slider</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={formData.in_stock}
                    onChange={(e) => setFormData({ ...formData, in_stock: e.target.checked })}
                    className="accent-black w-4 h-4"
                  />
                  <span className="font-semibold text-gray-700">In Stock</span>
                </label>
              </div>

              <div className="pt-6 border-t border-gray-100 flex items-center justify-end gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 text-xs font-bold tracking-widest uppercase text-gray-400 hover:text-black"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-black text-white text-xs font-bold tracking-[0.2em] uppercase hover:bg-neutral-800 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : 'Save Product'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddProduct;