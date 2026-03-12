'use client';
import { useState } from 'react';
import { Booking, BlockedSlot, TIME_SLOTS, LV_DAYS, LV_MONTHS } from '@/data/mockData';
import { getSlotStatus, getFreeCount, getWeekDates, dateStr } from '@/lib/slots';

interface Props {
  bookings: Booking[];
  blocked: BlockedSlot[];
  selected: { date: string; time: string } | null;
  onSelect: (date: string, time: string) => void;
}

function fmtDate(d: Date) {
  return `${d.getDate()}. ${LV_MONTHS[d.getMonth()]} (${LV_DAYS[d.getDay()]})`;
}

export default function SlotPicker({ bookings, blocked, selected, onSelect }: Props) {
  const [weekOffset, setWeekOffset] = useState(0);
  const [activeDate, setActiveDate] = useState<string>(dateStr(new Date()));

  const days = getWeekDates(weekOffset);
  const activeDay = days.find(d => dateStr(d) === activeDate) ?? days[0];

  return (
    <div>
      {/* Week strip */}
      <div className="flex items-center gap-1.5 mb-5">
        <button
          onClick={() => { if (weekOffset > 0) setWeekOffset(w => w - 1); }}
          disabled={weekOffset === 0}
          className="flex-shrink-0 w-9 h-9 rounded-full border border-blush-mid flex items-center justify-center text-taupe hover:border-rose hover:text-rose disabled:opacity-30 transition-colors"
          aria-label="Iepriekšējā nedēļa"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><polyline points="15 18 9 12 15 6"/></svg>
        </button>

        {/* Scrollable day strip */}
        <div className="flex gap-1.5 flex-1 overflow-x-auto pb-1 scrollbar-hide snap-x">
          {days.map(d => {
            const key = dateStr(d);
            const free = getFreeCount(key, bookings, blocked);
            const isActive = key === activeDate;
            return (
              <button
                key={key}
                onClick={() => setActiveDate(key)}
                className={`flex flex-col items-center gap-1 px-2.5 sm:px-3 py-2 rounded-xl flex-shrink-0 w-[46px] sm:w-[52px] border transition-all snap-start ${
                  isActive
                    ? 'bg-rose border-rose'
                    : 'border-transparent hover:bg-blush hover:border-rose-lt'
                }`}
              >
                <span className={`text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase ${
                  isActive ? 'text-white' : 'text-taupe'
                }`}>{LV_DAYS[d.getDay()]}</span>
                <span className={`font-serif text-lg sm:text-xl leading-none ${
                  isActive ? 'text-white' : 'text-brown'
                }`}>{d.getDate()}</span>
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                  free === 0
                    ? 'bg-slot-red opacity-60'
                    : isActive
                    ? 'bg-white/70'
                    : 'bg-slot-green opacity-80'
                }`} />
              </button>
            );
          })}
        </div>

        <button
          onClick={() => { if (weekOffset < 4) setWeekOffset(w => w + 1); }}
          disabled={weekOffset >= 4}
          className="flex-shrink-0 w-9 h-9 rounded-full border border-blush-mid flex items-center justify-center text-taupe hover:border-rose hover:text-rose disabled:opacity-30 transition-colors"
          aria-label="Nākamā nedēļa"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>

      {/* Active date label */}
      <p className="text-xs text-taupe mb-3">
        <span className="font-medium text-brown">{fmtDate(activeDay)}</span>
        {' '}&mdash; pieejamie laiki
      </p>

      {/* Time slots — 4 cols on mobile, 6 on sm+ */}
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mb-4">
        {TIME_SLOTS.map(t => {
          const status = getSlotStatus(activeDate, t, bookings, blocked);
          const isSel = selected?.date === activeDate && selected?.time === t;
          return (
            <button
              key={t}
              disabled={status !== 'free'}
              onClick={() => onSelect(activeDate, t)}
              className={`py-2.5 rounded-xl text-xs sm:text-sm font-medium border transition-all leading-none ${
                isSel
                  ? 'bg-rose border-rose-dk text-white shadow-md -translate-y-0.5'
                  : status === 'free'
                  ? 'bg-slot-green-lt border-green-200 text-green-800 hover:bg-green-100 hover:-translate-y-0.5 active:scale-95'
                  : status === 'blocked'
                  ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-slot-red-lt border-red-100 text-red-400 cursor-not-allowed opacity-70'
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-[11px] text-taupe">
        {[
          { cls: 'bg-slot-green-lt border border-green-200', label: 'Brīvs' },
          { cls: 'bg-slot-red-lt border border-red-100', label: 'Aizņemts' },
          { cls: 'bg-gray-100 border border-gray-200', label: 'Bloķēts' },
          { cls: 'bg-rose border border-rose-dk', label: 'Jūsu izvēle' },
        ].map(({ cls, label }) => (
          <span key={label} className="flex items-center gap-1.5">
            <span className={`inline-block w-3 h-3 rounded flex-shrink-0 ${cls}`} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
