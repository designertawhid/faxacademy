'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, AlertCircle, CheckCircle2, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function SignalsPage() {
  const [tradingHistoryUrl, setTradingHistoryUrl] = useState(
    'https://faxacademy.notion.site/ebd/809ae02c41df44e387e9d55ad91b2bd2?v=73d1e8fc2fd94010b5f540bb472a8845'
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get the trading history URL from localStorage if available
    const storedUrl = localStorage.getItem('tradingHistoryUrl');
    if (storedUrl) {
      setTradingHistoryUrl(storedUrl);
    }
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="w-full py-12 bg-background">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Trading History</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Track our live trading performance and success stories.
            </p>
          </div>
          <div className="w-full aspect-[3/2] rounded-lg overflow-hidden shadow-xl bg-background">
            <iframe
              src={tradingHistoryUrl}
              className="w-full h-full border-0"
              title="FAX Academy Trading History"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-16 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-3 rounded-full bg-primary/10">
              <TrendingUp className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">Trading Signals</h1>
            <p className="text-muted-foreground max-w-2xl">
              Get access to our premium trading signals with high accuracy. Our team of expert traders analyzes the market to provide you with the best trading opportunities.
            </p>
            <Button size="lg" className="mt-6" asChild>
              <a href="https://wa.me/+918617217502" target="_blank" rel="noopener noreferrer">
                Join Premium Signals Group
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full py-12 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  High Accuracy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our signals have a proven track record with over 85% accuracy, helping traders make informed decisions.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                  Risk Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Each signal comes with detailed entry, stop-loss, and take-profit levels to help you manage risk effectively.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  Expert Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our team of professional traders analyzes the market 24/7 to provide you with the best trading opportunities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}