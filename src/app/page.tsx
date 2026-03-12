import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import BookingSection from '@/components/BookingSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      {/* Strip */}
      <div className="bg-white border-b border-blush-mid py-5">
        <div className="max-w-5xl mx-auto px-6 flex flex-wrap justify-center gap-x-5 gap-y-2">
          {['Sertificēti speciālisti','Ruses iela 6-1, Rīga','Atvērts 24 stundas diennaktī','5.0 \u2605 Google','Sieviešu vadīts bizness'].map((item, i, arr) => (
            <span key={item} className="flex items-center gap-5">
              <span className="text-xs font-medium text-taupe tracking-wide">{item}</span>
              {i < arr.length - 1 && <span className="text-rose-lt text-xs">&bull;</span>}
            </span>
          ))}
        </div>
      </div>
      <Services />
      <Testimonials />
      <BookingSection />
      <Footer />
    </main>
  );
}
