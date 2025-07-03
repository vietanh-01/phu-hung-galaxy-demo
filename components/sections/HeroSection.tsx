import React from 'react'
import { getContentBlock } from '@/lib/services/contentBlock.service';

const HeroSection = async () => {
  const contentBlock = await getContentBlock('hero', 'main');

  const heroTitle = contentBlock?.title || 'Thực phẩm tươi ngon mỗi ngày';
  const heroSubtitle = contentBlock?.subtitle || 'Chúng tôi tự hào là nhà cung cấp thực phẩm uy tín, mang đến những sản phẩm tươi ngon, an toàn và chất lượng nhất.';

  return (
    <section id="home" className="hero-bg text-white py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{heroTitle}</h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">{heroSubtitle}</p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
                <a href="#products" className="bg-[#D4A373] hover:bg-opacity-90 text-[#1A2D40] font-bold py-3 px-8 rounded-full text-lg transition">Xem sản phẩm</a>
                <a href="#contact" className="bg-transparent hover:bg-white hover:text-[#1A2D40] text-white font-bold py-3 px-8 border-2 border-white rounded-full text-lg transition">Liên hệ ngay</a>
            </div>
        </div>
    </section>
  )
}

export default HeroSection 