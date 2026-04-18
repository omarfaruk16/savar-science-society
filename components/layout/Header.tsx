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
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Committee", path: "/committee" },
    { name: "Events", path: "/events" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled
        ? "py-3 bg-[#050d0a]/80 backdrop-blur-xl border-b border-[#1a3028] shadow-2xl"
        : "py-6 bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-lg bg-[#0f1d17] border border-[#224035] group-hover:border-[#22c55e] transition-colors p-1">
            <img
              src="/logo.png"
              alt="Savar Science Society"
              className="w-full h-full object-contain filter brightness-110"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-bold tracking-tight text-[#f0fdf4] leading-tight group-hover:text-[#22c55e] transition-colors">
              Savar Science
            </span>
            <span className="text-[10px] md:text-xs text-[#22c55e] font-bold tracking-[0.15em] uppercase -mt-0.5 opacity-90">
              Society
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all hover:bg-[#22c55e]/10 ${isActive(link.path)
                ? "text-[#22c55e] bg-[#22c55e]/5"
                : "text-[#a3b8aa] hover:text-[#f0fdf4]"
                }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Actions - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-3">
              <Link
                href="/profile"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1a3028] text-[#f0fdf4] text-sm font-bold hover:bg-[#224035] transition-all border border-[#224035] shadow-inner"
              >
                <User className="w-4 h-4 text-[#22c55e]" />
                Profile
              </Link>
              <form action={handleSignOut}>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-red-500/10 text-red-500 text-sm font-bold hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </form>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#16a34a] to-[#22c55e] text-white text-sm font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#16a34a]/20"
            >
              <User className="w-4 h-4" />
              Student Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
          {!session && (
            <Link
              href="/login"
              className="p-2.5 rounded-full bg-[#1a3028] text-[#22c55e] border border-[#224035]"
            >
              <User className="w-5 h-5" />
            </Link>
          )}
          <button
            className={`p-2 rounded-xl transition-colors ${mobileMenuOpen ? "bg-[#22c55e] text-[#050d0a]" : "bg-[#1a3028] text-[#f0fdf4]"}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <div
        className={`md:hidden fixed inset-x-0 top-[72px] bg-[#050d0a]/95 backdrop-blur-2xl border-b border-[#1a3028] transition-all duration-500 ease-in-out shadow-2xl overflow-hidden ${mobileMenuOpen ? "max-h-[85vh] opacity-100 py-8" : "max-h-0 opacity-0"
          }`}
      >
        <nav className="container mx-auto px-6 flex flex-col gap-2">
          {navLinks.map((link, idx) => (
            <Link
              key={link.name}
              href={link.path}
              className={`flex items-center justify-between p-4 rounded-2xl text-lg font-bold transition-all ${isActive(link.path)
                ? "bg-[#22c55e]/10 text-[#22c55e] border-l-4 border-[#22c55e]"
                : "text-[#a3b8aa] hover:bg-[#1a3028]"
                }`}
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              {link.name}
              <div className={`w-2 h-2 rounded-full bg-[#22c55e] transition-opacity ${isActive(link.path) ? "opacity-100" : "opacity-0"}`} />
            </Link>
          ))}

          <div className="mt-6 pt-6 border-t border-[#1a3028] flex flex-col gap-4">
            {session ? (
              <>
                <Link
                  href="/profile"
                  className="flex items-center justify-center gap-3 w-full px-6 py-4 rounded-2xl bg-[#1a3028] text-[#f0fdf4] font-bold border border-[#224035]"
                >
                  <User className="w-5 h-5 text-[#22c55e]" />
                  My Dashboard
                </Link>
                <form action={handleSignOut} className="w-full">
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-3 w-full px-6 py-4 rounded-2xl bg-red-500/10 text-red-500 font-bold border border-red-500/20"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </form>
              </>
            ) : (
              <Link
                href="/register"
                className="flex items-center justify-center gap-3 w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-[#16a34a] to-[#22c55e] text-white font-black shadow-xl"
              >
                Join the Society
                <User className="w-5 h-5" />
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
