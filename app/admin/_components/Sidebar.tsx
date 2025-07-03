'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faBoxOpen, faTags, faHandshake, faSeedling, faFileAlt, faChevronDown } from '@fortawesome/free-solid-svg-icons';

export function Sidebar() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(
    pathname.startsWith('/admin/pages') ? 'pages' : null
  );

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: faTachometerAlt },
    {
      id: 'pages',
      label: 'Quản lý Trang',
      icon: faFileAlt,
      subItems: [
        { href: '/admin/pages/homepage', label: 'Trang chủ' },
      ],
    },
    { href: '/admin/products', label: 'Products', icon: faBoxOpen },
    { href: '/admin/categories', label: 'Categories', icon: faTags },
    { href: '/admin/partners', label: 'Partners', icon: faHandshake },
  ];

  const handleMenuClick = (id: string) => {
    setOpenMenu(openMenu === id ? null : id);
  };

  return (
    <aside className="w-64 bg-[#1A2D40] text-white flex-shrink-0 flex flex-col sidebar">
      <div className="p-6 text-center border-b border-gray-700">
        <FontAwesomeIcon icon={faSeedling} className="text-3xl text-white mr-2" />
        <span className="text-2xl font-bold">Phú Hưng<span className="text-[#D4A373]">Galaxy</span></span>
        <h2 className="text-lg mt-2 text-gray-400">Admin Panel</h2>
      </div>
      <nav className="flex-grow p-4">
        <ul className="space-y-2">
          {navItems.map((item) =>
            'subItems' in item ? (
              <li key={item.id}>
                <button
                  onClick={() => handleMenuClick(item.id!)}
                  className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors sidebar-link text-left ${
                    pathname.startsWith('/admin/pages')
                      ? 'active bg-[#D4A373] text-[#1A2D40]'
                      : 'hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={item.icon} className="w-5 h-5 mr-3" />
                    <span>{item.label}</span>
                  </div>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`w-3 h-3 transition-transform ${openMenu === item.id ? 'rotate-180' : ''}`}
                  />
                </button>
                {openMenu === item.id && (
                  <ul className="pl-8 mt-2 space-y-2">
                    {item.subItems.map((subItem) => (
                      <li key={subItem.href}>
                        <Link
                          href={subItem.href}
                          className={`flex items-center p-2 rounded-lg transition-colors text-sm ${
                            pathname === subItem.href
                              ? 'text-[#D4A373] font-semibold'
                              : 'hover:bg-gray-700'
                          }`}
                        >
                          <span>{subItem.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ) : (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center p-3 rounded-lg transition-colors sidebar-link ${
                    pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
                      ? 'active bg-[#D4A373] text-[#1A2D40]'
                      : 'hover:bg-gray-700'
                  }`}
                >
                  <FontAwesomeIcon icon={item.icon} className="w-5 h-5 mr-3" />
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          )}
        </ul>
      </nav>
    </aside>
  );
} 