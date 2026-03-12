'use client';
import { useState } from 'react';
import { SERVICES, LV_DAYS, LV_MONTHS, Booking } from '@/data/mockData';

interface Props {
  selected: { date: string; time: string };
  onSubmit: (data: Omit<Booking, 'id' | 'date' | 'time' | 'status'>) => void;
}

function fmtSelected(date: string, time: string) {
  const d = new Date(date);
  return `${d.getDate()}. ${LV_MONTHS[d.getMonth()]} (${LV_DAYS[d.getDay()]}), plkst. ${time}`;
}

export default function BookingForm({ selected, onSubmit }: Props) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', notes: '', consent: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name || form.name.length < 2) e.name = 'Ievadiet vārdu un uzvārdu.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Derīga e-pasta adrese.';
    if (!/^[+]?[\d\s\-()]{7,}$/.test(form.phone)) e.phone = 'Derīgs tālruņa numurs.';
    if (!form.service) e.service = 'Izvēlieties procedūru.';
    if (!form.consent) e.consent = 'Piekrītiet privatum politikai.';
    return e;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setTimeout(() => {
      onSubmit({ name: form.name, phone: form.phone, email: form.email, service: form.service, notes: form.notes });
      setLoading(false);
    }, 700);
  }

  const field = (id: keyof typeof form, label: string, el: React.ReactNode) => (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-semibold tracking-widest uppercase text-brown">{label}</label>
      {el}
      {errors[id] && <em className="text-[11px] text-red-500 not-italic">{errors[id]}</em>}
    </div>
  );

  return (
    <div className="mt-6 border-t border-blush-mid pt-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <p className="text-xs text-taupe uppercase tracking-widest mb-1">Izvēlēties laiks</p>
      <p className="font-serif text-rose text-lg mb-5">{fmtSelected(selected.date, selected.time)}</p>
      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {field('name', 'Vārds un uzvārds *',
            <input value={form.name} onChange={e => setForm(p=>({...p,name:e.target.value}))} placeholder="Anna Bērziņa"
              className={`px-4 py-3 rounded-xl border text-sm bg-blush text-brown outline-none focus:border-rose focus:bg-white transition-colors ${
                errors.name ? 'border-red-400' : 'border-blush-mid'
              }`} />
          )}
          {field('phone', 'Tālruņa numurs *',
            <input value={form.phone} onChange={e => setForm(p=>({...p,phone:e.target.value}))} placeholder="+371 2900 0000" type="tel"
              className={`px-4 py-3 rounded-xl border text-sm bg-blush text-brown outline-none focus:border-rose focus:bg-white transition-colors ${
                errors.phone ? 'border-red-400' : 'border-blush-mid'
              }`} />
          )}
          {field('email', 'E-pasta adrese *',
            <input value={form.email} onChange={e => setForm(p=>({...p,email:e.target.value}))} placeholder="anna@epasts.lv" type="email"
              className={`px-4 py-3 rounded-xl border text-sm bg-blush text-brown outline-none focus:border-rose focus:bg-white transition-colors ${
                errors.email ? 'border-red-400' : 'border-blush-mid'
              }`} />
          )}
          {field('service', 'Procedūra *',
            <select value={form.service} onChange={e => setForm(p=>({...p,service:e.target.value}))}
              className={`px-4 py-3 rounded-xl border text-sm bg-blush text-brown outline-none focus:border-rose focus:bg-white transition-colors appearance-none ${
                errors.service ? 'border-red-400' : 'border-blush-mid'
              }`}>
              <option value="">Izvēlieties&hellip;</option>
              {SERVICES.map(s => <option key={s}>{s}</option>)}
            </select>
          )}
        </div>
        <div className="mb-4">
          {field('notes', 'Piezīmes',
            <textarea value={form.notes} onChange={e => setForm(p=>({...p,notes:e.target.value}))} rows={2}
              placeholder="Alerģijas, īpaši lūgumi…"
              className="w-full px-4 py-3 rounded-xl border border-blush-mid text-sm bg-blush text-brown outline-none focus:border-rose focus:bg-white transition-colors resize-none" />
          )}
        </div>
        <label className="flex items-start gap-3 cursor-pointer mb-5">
          <input type="checkbox" checked={form.consent} onChange={e => setForm(p=>({...p,consent:e.target.checked}))}
            className="mt-0.5 w-4 h-4 accent-rose flex-shrink-0" />
          <span className="text-xs text-taupe leading-relaxed">
            Piekrītu <a href="#" className="text-rose underline">Privātuma politikai</a> *
          </span>
        </label>
        {errors.consent && <p className="text-[11px] text-red-500 -mt-4 mb-4">{errors.consent}</p>}
        <button type="submit" disabled={loading}
          className="w-full py-4 bg-rose hover:bg-rose-dk text-white font-medium rounded-full transition-all hover:-translate-y-0.5 disabled:opacity-60">
          {loading ? 'Sūta\u2026' : 'Nosutīt pierakstu'}
        </button>
      </form>
    </div>
  );
}
