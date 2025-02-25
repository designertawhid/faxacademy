import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, DollarSign, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const courses = [
  {
    id: 1,
    title: 'Forex Trading Fundamentals',
    description: 'Learn the basics of Forex trading, including currency pairs, market analysis, and trading platforms.',
    duration: '6 weeks',
    level: 'Beginner',
    price: 'Free',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 2,
    title: 'Technical Analysis Mastery',
    description: 'Master technical analysis tools and indicators for better trading decisions.',
    duration: '8 weeks',
    level: 'Intermediate',
    price: '$199',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 3,
    title: 'Advanced Trading Strategies',
    description: 'Learn advanced trading strategies, risk management, and portfolio optimization.',
    duration: '10 weeks',
    level: 'Advanced',
    price: '$299',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 4,
    title: 'Psychology of Trading',
    description: 'Understand trading psychology and develop a winning mindset.',
    duration: '4 weeks',
    level: 'All Levels',
    price: '$149',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1579226905180-636b76d96082?w=800&auto=format&fit=crop&q=60',
  },
];

export default function CoursesPage() {
  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Forex Trading Courses</h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
          Start your journey to becoming a successful Forex trader with our comprehensive courses.
        </p>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {courses.map((course) => (
          <Card key={course.id} className="flex flex-col h-full">
            <div className="relative w-full aspect-video">
              <Image
                src={course.image}
                alt={course.title}
                fill
                className="object-cover rounded-t-lg"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">{course.title}</CardTitle>
              <CardDescription className="line-clamp-2">{course.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-sm">{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-sm">{course.level}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-sm">{course.price}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                  <span className="text-sm">{course.rating} / 5.0</span>
                </div>
              </div>
              <Button className="w-full mt-4" asChild>
                <Link href={`/courses/${course.id}`}>Learn More</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}