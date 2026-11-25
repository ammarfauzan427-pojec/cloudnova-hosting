"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PLANS_DATA: Record<string, { title: string; badge: string; baseMonthly: number; discounts: Record<number, number> }> = {
  starter: {
    title: "Paket Starter",
    badge: "Pilihan Ekonomis",
    baseMonthly: 25000,
    discounts: { 1: 0, 12: 0.2, 24: 0.3, 48: 0.4 },
  },
  business: {
    title: "Paket Business",
    badge: "Paling Populer",
    baseMonthly: 49000,
    discounts: { 1: 0, 12: 0.2, 24: 0.35, 48: 0.45 },
  },
  professional: {
    title: "Paket Professional",
    badge: "Performa Tinggi",
    baseMonthly: 89000,
    discounts: { 1: 0, 12: 0.2, 24: 0.35, 48: 0.5 },
  },
};

const VALID_COUPONS: Record<string, number> = {
  SEMESTER7: 0.15,
  CLOUDFIRST: 0.2,
  MABA2026: 0.1,
};

function CartContent() {
  const searchParams = useSearchParams();
  const planKey = (searchParams.get("plan") || "business").toLowerCase();
  const initialDomain = searchParams.get("domain") || "";

  const currentPlan = PLANS_DATA[planKey] || PLANS_DATA.business;

  // Form State
  const [duration, setDuration] = useState<number>(12);
  const [domainInput, setDomainInput] = useState<string>(initialDomain);
  const [domainLinked, setDomainLinked] = useState<boolean>(!!initialDomain);
  const [selectedPayment, setSelectedPayment] = useState<string>("QRIS Instan (GoPay, OVO, Dana, ShopeePay)");

  // Customer State
  const [custName, setCustName] = useState("");
  const [custPhone, setCustPhone] = useState("");
  const [custEmail, setCustEmail] = useState("");

  // Coupon State
  const [couponOpen, setCouponOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState<{ text: string; success: boolean } | null>(null);

  // Calculations
  const discountRate = currentPlan.discounts[duration] || 0;
  const discountedMonthly = currentPlan.baseMonthly * (1 - discountRate);
  const normalSubtotal = currentPlan.baseMonthly * duration;
  let subtotal = discountedMonthly * duration;

  let couponDeduction = 0;
  if (couponDiscount > 0) {
    couponDeduction = subtotal * couponDiscount;
    subtotal -= couponDeduction;
  }

  const tax = subtotal * 0.11;
  const grandTotal = subtotal + tax;
  const normalGrandTotal = normalSubtotal + normalSubtotal * 0.11;
  const totalSavings = normalGrandTotal - grandTotal;

  const formatRupiah = (num: number) => "Rp" + Math.round(num).toLocaleString("id-ID");

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (VALID_COUPONS[code]) {
      setCouponDiscount(VALID_COUPONS[code]);
      setCouponMsg({ text: `Kupon ${code} berhasil! Diskon ${Math.round(VALID_COUPONS[code] * 100)}% diterapkan.`, success: true });
    } else {
      setCouponMsg({ text: "Kupon tidak valid atau kedaluwarsa.", success: false });
    }
  };

  const handleCheckoutWA = () => {
    const domainText = domainInput.trim() || "- (Belum ditentukan)";
    const name = custName.trim() || "Pelanggan";
    const phone = custPhone.trim() || "-";
    const email = custEmail.trim() || "-";

    const msg =
      `*PESANAN BARU CLOUDNOVA HOSTING (NEXT.JS APP)*\n` +
      `---------------------------------------\n` +
      `*Paket:* ${currentPlan.title}\n` +
      `*Durasi:* ${duration} Bulan\n` +
      `*Nama Domain:* ${domainText}\n` +
      `*Metode Bayar:* ${selectedPayment}\n` +
      (couponDiscount > 0 ? `*Kupon Promo:* ${couponCode.toUpperCase()} (-${Math.round(couponDiscount * 100)}%)\n` : "") +
      `*Total Tagihan:* ${formatRupiah(grandTotal)} (Termasuk PPN 11%)\n` +
      `---------------------------------------\n` +
      `*Data Pemesan:*\n` +
      `- Nama: ${name}\n` +
      `- No WA: ${phone}\n` +
      `- Email: ${email}\n\n` +
      `Halo tim CloudNova, saya ingin menyelesaikan pemesanan ini. Mohon panduan instruksi pembayarannya. Terima kasih!`;

    window.open(`https://wa.me/628996217895?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Banner Alert */}
      <div className="mb-8 p-3 rounded-xl bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-500/30 text-center text-xs sm:text-sm text-blue-200 font-semibold">
        ✨ Promo Spesial Hosting CloudNova telah diterapkan. Selesaikan pesanan Anda hari ini!
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Configuration */}
        <div className="lg:col-span-7 space-y-6">
          <h1 className="text-2xl font-extrabold text-white">Keranjang Anda</h1>

          {/* Hosting Package Card */}
          <div className="p-6 rounded-2xl bg-[#131F36] border border-white/10">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center text-xl">
                  <i className="bi bi-hdd-network-fill"></i>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">{currentPlan.title}</h3>
                  <span className="text-xs text-slate-400">Cloud Web Hosting &amp; Domain</span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold">
                {currentPlan.badge}
              </span>
            </div>

            {/* Duration Selector */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400 font-semibold">Durasi Sewa:</span>
                <select
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="bg-[#0D1627] text-white border border-blue-500/30 rounded-lg px-3 py-2 text-xs font-bold focus:outline-none"
                >
                  <option value={1}>1 Bulan</option>
                  <option value={12}>12 Bulan (1 Tahun)</option>
                  <option value={24}>24 Bulan (2 Tahun)</option>
                  <option value={48}>48 Bulan (4 Tahun)</option>
                </select>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-2 justify-end">
                  {discountRate > 0 && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                      Hemat {Math.round(discountRate * 100)}%
                    </span>
                  )}
                  <strong className="text-xl font-extrabold text-white">{formatRupiah(discountedMonthly)}</strong>
                  <span className="text-xs text-slate-400">/bln</span>
                </div>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  Harga normal {formatRupiah(currentPlan.baseMonthly)}/bln
                </span>
              </div>
            </div>

            {/* Perks */}
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <i className="bi bi-check-circle-fill text-emerald-400"></i> Termasuk domain gratis untuk sewa 1 tahun ke atas
              </li>
              <li className="flex items-center gap-2">
                <i className="bi bi-check-circle-fill text-emerald-400"></i> Sertifikat SSL gratis seumur hidup
              </li>
              <li className="flex items-center gap-2">
                <i className="bi bi-check-circle-fill text-emerald-400"></i> Akses cPanel &amp; backup berkala otomatis
              </li>
            </ul>
          </div>

          {/* Domain Selection Card */}
          <div className="p-6 rounded-2xl bg-[#131F36] border border-white/10">
            <h4 className="text-base font-bold text-white mb-1 flex items-center gap-2">
              <i className="bi bi-globe text-blue-400"></i> Tentukan Nama Domain Anda
            </h4>
            <p className="text-xs text-slate-400 mb-4">
              Gratis pendaftaran domain (.com, .id, dll) bila memilih durasi 12 bulan ke atas.
            </p>

            <div className="flex gap-2">
              <input
                type="text"
                value={domainInput}
                onChange={(e) => {
                  setDomainInput(e.target.value);
                  setDomainLinked(false);
                }}
                placeholder="contoh: websitekeren.com"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={() => setDomainLinked(true)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shrink-0"
              >
                Pasang Domain
              </button>
            </div>
            {domainLinked && domainInput && (
              <span className="block mt-2.5 text-xs text-emerald-400 font-semibold">
                ✓ Domain {domainInput} berhasil dikaitkan ke pesanan!
              </span>
            )}
          </div>

          {/* Payment Method Selection */}
          <div className="p-6 rounded-2xl bg-[#131F36] border border-white/10">
            <h4 className="text-base font-bold text-white mb-1 flex items-center gap-2">
              <i className="bi bi-credit-card-2-front-fill text-purple-400"></i> Pilih Metode Pembayaran
            </h4>
            <p className="text-xs text-slate-400 mb-4">
              Konfirmasi pembayaran instan dan aktivasi otomatis.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { name: "QRIS Instan (GoPay, OVO, Dana, ShopeePay)", label: "QRIS Instan", sub: "Semua E-Wallet", icon: "bi-qr-code-scan" },
                { name: "BCA Virtual Account", label: "BCA VA", sub: "Otomatis 24 Jam", icon: "bi-bank" },
                { name: "Mandiri Virtual Account", label: "Mandiri VA", sub: "Otomatis 24 Jam", icon: "bi-building" },
                { name: "BRI / BNI Virtual Account", label: "BRI / BNI VA", sub: "Virtual Account", icon: "bi-wallet2" },
                { name: "Transfer Bank Manual", label: "Transfer Manual", sub: "Konfirmasi WA", icon: "bi-cash-stack" },
              ].map((m) => (
                <div
                  key={m.name}
                  onClick={() => setSelectedPayment(m.name)}
                  className={`p-3.5 rounded-xl border text-center cursor-pointer transition-all ${
                    selectedPayment === m.name
                      ? "bg-blue-600/20 border-blue-400 shadow-md shadow-blue-500/20"
                      : "bg-white/5 border-white/10 hover:border-white/25"
                  }`}
                >
                  <i className={`bi ${m.icon} text-xl text-blue-400 block mb-1.5`}></i>
                  <span className="text-xs font-bold text-white block">{m.label}</span>
                  <span className="text-[10px] text-slate-400">{m.sub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Form */}
          <div className="p-6 rounded-2xl bg-[#131F36] border border-white/10">
            <h4 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <i className="bi bi-person-lines-fill text-cyan-400"></i> Informasi Kontak Pemesan
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  value={custName}
                  onChange={(e) => setCustName(e.target.value)}
                  placeholder="Nama Anda"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nomor WhatsApp</label>
                <input
                  type="tel"
                  value={custPhone}
                  onChange={(e) => setCustPhone(e.target.value)}
                  placeholder="0812xxxxxxx"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email (Untuk Pengiriman cPanel)</label>
                <input
                  type="email"
                  value={custEmail}
                  onChange={(e) => setCustEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Order Summary */}
        <div className="lg:col-span-5 sticky top-28">
          <div className="p-7 rounded-2xl bg-gradient-to-br from-[#15223C] to-[#0F1A2D] border border-blue-500/30 shadow-2xl">
            <h3 className="text-lg font-bold text-white pb-3 border-b border-white/10 mb-5">
              Ringkasan Pesanan
            </h3>

            {/* Coupon Box */}
            <div className="mb-5 pb-5 border-b border-white/10">
              <button
                onClick={() => setCouponOpen(!couponOpen)}
                className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1.5"
              >
                <i className="bi bi-ticket-perforated"></i> Punya Kode Kupon Promo?
              </button>
              {couponOpen && (
                <div className="mt-3 space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="contoh: SEMESTER7"
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white uppercase focus:outline-none"
                    />
                    <button
                      onClick={applyCoupon}
                      className="px-3.5 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold text-white transition-all"
                    >
                      Terapkan
                    </button>
                  </div>
                  {couponMsg && (
                    <span className={`text-[11px] block font-semibold ${couponMsg.success ? "text-emerald-400" : "text-red-400"}`}>
                      {couponMsg.text}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Summary Lines */}
            <div className="space-y-3 text-xs mb-6">
              <div className="flex justify-between text-slate-300">
                <span>{currentPlan.title}</span>
                <span className="font-bold text-white">{formatRupiah(discountedMonthly * duration)}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Durasi Sewa</span>
                <span className="font-bold text-white">{duration} Bulan</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Metode Pembayaran</span>
                <span className="font-semibold text-blue-400">{selectedPayment.split(" ")[0]}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Diskon Kupon Promo ({couponCode.toUpperCase()})</span>
                  <span>-{formatRupiah(couponDeduction)}</span>
                </div>
              )}
              <div className="flex justify-between text-emerald-400 font-semibold">
                <span>Registrasi Domain (1 Tahun)</span>
                <span>{duration >= 12 ? "Rp0 (Gratis Promo)" : "Rp150.000"}</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-semibold">
                <span>Sertifikat SSL Premium</span>
                <span>Rp0 (Gratis)</span>
              </div>
              <div className="w-full h-px bg-white/10 my-3"></div>
              <div className="flex justify-between text-slate-400">
                <span>Pajak PPN (11%)</span>
                <span>{formatRupiah(tax)}</span>
              </div>
            </div>

            {/* Total */}
            <div className="flex items-baseline justify-between mb-4">
              <span className="text-sm font-bold text-white">Total Pembayaran:</span>
              <div className="text-right">
                {totalSavings > 0 && (
                  <span className="text-xs text-slate-500 line-through block">{formatRupiah(normalGrandTotal)}</span>
                )}
                <span className="text-2xl font-extrabold text-[#5794FF]">{formatRupiah(grandTotal)}</span>
              </div>
            </div>

            {totalSavings > 0 && (
              <div className="mb-5 p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold text-center">
                🎉 Anda hemat {formatRupiah(totalSavings)} hari ini!
              </div>
            )}

            {/* CTA Button */}
            <button
              onClick={handleCheckoutWA}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-extrabold text-sm shadow-xl shadow-blue-500/25 hover:opacity-95 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              Lanjutkan ke WhatsApp <i className="bi bi-arrow-right text-base"></i>
            </button>

            <span className="block mt-4 text-[11px] text-center text-slate-400">
              <i className="bi bi-shield-check text-emerald-400 me-1"></i> Garansi 30 Hari Uang Kembali &bull; Aman &amp; Terpercaya
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <div className="min-h-screen bg-[#080D1B] text-[#F8FAFC]">
      <Navbar />
      <Suspense fallback={<div className="py-40 text-center text-white">Memuat Keranjang...</div>}>
        <CartContent />
      </Suspense>
      <Footer />
    </div>
  );
}
