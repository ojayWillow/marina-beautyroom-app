'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ user: '', pass: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: form.user, pass: form.pass }),
    });
    setLoading(false);
    if (res.ok) {
      router.push('/admin');
    } else {
      setError('Nepareizs lietotājvārds vai parole.');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(150deg,#3d1c22 0%,#6b2d38 60%,#c4727e 100%)' }}>
      <div className="bg-white rounded-3xl p-10 w-full max-w-sm shadow-2xl">
        <p className="font-serif text-2xl text-brown text-center mb-1">Marina <em className="text-rose">BeautyRoom</em></p>
        <p className="text-xs text-taupe text-center tracking-widest uppercase mb-8">Admin panelis</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold tracking-widest uppercase text-brown">Lietotājvārds</label>
            <input value={form.user} onChange={e => setForm(p=>({...p,user:e.target.value}))}
              placeholder="admin" autoComplete="username"
              className="px-4 py-3 rounded-xl border border-blush-mid bg-blush text-brown text-sm outline-none focus:border-rose focus:bg-white transition-colors" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold tracking-widest uppercase text-brown">Parole</label>
            <input value={form.pass} onChange={e => setForm(p=>({...p,pass:e.target.value}))}
              type="password" placeholder="••••••••" autoComplete="current-password"
              className="px-4 py-3 rounded-xl border border-blush-mid bg-blush text-brown text-sm outline-none focus:border-rose focus:bg-white transition-colors" />
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
          <button type="submit" disabled={loading}
            className="mt-2 py-3.5 bg-rose hover:bg-rose-dk text-white font-medium rounded-full transition-colors disabled:opacity-60">
            {loading ? 'Piedējumā…' : 'Ienākt'}
          </button>
        </form>
        <p className="text-xs text-taupe text-center mt-6">
          <a href="/" className="hover:text-rose transition-colors">← Atpakaļ uz vietni</a>
        </p>
      </div>
    </div>
  );
}
