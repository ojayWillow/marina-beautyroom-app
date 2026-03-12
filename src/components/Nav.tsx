'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      {open && <div className="fixed inset-0 bg-brown/40 z-40" onClick={close} />}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-sm py-3' : 'py-5'
      }`}>
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className={`font-serif text-xl transition-colors ${
            scrolled ? 'text-brown' : 'text-white'
          }`}>
            Marina <em>BeautyRoom</em>
          </Link>
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setOpen(o => !o)}
            aria-label="Izvēlne"
          >
            {[0,1,2].map(i => (
              <span key={i} className={`block w-6 h-px transition-all ${
                scrolled ? 'bg-brown' : 'bg-white'
              }`} />
            ))}
          </button>
          <ul className="hidden md:flex items-center gap-7">
            {[['#services','Pakalpojumi'],['#testimonials','Atsauksmes'],['#booking','Rezervēt']].map(([h,l]) => (
              <li key={h}>
                <a href={h} className={`text-sm font-medium tracking-wide transition-colors hover:text-rose ${
                  scrolled ? 'text-taupe' : 'text-white/80'
                }`}>{l}</a>
              </li>
            ))}
            <li>
              <a href="tel:+37129818158" className="bg-rose hover:bg-rose-dk text-white text-xs font-medium px-5 py-2.5 rounded-full transition-colors">
                +371 29 818 158
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-xl transition-transform duration-300 ${
        open ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex items-center justify-between px-5 py-5 border-b border-blush-mid">
          <span className="font-serif text-brown">Marina <em className="text-rose">BeautyRoom</em></span>
          <button onClick={close} className="text-2xl text-brown leading-none">&times;</button>
        </div>
        <ul className="flex flex-col">
          {[['#services','Pakalpojumi'],['#testimonials','Atsauksmes'],['#booking','Rezervēt']].map(([h,l]) => (
            <li key={h} className="border-b border-blush-mid">
              <a href={h} onClick={close} className="block px-5 py-4 text-brown hover:text-rose transition-colors">{l}</a>
            </li>
          ))}
          <li>
            <a href="tel:+37129818158" onClick={close} className="block px-5 py-4 text-rose font-medium">+371 29 818 158</a>
          </li>
        </ul>
      </div>
    </>
  );
}
