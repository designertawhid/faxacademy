'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash, Image as ImageIcon, FileUp } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

// Import the courses data
import { courses as initialCourses } from '../../../app/courses/[id]/data';

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState(initialCourses);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [currentCourse, setCurrentCourse] = useState({
    id: 0,
    title: '',
    description: '',
    duration: '',
    level: '',
    price: '',
    isPaid: false,
    rating: 5,
    image: '',
    lessons: [],
    curriculum: [],
    requirements: [],
    outcomes: [],
  });
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load courses from localStorage if available
    const savedCourses = localStorage.getItem('adminCourses');
    if (savedCourses) {
      setCourses(JSON.parse(savedCourses));
    } else {
      // Initialize with the default courses
      localStorage.setItem('adminCourses', JSON.stringify(initialCourses));
    }
  }, []);

  const handleEdit = (course: any) => {
    setCurrentCourse(course);
    setIsEditing(true);
    setIsAdding(false);
  };

  const handleAdd = () => {
    setCurrentCourse({
      id: Date.now(),
      title: '',
      description: '',
      duration: '',
      level: 'Beginner',
      price: 'Free',
      isPaid: false,
      rating: 5,
      image: '',
      lessons: [],
      curriculum: [],
      requirements: [],
      outcomes: [],
    });
    setIsAdding(true);
    setIsEditing(false);
  };

  const handleDelete = (id: number) => {
    const updatedCourses = courses.filter(course => course.id !== id);
    setCourses(updatedCourses);
    localStorage.setItem('adminCourses', JSON.stringify(updatedCourses));
    toast.success('Course deleted successfully');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!currentCourse.title || !currentCourse.description || !currentCourse.image) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    let updatedCourses;
    
    if (isEditing) {
      updatedCourses = courses.map(course => 
        course.id === currentCourse.id ? currentCourse : course
      );
      toast.success('Course updated successfully');
    } else {
      updatedCourses = [...courses, currentCourse];
      toast.success('Course added successfully');
    }
    
    setCourses(updatedCourses);
    localStorage.setItem('adminCourses', JSON.stringify(updatedCourses));
    
    setIsEditing(false);
    setIsAdding(false);
    setCurrentCourse({
      id: 0,
      title: '',
      description: '',
      duration: '',
      level: '',
      price: '',
      isPaid: false,
      rating: 5,
      image: '',
      lessons: [],
      curriculum: [],
      requirements: [],
      outcomes: [],
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // In a real application, you would upload this file to a server
      // For this demo, we'll simulate a successful upload with a placeholder URL
      toast.success('Image uploaded successfully');
      
      // Set a placeholder image URL (in a real app, this would be the uploaded image URL)
      setCurrentCourse({
        ...currentCourse,
        image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=60'
      });
      
      setShowImageUpload(false);
    }
  };

  const handleTextListChange = (
    field: 'curriculum' | 'requirements' | 'outcomes',
    value: string
  ) => {
    // Convert the text area value to an array of strings
    const items = value.split('\n').filter(item => item.trim() !== '');
    setCurrentCourse({
      ...currentCourse,
      [field]: items
    });
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
        <h2 className="text-2xl font-bold">Manage Courses</h2>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" /> Add Course
        </Button>
      </div>

      {(isEditing || isAdding) && (
        <Card>
          <CardHeader>
            <CardTitle>{isEditing ? 'Edit Course' : 'Add New Course'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Course Title</Label>
                    <Input
                      id="title"
                      value={currentCourse.title}
                      onChange={(e) => setCurrentCourse({ ...currentCourse, title: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={currentCourse.description}
                      onChange={(e) => setCurrentCourse({ ...currentCourse, description: e.target.value })}
                      rows={4}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration</Label>
                      <Input
                        id="duration"
                        value={currentCourse.duration}
                        onChange={(e) => setCurrentCourse({ ...currentCourse, duration: e.target.value })}
                        placeholder="e.g. 6 weeks"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="level">Level</Label>
                      <Select
                        value={currentCourse.level}
                        onValueChange={(value) => setCurrentCourse({ ...currentCourse, level: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">Intermediate</SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                          <SelectItem value="All Levels">All Levels</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price</Label>
                      <Input
                        id="price"
                        value={currentCourse.price}
                        onChange={(e) => setCurrentCourse({ ...currentCourse, price: e.target.value })}
                        placeholder="e.g. $199 or Free"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="isPaid">Is Paid Course</Label>
                      <Select
                        value={currentCourse.isPaid ? "true" : "false"}
                        onValueChange={(value) => setCurrentCourse({ ...currentCourse, isPaid: value === "true" })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">Yes</SelectItem>
                          <SelectItem value="false">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="rating">Rating (1-5)</Label>
                    <Input
                      id="rating"
                      type="number"
                      min="1"
                      max="5"
                      step="0.1"
                      value={currentCourse.rating}
                      onChange={(e) => setCurrentCourse({ ...currentCourse, rating: parseFloat(e.target.value) })}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Course Image</Label>
                    <div className="flex flex-col gap-4">
                      {currentCourse.image ? (
                        <div className="relative w-full aspect-video rounded-lg overflow-hidden border">
                          <Image
                            src={imagePreview || currentCourse.image}
                            alt="Course preview"
                            fill
                            className="object-cover"
                          />
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            className="absolute top-2 right-2"
                            onClick={() => {
                              setCurrentCourse({ ...currentCourse, image: '' });
                              setImagePreview(null);
                              setImageFile(null);
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <div 
                          className="w-full aspect-video rounded-lg border-2 border-dashed flex items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
                          onClick={() => setShowImageUpload(true)}
                        >
                          <div className="text-center p-4">
                            <ImageIcon className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                            <p className="text-sm font-medium">Click to upload course image</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Recommended size: 1280x720px
                            </p>
                          </div>
                        </div>
                      )}
                      
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setShowImageUpload(true)}
                      >
                        <FileUp className="h-4 w-4 mr-2" />
                        {currentCourse.image ? 'Change Image' : 'Upload Image'}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="curriculum">Curriculum (one item per line)</Label>
                    <Textarea
                      id="curriculum"
                      value={currentCourse.curriculum.join('\n')}
                      onChange={(e) => handleTextListChange('curriculum', e.target.value)}
                      rows={4}
                      placeholder="Introduction to Forex Markets&#10;Understanding Currency Pairs&#10;Basic Technical Analysis"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="requirements">Requirements (one item per line)</Label>
                    <Textarea
                      id="requirements"
                      value={currentCourse.requirements.join('\n')}
                      onChange={(e) => handleTextListChange('requirements', e.target.value)}
                      rows={3}
                      placeholder="No prior trading experience required&#10;Basic understanding of financial markets"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="outcomes">Learning Outcomes (one item per line)</Label>
                    <Textarea
                      id="outcomes"
                      value={currentCourse.outcomes.join('\n')}
                      onChange={(e) => handleTextListChange('outcomes', e.target.value)}
                      rows={3}
                      placeholder="Understand how the Forex market works&#10;Read and analyze currency charts"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button type="submit">{isEditing ? 'Update' : 'Add'} Course</Button>
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

      <div className="grid gap-6">
        {courses.map((course) => (
          <Card key={course.id}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative w-full md:w-[200px] h-[150px] rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div>
                      <h3 className="font-semibold text-lg">{course.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{course.description}</p>
                      
                      <div className="flex flex-wrap gap-4 mt-4">
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium">Duration:</span>
                          <span className="text-sm text-muted-foreground">{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium">Level:</span>
                          <span className="text-sm text-muted-foreground">{course.level}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium">Price:</span>
                          <span className="text-sm text-muted-foreground">{course.price}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium">Rating:</span>
                          <span className="text-sm text-muted-foreground">{course.rating}/5</span>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <span className="text-sm font-medium">Lessons:</span>
                        <span className="text-sm text-muted-foreground ml-1">
                          {course.lessons?.length || 0} lessons
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(course)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(course.id)}
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Image Upload Dialog */}
      <Dialog open={showImageUpload} onOpenChange={setShowImageUpload}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Course Image</DialogTitle>
            <DialogDescription>
              Upload an image for your course. Recommended size: 1280x720px.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex flex-col items-center justify-center gap-4">
              <label 
                htmlFor="image-upload" 
                className="w-full h-40 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
              >
                <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                <span className="text-sm font-medium">Click to select an image</span>
                <span className="text-xs text-muted-foreground mt-1">
                  PNG, JPG or WEBP up to 5MB
                </span>
                <input 
                  id="image-upload" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageUpload}
                />
              </label>
              
              {imagePreview && (
                <div className="relative w-full h-40 rounded-lg overflow-hidden">
                  <Image
                    src={imagePreview}
                    alt="Image preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setShowImageUpload(false)}
              className="sm:w-full"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
