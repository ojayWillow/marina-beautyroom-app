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

  function selectDay(d: Date) {
    setActiveDate(dateStr(d));
  }

  const activeDay = days.find(d => dateStr(d) === activeDate) ?? days[0];

  return (
    <div>
      {/* Week strip */}
      <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1">
        <button
          onClick={() => { if (weekOffset > 0) { setWeekOffset(w => w - 1); } }}
          disabled={weekOffset === 0}
          className="flex-shrink-0 w-8 h-8 rounded-full border border-blush-mid flex items-center justify-center text-taupe hover:border-rose hover:text-rose disabled:opacity-30 transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><polyline points="15 18 9 12 15 6"/></svg>
        </button>

        <div className="flex gap-2 flex-1 justify-center">
          {days.map(d => {
            const key = dateStr(d);
            const free = getFreeCount(key, bookings, blocked);
            const isActive = key === activeDate;
            return (
              <button
                key={key}
                onClick={() => selectDay(d)}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl min-w-[48px] border transition-all ${
                  isActive
                    ? 'bg-rose border-rose text-white'
                    : 'border-transparent hover:bg-blush hover:border-rose-lt'
                }`}
              >
                <span className={`text-[10px] font-semibold tracking-wider uppercase ${
                  isActive ? 'text-white' : 'text-taupe'
                }`}>{LV_DAYS[d.getDay()]}</span>
                <span className={`font-serif text-xl leading-none ${
                  isActive ? 'text-white' : 'text-brown'
                }`}>{d.getDate()}</span>
                <span className={`w-1.5 h-1.5 rounded-full ${
                  free === 0 ? 'bg-slot-red opacity-60' : isActive ? 'bg-white/60' : 'bg-slot-green opacity-80'
                }`} />
              </button>
            );
          })}
        </div>

        <button
          onClick={() => { if (weekOffset < 4) { setWeekOffset(w => w + 1); } }}
          disabled={weekOffset >= 4}
          className="flex-shrink-0 w-8 h-8 rounded-full border border-blush-mid flex items-center justify-center text-taupe hover:border-rose hover:text-rose disabled:opacity-30 transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>

      {/* Date label */}
      <p className="text-sm text-taupe mb-4">
        <span className="font-medium text-brown">{fmtDate(activeDay)}</span> &mdash; pieejamie laiki
      </p>

      {/* Slots */}
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mb-4">
        {TIME_SLOTS.map(t => {
          const status = getSlotStatus(activeDate, t, bookings, blocked);
          const isSel = selected?.date === activeDate && selected?.time === t;
          return (
            <button
              key={t}
              disabled={status !== 'free'}
              onClick={() => onSelect(activeDate, t)}
              className={`py-2.5 rounded-xl text-sm font-medium border transition-all ${
                isSel
                  ? 'bg-rose border-rose-dk text-white shadow-md -translate-y-0.5'
                  : status === 'free'
                  ? 'bg-slot-green-lt border-green-200 text-green-800 hover:bg-green-100 hover:-translate-y-0.5'
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
      <div className="flex items-center gap-5 text-xs text-taupe flex-wrap">
        {[
          { cls: 'bg-slot-green-lt border border-green-200', label: 'Brīvs' },
          { cls: 'bg-slot-red-lt border border-red-100', label: 'Aizņemts' },
          { cls: 'bg-gray-100 border border-gray-200', label: 'Bloķēts' },
          { cls: 'bg-rose border border-rose-dk', label: 'Jūsu izvēle' },
        ].map(({ cls, label }) => (
          <span key={label} className="flex items-center gap-1.5">
            <span className={`inline-block w-3 h-3 rounded ${cls}`} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
