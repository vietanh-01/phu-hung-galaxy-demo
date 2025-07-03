import { faAward, faCertificate, faGlobeAmericas, faLeaf } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const CertificationSection = () => {
  return (
    <section className="py-16 bg-[#1A2D40] text-white">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Chứng nhận chất lượng</h2>
                <p className="max-w-2xl mx-auto">Tất cả sản phẩm của chúng tôi đều đạt các tiêu chuẩn an toàn thực phẩm cao nhất</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="bg-white bg-opacity-20 p-6 rounded-lg flex flex-col items-center">
                    <div className="bg-white p-4 rounded-full mb-4">
                        <FontAwesomeIcon icon={faAward} className="text-3xl text-[#1A2D40]" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">ISO 22000</h3>
                    <p className="text-center text-sm">Hệ thống quản lý an toàn thực phẩm</p>
                </div>
                <div className="bg-white bg-opacity-20 p-6 rounded-lg flex flex-col items-center">
                    <div className="bg-white p-4 rounded-full mb-4">
                        <FontAwesomeIcon icon={faCertificate} className="text-3xl text-[#1A2D40]" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">HACCP</h3>
                    <p className="text-center text-sm">Phân tích mối nguy và điểm kiểm soát tới hạn</p>
                </div>
                <div className="bg-white bg-opacity-20 p-6 rounded-lg flex flex-col items-center">
                    <div className="bg-white p-4 rounded-full mb-4">
                        <FontAwesomeIcon icon={faLeaf} className="text-3xl text-[#1A2D40]" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Organic</h3>
                    <p className="text-center text-sm">Chứng nhận hữu cơ quốc tế</p>
                </div>
                <div className="bg-white bg-opacity-20 p-6 rounded-lg flex flex-col items-center">
                    <div className="bg-white p-4 rounded-full mb-4">
                        <FontAwesomeIcon icon={faGlobeAmericas} className="text-3xl text-[#1A2D40]" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Global GAP</h3>
                    <p className="text-center text-sm">Tiêu chuẩn thực hành nông nghiệp tốt</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default CertificationSection 