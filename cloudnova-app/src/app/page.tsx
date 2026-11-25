"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HomePage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [domainSearch, setDomainSearch] = useState("");
  const [domainResult, setDomainResult] = useState<string | null>(null);

  // Advisor State
  const [advisorVisitors, setAdvisorVisitors] = useState<"starter" | "business" | "pro">("business");
  const [advisorType, setAdvisorType] = useState<"starter" | "business" | "pro">("business");

  const checkDomain = () => {
    let clean = domainSearch.trim().toLowerCase();
    if (!clean) return;
    if (!clean.includes(".")) clean += ".com";
    setDomainResult(clean);
  };

  const getRecommendedPlan = () => {
    if (advisorVisitors === "pro" || advisorType === "pro") {
      return {
        title: "Paket Professional Hosting",
        price: "Rp89.000/bln",
        reason: "Resource tinggi, 50 GB NVMe SSD & database unlimited untuk traffic padat.",
        href: "/cart?plan=professional",
      };
    } else if (advisorVisitors === "starter" && advisorType === "starter") {
      return {
        title: "Paket Starter Hosting",
        price: "Rp25.000/bln",
        reason: "Pilihan sangat hemat & pas untuk blog pribadi atau web profil dasar.",
        href: "/cart?plan=starter",
      };
    } else {
      return {
        title: "Paket Business Hosting",
        price: "Rp49.000/bln",
        reason: "Kapasitas 30 GB SSD, backup rutin, dan email profesional cocok untuk UMKM.",
        href: "/cart?plan=business",
      };
    }
  };

  const recommended = getRecommendedPlan();

  return (
    <div className="min-h-screen bg-[#080D1B] text-[#F8FAFC]">
      <Navbar />

      {/* HERO SECTION */}
      <section id="home" className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        {/* Glow Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-blue-600/15 blur-[130px] rounded-full pointer-events-none -z-10"></div>
        <div className="absolute top-1/3 -left-20 w-[400px] h-[400px] bg-purple-600/10 blur-[130px] rounded-full pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-300 text-xs font-semibold mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399]"></span>
                Next.js Powered Hosting &bull; High Reliability
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] mb-6">
                Hosting Super Cepat.{" "}
                <span className="bg-gradient-to-r from-[#5B9BFF] via-[#8057FF] to-[#A78BFA] bg-clip-text text-transparent block mt-1">
                  Website Tanpa Hambatan.
                </span>
              </h1>

              <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8">
                Bangun website impianmu bersama CloudNova Hosting. Hadir dengan Pure NVMe/SSD, proteksi SSL gratis, cPanel ready, dan target uptime 99.9%.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10">
                <Link
                  href="/#pricing"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#3478F6] to-[#8057FF] text-white font-semibold text-sm shadow-xl shadow-[#3478F6]/25 hover:shadow-[#3478F6]/40 hover:-translate-y-0.5 transition-all flex items-center gap-2"
                >
                  Lihat Paket Hosting <i className="bi bi-arrow-right"></i>
                </Link>
                <Link
                  href="/#features"
                  className="px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-sm hover:bg-white/10 transition-all"
                >
                  Pelajari Fitur
                </Link>
              </div>

              {/* Domain Checker Box */}
              <div className="max-w-lg mx-auto lg:mx-0 bg-white/5 border border-white/10 p-2 sm:p-2.5 rounded-2xl shadow-xl backdrop-blur-sm mb-4">
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <div className="relative flex-1 w-full flex items-center">
                    <i className="bi bi-search absolute left-4 text-slate-400 text-sm"></i>
                    <input
                      type="text"
                      value={domainSearch}
                      onChange={(e) => setDomainSearch(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && checkDomain()}
                      placeholder="Cari domain impian Anda (contoh: bisnis.id)..."
                      className="w-full bg-transparent pl-11 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>
                  <button
                    onClick={checkDomain}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#3478F6] hover:bg-[#2b66d4] text-white text-xs font-bold transition-all shrink-0"
                  >
                    Cek Domain
                  </button>
                </div>
                {domainResult && (
                  <div className="mt-2.5 px-3 py-2 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center justify-between">
                    <span>
                      ✓ Domain <strong>{domainResult}</strong> tersedia!
                    </span>
                    <Link
                      href={`/cart?plan=business&domain=${encodeURIComponent(domainResult)}`}
                      className="underline font-bold hover:text-white"
                    >
                      Klaim di Checkout &rarr;
                    </Link>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-3 text-xs text-slate-400">
                <span>Ekstensi Populer:</span>
                <span className="font-semibold text-slate-300">.com</span>
                <span className="font-semibold text-slate-300">.id</span>
                <span className="font-semibold text-slate-300">.co.id</span>
                <span className="font-semibold text-slate-300">.net</span>
              </div>
            </div>

            {/* Right Visual Server Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#172747]/90 to-[#0F192C]/95 border border-white/10 shadow-2xl backdrop-blur-xl animate-floating">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-blue-400 font-bold">CloudNova Control Node</span>
                      <h4 className="text-white font-bold text-base mt-0.5">Live Server Overview</h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Operational
                    </span>
                  </div>

                  <div className="my-6 flex justify-center">
                    <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500/25 to-purple-500/20 border border-blue-400/30 flex items-center justify-center shadow-lg shadow-blue-500/20">
                      <i className="bi bi-cloud-check-fill text-5xl text-blue-400"></i>
                    </div>
                  </div>

                  <div className="space-y-3.5 mb-6">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Server Performance</span>
                      <span className="text-emerald-400 font-semibold">99.98% Optimal</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-[88%]"></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-slate-400 block mb-1">CPU Load</span>
                      <strong className="text-white text-base font-bold">14% Avg</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-slate-400 block mb-1">NVMe Storage</span>
                      <strong className="text-white text-base font-bold">Ultra Fast</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-24 bg-[#0B1223] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-blue-400 tracking-wider uppercase">Mengapa CloudNova?</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-4 tracking-tight">
              Infrastruktur Modern untuk Semua Kebutuhan.
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Semua paket shared hosting telah dilengkapi dengan optimasi stack terbaik untuk menunjang kecepatan website Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#131F36] border border-white/5 hover:border-blue-500/30 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center text-2xl mb-5">
                <i className="bi bi-lightning-charge-fill"></i>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">NVMe SSD Storage</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Penyimpanan solid-state tercepat untuk memastikan load time website dan query database berlangsung instan.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#131F36] border border-white/5 hover:border-purple-500/30 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center text-2xl mb-5">
                <i className="bi bi-shield-lock-fill"></i>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">AutoSSL Gratis</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Keamanan enkripsi HTTPS dipasang otomatis untuk seluruh domain dan subdomain Anda tanpa biaya tambahan.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#131F36] border border-white/5 hover:border-cyan-500/30 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center text-2xl mb-5">
                <i className="bi bi-hdd-stack-fill"></i>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">cPanel Control Panel</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Kelola file website, database MySQL, domain, dan email bisnis dengan tampilan dasbor cPanel yang mudah.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#131F36] border border-white/5 hover:border-emerald-500/30 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center text-2xl mb-5">
                <i className="bi bi-headset"></i>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Support WhatsApp</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Dapatkan respon bantuan cepat langsung dari teknisi kami via WhatsApp saat menghadapi kendala website.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-blue-400 tracking-wider uppercase">Harga Transparan &amp; Bersahabat</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-4 tracking-tight">
              Pilih Paket Hosting Sesuai Kebutuhan Anda.
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Mulai langkah digital Anda hari ini. Nikmati potongan ekstra untuk langganan tahunan!
            </p>

            {/* Toggle Billing */}
            <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-full bg-white/5 border border-white/10">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  billingCycle === "monthly" ? "bg-[#3478F6] text-white shadow-md" : "text-slate-400 hover:text-white"
                }`}
              >
                Bulanan
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  billingCycle === "yearly" ? "bg-[#3478F6] text-white shadow-md" : "text-slate-400 hover:text-white"
                }`}
              >
                Tahunan <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full">Hemat 20%</span>
              </button>
            </div>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-16">
            {/* 1. Starter */}
            <div className="p-8 rounded-2xl bg-[#131F36] border border-white/10 flex flex-col justify-between hover:border-blue-500/40 transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center text-xl mb-4">
                  <i className="bi bi-rocket-takeoff"></i>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Starter</h3>
                <p className="text-slate-400 text-xs mb-6">Pilihan ekonomis untuk blog pribadi atau portfolio.</p>

                <div className="mb-6">
                  <span className="text-3xl font-extrabold text-white">
                    {billingCycle === "yearly" ? "Rp20.000" : "Rp25.000"}
                  </span>
                  <span className="text-slate-400 text-xs">/bulan</span>
                </div>

                <div className="w-full h-px bg-white/10 mb-6"></div>

                <ul className="space-y-3.5 text-xs text-slate-300 mb-8">
                  <li className="flex items-center gap-2.5">
                    <i className="bi bi-check-circle-fill text-blue-400"></i> 1 Website
                  </li>
                  <li className="flex items-center gap-2.5">
                    <i className="bi bi-check-circle-fill text-blue-400"></i> 10 GB NVMe SSD Storage
                  </li>
                  <li className="flex items-center gap-2.5">
                    <i className="bi bi-check-circle-fill text-blue-400"></i> Gratis SSL Unlimited
                  </li>
                  <li className="flex items-center gap-2.5">
                    <i className="bi bi-check-circle-fill text-blue-400"></i> 1 Database MySQL
                  </li>
                  <li className="flex items-center gap-2.5">
                    <i className="bi bi-check-circle-fill text-blue-400"></i> 2 Akun Email Bisnis
                  </li>
                  <li className="flex items-center gap-2.5">
                    <i className="bi bi-check-circle-fill text-blue-400"></i> cPanel Control Panel
                  </li>
                </ul>
              </div>

              <Link
                href="/cart?plan=starter"
                className="w-full py-3 rounded-xl border border-blue-500/30 text-white font-bold text-xs text-center hover:bg-blue-600 transition-all"
              >
                Pilih Starter &rarr;
              </Link>
            </div>

            {/* 2. Business (Featured) */}
            <div className="p-8 rounded-2xl bg-gradient-to-b from-[#182747] to-[#111D35] border-2 border-[#5794FF] shadow-xl shadow-blue-500/10 flex flex-col justify-between relative transform md:-translate-y-2">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-extrabold text-[10px] tracking-wider uppercase shadow-md">
                Paling Populer
              </span>

              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center text-xl mb-4">
                  <i className="bi bi-building"></i>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Business</h3>
                <p className="text-slate-400 text-xs mb-6">Performa optimal untuk toko online dan bisnis UMKM.</p>

                <div className="mb-6">
                  <span className="text-3xl font-extrabold text-white">
                    {billingCycle === "yearly" ? "Rp39.200" : "Rp49.000"}
                  </span>
                  <span className="text-slate-400 text-xs">/bulan</span>
                </div>

                <div className="w-full h-px bg-white/10 mb-6"></div>

                <ul className="space-y-3.5 text-xs text-slate-300 mb-8">
                  <li className="flex items-center gap-2.5">
                    <i className="bi bi-check-circle-fill text-emerald-400"></i> 5 Website
                  </li>
                  <li className="flex items-center gap-2.5">
                    <i className="bi bi-check-circle-fill text-emerald-400"></i> 30 GB NVMe SSD Storage
                  </li>
                  <li className="flex items-center gap-2.5">
                    <i className="bi bi-check-circle-fill text-emerald-400"></i> Gratis Domain (.com/.id)*
                  </li>
                  <li className="flex items-center gap-2.5">
                    <i className="bi bi-check-circle-fill text-emerald-400"></i> Gratis SSL Unlimited
                  </li>
                  <li className="flex items-center gap-2.5">
                    <i className="bi bi-check-circle-fill text-emerald-400"></i> 5 Database MySQL
                  </li>
                  <li className="flex items-center gap-2.5">
                    <i className="bi bi-check-circle-fill text-emerald-400"></i> 10 Akun Email Bisnis
                  </li>
                  <li className="flex items-center gap-2.5">
                    <i className="bi bi-check-circle-fill text-emerald-400"></i> Backup Berkala Otomatis
                  </li>
                </ul>
              </div>

              <Link
                href="/cart?plan=business"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-xs text-center shadow-lg shadow-blue-500/25 hover:opacity-90 transition-all"
              >
                Pilih Paket Business &rarr;
              </Link>
            </div>

            {/* 3. Professional */}
            <div className="p-8 rounded-2xl bg-[#131F36] border border-white/10 flex flex-col justify-between hover:border-blue-500/40 transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center text-xl mb-4">
                  <i className="bi bi-gem"></i>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Professional</h3>
                <p className="text-slate-400 text-xs mb-6">Kapasitas maksimal untuk agensi, developer &amp; multi-web.</p>

                <div className="mb-6">
                  <span className="text-3xl font-extrabold text-white">
                    {billingCycle === "yearly" ? "Rp71.200" : "Rp89.000"}
                  </span>
                  <span className="text-slate-400 text-xs">/bulan</span>
                </div>

                <div className="w-full h-px bg-white/10 mb-6"></div>

                <ul className="space-y-3.5 text-xs text-slate-300 mb-8">
                  <li className="flex items-center gap-2.5">
                    <i className="bi bi-check-circle-fill text-cyan-400"></i> 10 Website
                  </li>
                  <li className="flex items-center gap-2.5">
                    <i className="bi bi-check-circle-fill text-cyan-400"></i> 50 GB NVMe SSD Storage
                  </li>
                  <li className="flex items-center gap-2.5">
                    <i className="bi bi-check-circle-fill text-cyan-400"></i> Gratis Domain (.com/.id)*
                  </li>
                  <li className="flex items-center gap-2.5">
                    <i className="bi bi-check-circle-fill text-cyan-400"></i> Unlimited Database MySQL
                  </li>
                  <li className="flex items-center gap-2.5">
                    <i className="bi bi-check-circle-fill text-cyan-400"></i> Unlimited Akun Email
                  </li>
                  <li className="flex items-center gap-2.5">
                    <i className="bi bi-check-circle-fill text-cyan-400"></i> Prioritas VIP Support
                  </li>
                </ul>
              </div>

              <Link
                href="/cart?plan=professional"
                className="w-full py-3 rounded-xl border border-blue-500/30 text-white font-bold text-xs text-center hover:bg-blue-600 transition-all"
              >
                Pilih Professional &rarr;
              </Link>
            </div>
          </div>

          {/* ADVISOR CALCULATOR BOX */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-[#131F36] to-[#0F192C] border border-blue-500/20 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5">
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                  Hosting Advisor
                </span>
                <h3 className="text-2xl font-bold text-white mt-2 mb-2">Bingung Memilih Paket?</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Gunakan kalkulator rekomendasi kami. Pilih perkiraan traffic dan jenis website untuk mendapatkan paket yang efisien tanpa membayar berlebihan.
                </p>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Traffic Pengunjung Bulanan:</label>
                    <select
                      value={advisorVisitors}
                      onChange={(e) => setAdvisorVisitors(e.target.value as any)}
                      className="w-full bg-[#080D1B] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="starter">&lt; 10.000 Pengunjung</option>
                      <option value="business">10.000 - 50.000 Pengunjung</option>
                      <option value="pro">&gt; 50.000 Pengunjung</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Jenis Kebutuhan Website:</label>
                    <select
                      value={advisorType}
                      onChange={(e) => setAdvisorType(e.target.value as any)}
                      className="w-full bg-[#080D1B] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="starter">Blog Pribadi / Portfolio</option>
                      <option value="business">Toko Online / Web UMKM</option>
                      <option value="pro">Portal Berita / Agensi Web</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Rekomendasi Paket Pas:</span>
                    <strong className="text-white text-base block font-bold">{recommended.title} ({recommended.price})</strong>
                    <span className="text-xs text-slate-400">{recommended.reason}</span>
                  </div>
                  <Link
                    href={recommended.href}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shrink-0 transition-all"
                  >
                    Ambil Paket Ini &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
