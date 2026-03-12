const services = [
  { name: 'Uzacu vaksācija', desc: 'Skaidra forma, tev pielāgota.', price: 'no \u20ac10' },
  { name: 'Lūpu vaksācija', desc: 'Ātra un precīza procedūra bez sāpēm.', price: 'no \u20ac8' },
  { name: 'Brazīlijas vaksācija', desc: 'Ilgstošs efekts. Maigi un profesionāli.', price: 'no \u20ac40', popular: true },
  { name: 'Kāju vaksācija', desc: 'Pus-kāja vai pilna kāja — jūsu izvēle.', price: 'no \u20ac25' },
  { name: 'Paduses vaksācija', desc: 'Ātra un efektīva procedūra.', price: 'no \u20ac12' },
  { name: 'Vīriešu vaksācija', desc: 'Mugura, krūtis, uzacis un citi apgabali.', price: 'no \u20ac20' },
  { name: 'Vaksācija grūtniecēm', desc: 'Maigi, droši un pielāgoti topošajām māmiņām.', price: 'no \u20ac20' },
  { name: 'Pilnas \u0113nas vaks\u0101cija', desc: 'Komplekss pakalpojums no galvas līdz kājām.', price: 'no \u20ac100' },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-warm">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-widest uppercase text-rose mb-2">Procedūras</p>
          <h2 className="font-serif text-4xl md:text-5xl text-brown">Ko mēs piedāvājam</h2>
          <p className="text-taupe text-sm mt-3 max-w-md mx-auto">Katra procedūra tiek veikta ar augstas kvalitātes vasku un rūpīgām, pieredzejšām rokām.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map(s => (
            <div key={s.name} className={`rounded-2xl p-6 flex flex-col gap-2 border transition-all hover:-translate-y-1 ${
              s.popular
                ? 'bg-gradient-to-b from-hero-dk to-hero-mid border-transparent text-white'
                : 'bg-white border-blush-mid hover:border-rose-lt hover:shadow-md'
            }`}>
              {s.popular && (
                <span className="self-start text-[10px] font-bold tracking-widest uppercase bg-rose-lt text-brown px-3 py-1 rounded-full mb-1">Populārākais</span>
              )}
              <h3 className={`font-serif text-lg ${s.popular ? 'text-white' : 'text-brown'}`}>{s.name}</h3>
              <p className={`text-sm flex-1 leading-relaxed ${s.popular ? 'text-white/70' : 'text-taupe'}`}>{s.desc}</p>
              <div className={`flex items-center justify-between mt-3 pt-3 border-t ${
                s.popular ? 'border-white/10' : 'border-blush-mid'
              }`}>
                <span className={`font-serif text-base ${s.popular ? 'text-rose-lt' : 'text-rose'}`}>{s.price}</span>
                <a href="#booking" className={`text-xs font-semibold tracking-wide transition-colors ${
                  s.popular ? 'text-rose-lt hover:text-white' : 'text-rose hover:text-rose-dk'
                }`}>Rezervēt &rarr;</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
