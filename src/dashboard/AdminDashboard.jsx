import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // اضبط مسار supabaseClient حسب مجلد ملفك
import AdminLayout from './layout/AdminLayout';
import { Table, Plus, Layers, ArrowLeft } from 'lucide-react';

// استدعاء الفايلات الثلاثة الخاصة بالمنتجات
import ProductTable from './ProductTable';
import AddProduct from './AddProduct';
import CategoryManager from './CategoryManager';

const AdminDashboard = () => {
  // حالة التحكم بالشاشة الحالية داخل إدارة المنتجات ('menu' | 'table' | 'categories')
  const [currentView, setCurrentView] = useState('menu');
  
  // حالة فتح ونوافذ إضافة منتج Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // حالة المنتجات من قاعدة البيانات
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  // جلب المنتجات حياً من Supabase
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      console.error('Error fetching products:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // حذف قطعة من المعرض
  const handleDeleteProduct = async (id) => {
    if (!window.confirm('هل أنت تأكد من حذف هذه القطعة نهائياً؟')) return;

    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      alert('حدث خطأ أثناء الحذف: ' + err.message);
    }
  };

  // فلترة المنتجات بحسب الكاتجوري المختار
  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <AdminLayout>
      <div className="w-full min-h-screen bg-[#fafafa] p-6 lg:p-10 font-sans" dir="ltr">
        
        {/* Header العريض */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-gray-200">
          <div className="flex items-center gap-4">
            {currentView !== 'menu' && (
              <button 
                onClick={() => setCurrentView('menu')}
                className="p-2 border border-gray-200 rounded-full hover:bg-black hover:text-white transition-all text-gray-600"
                title="Back to Cards Menu"
              >
                <ArrowLeft size={16} />
              </button>
            )}
            <div>
              <h1 className="text-2xl font-serif tracking-widest uppercase text-black font-semibold">
                PRODUCT MANAGEMENT
              </h1>
              <p className="text-xs text-gray-400 tracking-wider uppercase mt-1">
                Manage your gold catalog, categories & new items
              </p>
            </div>
          </div>
        </div>

        {/* 1️⃣ الشاشة الرئيسية (عرض الكروت الـ 3) */}
        {currentView === 'menu' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* كارت جدول المنتجات */}
            <div 
              onClick={() => setCurrentView('table')}
              className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-black cursor-pointer transition-all group flex flex-col justify-between h-52"
            >
              <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-colors">
                <Table size={22} />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-widest uppercase text-black mb-1">
                  ALL PRODUCTS TABLE
                </h3>
                <p className="text-[11px] text-gray-400">Manage and edit catalog items</p>
              </div>
            </div>

            {/* كارت إضافة منتج جديد */}
            <div 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-black cursor-pointer transition-all group flex flex-col justify-between h-52"
            >
              <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-colors">
                <Plus size={22} />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-widest uppercase text-black mb-1">
                  ADD NEW PRODUCT
                </h3>
                <p className="text-[11px] text-gray-400">Add gold & jewelry pieces</p>
              </div>
            </div>

            {/* كارت الأقسام والفلترة */}
            <div 
              onClick={() => setCurrentView('categories')}
              className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-black cursor-pointer transition-all group flex flex-col justify-between h-52"
            >
              <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-colors">
                <Layers size={22} />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-widest uppercase text-black mb-1">
                  PRODUCT CATEGORIES & TAGS
                </h3>
                <p className="text-[11px] text-gray-400">Manage catalog categories</p>
              </div>
            </div>

          </div>
        )}

        {/* 2️⃣ عند الضغط على كارت الجدول: يفتح ProductTable */}
        {currentView === 'table' && (
          <ProductTable 
            products={products} 
            loading={loading} 
            onRefresh={fetchProducts} 
            onDeleteProduct={handleDeleteProduct} 
          />
        )}

        {/* 3️⃣ عند الضغط على كارت الأقسام: يفتح CategoryManager والجدول المفلتر */}
        {currentView === 'categories' && (
          <div className="space-y-6">
            <CategoryManager 
              products={products} 
              activeCategory={activeCategory} 
              onSelectCategory={setActiveCategory} 
            />
            <ProductTable 
              products={filteredProducts} 
              loading={loading} 
              onRefresh={fetchProducts} 
              onDeleteProduct={handleDeleteProduct} 
            />
          </div>
        )}

        {/* 4️⃣ نافذة إضافة منتج جديد (تفتح فوق الشاشة مباشرة) */}
        <AddProduct 
          isOpen={isAddModalOpen} 
          onClose={() => setIsAddModalOpen(false)} 
          onSuccess={fetchProducts} 
        />

      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;