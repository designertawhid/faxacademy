'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { checkAdminAuth, logoutAdmin } from './auth';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkAuth = () => {
      const isAuthenticated = checkAdminAuth();
      if (!isAuthenticated && window.location.pathname !== '/admin/login') {
        router.push('/admin/login');
      }
      setIsAdmin(isAuthenticated);
    };
    checkAuth();
  }, [router]);

  const handleLogout = () => {
    logoutAdmin();
    router.push('/admin/login');
  };

  // Don't render anything until after hydration
  if (!mounted) {
    return null;
  }

  if (!isAdmin && window.location.pathname !== '/admin/login') {
    return null;
  }

  if (window.location.pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>Logout</Button>
      </div>
      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="mb-8">
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