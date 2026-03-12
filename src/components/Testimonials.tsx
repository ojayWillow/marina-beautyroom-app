const reviews = [
  { initial: 'L', name: 'Laura S.', text: 'Labākā vaksācijas pieredze Rīgā. Marina ir tik profesionāla un maiga — salons ir nevainojami tīrs. Es nekur citur vairs neiešu!' },
  { initial: 'A', name: 'Anastasija K.', text: 'Rezervēju vēla vakara laiku un biju sajūsmināta par kvalitāti. Nesāpīgi, ātri un absolūti profesionāli!' },
  { initial: 'K', name: 'Kristīne M.', text: 'Pastāvīga kliente vairāk nekā gadu. Rezultāti ilgst ilgāk nekā jebkur citur. Cenas, atmosfēra, kolektīvs — viss ir izcils.' },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-blush">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-widest uppercase text-rose mb-2">Atsauksmes</p>
          <h2 className="font-serif text-4xl md:text-5xl text-brown">Ko saka mūsu klienti</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map(r => (
            <div key={r.name} className="bg-white rounded-2xl p-7 flex flex-col gap-4 shadow-sm">
              <div className="text-rose tracking-widest">★★★★★</div>
              <p className="font-serif italic text-brown leading-relaxed flex-1">&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-petal text-rose-dk font-bold text-sm flex items-center justify-center flex-shrink-0">{r.initial}</div>
                <div>
                  <p className="text-sm font-medium text-brown">{r.name}</p>
                  <p className="text-xs text-taupe">Google atsauksme</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
