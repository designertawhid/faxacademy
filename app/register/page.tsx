'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { toast } from 'sonner';

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('All fields are required');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
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
          Name: formData.name,
          Email: formData.email,
          Password: formData.password,
          RegisteredDate: new Date().toISOString(),
          Type: 'Registration'
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
        // Continue with registration even if API backup fails
      }
      
      // Save user info to localStorage
      localStorage.setItem('user', JSON.stringify({ 
        name: formData.name, 
        email: formData.email 
      }));
      
      // Also save to enrolled courses if empty
      if (!localStorage.getItem('enrolledCourses')) {
        localStorage.setItem('enrolledCourses', JSON.stringify([]));
      }
      
      toast.success('Account created successfully!');
      router.push('/login');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex h-screen w-full items-center justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Create an Account</CardTitle>
          <CardDescription>
            Join FAX Academy to start your Forex trading journey
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe" 
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email"
                type="email" 
                value={formData.email}
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
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input 
                id="confirmPassword" 
                name="confirmPassword"
                type="password" 
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              Already have an account?{' '}
              <Link href="/login" className="text-primary hover:underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}