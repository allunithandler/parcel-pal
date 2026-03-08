export type NotificationType = 'status_update' | 'carrier_assigned' | 'delivery_confirmed' | 'pickup_ready' | 'dispute' | 'payment';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  parcel_id?: string;
  tracking_code?: string;
}

const listeners: Set<(notifications: Notification[]) => void> = new Set();
let notifications: Notification[] = [
  {
    id: 'n1', type: 'status_update', title: 'Parcel In Transit',
    message: 'Your parcel T2E987654 has been picked up by Rajesh Kumar and is now in transit.',
    timestamp: new Date(Date.now() - 3600000).toISOString(), read: false,
    parcel_id: 'parcel1', tracking_code: 'T2E987654',
  },
  {
    id: 'n2', type: 'carrier_assigned', title: 'Carrier Assigned',
    message: 'Rajesh Kumar (★4.8) has been assigned to carry your parcel T2E987654.',
    timestamp: new Date(Date.now() - 7200000).toISOString(), read: false,
    parcel_id: 'parcel1', tracking_code: 'T2E987654',
  },
  {
    id: 'n3', type: 'delivery_confirmed', title: 'Delivery Confirmed',
    message: 'Parcel T2E765432 has been delivered to Arjun Reddy at Connaught Place Hub.',
    timestamp: new Date(Date.now() - 86400000).toISOString(), read: true,
    parcel_id: 'parcel3', tracking_code: 'T2E765432',
  },
  {
    id: 'n4', type: 'pickup_ready', title: 'Ready for Pickup',
    message: 'Parcel T2E876543 is ready at Bandra West Booth for carrier pickup.',
    timestamp: new Date(Date.now() - 43200000).toISOString(), read: false,
    parcel_id: 'parcel2', tracking_code: 'T2E876543',
  },
  {
    id: 'n5', type: 'payment', title: 'Payment Received',
    message: 'You received ₹150 for delivering parcel T2E765432.',
    timestamp: new Date(Date.now() - 90000000).toISOString(), read: true,
    parcel_id: 'parcel3', tracking_code: 'T2E765432',
  },
];

function emit() {
  listeners.forEach(fn => fn([...notifications]));
}

export function getNotifications(): Notification[] {
  return [...notifications];
}

export function getUnreadCount(): number {
  return notifications.filter(n => !n.read).length;
}

export function markAsRead(id: string) {
  notifications = notifications.map(n => n.id === id ? { ...n, read: true } : n);
  emit();
}

export function markAllAsRead() {
  notifications = notifications.map(n => ({ ...n, read: true }));
  emit();
}

export function addNotification(n: Omit<Notification, 'id' | 'timestamp' | 'read'>) {
  const newN: Notification = {
    ...n,
    id: `n${Date.now()}`,
    timestamp: new Date().toISOString(),
    read: false,
  };
  notifications = [newN, ...notifications];
  emit();
}

export function subscribe(fn: (notifications: Notification[]) => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
