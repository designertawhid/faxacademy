'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Link as LinkIcon, Save, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminDashboardPage() {
  const [tradingHistoryUrl, setTradingHistoryUrl] = useState(
    'https://faxacademy.notion.site/ebd/809ae02c41df44e387e9d55ad91b2bd2?v=73d1e8fc2fd94010b5f540bb472a8845'
  );
  const [portfolioEmbedUrl, setPortfolioEmbedUrl] = useState(
    'https://faxacademy.notion.site/ebd/809ae02c41df44e387e9d55ad91b2bd2?v=73d1e8fc2fd94010b5f540bb472a8845'
  );
  const [isEditing, setIsEditing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load saved URLs from localStorage
    const savedTradingHistoryUrl = localStorage.getItem('tradingHistoryUrl');
    const savedPortfolioEmbedUrl = localStorage.getItem('portfolioEmbedUrl');
    
    if (savedTradingHistoryUrl) {
      setTradingHistoryUrl(savedTradingHistoryUrl);
    }
    
    if (savedPortfolioEmbedUrl) {
      setPortfolioEmbedUrl(savedPortfolioEmbedUrl);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save these URLs to localStorage
    localStorage.setItem('tradingHistoryUrl', tradingHistoryUrl);
    localStorage.setItem('portfolioEmbedUrl', portfolioEmbedUrl);
    
    setIsEditing(false);
    toast.success('Settings saved successfully!');
  };

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Dashboard Settings</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Embed URLs</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tradingHistoryUrl">Trading History URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="tradingHistoryUrl"
                    value={tradingHistoryUrl}
                    onChange={(e) => setTradingHistoryUrl(e.target.value)}
                    placeholder="https://example.com/trading-history"
                    disabled={!isEditing}
                    className="flex-1"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon"
                    onClick={() => window.open(tradingHistoryUrl, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  This URL will be used on the Signals page to display your trading history.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="portfolioEmbedUrl">Trading Portfolio URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="portfolioEmbedUrl"
                    value={portfolioEmbedUrl}
                    onChange={(e) => setPortfolioEmbedUrl(e.target.value)}
                    placeholder="https://example.com/portfolio"
                    disabled={!isEditing}
                    className="flex-1"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon"
                    onClick={() => window.open(portfolioEmbedUrl, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  This URL will be used on the homepage to display your trading portfolio.
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button type="submit">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button 
                  type="button" 
                  onClick={() => setIsEditing(true)}
                >
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Edit URLs
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Trading History Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full aspect-[3/2] rounded-lg overflow-hidden border">
              <iframe
                src={tradingHistoryUrl}
                className="w-full h-full border-0"
                title="FAX Academy Trading History"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trading Portfolio Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full aspect-[3/2] rounded-lg overflow-hidden border">
              <iframe
                src={portfolioEmbedUrl}
                className="w-full h-full border-0"
                title="FAX Academy Trading Portfolio"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
