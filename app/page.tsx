'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BookOpen, LineChart, MessageCircle, TrendingUp, Star, X, Facebook, MessageSquare } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";

const features = [
  {
    icon: BookOpen,
    title: 'Comprehensive Courses',
    description: 'Learn Forex trading from basics to advanced strategies',
    color: 'bg-blue-50 dark:bg-blue-950',
    iconColor: 'text-blue-600 dark:text-blue-400',
    borderColor: 'border-blue-200 dark:border-blue-800',
  },
  {
    icon: LineChart,
    title: 'Market Analysis',
    description: 'Real-time charts and expert market analysis',
    color: 'bg-green-50 dark:bg-green-950',
    iconColor: 'text-green-600 dark:text-green-400',
    borderColor: 'border-green-200 dark:border-green-800',
  },
  {
    icon: TrendingUp,
    title: 'Trading Signals',
    description: 'Premium signals with high accuracy',
    color: 'bg-purple-50 dark:bg-purple-950',
    iconColor: 'text-purple-600 dark:text-purple-400',
    borderColor: 'border-purple-200 dark:border-purple-800',
  },
  {
    icon: MessageCircle,
    title: 'Community Support',
    description: 'Join our active trading community',
    color: 'bg-amber-50 dark:bg-amber-950',
    iconColor: 'text-amber-600 dark:text-amber-400',
    borderColor: 'border-amber-200 dark:border-amber-800',
  },
];

const allReviews = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Professional Trader',
    content: 'The courses at FAX Academy transformed my trading journey. The comprehensive curriculum and expert guidance helped me develop a solid foundation in Forex trading.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    profitScreenshot: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Beginner Trader',
    content: 'As a beginner, I found the step-by-step approach incredibly helpful. The community support and mentorship program are invaluable resources.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    profitScreenshot: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Day Trader',
    content: 'The technical analysis course helped me refine my trading strategy. The live trading sessions and real-time market analysis are exceptional.',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    profitScreenshot: '',
  },
  {
    id: 4,
    name: 'David Thompson',
    role: 'Swing Trader',
    content: 'The advanced technical analysis course exceeded my expectations. The instructors are highly knowledgeable and the course material is top-notch.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    profitScreenshot: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 5,
    name: 'Lisa Martinez',
    role: 'Forex Analyst',
    content: 'FAX Academy provides excellent resources for both beginners and advanced traders. The community is supportive and the course content is regularly updated.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    profitScreenshot: '',
  },
  {
    id: 6,
    name: 'James Wilson',
    role: 'Portfolio Manager',
    content: 'The risk management strategies taught here have been invaluable. The practical examples and real-world applications make complex concepts easy to understand.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    profitScreenshot: 'https://images.unsplash.com/photo-1579226905180-636b76d96082?w=800&auto=format&fit=crop&q=60',
  },
];

export default function Home() {
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [portfolioEmbedUrl, setPortfolioEmbedUrl] = useState(
    'https://faxacademy.notion.site/ebd/809ae02c41df44e387e9d55ad91b2bd2?v=73d1e8fc2fd94010b5f540bb472a8845'
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get the portfolio embed URL from localStorage if available
    const storedUrl = localStorage.getItem('portfolioEmbedUrl');
    if (storedUrl) {
      setPortfolioEmbedUrl(storedUrl);
    }
  }, []);

  const loadMore = () => {
    const newVisible = visibleReviews + 3;
    setVisibleReviews(newVisible);
    if (newVisible >= allReviews.length) {
      setShowLoadMore(false);
    }
  };

  const ReviewCard = ({ review }: { review: typeof allReviews[0] }) => (
    <Card className="p-6 h-full">
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden">
          <img
            src={review.image}
            alt={review.name}
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <h4 className="font-semibold">{review.name}</h4>
          <p className="text-sm text-muted-foreground">{review.role}</p>
        </div>
      </div>
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      <p className="text-muted-foreground">{review.content}</p>
      
      {review.profitScreenshot && (
        <div className="mt-4">
          <p className="text-xs font-medium mb-2">Profit Screenshot:</p>
          <div 
            className="relative w-full h-40 rounded-md overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
            onClick={() => setSelectedImage(review.profitScreenshot)}
          >
            <img
              src={review.profitScreenshot}
              alt="Trading profit screenshot"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 flex items-center justify-center transition-opacity">
              <span className="text-white opacity-0 hover:opacity-100 font-medium">Click to enlarge</span>
            </div>
          </div>
        </div>
      )}
    </Card>
  );

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full overflow-x-hidden">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2 max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Master Forex Trading with <span className="text-[#FF9900]">FAX</span> <span className="text-[#00B8D4]">Academy</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-base sm:text-lg text-gray-500 dark:text-gray-400">
                Your comprehensive platform for learning Forex trading. From beginners to advanced traders,
                we provide the tools and knowledge you need to succeed.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button size="lg" className="w-full sm:w-auto bg-[#FF9900] hover:bg-[#E68A00] text-white" asChild>
                <Link href="/courses">Start Learning</Link>
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-[#00B8D4] text-[#00B8D4] hover:bg-[#00B8D4]/10" asChild>
                <Link href="/signals">View Signals</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trading Portfolio Section */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Our Trading Portfolio</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Track our live trading performance and success stories.
            </p>
          </div>
          <div className="w-full aspect-[3/2] rounded-lg overflow-hidden shadow-xl bg-background">
            <iframe
              src={portfolioEmbedUrl}
              className="w-full h-full border-0"
              title="FAX Academy Trading Portfolio"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* What Our Students Say Section */}
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">What Our Students Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from our community of traders who have transformed their trading journey with FAX Academy.
            </p>
          </div>
          
          <div className="hidden md:block">
            <Carousel className="w-full">
              <CarouselContent className="-ml-4">
                {allReviews.map((review) => (
                  <CarouselItem key={review.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <ReviewCard review={review} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden md:flex justify-end gap-2 mt-4">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </Carousel>
          </div>

          <div className="md:hidden">
            <div className="grid gap-6 grid-cols-1">
              {allReviews.slice(0, visibleReviews).map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
            {showLoadMore && (
              <div className="mt-8 text-center">
                <Button onClick={loadMore} variant="outline">
                  Load More Reviews
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why Choose FAX Academy Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose FAX Academy</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide comprehensive forex education and tools to help you become a successful trader
            </p>
          </div>
          
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div 
                key={feature.title} 
                className={`relative overflow-hidden rounded-xl border ${feature.borderColor} ${feature.color} p-6 shadow-sm transition-all hover:shadow-md`}
              >
                <div className="flex flex-col h-full">
                  <div className={`rounded-full w-12 h-12 flex items-center justify-center ${feature.iconColor} mb-4`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                  
                  <div className="absolute -bottom-6 -right-6 opacity-10">
                    <feature.icon className="h-24 w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="w-full py-12 md:py-16 bg-background">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Need Support?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our team is ready to assist you with any questions or concerns.
            </p>
          </div>
          
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
            <Card className="p-6 text-center border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 transition-colors">
              <Facebook className="h-12 w-12 mx-auto mb-4 text-[#1877F2]" />
              <h3 className="text-lg font-bold mb-2">Facebook</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Follow our page for updates, tips, and support
              </p>
              <Button className="w-full bg-[#1877F2] hover:bg-[#166FE5]" asChild>
                <a href="https://www.facebook.com/faxacademy" target="_blank" rel="noopener noreferrer">
                  <Facebook className="mr-2 h-4 w-4" />
                  Visit Facebook Page
                </a>
              </Button>
            </Card>
            
            <Card className="p-6 text-center border-green-200 dark:border-green-800 hover:border-green-400 dark:hover:border-green-600 transition-colors">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-[#25D366]" />
              <h3 className="text-lg font-bold mb-2">WhatsApp Support</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get quick assistance via WhatsApp
              </p>
              <Button className="w-full bg-[#25D366] hover:bg-[#20BD5C]" asChild>
                <a href="https://wa.me/+918617217502" target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Chat with Support
                </a>
              </Button>
            </Card>
            
            <Card className="p-6 text-center sm:col-span-2 lg:col-span-1 border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 transition-colors">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-lg font-bold mb-2">Contact Form</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Send us a detailed message
              </p>
              <Button className="w-full" asChild>
                <Link href="/contact">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Contact Us
                </Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      <footer className="w-full py-12 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="font-bold mb-4">About FAX Academy</h3>
              <p className="text-sm text-muted-foreground">
                Leading platform for Forex trading education, providing comprehensive courses and real-time market analysis.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/courses" className="text-sm text-muted-foreground hover:text-primary">
                    Courses
                  </Link>
                </li>
                <li>
                  <Link href="/signals" className="text-sm text-muted-foreground hover:text-primary">
                    Trading Signals
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-sm text-muted-foreground hover:text-primary">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="text-sm text-muted-foreground hover:text-primary">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="text-sm text-muted-foreground">
                  Email: support@faxacademy.com
                </li>
                <li className="text-sm text-muted-foreground">
                  <a href="https://wa.me/+918617217502" className="hover:text-primary">
                    WhatsApp: +91 8617217502
                  </a>
                </li>
                <li className="text-sm text-muted-foreground">
                  Hours: Mon-Fri 9AM-5PM EST
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} FAX Academy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Image Modal */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-none">
          <div className="relative">
            <DialogClose className="absolute top-2 right-2 z-10 rounded-full bg-black/40 p-2 hover:bg-black/60">
              <X className="h-5 w-5 text-white" />
            </DialogClose>
            {selectedImage && (
              <img 
                src={selectedImage} 
                alt="Profit screenshot" 
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}