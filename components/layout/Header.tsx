'use client'

import { faBars, faSeedling } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Header = () => {
  return (
    <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center">
                <FontAwesomeIcon icon={faSeedling} className="text-3xl text-[#1A2D40] mr-2" />
                <span className="text-2xl font-bold text-[#1A2D40]">Phú Hưng<span className="text-[#D4A373]">Galaxy</span></span>
            </div>
            <nav className="hidden md:flex space-x-8">
                <a href="#home" className="text-[#1A2D40] font-medium hover:text-[#D4A373]">Trang chủ</a>
                <a href="#products" className="text-[#3C3C3C] font-medium hover:text-[#D4A373]">Sản phẩm</a>
                <a href="#about" className="text-[#3C3C3C] font-medium hover:text-[#D4A373]">Về chúng tôi</a>
                <a href="#partners" className="text-[#3C3C3C] font-medium hover:text-[#D4A373]">Đối tác</a>
                <a href="#contact" className="text-[#3C3C3C] font-medium hover:text-[#D4A373]">Liên hệ</a>
            </nav>
            <div className="md:hidden">
                <button className="text-gray-700 focus:outline-none">
                    <FontAwesomeIcon icon={faBars} className="text-2xl" />
                </button>
            </div>
        </div>
    </header>
  )
}

export default Header 