import { Booking } from '@/data/mockData';

const STATUS_STYLES: Record<Booking['status'], string> = {
  pending: 'bg-amber-50 text-amber-700 border border-amber-200',
  confirmed: 'bg-green-50 text-green-700 border border-green-200',
  cancelled: 'bg-red-50 text-red-500 border border-red-200',
};
const STATUS_LABELS: Record<Booking['status'], string> = {
  pending: 'Gaida',
  confirmed: 'Apstiprināts',
  cancelled: 'Atcelts',
};

interface Props {
  bookings: Booking[];
  onUpdateStatus: (id: string, status: Booking['status']) => void;
}

export default function BookingsTable({ bookings, onUpdateStatus }: Props) {
  return (
    <div>
      <h2 className="font-serif text-2xl text-brown mb-6">Visi pieraksti</h2>
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-blush-mid">
                {['Vārds','Tālrunis','Procedūra','Datums','Laiks','Statuss','Darbības'].map(h => (
                  <th key={h} className="text-left px-5 py-4 text-[10px] font-semibold tracking-widest uppercase text-taupe">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, i) => (
                <tr key={b.id} className={`border-b border-blush-mid last:border-0 hover:bg-blush/30 transition-colors ${
                  i % 2 === 0 ? '' : 'bg-warm/50'
                }`}>
                  <td className="px-5 py-4">
                    <p className="font-medium text-brown">{b.name}</p>
                    <p className="text-xs text-taupe">{b.email}</p>
                  </td>
                  <td className="px-5 py-4 text-taupe">{b.phone}</td>
                  <td className="px-5 py-4 text-brown max-w-[160px]">{b.service.split(' —')[0]}</td>
                  <td className="px-5 py-4 text-taupe whitespace-nowrap">{b.date}</td>
                  <td className="px-5 py-4 text-taupe">{b.time}</td>
                  <td className="px-5 py-4">
                    <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${STATUS_STYLES[b.status]}`}>
                      {STATUS_LABELS[b.status]}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      {b.status !== 'confirmed' && (
                        <button onClick={() => onUpdateStatus(b.id, 'confirmed')}
                          className="text-xs bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 px-3 py-1.5 rounded-full transition-colors">
                          Apstiprināt
                        </button>
                      )}
                      {b.status !== 'cancelled' && (
                        <button onClick={() => onUpdateStatus(b.id, 'cancelled')}
                          className="text-xs bg-red-50 hover:bg-red-100 text-red-500 border border-red-200 px-3 py-1.5 rounded-full transition-colors">
                          Atcelt
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
