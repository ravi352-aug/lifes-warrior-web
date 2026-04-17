'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  Home,
  Stethoscope,
  Wallet,
  BookOpen,
  User,
  Bell,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/hooks/useAuth';

interface HeaderProps {
  userName?: string;
  userAvatar?: string;
  onNotificationClick?: () => void;
  notificationCount?: number;
}

export function Header({
  userName = 'User',
  userAvatar,
  onNotificationClick,
  notificationCount = 0,
}: HeaderProps) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    router.push('/login');
  };

  const displayName = user?.name || userName;

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold text-blue-600">HealthCare+</div>
          <p className="text-sm text-gray-600">Your trusted health companion</p>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onNotificationClick}
            className="relative"
          >
            <Bell className="h-5 w-5 text-gray-700" />
            {notificationCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {notificationCount}
              </span>
            )}
          </Button>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={userAvatar} alt={displayName} />
                <AvatarFallback>{displayName.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <ChevronDown className="h-4 w-4 text-gray-600" />
            </button>

            {/* User Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg z-50">
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="font-semibold text-gray-900">{displayName}</p>
                  <p className="text-xs text-gray-600">{user?.email}</p>
                </div>
                <Link href="/profile">
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-gray-700">
                    <User className="h-4 w-4" />
                    My Profile
                  </button>
                </Link>
                <Link href="/wallet">
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-gray-700">
                    <Wallet className="h-4 w-4" />
                    My Wallet
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-red-50 flex items-center gap-2 text-red-600 border-t border-gray-200 rounded-b-lg"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export function BottomNavigation() {
  const pathname = usePathname();

  const navigationItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/services', icon: Stethoscope, label: 'Services' },
    { href: '/wallet', icon: Wallet, label: 'Wallet' },
    { href: '/health/articles', icon: BookOpen, label: 'Articles' },
    { href: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-gray-200 bg-white md:hidden">
      <div className="flex items-center justify-around">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className="flex-1">
              <div
                className={`flex flex-col items-center justify-center py-3 text-xs font-medium transition-colors ${
                  isActive
                    ? 'border-t-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="mb-1 h-5 w-5" />
                <span>{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

interface MainLayoutProps {
  children: React.ReactNode;
  headerProps?: HeaderProps;
}

export function MainLayout({ children, headerProps = {} }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header {...headerProps} />
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <BottomNavigation />
    </div>
  );
}
