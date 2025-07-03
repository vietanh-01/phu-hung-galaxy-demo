import React from 'react'

const StatsSection = () => {
  return (
    <section className="bg-[#1A2D40] py-12 text-white">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                <div className="stats-card p-6 rounded-lg shadow-lg text-[#1A2D40]">
                    <div className="text-4xl font-bold mb-2">12+</div>
                    <div className="text-lg">Năm kinh nghiệm</div>
                </div>
                <div className="stats-card p-6 rounded-lg shadow-lg text-[#1A2D40]">
                    <div className="text-4xl font-bold mb-2">200+</div>
                    <div className="text-lg">Mặt hàng đa dạng</div>
                </div>
                <div className="stats-card p-6 rounded-lg shadow-lg text-[#1A2D40]">
                    <div className="text-4xl font-bold mb-2">50+</div>
                    <div className="text-lg">Đối tác lớn</div>
                </div>
                <div className="stats-card p-6 rounded-lg shadow-lg text-[#1A2D40]">
                    <div className="text-4xl font-bold mb-2">100%</div>
                    <div className="text-lg">Chứng nhận an toàn</div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default StatsSection 