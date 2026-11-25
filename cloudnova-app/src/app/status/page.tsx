import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function StatusPage() {
  return (
    <div className="min-h-screen bg-[#080D1B] text-[#F8FAFC]">
      <Navbar />

      <main className="pt-36 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Overall Status Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#131F36] to-[#101A2E] border border-emerald-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-3xl shrink-0">
              <i className="bi bi-check-circle-fill"></i>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-white">Semua Sistem Beroperasi Normal</h1>
              <p className="text-xs text-slate-400 mt-1">
                Pemantauan real-time infrastruktur jaringan CloudNova Hosting (Next.js Node)
              </p>
            </div>
          </div>
          <div className="text-left md:text-right">
            <span className="text-3xl font-extrabold text-emerald-400 block">99.98%</span>
            <span className="text-xs text-slate-400">Rata-rata Uptime 90 Hari</span>
          </div>
        </div>

        {/* Datacenter Nodes Grid */}
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <i className="bi bi-hdd-rack-fill text-blue-400"></i> Status Node Datacenter
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Node Jakarta */}
          <div className="p-6 rounded-2xl bg-[#131F36] border border-white/10 hover:border-blue-500/30 transition-all">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <span className="font-bold text-sm text-white">🇮🇩 Node ID-01 (Cyber 2 Jakarta)</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">Normal</span>
            </div>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Latensi IIX:</span>
                <strong className="text-emerald-400">4 ms</strong>
              </div>
              <div className="flex justify-between">
                <span>Beban CPU:</span>
                <strong className="text-white">16%</strong>
              </div>
              <div className="flex justify-between">
                <span>RAM Usage:</span>
                <strong className="text-white">32% Optimal</strong>
              </div>
            </div>
            <div className="flex gap-1 mt-5 h-4">
              {Array.from({ length: 18 }).map((_, i) => (
                <div key={i} className="flex-1 bg-emerald-400/80 rounded-xs hover:opacity-100 transition-opacity" title="100% Uptime"></div>
              ))}
            </div>
          </div>

          {/* Node Singapore */}
          <div className="p-6 rounded-2xl bg-[#131F36] border border-white/10 hover:border-blue-500/30 transition-all">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <span className="font-bold text-sm text-white">🇸🇬 Node SG-01 (Equinix SG)</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">Normal</span>
            </div>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Latensi Regional:</span>
                <strong className="text-emerald-400">18 ms</strong>
              </div>
              <div className="flex justify-between">
                <span>Beban CPU:</span>
                <strong className="text-white">21%</strong>
              </div>
              <div className="flex justify-between">
                <span>RAM Usage:</span>
                <strong className="text-white">40% Optimal</strong>
              </div>
            </div>
            <div className="flex gap-1 mt-5 h-4">
              {Array.from({ length: 18 }).map((_, i) => (
                <div key={i} className="flex-1 bg-emerald-400/80 rounded-xs hover:opacity-100 transition-opacity" title="100% Uptime"></div>
              ))}
            </div>
          </div>

          {/* Node Backup */}
          <div className="p-6 rounded-2xl bg-[#131F36] border border-white/10 hover:border-blue-500/30 transition-all">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <span className="font-bold text-sm text-white">🛡️ Cloud Storage Backup</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">Synced</span>
            </div>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Snapshot Integrity:</span>
                <strong className="text-emerald-400">100% Passed</strong>
              </div>
              <div className="flex justify-between">
                <span>Pola Backup:</span>
                <strong className="text-white">Otomatis Harian</strong>
              </div>
              <div className="flex justify-between">
                <span>Redundansi:</span>
                <strong className="text-white">3x Replikasi</strong>
              </div>
            </div>
            <div className="flex gap-1 mt-5 h-4">
              {Array.from({ length: 18 }).map((_, i) => (
                <div key={i} className="flex-1 bg-emerald-400/80 rounded-xs hover:opacity-100 transition-opacity" title="100% Uptime"></div>
              ))}
            </div>
          </div>
        </div>

        {/* System Services Component List */}
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <i className="bi bi-cpu-fill text-purple-400"></i> Komponen Layanan Hosting
        </h2>

        <div className="rounded-2xl bg-[#131F36] border border-white/10 divide-y divide-white/5 overflow-hidden">
          {[
            { title: "LiteSpeed Web Server Cluster", desc: "Penanganan request HTTP/HTTPS dan cache akselerasi website", status: "Operational" },
            { title: "MySQL / MariaDB Database Engine", desc: "Cluster database untuk WordPress, CMS, dan aplikasi web", status: "Operational" },
            { title: "cPanel &amp; Cloud Control Panel", desc: "Dasbor antarmuka kelola domain, file, dan DNS", status: "Operational" },
            { title: "Mail Server (SMTP / IMAP / Webmail)", desc: "Layanan pengiriman & penerimaan email bisnis", status: "Operational" },
            { title: "AutoSSL Certificate Provider", desc: "Penerbitan otomatis sertifikat TLS/HTTPS", status: "Operational" },
          ].map((item, idx) => (
            <div key={idx} className="p-5 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-white">{item.title}</h4>
                <p className="text-xs text-slate-400">{item.desc}</p>
              </div>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span> {item.status}
              </span>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
