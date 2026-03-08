import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Package, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { NotificationPanel } from '@/components/NotificationPanel';

const navLinks = [
  { to: '/send', label: 'Send' },
  { to: '/carry', label: 'Carry' },
  { to: '/track', label: 'Track' },
  { to: '/booths', label: 'Booths' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/matching', label: 'Matching' },
  { to: '/admin', label: 'Admin' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Package className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold">Take2Earn</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(l => (
            <Link key={l.to} to={l.to}>
              <Button
                variant="ghost"
                size="sm"
                className={location.pathname === l.to ? 'bg-muted text-foreground' : ''}
              >
                {l.label}
              </Button>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <NotificationPanel />
          <ThemeToggle />
          <Button variant="outline" size="sm" className="hidden sm:inline-flex">Sign In</Button>
          {/* Mobile hamburger */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t bg-card px-4 py-3 space-y-1 animate-in slide-in-from-top-2 duration-200">
          {navLinks.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)}>
              <Button
                variant="ghost"
                className={`w-full justify-start ${location.pathname === l.to ? 'bg-muted text-foreground' : ''}`}
              >
                {l.label}
              </Button>
            </Link>
          ))}
          <Button variant="outline" className="w-full mt-2 sm:hidden">Sign In</Button>
        </div>
      )}
    </nav>
  );
}
