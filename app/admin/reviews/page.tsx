'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, Check, X, Edit, Trash, Plus, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";

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
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      profitScreenshot: '',
    },
    {
      id: 2,
      user: 'Jane Smith',
      course: 'Technical Analysis Mastery',
      rating: 4,
      comment: 'Great content, but could use more practical examples.',
      status: 'approved',
      date: '2024-03-19',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      profitScreenshot: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=60',
    },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [currentReview, setCurrentReview] = useState({
    id: 0,
    user: '',
    course: '',
    rating: 5,
    comment: '',
    status: 'pending',
    date: new Date().toISOString().split('T')[0],
    image: '',
    profitScreenshot: '',
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

  const handleDelete = (id: number) => {
    setReviews(reviews.filter(review => review.id !== id));
  };

  const handleEdit = (review: any) => {
    setCurrentReview(review);
    setIsEditing(true);
    setIsAdding(false);
  };

  const handleAdd = () => {
    setCurrentReview({
      id: 0,
      user: '',
      course: '',
      rating: 5,
      comment: '',
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      image: '',
      profitScreenshot: '',
    });
    setIsAdding(true);
    setIsEditing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      setReviews(reviews.map(review => 
        review.id === currentReview.id ? currentReview : review
      ));
      setIsEditing(false);
    } else if (isAdding) {
      setReviews([...reviews, { ...currentReview, id: Date.now() }]);
      setIsAdding(false);
    }
    setCurrentReview({
      id: 0,
      user: '',
      course: '',
      rating: 5,
      comment: '',
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      image: '',
      profitScreenshot: '',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Reviews</h2>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" /> Add Review
        </Button>
      </div>

      {(isEditing || isAdding) && (
        <Card>
          <CardHeader>
            <CardTitle>{isEditing ? 'Edit Review' : 'Add New Review'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="user">User Name</Label>
                  <Input
                    id="user"
                    value={currentReview.user}
                    onChange={(e) => setCurrentReview({ ...currentReview, user: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="course">Course</Label>
                  <Input
                    id="course"
                    value={currentReview.course}
                    onChange={(e) => setCurrentReview({ ...currentReview, course: e.target.value })}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating</Label>
                  <Select
                    value={currentReview.rating.toString()}
                    onValueChange={(value) => setCurrentReview({ ...currentReview, rating: parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Star</SelectItem>
                      <SelectItem value="2">2 Stars</SelectItem>
                      <SelectItem value="3">3 Stars</SelectItem>
                      <SelectItem value="4">4 Stars</SelectItem>
                      <SelectItem value="5">5 Stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={currentReview.status}
                    onValueChange={(value) => setCurrentReview({ ...currentReview, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={currentReview.date}
                    onChange={(e) => setCurrentReview({ ...currentReview, date: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="comment">Comment</Label>
                <Textarea
                  id="comment"
                  value={currentReview.comment}
                  onChange={(e) => setCurrentReview({ ...currentReview, comment: e.target.value })}
                  rows={4}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="image">User Image URL</Label>
                  <Input
                    id="image"
                    type="url"
                    placeholder="https://example.com/user-image.jpg"
                    value={currentReview.image}
                    onChange={(e) => setCurrentReview({ ...currentReview, image: e.target.value })}
                  />
                  {currentReview.image && (
                    <div className="mt-2 relative w-16 h-16 rounded-full overflow-hidden border">
                      <Image
                        src={currentReview.image}
                        alt="User preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="profitScreenshot">Profit Screenshot URL</Label>
                  <Input
                    id="profitScreenshot"
                    type="url"
                    placeholder="https://example.com/profit-screenshot.jpg"
                    value={currentReview.profitScreenshot}
                    onChange={(e) => setCurrentReview({ ...currentReview, profitScreenshot: e.target.value })}
                  />
                  {currentReview.profitScreenshot && (
                    <div 
                      className="mt-2 relative w-32 h-20 rounded-md overflow-hidden border cursor-pointer"
                      onClick={() => setSelectedImage(currentReview.profitScreenshot)}
                    >
                      <Image
                        src={currentReview.profitScreenshot}
                        alt="Profit screenshot preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button type="submit">{isEditing ? 'Update' : 'Add'} Review</Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setIsEditing(false);
                    setIsAdding(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div className="flex items-start gap-4">
                  {review.image ? (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={review.image}
                        alt={review.user}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-semibold">{review.user.charAt(0)}</span>
                    </div>
                  )}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{review.user}</h3>
                      <Badge variant={
                        review.status === 'approved' ? 'default' : 
                        review.status === 'rejected' ? 'destructive' : 'secondary'
                      }>
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
                    
                    {review.profitScreenshot && (
                      <div className="mt-2">
                        <p className="text-xs font-medium mb-1">Profit Screenshot:</p>
                        <div 
                          className="relative w-full max-w-[200px] h-32 rounded-md overflow-hidden border cursor-pointer transition-transform hover:scale-[1.02]"
                          onClick={() => setSelectedImage(review.profitScreenshot)}
                        >
                          <Image
                            src={review.profitScreenshot}
                            alt="Profit screenshot"
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 flex items-center justify-center transition-opacity">
                            <span className="text-white opacity-0 hover:opacity-100 font-medium text-sm">Click to enlarge</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(review)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  {review.status === 'pending' && (
                    <>
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
                    </>
                  )}
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(review.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

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
