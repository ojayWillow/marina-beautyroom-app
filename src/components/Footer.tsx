export default function Footer() {
  return (
    <>
      {/* Map section */}
      <section className="bg-sand">
        <div className="flex flex-col md:grid md:grid-cols-3">
          <div className="p-8 sm:p-12 flex flex-col gap-4">
            <p className="text-[10px] font-semibold tracking-widest uppercase text-rose">Atrašanās vieta</p>
            <h3 className="font-serif text-2xl sm:text-3xl text-brown">
              Ruses iela 6-1<br /><em className="text-rose">Rīga, LV-1029</em>
            </h3>
            <p className="text-taupe text-sm">Zemgales priekšpilsēta — ērti sasniedzama ar sabiedrisko transportu.</p>
            <a href="tel:+37129818158" className="text-rose font-medium text-sm">+371 29 818 158</a>
            <p className="text-taupe text-xs">Atvērts 24/7</p>
            <a
              href="https://maps.app.goo.gl/Nc1TU5ugGRhyBFVj7"
              target="_blank" rel="noopener"
              className="self-start mt-2 bg-rose hover:bg-rose-dk text-white text-sm px-5 py-2.5 rounded-full transition-colors"
            >
              Atvērt Google Maps
            </a>
          </div>
          <div className="md:col-span-2 min-h-[240px] sm:min-h-[320px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2176.5!2d24.0145!3d56.9213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46eecfe0a0a0a0a1%3A0x0!2sRuses+iela+6-1%2C+R%C4%ABga!5e0!3m2!1slv!2slv!4v1"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brown pt-12 pb-0">
        <div className="max-w-5xl mx-auto px-5 pb-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <p className="font-serif text-xl text-white mb-3">Marina <em className="text-rose-lt">BeautyRoom</em></p>
            <p className="text-white/35 text-sm leading-loose">
              Vaksācija Zolītūde / Imanta<br />
              Ruses iela 6-1, Rīga LV-1029<br />
              Atvērts 24 stundas katru dienu
            </p>
          </div>
          <div>
            <p className="text-white/25 text-[10px] font-semibold tracking-widest uppercase mb-4">Ātrās saites</p>
            <div className="flex flex-col gap-2">
              {[['#services','Pakalpojumi'],['#testimonials','Atsauksmes'],['#booking','Pierakstīties']].map(([h,l]) => (
                <a key={h} href={h} className="text-white/40 hover:text-rose-lt text-sm transition-colors">{l}</a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-white/25 text-[10px] font-semibold tracking-widest uppercase mb-4">Sazināties</p>
            <div className="flex flex-col gap-2">
              <a href="tel:+37129818158" className="text-white/40 hover:text-rose-lt text-sm transition-colors">+371 29 818 158</a>
              <a href="https://maps.app.goo.gl/Nc1TU5ugGRhyBFVj7" target="_blank" rel="noopener" className="text-white/40 hover:text-rose-lt text-sm transition-colors">Google Maps</a>
              <p className="text-rose-lt text-sm">★ 5.0 — 28 atsauksmes</p>
            </div>
          </div>
        </div>
        <div className="border-t border-white/8 py-5 text-center px-5">
          <p className="text-white/20 text-xs tracking-wide">&copy; 2026 Marina BeautyRoom — Ruses iela 6-1, Rīga</p>
        </div>
      </footer>

      {/* Mobile FAB — phone button, properly sized */}
      <a
        href="tel:+37129818158"
        className="md:hidden fixed bottom-5 right-4 w-14 h-14 bg-rose hover:bg-rose-dk text-white rounded-full flex items-center justify-center shadow-lg z-40 transition-all active:scale-95"
        aria-label="Zvanīt"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.36 1.18 2 2 0 012.34 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.16 6.16l1.28-.78a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
        </svg>
      </a>
    </>
  );
}
