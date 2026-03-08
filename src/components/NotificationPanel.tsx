import { useState, useEffect } from 'react';
import { Bell, Package, Truck, CheckCircle, AlertTriangle, CreditCard, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  getNotifications, getUnreadCount, markAsRead, markAllAsRead, subscribe,
  type Notification, type NotificationType,
} from '@/lib/notifications';

const typeIcons: Record<NotificationType, typeof Bell> = {
  status_update: Truck,
  carrier_assigned: Package,
  delivery_confirmed: CheckCircle,
  pickup_ready: MapPin,
  dispute: AlertTriangle,
  payment: CreditCard,
};

const typeColors: Record<NotificationType, string> = {
  status_update: 'text-primary',
  carrier_assigned: 'text-secondary',
  delivery_confirmed: 'text-success',
  pickup_ready: 'text-primary',
  dispute: 'text-destructive',
  payment: 'text-success',
};

function timeAgo(ts: string) {
  const diff = Date.now() - new Date(ts).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export function NotificationPanel() {
  const [notifications, setNotifications] = useState(getNotifications());
  const [unread, setUnread] = useState(getUnreadCount());

  useEffect(() => {
    return subscribe((ns) => {
      setNotifications(ns);
      setUnread(ns.filter(n => !n.read).length);
    });
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unread > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-destructive text-destructive-foreground">
              {unread}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Notifications</h3>
          {unread > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs text-primary">
              Mark all read
            </Button>
          )}
        </div>
        <ScrollArea className="h-[400px]">
          {notifications.length === 0 ? (
            <p className="p-4 text-center text-muted-foreground text-sm">No notifications</p>
          ) : (
            notifications.map(n => {
              const Icon = typeIcons[n.type];
              return (
                <div
                  key={n.id}
                  className={`flex gap-3 p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${!n.read ? 'bg-primary/5' : ''}`}
                  onClick={() => markAsRead(n.id)}
                >
                  <Icon className={`h-5 w-5 mt-0.5 shrink-0 ${typeColors[n.type]}`} />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${!n.read ? 'font-semibold' : 'font-medium'}`}>{n.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{n.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{timeAgo(n.timestamp)}</p>
                  </div>
                  {!n.read && <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />}
                </div>
              );
            })
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
