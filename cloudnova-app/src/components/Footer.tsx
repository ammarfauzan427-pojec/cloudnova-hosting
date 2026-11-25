import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#060A14] border-t border-white/10 pt-16 pb-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 text-white font-extrabold text-2xl tracking-tight mb-4">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#3478F6] to-[#8057FF] flex items-center justify-center text-white">
                <i className="bi bi-cloud-fill text-lg"></i>
              </span>
              CloudNova<span className="text-[#5794FF]">.</span>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm mb-5">
              Solusi web hosting berperforma tinggi untuk membantu website Anda berjalan optimal, cepat, dan aman sepanjang waktu.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/628996217895"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-[#3478F6] transition-colors"
                aria-label="WhatsApp"
              >
                <i className="bi bi-whatsapp"></i>
              </a>
              <a
                href="mailto:support@cloudnova.id"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-[#3478F6] transition-colors"
                aria-label="Email"
              >
                <i className="bi bi-envelope"></i>
              </a>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Navigasi Halaman</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/#home" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/#features" className="hover:text-white transition-colors">Fitur Layanan</Link></li>
              <li><Link href="/#pricing" className="hover:text-white transition-colors">Paket &amp; Harga</Link></li>
              <li><Link href="/#testimonials" className="hover:text-white transition-colors">Testimoni Klien</Link></li>
              <li><Link href="/status" className="text-emerald-400 hover:text-emerald-300 transition-colors">Uptime &amp; Status Server</Link></li>
              <li><Link href="/#faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Ketentuan &amp; Privasi</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/tos" className="hover:text-white transition-colors">Syarat &amp; Ketentuan (ToS)</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Kebijakan Privasi</Link></li>
              <li><Link href="/cart?plan=business" className="hover:text-white transition-colors">Formulir Checkout</Link></li>
              <li><span className="text-slate-500">SLA 99.9% Uptime Guarantee</span></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Pusat Bantuan</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center gap-2">
                <i className="bi bi-whatsapp text-[#5794FF]"></i>
                <a href="https://wa.me/628996217895" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  +62 899-6217-895 (CS Aktif)
                </a>
              </li>
              <li className="flex items-center gap-2">
                <i className="bi bi-envelope text-[#5794FF]"></i>
                <a href="mailto:support@cloudnova.id" className="hover:text-white transition-colors">
                  support@cloudnova.id
                </a>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <i className="bi bi-clock text-[#5794FF]"></i>
                <span>Senin - Sabtu, 09:00 - 21:00 WIB</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; 2026 CloudNova Hosting. All rights reserved.</p>
          <p>Dibuat untuk tugas Capstone &amp; Rintisan Web Hosting Indonesia.</p>
        </div>
      </div>
    </footer>
  );
}
