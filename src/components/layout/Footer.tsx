import React from "react";
import Link from "next/link";
import { RiInstagramLine, RiFacebookCircleLine, RiLinkedinBoxLine, RiTwitterXLine } from "@remixicon/react";

export const Footer = () => {
  return (
    <footer className="relative bg-gray-100 mt-20 pt-20 pb-12">
      {/* Decorative Wave Overlay - SVG positioned absolutely at the top flowing upwards */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180 -mt-[1px]">
        <svg
          className="relative block w-[calc(134%+1.3px)] h-[80px] lg:h-[120px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-white"
          ></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand & Socials */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link href="/" className="font-poppins font-bold text-2xl text-gray-900 tracking-tight block mb-4">
              UPGRID <span className="text-primary-600">DIGITAL</span>
            </Link>
            <p className="text-gray-600 mb-6 max-w-sm">
              Agensi digital marketing yang membantu bisnis tumbuh melalui strategi digital yang terukur dan berorientasi hasil.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors shadow-sm">
                <RiInstagramLine size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors shadow-sm">
                <RiFacebookCircleLine size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors shadow-sm">
                <RiLinkedinBoxLine size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors shadow-sm">
                <RiTwitterXLine size={20} />
              </a>
            </div>
          </div>

          {/* Menu */}
          <div>
            <h4 className="font-poppins font-semibold text-gray-900 mb-6">Menu</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-600 hover:text-primary-600 transition-colors">Beranda</Link></li>
              <li><Link href="/tentang" className="text-gray-600 hover:text-primary-600 transition-colors">Tentang</Link></li>
              <li><Link href="/layanan" className="text-gray-600 hover:text-primary-600 transition-colors">Layanan</Link></li>
              <li><Link href="/portofolio" className="text-gray-600 hover:text-primary-600 transition-colors">Portofolio</Link></li>
              <li><Link href="/kontak" className="text-gray-600 hover:text-primary-600 transition-colors">Kontak</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-poppins font-semibold text-gray-900 mb-6">Layanan</h4>
            <ul className="space-y-3">
              <li><Link href="/layanan" className="text-gray-600 hover:text-primary-600 transition-colors">Jasa Pembuatan Website</Link></li>
              <li><Link href="/layanan" className="text-gray-600 hover:text-primary-600 transition-colors">Digital Creative Agency</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-poppins font-semibold text-gray-900 mb-6">Kontak</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-gray-600">+62 812-3456-7890</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-600">info@upgriddigital.com</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-600">Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Upgrid Digital. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link href="#" className="text-gray-500 hover:text-primary-600">Privacy Policy</Link>
            <Link href="#" className="text-gray-500 hover:text-primary-600">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
