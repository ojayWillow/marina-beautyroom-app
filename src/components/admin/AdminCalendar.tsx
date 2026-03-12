'use client';
import { useState } from 'react';
import { Booking, BlockedSlot, TIME_SLOTS, LV_DAYS } from '@/data/mockData';
import { getSlotStatus, getFreeCount, getWeekDates, dateStr } from '@/lib/slots';

interface Props {
  bookings: Booking[];
  blocked: BlockedSlot[];
  onToggleBlock: (date: string, time: string) => void;
}

export default function AdminCalendar({ bookings, blocked, onToggleBlock }: Props) {
  const [weekOffset, setWeekOffset] = useState(0);
  const [activeDate, setActiveDate] = useState(dateStr(new Date()));

  const days = getWeekDates(weekOffset);

  return (
    <div>
      <h2 className="font-serif text-2xl text-brown mb-6">Kalendārs &amp; laiku bloķēšana</h2>
      <div className="bg-white rounded-2xl shadow-sm p-6">
        {/* Week strip */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto">
          <button onClick={() => { if (weekOffset > 0) setWeekOffset(w=>w-1); }} disabled={weekOffset===0}
            className="flex-shrink-0 w-8 h-8 rounded-full border border-blush-mid flex items-center justify-center text-taupe hover:border-rose hover:text-rose disabled:opacity-30">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <div className="flex gap-2 flex-1 justify-center">
            {days.map(d => {
              const key = dateStr(d);
              const isActive = key === activeDate;
              const free = getFreeCount(key, bookings, blocked);
              return (
                <button key={key} onClick={() => setActiveDate(key)}
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl min-w-[48px] border transition-all ${
                    isActive ? 'bg-rose border-rose text-white' : 'border-transparent hover:bg-blush'
                  }`}>
                  <span className={`text-[10px] font-semibold tracking-wider uppercase ${isActive?'text-white':'text-taupe'}`}>{LV_DAYS[d.getDay()]}</span>
                  <span className={`font-serif text-xl leading-none ${isActive?'text-white':'text-brown'}`}>{d.getDate()}</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${free===0?'bg-slot-red opacity-60':isActive?'bg-white/60':'bg-slot-green opacity-80'}`}/>
                </button>
              );
            })}
          </div>
          <button onClick={() => { if (weekOffset < 4) setWeekOffset(w=>w+1); }} disabled={weekOffset>=4}
            className="flex-shrink-0 w-8 h-8 rounded-full border border-blush-mid flex items-center justify-center text-taupe hover:border-rose hover:text-rose disabled:opacity-30">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>

        {/* Slots */}
        <p className="text-xs text-taupe mb-4">Noklikšķiniet uz brīva laika, lai to bloķētu / atbloķētu.</p>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mb-5">
          {TIME_SLOTS.map(t => {
            const status = getSlotStatus(activeDate, t, bookings, blocked);
            return (
              <button key={t}
                onClick={() => (status === 'free' || status === 'blocked') && onToggleBlock(activeDate, t)}
                className={`py-2.5 rounded-xl text-sm font-medium border transition-all ${
                  status === 'free'
                    ? 'bg-slot-green-lt border-green-200 text-green-800 hover:bg-green-100 cursor-pointer'
                    : status === 'blocked'
                    ? 'bg-gray-100 border-gray-300 text-gray-500 hover:bg-gray-200 cursor-pointer'
                    : 'bg-slot-red-lt border-red-100 text-red-400 cursor-not-allowed opacity-70'
                }`}>
                {t}
                {status === 'blocked' && <span className="block text-[9px] mt-0.5">Bloķēts</span>}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-5 text-xs text-taupe">
          {[
            { cls: 'bg-slot-green-lt border border-green-200', label: 'Brīvs (klikšķis = bloķēt)' },
            { cls: 'bg-slot-red-lt border border-red-100', label: 'Klienta rezervācija' },
            { cls: 'bg-gray-100 border border-gray-300', label: 'Bloķēts (klikšķis = atbloķēt)' },
          ].map(({ cls, label }) => (
            <span key={label} className="flex items-center gap-1.5">
              <span className={`inline-block w-3 h-3 rounded ${cls}`} />{label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
