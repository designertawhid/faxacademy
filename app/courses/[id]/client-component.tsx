'use client';

import { useState, useEffect } from 'react';
import { BookOpen, Clock, DollarSign, Star, Lock, Unlock, CheckCircle, Play, ChevronRight, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from 'sonner';

// Import the courses data
import { courses } from './data';

export function CourseDetailContent({ params }: { params: { id: string } }) {
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [user, setUser] = useState<{ name?: string, email: string } | null>(null);
  const [paymentInfo, setPaymentInfo] = useState({
    transactionId: '',
    screenshot: '',
    notes: ''
  });
  const [enrollmentStatus, setEnrollmentStatus] = useState('');

  useEffect(() => {
    setMounted(true);
    
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    
    // Check if user is enrolled in this course
    const enrolledCourses = localStorage.getItem('enrolledCourses');
    if (enrolledCourses) {
      const parsedCourses = JSON.parse(enrolledCourses);
      setIsEnrolled(parsedCourses.includes(parseInt(params.id)));
    }

    // Check enrollment status
    const pendingEnrollments = localStorage.getItem('pendingEnrollments');
    if (pendingEnrollments && userData) {
      const parsedUser = JSON.parse(userData);
      const parsedPending = JSON.parse(pendingEnrollments);
      const pendingForThisCourse = parsedPending.find(
        (p: any) => p.courseId === parseInt(params.id) && p.email === (parsedUser?.email || '')
      );
      if (pendingForThisCourse) {
        setEnrollmentStatus(pendingForThisCourse.status);
      }
    }

    // Load completed lessons from localStorage
    const savedCompletedLessons = localStorage.getItem(`course_${params.id}_completed`);
    if (savedCompletedLessons) {
      setCompletedLessons(JSON.parse(savedCompletedLessons));
    }
  }, [params.id]);

  const course = courses.find(c => c.id === parseInt(params.id));

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground">Course not found</p>
        </CardContent>
      </Card>
    );
  }

  const handleEnroll = () => {
    // Check if user is logged in first
    if (!isLoggedIn) {
      // Redirect to login page with return URL
      window.location.href = `/login?returnUrl=/courses/${params.id}`;
      return;
    }
    
    // If course is paid, show payment dialog
    if (course.isPaid) {
      setShowPaymentDialog(true);
      return;
    }
    
    // For free courses, enroll directly
    completeEnrollment();
  };

  const completeEnrollment = () => {
    // Save enrollment status to localStorage
    const enrolledCourses = localStorage.getItem('enrolledCourses');
    let parsedCourses = enrolledCourses ? JSON.parse(enrolledCourses) : [];
    
    if (!parsedCourses.includes(course.id)) {
      parsedCourses.push(course.id);
      localStorage.setItem('enrolledCourses', JSON.stringify(parsedCourses));
    }
    
    // Backup purchase data to API
    if (user && course.isPaid) {
      backupPurchaseData(user.email, course.id, course.title, course.price);
    }
    
    setIsEnrolled(true);
    // Auto-select first lesson
    if (course.lessons && course.lessons.length > 0) {
      setSelectedLesson(course.lessons[0].id);
    }
    
    toast.success('Successfully enrolled in the course!');
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.email) {
      toast.error('You must be logged in to submit payment');
      return;
    }
    
    if (!paymentInfo.transactionId && !paymentInfo.screenshot) {
      toast.error('Please provide either a transaction ID or screenshot URL');
      return;
    }
    
    try {
      // Save pending enrollment to localStorage
      const pendingEnrollment = {
        courseId: course.id,
        courseTitle: course.title,
        email: user.email,
        transactionId: paymentInfo.transactionId,
        screenshot: paymentInfo.screenshot,
        notes: paymentInfo.notes,
        date: new Date().toISOString(),
        status: 'pending'
      };
      
      const pendingEnrollments = localStorage.getItem('pendingEnrollments');
      let parsedPending = pendingEnrollments ? JSON.parse(pendingEnrollments) : [];
      
      // Check if already pending
      const existingIndex = parsedPending.findIndex(
        (p: any) => p.courseId === course.id && p.email === user.email
      );
      
      if (existingIndex >= 0) {
        parsedPending[existingIndex] = pendingEnrollment;
      } else {
        parsedPending.push(pendingEnrollment);
      }
      
      localStorage.setItem('pendingEnrollments', JSON.stringify(parsedPending));
      
      // Backup payment data to API
      try {
        const apiUrl = "https://script.google.com/macros/s/AKfycbzNLFIShauk5QvAswRqZ8ivfkcbHW6Waz1uRkg7WbHxImYIglhInM9NZAZPcGaUI7wiKg/exec";
        const params = new URLSearchParams({
          path: 'Sheet1',
          action: 'write',
          Email: user.email,
          CourseId: course.id.toString(),
          CourseTitle: course.title,
          Price: course.price,
          TransactionId: paymentInfo.transactionId || 'N/A',
          Screenshot: paymentInfo.screenshot || 'N/A',
          Notes: paymentInfo.notes || 'N/A',
          PurchaseDate: new Date().toISOString(),
          Status: 'pending',
          Type: 'PaymentSubmission'
        });
        
        // Use no-cors mode to avoid CORS issues with the Google Apps Script
        fetch(`${apiUrl}?${params.toString()}`, { 
          method: 'GET',
          mode: 'no-cors'
        }).catch(err => {
          console.log('Backup request sent, response not available due to no-cors mode');
        });
      } catch (error) {
        console.error('Error backing up payment data:', error);
      }
      
      setEnrollmentStatus('pending');
      setShowPaymentDialog(false);
      toast.success('Payment information submitted! Your enrollment is pending approval.');
      
      // Reset payment form
      setPaymentInfo({
        transactionId: '',
        screenshot: '',
        notes: ''
      });
    } catch (error) {
      console.error('Payment submission error:', error);
      toast.error('Failed to submit payment information. Please try again.');
    }
  };

  const backupPurchaseData = async (email: string, courseId: number, courseTitle: string, price: string) => {
    try {
      const apiUrl = "https://script.google.com/macros/s/AKfycbzNLFIShauk5QvAswRqZ8ivfkcbHW6Waz1uRkg7WbHxImYIglhInM9NZAZPcGaUI7wiKg/exec";
      const params = new URLSearchParams({
        path: 'Sheet1',
        action: 'write',
        Email: email,
        CourseId: courseId.toString(),
        CourseTitle: courseTitle,
        Price: price,
        PurchaseDate: new Date().toISOString(),
        Type: 'Purchase'
      });
      
      // Use no-cors mode to avoid CORS issues with the Google Apps Script
      fetch(`${apiUrl}?${params.toString()}`, { 
        method: 'GET',
        mode: 'no-cors'
      }).catch(err => {
        console.log('Backup request sent, response not available due to no-cors mode');
      });
    } catch (error) {
      console.error('Error backing up purchase data:', error);
    }
  };

  const toggleLessonCompletion = (lessonId: number) => {
    let updatedCompletedLessons;
    
    if (completedLessons.includes(lessonId)) {
      updatedCompletedLessons = completedLessons.filter(id => id !== lessonId);
    } else {
      updatedCompletedLessons = [...completedLessons, lessonId];
    }
    
    setCompletedLessons(updatedCompletedLessons);
    localStorage.setItem(`course_${params.id}_completed`, JSON.stringify(updatedCompletedLessons));
  };

  const calculateProgress = () => {
    if (!course.lessons || course.lessons.length === 0) return 0;
    return Math.round((completedLessons.length / course.lessons.length) * 100);
  };

  const progressPercentage = calculateProgress();

  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        {/* Course Header with Image Banner */}
        <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden">
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
            <Badge className="mb-2 w-fit" variant={course.isPaid ? "default" : "secondary"}>
              {course.isPaid ? `Premium • ${course.price}` : 'Free Course'}
            </Badge>
            <h1 className="text-2xl md:text-3xl font-bold text-white">{course.title}</h1>
          </div>
        </div>

        {/* Course Info Card */}
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground mb-6">{course.description}</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="flex flex-col items-center gap-2 p-3 bg-muted rounded-lg">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">{course.duration}</span>
                <span className="text-xs text-muted-foreground">Duration</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 bg-muted rounded-lg">
                <BookOpen className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">{course.level}</span>
                <span className="text-xs text-muted-foreground">Level</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 bg-muted rounded-lg">
                <DollarSign className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">{course.price}</span>
                <span className="text-xs text-muted-foreground">Price</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 bg-muted rounded-lg">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="text-sm font-medium">{course.rating} / 5.0</span>
                <span className="text-xs text-muted-foreground">Rating</span>
              </div>
            </div>

            {isEnrolled && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Course Progress</span>
                  <span className="text-sm font-medium">{progressPercentage}%</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
            )}

            {/* What You'll Learn Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">What You'll Learn</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {course.outcomes.map((outcome, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements Section */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Requirements</h3>
              <ul className="list-disc list-inside space-y-2">
                {course.requirements.map((req, index) => (
                  <li key={index} className="text-sm text-muted-foreground">{req}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Course Content */}
        <Card>
          <CardHeader className="pb-0">
            <CardTitle>Course Content</CardTitle>
            <CardDescription>
              {course.lessons?.length || 0} lessons • {course.duration} total
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {course.lessons && course.lessons.length > 0 ? (
              <div>
                {/* Lesson List */}
                <div className="border rounded-lg overflow-hidden">
                  {course.lessons.map((lesson, index) => {
                    const isLocked = lesson.locked && (!isEnrolled && course.isPaid);
                    const isSelected = selectedLesson === lesson.id;
                    const isCompleted = completedLessons.includes(lesson.id);
                    
                    return (
                      <div 
                        key={lesson.id}
                        className={`border-b last:border-b-0 ${isSelected ? 'bg-accent' : ''}`}
                      >
                        <div 
                          className={`flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors ${isLocked ? 'opacity-70' : ''}`}
                          onClick={() => {
                            if (!isLocked) {
                              setSelectedLesson(lesson.id);
                            }
                          }}
                        >
                          <div className="flex items-center gap-3 flex-1">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                              {isCompleted ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : (
                                <span className="text-xs font-medium">{index + 1}</span>
                              )}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{lesson.title}</h4>
                              <p className="text-xs text-muted-foreground line-clamp-1">{lesson.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {isLocked ? (
                              <Lock className="h-4 w-4 text-amber-500" />
                            ) : (
                              <Play className="h-4 w-4 text-primary" />
                            )}
                            <ChevronRight className={`h-4 w-4 transition-transform ${isSelected ? 'rotate-90' : ''}`} />
                          </div>
                        </div>
                        
                        {/* Lesson Content when selected */}
                        {isSelected && !isLocked && (
                          <div className="p-4 bg-muted/30 border-t">
                            <div>
                              <h3 className="text-lg font-semibold mb-2">{lesson.title}</h3>
                              <p className="text-sm text-muted-foreground mb-4">{lesson.description}</p>
                              
                              <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4">
                                <iframe
                                  src={lesson.videoUrl}
                                  title={lesson.title}
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                  className="absolute top-0 left-0 w-full h-full"
                                />
                              </div>
                              
                              <div className="flex justify-between items-center">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleLessonCompletion(lesson.id);
                                  }}
                                >
                                  {isCompleted ? (
                                    <>
                                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                                      Mark as Incomplete
                                    </>
                                  ) : (
                                    <>
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Mark as Complete
                                    </>
                                  )}
                                </Button>
                                
                                {index < course.lessons.length - 1 && (
                                  <Button 
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const nextLesson = course.lessons[index + 1];
                                      if (nextLesson && (!nextLesson.locked || isEnrolled)) {
                                        setSelectedLesson(nextLesson.id);
                                      }
                                    }}
                                  >
                                    Next Lesson
                                    <ChevronRight className="h-4 w-4 ml-2" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {/* Show locked content message */}
                        {isSelected && isLocked && (
                          <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border-t">
                            <div className="text-center py-8">
                              <Lock className="h-12 w-12 mx-auto mb-4 text-amber-500" />
                              <h3 className="text-lg font-semibold mb-2">Premium Content</h3>
                              <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                                This lesson is part of our premium content. Enroll in this course to access all lessons and materials.
                              </p>
                              <Button onClick={handleEnroll}>
                                Enroll Now for {course.price}
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center p-8">
                <p className="text-muted-foreground">No lessons available for this course.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div>
        <Card className="sticky top-20">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover"
                  priority
                />
                {course.isPaid && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="destructive">{course.price}</Badge>
                  </div>
                )}
              </div>
              
              {isEnrolled ? (
                <div className="space-y-4">
                  <div className="text-center p-3 bg-green-100 dark:bg-green-900 rounded-md">
                    <p className="text-green-700 dark:text-green-300 font-medium">You are enrolled in this course</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Your progress</span>
                    <span className="text-sm font-medium">{progressPercentage}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                  
                  {selectedLesson ? (
                    <Button className="w-full" onClick={() => setSelectedLesson(course.lessons[0].id)}>
                      Continue Learning
                    </Button>
                  ) : (
                    <Button className="w-full" onClick={() => course.lessons && course.lessons.length > 0 && setSelectedLesson(course.lessons[0].id)}>
                      Start Course
                    </Button>
                  )}
                </div>
              ) : enrollmentStatus === 'pending' ? (
                <div className="space-y-4">
                  <div className="text-center p-3 bg-amber-100 dark:bg-amber-900 rounded-md">
                    <p className="text-amber-700 dark:text-amber-300 font-medium">Your enrollment is pending approval</p>
                    <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">We'll notify you once your payment is verified</p>
                  </div>
                  
                  <Button className="w-full" variant="outline" asChild>
                    <a href="/contact">Contact Support</a>
                  </Button>
                </div>
              ) : enrollmentStatus === 'rejected' ? (
                <div className="space-y-4">
                  <div className="text-center p-3 bg-red-100 dark:bg-red-900 rounded-md">
                    <p className="text-red-700 dark:text-red-300 font-medium">Your enrollment was not approved</p>
                    <p className="text-xs text-red-600 dark:text-red-400 mt-1">Please contact support for assistance</p>
                  </div>
                  
                  <Button className="w-full" onClick={handleEnroll}>
                    Try Again
                  </Button>
                  <Button className="w-full" variant="outline" asChild>
                    <a href="/contact">Contact Support</a>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold mb-2">{course.price}</p>
                    <p className="text-muted-foreground">Full course access</p>
                  </div>
                  
                  <Button className="w-full" size="lg" onClick={handleEnroll}>
                    Enroll Now
                  </Button>
                </div>
              )}
              
              <div className="space-y-3">
                <h4 className="font-medium">This course includes:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Lifetime access</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span>Certificate of completion</span>
                  </li>
                  {course.isPaid && (
                    <li className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-muted-foreground" />
                      <span>30-day money-back guarantee</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Your Enrollment</DialogTitle>
            <DialogDescription>
              Make a payment to enroll in {course.title}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePaymentSubmit}>
            <div className="space-y-6 py-4">
              <div className="text-center">
                <p className="text-2xl font-bold mb-2">{course.price}</p>
                <div className="p-4 bg-muted rounded-lg mb-4">
                  <p className="font-medium mb-2">Payment Options:</p>
                  <div className="space-y-4">
                    <div className="border p-3 rounded-md bg-white dark:bg-gray-800">
                      <p className="font-medium">UPI Payment</p>
                      <p className="text-sm text-muted-foreground mb-2">Make payment to our UPI ID</p>
                      <div className="flex items-center justify-center p-2 bg-amber-50 dark:bg-amber-900/30 rounded border border-amber-200 dark:border-amber-800">
                        <p className="font-mono font-medium">faxacademy@ybl</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="transactionId">Transaction ID (Optional)</Label>
                  <Input 
                    id="transactionId" 
                    placeholder="Enter your payment transaction ID" 
                    value={paymentInfo.transactionId}
                    onChange={(e) => setPaymentInfo({...paymentInfo, transactionId: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="screenshot">Payment Screenshot URL (Optional)</Label>
                  <Input 
                    id="screenshot" 
                    placeholder="https://example.com/screenshot.jpg" 
                    value={paymentInfo.screenshot}
                    onChange={(e) => setPaymentInfo({...paymentInfo, screenshot: e.target.value})}
                  />
                  <p className="text-xs text-muted-foreground">
                    Upload your screenshot to an image hosting service and paste the URL here
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Any additional information about your payment" 
                    value={paymentInfo.notes}
                    onChange={(e) => setPaymentInfo({...paymentInfo, notes: e.target.value})}
                    rows={3}
                  />
                </div>
              </div>
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button 
                type="submit" 
                className="sm:w-full"
                disabled={!paymentInfo.transactionId && !paymentInfo.screenshot}
              >
                <Upload className="h-4 w-4 mr-2" />
                Submit Payment Info
              </Button>
              <Button 
                variant="outline" 
                className="sm:w-full" 
                onClick={() => window.location.href = '/contact'}
                type="button"
              >
                Contact Support
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="secondary" className="sm:w-full">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}