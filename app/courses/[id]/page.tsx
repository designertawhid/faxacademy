import { BookOpen, Clock, DollarSign, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    videoUrl: 'https://www.youtube.com/embed/buF-_3vNnh0?si=gLDXXWHAmg-BqW9C',
    curriculum: [
      'Introduction to Forex Markets',
      'Understanding Currency Pairs',
      'Basic Technical Analysis',
      'Fundamental Analysis Basics',
      'Risk Management Principles',
      'Trading Psychology',
    ],
    requirements: [
      'No prior trading experience required',
      'Basic understanding of financial markets',
      'Computer with internet connection',
      'Dedication to learn',
    ],
    outcomes: [
      'Understand how the Forex market works',
      'Read and analyze currency charts',
      'Execute basic trading strategies',
      'Manage trading risks effectively',
      'Develop a trading plan',
    ],
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
    videoUrl: 'https://www.youtube.com/embed/buF-_3vNnh0?si=gLDXXWHAmg-BqW9C',
    curriculum: [
      'Advanced Chart Patterns',
      'Technical Indicators in Depth',
      'Price Action Trading',
      'Multiple Timeframe Analysis',
      'Trading Strategy Development',
      'Advanced Risk Management',
    ],
    requirements: [
      'Basic understanding of Forex trading',
      'Familiarity with trading platforms',
      'Understanding of basic technical analysis',
    ],
    outcomes: [
      'Master advanced technical analysis',
      'Develop complex trading strategies',
      'Identify high-probability trades',
      'Create custom indicators',
      'Build a comprehensive trading system',
    ],
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
    videoUrl: 'https://www.youtube.com/embed/buF-_3vNnh0?si=gLDXXWHAmg-BqW9C',
    curriculum: [
      'Advanced Trading Concepts',
      'Portfolio Management',
      'Algorithmic Trading Basics',
      'Advanced Risk Management',
      'Market Microstructure',
      'Professional Trading Practices',
    ],
    requirements: [
      'Strong understanding of technical analysis',
      'Previous trading experience',
      'Knowledge of trading platforms',
    ],
    outcomes: [
      'Implement advanced trading strategies',
      'Optimize trading portfolio',
      'Understand algorithmic trading',
      'Manage complex trading positions',
      'Trade like a professional',
    ],
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
    videoUrl: 'https://www.youtube.com/embed/buF-_3vNnh0?si=gLDXXWHAmg-BqW9C',
    curriculum: [
      'Understanding Trading Psychology',
      'Emotional Control in Trading',
      'Building Trading Discipline',
      'Developing a Trading Mindset',
      'Stress Management',
      'Peak Performance Trading',
    ],
    requirements: [
      'Open mindset to learn',
      'Willingness to self-reflect',
      'Basic trading knowledge',
    ],
    outcomes: [
      'Control trading emotions',
      'Develop trading discipline',
      'Build a winning mindset',
      'Handle trading stress',
      'Achieve peak performance',
    ],
  },
];

export function generateStaticParams() {
  return courses.map((course) => ({
    id: course.id.toString(),
  }));
}

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const course = courses.find(c => c.id === parseInt(params.id));

  if (!course) {
    return (
      <div className="container px-4 py-8 md:py-12">
        <Card>
          <CardContent className="flex items-center justify-center min-h-[400px]">
            <p className="text-muted-foreground">Course not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-6">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <CardTitle className="text-2xl md:text-3xl">{course.title}</CardTitle>
              <p className="text-muted-foreground mt-2">{course.description}</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{course.level}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{course.price}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm">{course.rating} / 5.0</span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Course Preview</h3>
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                    <iframe
                      src={course.videoUrl}
                      title={`${course.title} Preview`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Curriculum</h3>
                  <ul className="space-y-2">
                    {course.curriculum.map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs">
                          {index + 1}
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                  <ul className="list-disc list-inside space-y-2">
                    {course.requirements.map((req, index) => (
                      <li key={index} className="text-muted-foreground">{req}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">What You'll Learn</h3>
                  <ul className="list-disc list-inside space-y-2">
                    {course.outcomes.map((outcome, index) => (
                      <li key={index} className="text-muted-foreground">{outcome}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-20">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-3xl font-bold mb-2">{course.price}</p>
                  <p className="text-muted-foreground">Full course access</p>
                </div>
                <Button className="w-full" size="lg" asChild>
                  <Link href="/login">Enroll Now</Link>
                </Button>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>Lifetime access</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <BookOpen className="h-4 w-4" />
                    <span>Certificate of completion</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Star className="h-4 w-4" />
                    <span>30-day money-back guarantee</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}