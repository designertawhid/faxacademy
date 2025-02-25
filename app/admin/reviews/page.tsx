'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Check, X } from 'lucide-react';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: 'John Doe',
      course: 'Forex Trading Fundamentals',
      rating: 5,
      comment: 'Excellent course! Very informative and well-structured.',
      status: 'pending',
      date: '2024-03-20',
    },
    {
      id: 2,
      user: 'Jane Smith',
      course: 'Technical Analysis Mastery',
      rating: 4,
      comment: 'Great content, but could use more practical examples.',
      status: 'approved',
      date: '2024-03-19',
    },
  ]);

  const handleApprove = (id: number) => {
    setReviews(reviews.map(review =>
      review.id === id ? { ...review, status: 'approved' } : review
    ));
  };

  const handleReject = (id: number) => {
    setReviews(reviews.map(review =>
      review.id === id ? { ...review, status: 'rejected' } : review
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Reviews</h2>
      </div>

      <div className="grid gap-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{review.user}</h3>
                    <Badge variant={review.status === 'approved' ? 'default' : 'secondary'}>
                      {review.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.course}</p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm">{review.comment}</p>
                  <p className="text-xs text-muted-foreground">{review.date}</p>
                </div>
                {review.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleApprove(review.id)}
                      className="text-green-600 hover:text-green-700"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleReject(review.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}