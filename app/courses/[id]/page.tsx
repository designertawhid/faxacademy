import { CourseDetailContent } from './client-component';
import { courses } from './data';

// This function is required for static site generation with dynamic routes
export function generateStaticParams() {
  return courses.map((course) => ({
    id: course.id.toString(),
  }));
}

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container px-4 py-8 md:py-12">
      <CourseDetailContent params={params} />
    </div>
  );
}
