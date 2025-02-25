'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, AlertCircle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function SignalsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-16 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <TrendingUp className="h-16 w-16 text-primary mb-4" />
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Premium Trading Signals
            </h1>
            <p className="max-w-[700px] text-muted-foreground">
              Get access to our high-accuracy trading signals and join our exclusive trading community.
            </p>
            <Button size="lg" className="mt-6" asChild>
              <a href="https://t.me/faxacademy" target="_blank" rel="noopener noreferrer">
                <Users className="mr-2 h-5 w-5" />
                Join Our Trading Group
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-12 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                  <div>
                    <h3 className="text-2xl font-bold">85%+</h3>
                    <p className="text-muted-foreground">Win Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <AlertCircle className="h-8 w-8 text-blue-500" />
                  <div>
                    <h3 className="text-2xl font-bold">100+</h3>
                    <p className="text-muted-foreground">Monthly Signals</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="sm:col-span-2 lg:col-span-1">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <Users className="h-8 w-8 text-purple-500" />
                  <div>
                    <h3 className="text-2xl font-bold">5,000+</h3>
                    <p className="text-muted-foreground">Active Members</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trading History Section */}
      <section className="w-full py-12 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Our Trading History</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Track our complete trading history and performance metrics.
            </p>
          </div>
          <div className="w-full aspect-[3/2] rounded-lg overflow-hidden shadow-xl bg-background">
            <iframe
              src="https://faxacademy.notion.site/ebd/809ae02c41df44e387e9d55ad91b2bd2?v=73d1e8fc2fd94010b5f540bb472a8845"
              className="w-full h-full border-0"
              title="FAX Academy Trading History"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Real-Time Signals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Receive instant notifications for entry points, stop loss, and take profit levels.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  Verified Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All our trades are documented and verified with transparent tracking.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Community Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Join our active community of traders and get support when you need it.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <h2 className="text-3xl font-bold">Ready to Start Trading?</h2>
            <p className="text-muted-foreground max-w-[600px]">
              Join our premium signals group today and start receiving high-accuracy trading signals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button size="lg" asChild>
                <a href="https://t.me/faxacademy" target="_blank" rel="noopener noreferrer">
                  Join Premium Signals
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">
                  Contact Support
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}