'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, DollarSign, Star, Lock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { courses as allCourses } from './[id]/data';

export default function CoursesPage() {
  const [enrolledCourses, setEnrolledCourses] = useState<number[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    setIsLoggedIn(!!userData);
    
    // Get enrolled courses
    const storedCourses = localStorage.getItem('enrolledCourses');
    if (storedCourses) {
      setEnrolledCourses(JSON.parse(storedCourses));
    }
  }, []);

  if (!mounted) {
    return (
      <div className="container px-4 py-8 md:py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Forex Trading Courses</h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
          Start your journey to becoming a successful Forex trader with our comprehensive courses.
        </p>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {allCourses.map((course) => (
          <Card key={course.id} className="flex flex-col h-full">
            <div className="relative w-full aspect-video">
              <Image
                src={course.image}
                alt={course.title}
                fill
                className="object-cover rounded-t-lg"
              />
              {course.isPaid && !isLoggedIn && (
                <div className="absolute top-2 right-2">
                  <div className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 px-2 py-1 rounded-md text-xs font-medium flex items-center">
                    <Lock className="h-3 w-3 mr-1" />
                    Premium
                  </div>
                </div>
              )}
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
              {isLoggedIn && enrolledCourses.includes(course.id) ? (
                <div className="flex flex-col gap-2">
                  <div className="text-center p-2 bg-green-100 dark:bg-green-900 rounded-md">
                    <p className="text-green-700 dark:text-green-300 text-sm">Enrolled</p>
                  </div>
                  <Button className="w-full" asChild>
                    <Link href={`/courses/${course.id}`}>Continue Learning</Link>
                  </Button>
                </div>
              ) : (
                <Button className="w-full mt-4" asChild>
                  <Link href={`/courses/${course.id}`}>Learn More</Link>
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}