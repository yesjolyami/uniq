import { Globe, Mail, MapPin, Phone, Instagram } from 'lucide-react';
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-primary pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="lg:pr-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full font-black text-xl tracking-tighter shadow-xl">
                <span className="text-[#f5963b]">U</span>
                <span className="text-[#e62020]">K</span>
                <span className="text-[#e62020]">G</span>
              </div>
              <div className="flex flex-col flex-1 justify-center translate-y-0.5">
                <span className="font-bold text-xl leading-none text-white tracking-wide">UNIQUE ASIA</span>
                <span className="text-[0.6rem] text-gray-300 font-medium uppercase tracking-[0.2em] leading-tight mt-1">
                  Международные возможности
                </span>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Мы создаем возможности для новых впечатлений, карьерного роста и качественного будущего.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Услуги</h4>
            <ul className="space-y-4">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Трудоустройство</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Туристические поездки</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Оформление виз</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Авиабилеты</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Языковые программы</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Сопровождение</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Направления</h4>
            <ul className="space-y-4">
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Япония</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Германия</a></li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Турция</a>
                  </li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">ОАЭ</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">США</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Другие страны</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Контакты</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <a href="tel:+77771234567" className="text-gray-300 hover:text-white transition-colors text-sm">+7 777 123 45 67</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <a href="mailto:info@uniqueasia.com" className="text-gray-300 hover:text-white transition-colors text-sm">info@uniqueasia.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Instagram className="w-5 h-5 text-gray-400" />
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">@uniqueasia.company</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
                <span className="text-gray-300 text-sm">Алматы, Казахстан</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 text-center flex flex-col items-center">
          <p className="text-gray-400 text-xs">
            © 2019–{new Date().getFullYear()} UNIQUE ASIA. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
