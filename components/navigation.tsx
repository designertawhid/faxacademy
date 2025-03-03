'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { BookOpen, Menu, TrendingUp, MessageSquare, LogOut, User } from 'lucide-react';

const navigation = [
  {
    name: 'Courses',
    href: '/courses',
    icon: BookOpen,
    description: 'Access our comprehensive Forex trading courses',
  },
  {
    name: 'Signals',
    href: '/signals',
    icon: TrendingUp,
    description: 'Premium trading signals and alerts',
  },
  {
    name: 'Contact',
    href: '/contact',
    icon: MessageSquare,
    description: 'Get in touch with our support team',
  },
];

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name?: string, email: string } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing user data:', error);
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, [pathname]); // Re-check when pathname changes to update UI after login/logout

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="flex items-end">
              <span className="text-2xl font-bold text-[#FF9900]">F</span>
              <span className="text-2xl font-bold text-[#FF9900]">A</span>
              <span className="text-2xl font-bold text-[#FF9900]">X</span>
              <span className="ml-2 text-sm font-medium text-[#00B8D4]">ACADEMY</span>
            </span>
          </Link>
          <nav className="hidden md:flex">
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className={cn(
                  'mx-2',
                  pathname === item.href && 'bg-accent'
                )}
                asChild
              >
                <Link href={item.href}>{item.name}</Link>
              </Button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {mounted && (
            <div className="hidden md:flex items-center gap-2">
              {isAuthenticated ? (
                <>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{user?.name || user?.email}</span>
                  </Button>
                  <Button variant="outline" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" asChild>
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/register">Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          )}
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 rounded-md hover:bg-accent',
                      pathname === item.href && 'bg-accent'
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <div className="flex flex-col">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-sm text-muted-foreground">{item.description}</span>
                    </div>
                  </Link>
                ))}
                <hr className="my-4" />
                <div className="space-y-4 px-4">
                  {mounted && isAuthenticated ? (
                    <>
                      <div className="flex items-center gap-2 px-4 py-2">
                        <User className="h-5 w-5" />
                        <span className="font-medium">{user?.name || user?.email}</span>
                      </div>
                      <Button className="w-full" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button className="w-full" variant="outline" asChild>
                        <Link href="/login">Login</Link>
                      </Button>
                      <Button className="w-full" asChild>
                        <Link href="/register">Get Started</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
