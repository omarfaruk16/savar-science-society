import Link from "next/link";
import { Mail, Phone, MapPin, MessageCircle, Camera, Briefcase, ArrowRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050d0a] border-t border-[#1a3028] pt-20 pb-8 text-[#a3b8aa]">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 relative overflow-hidden">
                <img 
                  src="/logo.png" 
                  alt="Savar Science Society" 
                  className="w-full h-full object-contain filter brightness-110"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-[#f0fdf4] leading-none">
                  Savar Science
                </span>
                <span className="text-xs text-[#22c55e] font-semibold tracking-wider uppercase mt-1">
                  Society
                </span>
              </div>
            </Link>
            <p className="mb-6 text-sm leading-relaxed font-bn">
              একটি বিজ্ঞানমনষ্ক, সৃজনশীল ও যুক্তিনির্ভর সাভার গড়ে তোলার লক্ষ্যে কাজ করা একটি অলাভজনক প্ল্যাটফর্ম।
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[#0f1d17] border border-[#1a3028] flex items-center justify-center text-[#22c55e] hover:bg-[#22c55e] hover:text-white transition-all">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#0f1d17] border border-[#1a3028] flex items-center justify-center text-[#22c55e] hover:bg-[#22c55e] hover:text-white transition-all">
                <Camera className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#0f1d17] border border-[#1a3028] flex items-center justify-center text-[#22c55e] hover:bg-[#22c55e] hover:text-white transition-all">
                <Briefcase className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-[#f0fdf4] mb-6">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/about" className="hover:text-[#22c55e] transition-colors flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 text-[#1a3028] group-hover:text-[#22c55e] transition-colors" />
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-[#22c55e] transition-colors flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 text-[#1a3028] group-hover:text-[#22c55e] transition-colors" />
                  All Events
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#22c55e] transition-colors flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 text-[#1a3028] group-hover:text-[#22c55e] transition-colors" />
                  Our Blog
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#22c55e] transition-colors flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 text-[#1a3028] group-hover:text-[#22c55e] transition-colors" />
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#22c55e] transition-colors flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 text-[#1a3028] group-hover:text-[#22c55e] transition-colors" />
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold text-[#f0fdf4] mb-6">Contact</h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#22c55e] flex-shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed">
                  72/C Birulia Road, Mojidpur,<br />Rajar bari, Savar, Dhaka
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#22c55e] flex-shrink-0 mt-1" />
                <div className="flex flex-col text-sm">
                  <span>01522117318</span>
                  <span>01826101160</span>
                  <span>01518405600</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#22c55e] flex-shrink-0" />
                <span className="text-sm">savarsciencesociety@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold text-[#f0fdf4] mb-6">Stay Updated</h3>
            <p className="text-sm mb-4">Get the latest news on upcoming events and olympiads.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-[#0f1d17] border border-[#1a3028] rounded-l-md px-4 py-2 text-sm text-[#f0fdf4] w-full focus:outline-none focus:border-[#22c55e]"
              />
              <button 
                type="submit" 
                className="bg-[#22c55e] text-[#050d0a] px-4 py-2 rounded-r-md font-semibold hover:bg-[#16a34a] transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1a3028] flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>© {currentYear} Savar Science Society. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-[#22c55e] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#22c55e] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
