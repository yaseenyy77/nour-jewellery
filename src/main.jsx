import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' 
import './index.css'   
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// إنشاء كائن الـ Query Client المسؤول عن جلب الكاش والبيانات
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // يمنع إعادة جلب البيانات تلقائياً عند التنقل بين النوافذ
      retry: 1, // يحاول مرة واحدة إضافية فقط في حال حدوث خطأ في السيرفر
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* تغليف التطبيق بالكامل ليتمكن HeroSlider والصفحات الأخرى من استخدام useQuery */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)