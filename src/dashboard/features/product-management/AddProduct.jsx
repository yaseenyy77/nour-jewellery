import React, { useState } from 'react';
import { supabase } from '../../../../supabaseClient';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, UploadCloud, X, Save, 
  Image as ImageIcon, CheckCircle2, AlertCircle 
} from 'lucide-react';

const AddProduct = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    category: 'rings',
    status: 'active',
    description: '',
    karat: '18K',
    weight: ''
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    setSelectedFiles((prev) => [...prev, ...files]);
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (indexToRemove) => {
    setSelectedFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
    setPreviewUrls((prev) => {
      URL.revokeObjectURL(prev[indexToRemove]);
      return prev.filter((_, index) => index !== indexToRemove);
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      setMessage({ type: 'error', text: 'Please enter the product name.' });
      return;
    }
    if (selectedFiles.length === 0) {
      setMessage({ type: 'error', text: 'Please select at least one image.' });
      return;
    }

    setIsUploading(true);
    setMessage({ type: '', text: '' });

    try {
      const uploadedImageUrls = [];
      for (const file of selectedFiles) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        const filePath = `products/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);

        uploadedImageUrls.push(publicUrlData.publicUrl);
      }

      const { error: insertError } = await supabase
        .from('products')
        .insert([{
          name: formData.name,
          category: formData.category,
          status: formData.status,
          description: formData.description,
          karat: formData.karat,
          weight: formData.weight,
          images: uploadedImageUrls,
        }]);

      if (insertError) throw insertError;

      setMessage({ type: 'success', text: 'Piece added successfully to your gallery!' });
      setTimeout(() => navigate('/admin/products/table'), 2000);
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Failed to add piece.' });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-10 px-4 sm:px-0">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <Link to="/admin/products/table" className="p-2 border border-gray-200 rounded-full hover:bg-black hover:text-white transition-all">
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold tracking-widest uppercase">Add New Piece</h1>
            <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider mt-1">Add a new item to the jewelry gallery</p>
          </div>
        </div>
        <button 
          onClick={handleSubmit}
          disabled={isUploading}
          className={`flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all ${isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800 hover:shadow-lg'}`}
        >
          {isUploading ? 'Uploading...' : 'Save Product'}
          {!isUploading && <Save size={14} />}
        </button>
      </div>

      {message.text && (
        <div className={`p-4 rounded-xl flex items-center gap-3 text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          {message.text}
        </div>
      )}

      <form className="grid grid-cols-1 lg:grid-cols-3 gap-8" onSubmit={handleSubmit}>
        
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-100 pb-4 mb-6">Basic Information</h2>
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Piece Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all" placeholder="e.g. Royal Diamond Ring" />
            </div>

            {/* صف الأقسام والحالة */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category</label>
                <select name="category" value={formData.category} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-black transition-all">
                  <option value="rings">Rings</option>
                  <option value="necklaces">Necklaces</option>
                  <option value="bracelets">Bracelets</option>
                  <option value="earrings">Earrings</option>
                  <option value="bangles">Bangles</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Visibility</label>
                <select name="status" value={formData.status} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-black transition-all">
                  <option value="active">Active (Visible)</option>
                  <option value="draft">Draft (Hidden)</option>
                </select>
              </div>
            </div>

            {/* صف العيار والجرام الجديد */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Karat (العيار)</label>
                <select name="karat" value={formData.karat} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-black transition-all">
                  <option value="18K">18 Karat</option>
                  <option value="21K">21 Karat</option>
                  <option value="24K">24 Karat</option>
                  <option value="Diamond">Diamond</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Weight (الجرام)</label>
                <input type="number" step="0.01" name="weight" value={formData.weight} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all" placeholder="e.g. 5.5" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Description</label>
              <textarea name="description" value={formData.description} onChange={handleInputChange} rows="4" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all resize-none" placeholder="Details about the piece..."></textarea>
            </div>
          </div>
        </div>

        {/* قسم رفع الصور زي ما هو بس بستايل متجاوب */}
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col h-full">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
              <h2 className="text-sm font-bold uppercase tracking-widest">Gallery Images</h2>
              <span className="text-[10px] bg-gray-100 px-2 py-1 rounded-md font-bold">{selectedFiles.length} Selected</span>
            </div>

            <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-black transition-colors bg-gray-50/50 group cursor-pointer">
              <input type="file" multiple accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
              <div className="bg-white p-3 rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform"><UploadCloud size={24} /></div>
              <p className="text-xs font-bold uppercase mb-1">Click or drag images here</p>
            </div>

            {previewUrls.length > 0 ? (
              <div className="mt-6 grid grid-cols-2 gap-3 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative group rounded-lg overflow-hidden border border-gray-200 aspect-square">
                    <img src={url} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button type="button" onClick={() => removeImage(index)} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-transform scale-75 group-hover:scale-100"><X size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-8 flex flex-col items-center justify-center text-gray-300 flex-1">
                <ImageIcon size={48} className="mb-3 opacity-20" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-center px-4">No images selected yet.</p>
              </div>
            )}
          </div>
        </div>
      </form>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
      `}</style>
    </div>
  );
};

export default AddProduct;