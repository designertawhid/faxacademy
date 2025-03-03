'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, BookOpen, DollarSign, Star } from 'lucide-react';
import Image from 'next/image';

// Import the courses data
import { courses } from './data';

interface Course {
  id: number;
  title: string;
  description: string;
  duration: string;
  level: string;
  price: string;
  isPaid: boolean;
  rating: number;
  image: string;
  lessons: any[]; // Replace 'any' with a more specific type if available
  curriculum: string[];
  requirements: string[];
  outcomes: string[];
}

export function CourseDetailContent({ params }: { params: { id: string } }) {
  const [course, setCourse] = useState<Course | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const foundCourse = courses.find(c => c.id === parseInt(params.id));
    setCourse(foundCourse || null);
  }, [params.id]);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div>Loading...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center min-h-[400px]">
          <div>Course not found</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="container px-4 py-8 md:py-12">
      <Card>
        <CardHeader>
          <CardTitle>{course.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{course.description}</p>
          <div className="flex items-center gap-4 mt-4">
            <Clock className="h-4 w-4" />
            <span>{course.duration}</span>
            <BookOpen className="h-4 w-4" />
            <span>{course.level}</span>
            <DollarSign className="h-4 w-4" />
            <span>{course.price}</span>
            <Star className="h-4 w-4" />
            <span>{course.rating}</span>
          </div>
          <Button className="mt-4">Enroll Now</Button>
        </CardContent>
      </Card>
    </div>
  );
}
