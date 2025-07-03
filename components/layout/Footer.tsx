import { faFacebookF, faInstagram, faLinkedinIn, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faMapMarkerAlt, faSeedling } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[#EAE3D6] text-[#3C3C3C] py-12">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div>
                    <div className="flex items-center mb-4">
                        <FontAwesomeIcon icon={faSeedling} className="text-3xl text-[#1A2D40] mr-2" />
                        <span className="text-2xl font-bold text-[#1A2D40]">Phú Hưng<span className="text-[#D4A373]">Galaxy</span></span>
                    </div>
                    <p className="text-[#3C3C3C] mb-4">Nhà phân phối thực phẩm chất lượng cao với hệ thống rộng khắp cả nước.</p>
                    <div className="flex space-x-4">
                        <a href="#" className="text-[#3C3C3C] hover:text-[#1A2D40] transition"><FontAwesomeIcon icon={faFacebookF} /></a>
                        <a href="#" className="text-[#3C3C3C] hover:text-[#1A2D40] transition"><FontAwesomeIcon icon={faInstagram} /></a>
                        <a href="#" className="text-[#3C3C3C] hover:text-[#1A2D40] transition"><FontAwesomeIcon icon={faLinkedinIn} /></a>
                        <a href="#" className="text-[#3C3C3C] hover:text-[#1A2D40] transition"><FontAwesomeIcon icon={faYoutube} /></a>
                    </div>
                </div>
                <div>
                    <h4 className="text-lg font-bold mb-4 text-[#1A2D40]">Sản phẩm</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-[#3C3C3C] hover:text-[#1A2D40] transition">Thực phẩm khô</a></li>
                        <li><a href="#" className="text-[#3C3C3C] hover:text-[#1A2D40] transition">Đồ hộp</a></li>
                        <li><a href="#" className="text-[#3C3C3C] hover:text-[#1A2D40] transition">Gia vị</a></li>
                        <li><a href="#" className="text-[#3C3C3C] hover:text-[#1A2D40] transition">Đồ đông lạnh</a></li>
                        <li><a href="#" className="text-[#3C3C3C] hover:text-[#1A2D40] transition">Thực phẩm chức năng</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-bold mb-4 text-[#1A2D40]">Thông tin</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-[#3C3C3C] hover:text-[#1A2D40] transition">Về chúng tôi</a></li>
                        <li><a href="#" className="text-[#3C3C3C] hover:text-[#1A2D40] transition">Chính sách phân phối</a></li>
                        <li><a href="#" className="text-[#3C3C3C] hover:text-[#1A2D40] transition">Tiêu chuẩn chất lượng</a></li>
                        <li><a href="#" className="text-[#3C3C3C] hover:text-[#1A2D40] transition">Tin tức</a></li>
                        <li><a href="#" className="text-[#3C3C3C] hover:text-[#1A2D40] transition">Tuyển dụng</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-bold mb-4 text-[#1A2D40]">Liên hệ</h4>
                    <ul className="space-y-2">
                        <li className="flex items-start">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[#1A2D40] mt-1 mr-2" />
                            <span className="text-[#3C3C3C]">Số nhà 11, Ngõ 432, Thôn vân Trai...</span>
                        </li>
                        <li className="flex items-start">
                            <FontAwesomeIcon icon={faEnvelope} className="text-[#1A2D40] mt-1 mr-2" />
                            <span className="text-[#3C3C3C]">phuhunggalaxy@gmail.com</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-[#D4A373] pt-8 flex flex-col md:flex-row justify-between items-center">
                <p className="text-[#3C3C3C] mb-4 md:mb-0">© 2024 Phú Hưng Galaxy. All rights reserved.</p>
                <div className="flex space-x-6">
                    <a href="#" className="text-[#3C3C3C] hover:text-[#1A2D40] transition">Chính sách bảo mật</a>
                    <a href="#" className="text-[#3C3C3C] hover:text-[#1A2D40] transition">Điều khoản sử dụng</a>
                    <a href="#" className="text-[#3C3C3C] hover:text-[#1A2D40] transition">Sitemap</a>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer 