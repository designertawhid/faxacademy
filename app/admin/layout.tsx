'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { checkAdminAuth, logoutAdmin } from './auth';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkAuth = () => {
      const isAuthenticated = checkAdminAuth();
      if (!isAuthenticated && pathname !== '/admin/login') {
        router.push('/admin/login');
      }
      setIsAdmin(isAuthenticated);
    };
    checkAuth();
  }, [router, pathname]);

  const handleLogout = () => {
    logoutAdmin();
    router.push('/admin/login');
  };

  // Don't render anything until after hydration
  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!isAdmin && pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-xl font-bold mb-4">Authentication Required</h1>
          <Button onClick={() => router.push('/admin/login')}>Go to Login</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>Logout</Button>
      </div>
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="dashboard" onClick={() => router.push('/admin/dashboard')}>
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="courses" onClick={() => router.push('/admin/courses')}>
            Courses
          </TabsTrigger>
          <TabsTrigger value="signals" onClick={() => router.push('/admin/signals')}>
            Signals
          </TabsTrigger>
          <TabsTrigger value="reviews" onClick={() => router.push('/admin/reviews')}>
            Reviews
          </TabsTrigger>
        </TabsList>
        {children}
      </Tabs>
    </div>
  );
}
