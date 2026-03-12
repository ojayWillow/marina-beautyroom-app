import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_PASSWORD, ADMIN_USER } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const { user, pass } = await req.json();
  if (user === ADMIN_USER && pass === ADMIN_PASSWORD) {
    const res = NextResponse.json({ ok: true });
    res.cookies.set('admin_session', '1', {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24,
      sameSite: 'lax',
    });
    return res;
  }
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
