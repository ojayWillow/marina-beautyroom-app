export interface Booking {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  time: string;
  notes: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface BlockedSlot {
  date: string;
  time: string;
}

function ds(offset: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().split('T')[0];
}

export const mockBookings: Booking[] = [
  { id: '1', name: 'Laura Bērziņa', phone: '+371 29 111 222', email: 'laura@inbox.lv', service: 'Brazīlijas vaksācija', date: ds(0), time: '09:00', notes: '', status: 'confirmed' },
  { id: '2', name: 'Anastasija Kovalenko', phone: '+371 26 333 444', email: 'anastasija@gmail.com', service: 'Kāju vaksācija', date: ds(0), time: '11:00', notes: 'Alerģija pret parafīnu', status: 'pending' },
  { id: '3', name: 'Kristīne Ozoliņa', phone: '+371 28 555 666', email: 'kristine@inbox.lv', service: 'Uzacu vaksācija', date: ds(1), time: '10:00', notes: '', status: 'confirmed' },
  { id: '4', name: 'Marta Kalniņa', phone: '+371 27 777 888', email: 'marta@gmail.com', service: 'Paduses vaksācija', date: ds(1), time: '14:00', notes: '', status: 'pending' },
  { id: '5', name: 'Ieva Liepiņa', phone: '+371 29 999 000', email: 'ieva@inbox.lv', service: 'Brazīlijas vaksācija', date: ds(2), time: '09:00', notes: 'Grūtniecība 5. mēnesis', status: 'pending' },
  { id: '6', name: 'Svetlana Romanova', phone: '+371 26 111 333', email: 'svetlana@gmail.com', service: 'Pilnas ēnas vaksācija', date: ds(2), time: '12:00', notes: '', status: 'confirmed' },
  { id: '7', name: 'Anda Freimane', phone: '+371 28 222 444', email: 'anda@inbox.lv', service: 'Lūpu vaksācija', date: ds(3), time: '10:00', notes: '', status: 'pending' },
  { id: '8', name: 'Daina Zariņa', phone: '+371 27 333 555', email: 'daina@gmail.com', service: 'Kāju vaksācija', date: ds(3), time: '11:00', notes: '', status: 'confirmed' },
  { id: '9', name: 'Natālija Mihailova', phone: '+371 29 444 666', email: 'natalija@inbox.lv', service: 'Brazīlijas vaksācija', date: ds(4), time: '15:00', notes: '', status: 'pending' },
  { id: '10', name: 'Julija Petrova', phone: '+371 26 555 777', email: 'julija@gmail.com', service: 'Vīriešu vaksācija', date: ds(4), time: '16:00', notes: 'Vīrietis rezervē sievai', status: 'cancelled' },
  { id: '11', name: 'Elīna Bērziņa', phone: '+371 28 666 888', email: 'elina@inbox.lv', service: 'Uzacu vaksācija', date: ds(5), time: '09:00', notes: '', status: 'confirmed' },
  { id: '12', name: 'Sandra Kalniņa', phone: '+371 27 777 999', email: 'sandra@gmail.com', service: 'Paduses vaksācija', date: ds(6), time: '13:00', notes: '', status: 'pending' },
];

export const blockedSlots: BlockedSlot[] = [
  { date: ds(1), time: '13:00' },
  { date: ds(1), time: '14:00' },
  { date: ds(3), time: '08:00' },
  { date: ds(5), time: '11:00' },
];

export const TIME_SLOTS = [
  '08:00','09:00','10:00','11:00','12:00','13:00',
  '14:00','15:00','16:00','17:00','18:00','19:00','20:00',
];

export const SERVICES = [
  'Uzacu vaksācija — no €10',
  'Lūpu vaksācija — no €8',
  'Brazīlijas vaksācija — no €40',
  'Kāju vaksācija — no €25',
  'Paduses vaksācija — no €12',
  'Vīriešu vaksācija — no €20',
  'Vaksācija grūtniecēm — no €20',
  'Pilnas ēnas vaksācija — no €100',
];

export const LV_DAYS = ['Sv','Pr','Ot','Tr','Ce','Pk','Se'];
export const LV_MONTHS = ['janv.','febr.','marts','apr.','maijs','jūn.','jūl.','aug.','sept.','okt.','nov.','dec.'];
