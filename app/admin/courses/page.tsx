'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash } from 'lucide-react';

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Forex Trading Fundamentals',
      description: 'Learn the basics of Forex trading',
      duration: '6 weeks',
      level: 'Beginner',
      price: 'Free',
    },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [currentCourse, setCurrentCourse] = useState({
    id: 0,
    title: '',
    description: '',
    duration: '',
    level: '',
    price: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      setCourses(courses.map(course => 
        course.id === currentCourse.id ? currentCourse : course
      ));
    } else {
      setCourses([...courses, { ...currentCourse, id: Date.now() }]);
    }
    setIsEditing(false);
    setCurrentCourse({ id: 0, title: '', description: '', duration: '', level: '', price: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Courses</h2>
        <Button onClick={() => setIsEditing(false)}>
          <Plus className="mr-2 h-4 w-4" /> Add Course
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? 'Edit Course' : 'Add New Course'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={currentCourse.title}
                onChange={(e) => setCurrentCourse({ ...currentCourse, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={currentCourse.description}
                onChange={(e) => setCurrentCourse({ ...currentCourse, description: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={currentCourse.duration}
                  onChange={(e) => setCurrentCourse({ ...currentCourse, duration: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="level">Level</Label>
                <Input
                  id="level"
                  value={currentCourse.level}
                  onChange={(e) => setCurrentCourse({ ...currentCourse, level: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  value={currentCourse.price}
                  onChange={(e) => setCurrentCourse({ ...currentCourse, price: e.target.value })}
                />
              </div>
            </div>
            <Button type="submit">{isEditing ? 'Update' : 'Add'} Course</Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {courses.map((course) => (
          <Card key={course.id}>
            <CardContent className="flex justify-between items-center p-6">
              <div>
                <h3 className="font-semibold">{course.title}</h3>
                <p className="text-sm text-muted-foreground">{course.description}</p>
                <div className="flex gap-4 mt-2 text-sm">
                  <span>{course.duration}</span>
                  <span>{course.level}</span>
                  <span>{course.price}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setCurrentCourse(course);
                    setIsEditing(true);
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => setCourses(courses.filter(c => c.id !== course.id))}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}