"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { handleSignOut } from "@/app/actions/auth-actions";

export default function Header({ session }: { session: any }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Events", path: "/events" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-[#0f1d17]/90 backdrop-blur-md border-b border-[#1a3028] shadow-lg"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 overflow-hidden transition-transform group-hover:scale-105">
            <img 
              src="/logo.png" 
              alt="Savar Science Society Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-[#f0fdf4] leading-none">
              Savar Science
            </span>
            <span className="text-xs text-[#22c55e] font-bold tracking-[0.2em] uppercase mt-1">
              Society
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`text-sm font-medium transition-colors hover:text-[#22c55e] ${
                pathname === link.path
                  ? "text-[#22c55e]"
                  : "text-[#a3b8aa]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Actions - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          {session ? (
            <>
              <Link
                href="/profile"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1a3028] text-[#f0fdf4] text-sm font-medium hover:bg-[#224035] transition-colors border border-[#224035]"
              >
                <User className="w-4 h-4 text-[#22c55e]" />
                Profile
              </Link>
              <form action={handleSignOut}>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-red-500/10 text-red-500 text-sm font-medium hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1a3028] text-[#f0fdf4] text-sm font-medium hover:bg-[#224035] transition-colors border border-[#224035]"
            >
              <User className="w-4 h-4 text-[#22c55e]" />
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-[#f0fdf4] p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-[#0a1410] border-b border-[#1a3028] transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? "max-h-[500px] py-4" : "max-h-0"
        }`}
      >
        <nav className="container mx-auto flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`block text-lg font-medium ${
                pathname === link.path ? "text-[#22c55e]" : "text-[#a3b8aa]"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-[#1a3028] flex flex-col gap-3">
            {session ? (
              <>
                <Link
                  href="/profile"
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-md bg-[#1a3028] text-[#f0fdf4] font-medium border border-[#224035]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="w-5 h-5" />
                  My Profile
                </Link>
                <form action={handleSignOut} className="w-full">
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-md bg-red-500/10 text-red-500 font-medium border border-red-500/20"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </form>
              </>
            ) : (
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-md bg-gradient-to-r from-[#16a34a] to-[#22c55e] text-white font-medium shadow-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="w-5 h-5" />
                Student Login
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
