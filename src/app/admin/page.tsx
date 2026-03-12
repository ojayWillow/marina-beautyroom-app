'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockBookings, blockedSlots, Booking, BlockedSlot } from '@/data/mockData';
import BookingsTable from '@/components/admin/BookingsTable';
import AdminCalendar from '@/components/admin/AdminCalendar';
import AdminSettings from '@/components/admin/AdminSettings';

const TABS = [
  { id: 'bookings', label: 'Pieraksti' },
  { id: 'calendar', label: 'Kalendārs' },
  { id: 'settings', label: 'Uzstādījumi' },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<'bookings' | 'calendar' | 'settings'>('bookings');
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [blocked, setBlocked] = useState<BlockedSlot[]>(blockedSlots);

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  function updateStatus(id: string, status: Booking['status']) {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  }

  function toggleBlock(date: string, time: string) {
    setBlocked(prev => {
      const exists = prev.some(b => b.date === date && b.time === time);
      return exists ? prev.filter(b => !(b.date === date && b.time === time)) : [...prev, { date, time }];
    });
  }

  const pending = bookings.filter(b => b.status === 'pending').length;
  const today = new Date().toISOString().split('T')[0];
  const confirmedToday = bookings.filter(b => b.status === 'confirmed' && b.date === today).length;

  return (
    <div>
      {/* Header */}
      <div className="bg-brown px-6 py-4 flex items-center justify-between">
        <div>
          <p className="font-serif text-white text-lg">Marina <em className="text-rose-lt">BeautyRoom</em></p>
          <p className="text-white/30 text-xs tracking-widest uppercase">Admin panelis</p>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" target="_blank" className="text-white/40 hover:text-rose-lt text-xs transition-colors">Skatīt vietni →</a>
          <button onClick={logout} className="text-xs text-white/40 hover:text-rose-lt transition-colors">Iziet</button>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-blush-mid px-6 py-4">
        <div className="max-w-5xl mx-auto flex flex-wrap gap-6">
          {[
            { label: 'Kopā pieraksti', value: bookings.length, color: 'text-brown' },
            { label: 'Gaida apstiprināšanu', value: pending, color: 'text-amber-600' },
            { label: 'Apstiprināti šodien', value: confirmedToday, color: 'text-green-700' },
          ].map(s => (
            <div key={s.label}>
              <p className="text-xs text-taupe tracking-wide">{s.label}</p>
              <p className={`font-serif text-3xl ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-blush-mid px-6">
        <div className="max-w-5xl mx-auto flex gap-0">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id as typeof tab)}
              className={`px-5 py-4 text-sm font-medium border-b-2 transition-colors ${
                tab === t.id
                  ? 'border-rose text-rose'
                  : 'border-transparent text-taupe hover:text-brown'
              }`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        {tab === 'bookings' && <BookingsTable bookings={bookings} onUpdateStatus={updateStatus} />}
        {tab === 'calendar' && <AdminCalendar bookings={bookings} blocked={blocked} onToggleBlock={toggleBlock} />}
        {tab === 'settings' && <AdminSettings />}
      </div>
    </div>
  );
}
