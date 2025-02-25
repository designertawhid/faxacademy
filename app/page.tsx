'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BookOpen, LineChart, MessageCircle, TrendingUp, Star } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const features = [
  {
    icon: BookOpen,
    title: 'Comprehensive Courses',
    description: 'Learn Forex trading from basics to advanced strategies',
  },
  {
    icon: LineChart,
    title: 'Market Analysis',
    description: 'Real-time charts and expert market analysis',
  },
  {
    icon: TrendingUp,
    title: 'Trading Signals',
    description: 'Premium signals with high accuracy',
  },
  {
    icon: MessageCircle,
    title: 'Community Support',
    description: 'Join our active trading community',
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
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Beginner Trader',
    content: 'As a beginner, I found the step-by-step approach incredibly helpful. The community support and mentorship program are invaluable resources.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Day Trader',
    content: 'The technical analysis course helped me refine my trading strategy. The live trading sessions and real-time market analysis are exceptional.',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
  },
  {
    id: 4,
    name: 'David Thompson',
    role: 'Swing Trader',
    content: 'The advanced technical analysis course exceeded my expectations. The instructors are highly knowledgeable and the course material is top-notch.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
  },
  {
    id: 5,
    name: 'Lisa Martinez',
    role: 'Forex Analyst',
    content: 'FAX Academy provides excellent resources for both beginners and advanced traders. The community is supportive and the course content is regularly updated.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
  },
  {
    id: 6,
    name: 'James Wilson',
    role: 'Portfolio Manager',
    content: 'The risk management strategies taught here have been invaluable. The practical examples and real-world applications make complex concepts easy to understand.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
  },
];

export default function Home() {
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [showLoadMore, setShowLoadMore] = useState(true);

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
    </Card>
  );

  return (
    <div className="flex flex-col items-center">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2 max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Master Forex Trading with FAX Academy
              </h1>
              <p className="mx-auto max-w-[700px] text-base sm:text-lg text-gray-500 dark:text-gray-400">
                Your comprehensive platform for learning Forex trading. From beginners to advanced traders,
                we provide the tools and knowledge you need to succeed.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="w-full sm:w-auto" asChild>
                <Link href="/courses">Start Learning</Link>
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
                <Link href="/signals">View Signals</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title} className="p-6 h-full">
                <feature.icon className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 bg-background border-b">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Our Trading Portfolio</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Track our live trading performance and success stories.
            </p>
          </div>
          <div className="w-full aspect-[3/2] rounded-lg overflow-hidden shadow-xl">
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">Trading Portfolio Visualization</p>
            </div>
          </div>
        </div>
      </section>

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
                  <Link href="/analysis" className="text-sm text-muted-foreground hover:text-primary">
                    Market Analysis
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
                <li>
                  <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
                    Contact
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
                  Phone: +1 (555) 123-4567
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
    </div>
  );
}