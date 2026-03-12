'use client';
import { useState } from 'react';
import SlotPicker from './SlotPicker';
import BookingForm from './BookingForm';
import { Booking, BlockedSlot, mockBookings, blockedSlots } from '@/data/mockData';

export default function BookingSection() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [blocked] = useState<BlockedSlot[]>(blockedSlots);
  const [selected, setSelected] = useState<{ date: string; time: string } | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function handleSlotSelect(date: string, time: string) {
    setSelected({ date, time });
    setSubmitted(false);
  }

  function handleBook(data: Omit<Booking, 'id' | 'date' | 'time' | 'status'>) {
    if (!selected) return;
    const newBooking: Booking = {
      id: String(Date.now()),
      ...data,
      date: selected.date,
      time: selected.time,
      status: 'pending',
    };
    setBookings(prev => [...prev, newBooking]);
    setSubmitted(true);
    setSelected(null);
  }

  return (
    <section id="booking" className="py-16 sm:py-24 bg-warm relative overflow-hidden">
      <div className="absolute top-[-60px] right-[-60px] w-72 h-72 rounded-full opacity-40 pointer-events-none"
        style={{ background: '#fde8eb', filter: 'blur(60px)' }} />

      <div className="max-w-5xl mx-auto px-5">
        <div className="text-center mb-10 sm:mb-12">
          <p className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-rose mb-2">Brīvie laiki</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-brown">Pieejamie laiki</h2>
          <p className="text-taupe text-xs sm:text-sm mt-3">Zaļa krāsa — brīvs. Sarkana — aizņemts. Izvēlieties sev ērtu laiku.</p>
        </div>

        {/* Stack on mobile, side-by-side on lg */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm">
              <SlotPicker
                bookings={bookings}
                blocked={blocked}
                selected={selected}
                onSelect={handleSlotSelect}
              />
              {submitted && (
                <div className="mt-6 bg-blush rounded-2xl p-6 text-center">
                  <div className="text-rose text-3xl mb-2">✓</div>
                  <h3 className="font-serif text-xl sm:text-2xl text-brown mb-1">Paldies!</h3>
                  <p className="text-taupe text-xs sm:text-sm">Jūsu pieraksts ir saņemts. Sazināsimies 24 stundu laikā.</p>
                  <a href="tel:+37129818158"
                    className="inline-block mt-4 bg-rose text-white px-6 py-2.5 rounded-full text-sm hover:bg-rose-dk transition-colors">
                    Zvanīt uzreiz
                  </a>
                </div>
              )}
              {selected && !submitted && (
                <BookingForm selected={selected} onSubmit={handleBook} />
              )}
            </div>
          </div>

          {/* Contact card — stacks below on mobile */}
          <div className="lg:w-64 xl:w-72">
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm">
              <p className="font-serif text-lg text-brown mb-4">Sazināties tieši</p>
              <a href="tel:+37129818158"
                className="flex items-center gap-3 text-sm text-taupe py-3 border-b border-blush-mid hover:text-rose transition-colors">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.36 1.18 2 2 0 012.34 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.16 6.16l1.28-.78a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                +371 29 818 158
              </a>
              <a href="https://maps.app.goo.gl/Nc1TU5ugGRhyBFVj7" target="_blank" rel="noopener"
                className="flex items-center gap-3 text-sm text-taupe py-3 border-b border-blush-mid hover:text-rose transition-colors">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                Ruses iela 6-1, Rīga
              </a>
              <div className="flex items-center gap-3 text-sm text-rose font-medium pt-3">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/><path d="M12 6v6l3 2"/>
                </svg>
                Atvērts 24h katru dienu
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
