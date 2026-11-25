"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#080D1B]/85 backdrop-blur-md border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 text-white font-extrabold text-2xl tracking-tight">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3478F6] to-[#8057FF] flex items-center justify-center text-white shadow-lg shadow-[#3478F6]/30">
              <i className="bi bi-cloud-fill text-xl"></i>
            </span>
            CloudNova<span className="text-[#5794FF]">.</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-7">
            <Link href="/#home" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/#features" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Fitur
            </Link>
            <Link href="/#pricing" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Harga
            </Link>
            <Link href="/#testimonials" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Testimoni
            </Link>
            <Link href="/#infrastructure" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Infrastruktur
            </Link>
            <Link href="/status" className="text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Status Server
            </Link>
            <Link href="/#faq" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              FAQ
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://wa.me/628996217895"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold px-4 py-2.5 rounded-lg border border-white/15 text-white hover:bg-white/10 transition-all"
            >
              Hubungi Kami
            </a>
            <Link
              href="/#pricing"
              className="text-xs font-semibold px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#3478F6] to-[#8057FF] text-white shadow-lg shadow-[#3478F6]/25 hover:shadow-[#3478F6]/40 hover:-translate-y-0.5 transition-all flex items-center gap-1.5"
            >
              Mulai Sekarang <i className="bi bi-arrow-up-right"></i>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2 rounded-lg border border-white/10"
              aria-label="Toggle Menu"
            >
              <i className={`bi ${mobileMenuOpen ? "bi-x-lg" : "bi-list"} text-2xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10 bg-[#0D1426] rounded-2xl p-4 mt-2 mb-4 space-y-3">
            <Link
              href="/#home"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-200 py-1"
            >
              Home
            </Link>
            <Link
              href="/#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-200 py-1"
            >
              Fitur
            </Link>
            <Link
              href="/#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-200 py-1"
            >
              Harga
            </Link>
            <Link
              href="/#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-200 py-1"
            >
              Testimoni
            </Link>
            <Link
              href="/#infrastructure"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-200 py-1"
            >
              Infrastruktur
            </Link>
            <Link
              href="/status"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-emerald-400 py-1"
            >
              Status Server
            </Link>
            <Link
              href="/#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-200 py-1"
            >
              FAQ
            </Link>
            <div className="pt-2 flex flex-col gap-2">
              <Link
                href="/cart?plan=business"
                className="w-full text-center text-xs font-semibold py-2.5 rounded-lg bg-gradient-to-r from-[#3478F6] to-[#8057FF] text-white"
              >
                Pesan Hosting Sekarang
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
