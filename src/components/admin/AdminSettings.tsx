export default function AdminSettings() {
  const info = [
    { label: 'Salona nosaukums', value: 'Marina BeautyRoom' },
    { label: 'Adrese', value: 'Ruses iela 6-1, Rīga LV-1029' },
    { label: 'Tālrunis', value: '+371 29 818 158' },
    { label: 'Darba laiks', value: 'Atvērts 24 stundas, 365 dienas gadā' },
    { label: 'Google vērtējums', value: '5.0 \u2605 (28 atsauksmes)' },
  ];

  return (
    <div>
      <h2 className="font-serif text-2xl text-brown mb-6">Salona informācija</h2>
      <div className="bg-white rounded-2xl shadow-sm p-6 max-w-lg">
        <div className="flex flex-col gap-5">
          {info.map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-1 pb-5 border-b border-blush-mid last:border-0 last:pb-0">
              <p className="text-[10px] font-semibold tracking-widest uppercase text-taupe">{label}</p>
              <p className="text-brown font-medium">{value}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 bg-blush rounded-xl px-5 py-4">
          <p className="text-xs text-taupe">🔒 <strong>Drīzumā:</strong> iespēja rediģēt salona informāciju, pievienot darbiniekus un integrēt Supabase datubāzi.</p>
        </div>
      </div>
    </div>
  );
}
