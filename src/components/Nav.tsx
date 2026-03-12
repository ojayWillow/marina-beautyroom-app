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

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-brown/50 z-40 backdrop-blur-sm"
          onClick={close}
        />
      )}

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur shadow-sm py-3' : 'py-4'
      }`}>
        <div className="max-w-5xl mx-auto px-5 flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className={`font-serif text-lg sm:text-xl transition-colors leading-tight ${
              scrolled ? 'text-brown' : 'text-white'
            }`}
          >
            Marina <em>BeautyRoom</em>
          </Link>

          {/* Hamburger — three proper lines */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] rounded-xl"
            onClick={() => setOpen(o => !o)}
            aria-label="Izvēlne"
            aria-expanded={open}
          >
            <span className={`block w-[22px] h-[2px] rounded-full transition-all duration-300 origin-center ${
              open
                ? 'translate-y-[7px] rotate-45 bg-brown'
                : scrolled ? 'bg-brown' : 'bg-white'
            }`} />
            <span className={`block w-[22px] h-[2px] rounded-full transition-all duration-300 ${
              open ? 'opacity-0 bg-brown' : scrolled ? 'bg-brown' : 'bg-white'
            }`} />
            <span className={`block w-[22px] h-[2px] rounded-full transition-all duration-300 origin-center ${
              open
                ? '-translate-y-[7px] -rotate-45 bg-brown'
                : scrolled ? 'bg-brown' : 'bg-white'
            }`} />
          </button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-7">
            {[['#services','Pakalpojumi'],['#testimonials','Atsauksmes'],['#booking','Rezervēt']].map(([h,l]) => (
              <li key={h}>
                <a href={h} className={`text-sm font-medium tracking-wide transition-colors hover:text-rose ${
                  scrolled ? 'text-taupe' : 'text-white/80'
                }`}>{l}</a>
              </li>
            ))}
            <li>
              <a href="tel:+37129818158"
                className="bg-rose hover:bg-rose-dk text-white text-xs font-medium px-5 py-2.5 rounded-full transition-colors whitespace-nowrap">
                +371 29 818 158
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`fixed top-0 right-0 h-full w-[min(80vw,300px)] bg-white z-50 shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${
        open ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-blush-mid flex-shrink-0">
          <span className="font-serif text-brown text-base">Marina <em className="text-rose">BeautyRoom</em></span>
          <button
            onClick={close}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-blush transition-colors text-brown text-xl leading-none"
            aria-label="Aizvērt"
          >
            &times;
          </button>
        </div>

        {/* Drawer links */}
        <ul className="flex flex-col flex-1">
          {[['#services','Pakalpojumi'],['#testimonials','Atsauksmes'],['#booking','Rezervēt']].map(([h,l]) => (
            <li key={h} className="border-b border-blush-mid">
              <a
                href={h}
                onClick={close}
                className="flex items-center px-5 py-4 text-brown text-base hover:text-rose hover:bg-blush transition-colors"
              >
                {l}
              </a>
            </li>
          ))}
          <li className="mt-4 px-5">
            <a
              href="tel:+37129818158"
              onClick={close}
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-rose hover:bg-rose-dk text-white font-medium rounded-full transition-colors text-sm"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.36 1.18 2 2 0 012.34 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.16 6.16l1.28-.78a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              +371 29 818 158
            </a>
          </li>
        </ul>

        {/* Drawer footer */}
        <div className="px-5 pb-8 pt-4 border-t border-blush-mid flex-shrink-0">
          <p className="text-xs text-taupe text-center">Ruses iela 6-1 &bull; Atvērts 24/7</p>
        </div>
      </div>
    </>
  );
}
