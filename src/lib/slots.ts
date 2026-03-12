import { Booking, BlockedSlot, TIME_SLOTS } from '@/data/mockData';

export type SlotStatus = 'free' | 'taken' | 'blocked';

export function getSlotStatus(
  date: string,
  time: string,
  bookings: Booking[],
  blocked: BlockedSlot[]
): SlotStatus {
  if (blocked.some(b => b.date === date && b.time === time)) return 'blocked';
  if (bookings.some(b => b.date === date && b.time === time && b.status !== 'cancelled')) return 'taken';
  return 'free';
}

export function getFreeCount(date: string, bookings: Booking[], blocked: BlockedSlot[]): number {
  return TIME_SLOTS.filter(t => getSlotStatus(date, t, bookings, blocked) === 'free').length;
}

export function dateStr(d: Date): string {
  return d.toISOString().split('T')[0];
}

export function getWeekDates(weekOffset: number): Date[] {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + weekOffset * 7 + i);
    return d;
  });
}
