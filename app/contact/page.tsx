'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Facebook, MessageSquare, Phone, Mail, MapPin, Clock, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.message) {
      toast.error('Email and message are required');
      return;
    }
    
    try {
      // Try to send data to the API for backup
      try {
        const apiUrl = "https://script.google.com/macros/s/AKfycbzNLFIShauk5QvAswRqZ8ivfkcbHW6Waz1uRkg7WbHxImYIglhInM9NZAZPcGaUI7wiKg/exec";
        const params = new URLSearchParams({
          path: 'Sheet1',
          action: 'write',
          Name: formData.name,
          Email: formData.email,
          Subject: formData.subject,
          Message: formData.message,
          ContactDate: new Date().toISOString(),
          Type: 'Contact'
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
      }
      
      // In a real application, you would send this data to your backend
      console.log('Form submitted:', formData);
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Failed to send message. Please try again later.');
    }
  };

  return (
    <div className="container px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Have questions about our courses or need support? Our team is here to help you.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 lg:gap-12">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
              <CardDescription>
                Connect with us through any of these channels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">WhatsApp Support</h3>
                  <p className="text-sm text-muted-foreground mb-2">Quick responses via WhatsApp</p>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href="https://wa.me/+918617217502" target="_blank" rel="noopener noreferrer">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Chat on WhatsApp
                    </a>
                  </Button>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Facebook className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Facebook Page</h3>
                  <p className="text-sm text-muted-foreground mb-2">Follow us for updates and support</p>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href="https://www.facebook.com/faxacademy" target="_blank" rel="noopener noreferrer">
                      <Facebook className="h-4 w-4 mr-2" />
                      Visit Facebook Page
                    </a>
                  </Button>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-sm text-muted-foreground">support@faxacademy.com</p>
                  <p className="text-sm text-muted-foreground">info@faxacademy.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Support Hours</h3>
                  <p className="text-sm text-muted-foreground">Monday - Friday: 9AM - 6PM</p>
                  <p className="text-sm text-muted-foreground">Saturday: 10AM - 2PM</p>
                  <p className="text-sm text-muted-foreground">Sunday: Closed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
              <CardDescription>
                For course payments and subscriptions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <DollarSign className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">UPI Payment</h3>
                  <p className="text-sm text-muted-foreground mb-2">Make payment to our UPI ID</p>
                  <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded border border-amber-200 dark:border-amber-800">
                    <p className="font-mono font-medium text-center">faxacademy@ybl</p>
                  </div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                <p>After making a payment, please contact us with your payment reference and email to activate your course access.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>FAQs</CardTitle>
              <CardDescription>
                Common questions about our services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">How do I enroll in a course?</h3>
                <p className="text-sm text-muted-foreground">
                  Visit our courses page, select a course, and click the "Enroll Now" button.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Do you offer refunds?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes, we offer a 30-day money-back guarantee for all paid courses.
                </p>
              </div>
              <div>
                <h3 className="font-medium">How do I access the trading signals?</h3>
                <p className="text-sm text-muted-foreground">
                  Join our premium signals group through the link on our signals page.
                </p>
              </div>
              <Link href="/faq" className="text-sm text-primary hover:underline inline-block mt-2">
                View all FAQs
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      placeholder="John Doe" 
                      value={formData.name}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      placeholder="john@example.com" 
                      value={formData.email}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input 
                    id="subject" 
                    name="subject" 
                    placeholder="Course Inquiry" 
                    value={formData.subject}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    placeholder="Your message here..." 
                    rows={6} 
                    value={formData.message}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <Button type="submit" className="w-full sm:w-auto">Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
