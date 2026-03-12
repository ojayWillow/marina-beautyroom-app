export default function Hero() {
  return (
    <section
      className="relative min-h-[100svh] flex flex-col items-center justify-center text-center overflow-hidden px-5 pt-24 pb-20"
      style={{ background: 'linear-gradient(150deg,#3d1c22 0%,#6b2d38 50%,#c4727e 100%)' }}
    >
      {/* Blobs */}
      <div className="absolute top-[-80px] right-[-80px] w-72 sm:w-96 h-72 sm:h-96 rounded-full opacity-25 pointer-events-none"
        style={{ background: '#e8a0aa', filter: 'blur(80px)' }} />
      <div className="absolute bottom-[-60px] left-[-60px] w-56 sm:w-72 h-56 sm:h-72 rounded-full opacity-20 pointer-events-none"
        style={{ background: '#f2a0aa', filter: 'blur(70px)' }} />

      <div className="relative z-10 max-w-xl w-full">
        <p className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-rose-lt mb-3 sm:mb-4">
          Profesionāla vaksācija &bull; Rīga
        </p>

        <h1 className="font-serif text-[2.6rem] sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-4 sm:mb-5">
          Maiga āda.<br />
          <em className="text-rose-lt">Katru reizi.</em>
        </h1>

        <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-sm sm:max-w-lg mx-auto mb-7 sm:mb-8 px-2">
          Vaksācijas salons Zolītūde un Imantā.
          Sieviešu vadīts, ar sirds siltumu un profesionālismu.
          Atvērts visu diennakti.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8 px-2">
          <a
            href="#booking"
            className="w-full sm:w-auto bg-rose hover:bg-rose-dk text-white font-medium px-8 py-4 rounded-full transition-all hover:-translate-y-0.5 text-sm sm:text-base text-center"
          >
            Rezervēt laiku
          </a>
          <a
            href="tel:+37129818158"
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/25 px-7 py-4 rounded-full transition-all text-sm text-center"
          >
            +371 29 818 158
          </a>
        </div>

        {/* Trust bar */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 px-4">
          {['★ 5.0 Google','28 atsauksmes','Atvērts 24/7','Ruses iela 6-1'].map((item, i, arr) => (
            <span key={item} className="flex items-center gap-3">
              <span className="text-[11px] text-white/50">{item}</span>
              {i < arr.length - 1 && <span className="w-1 h-1 rounded-full bg-white/20 hidden sm:inline-block" />}
            </span>
          ))}
        </div>
      </div>

      {/* Wave */}
      <div className="absolute bottom-0 left-0 right-0 leading-none">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full block">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#fdf6f0" />
        </svg>
      </div>
    </section>
  );
}
