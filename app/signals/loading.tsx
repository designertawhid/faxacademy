'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function SignalsLoading() {
  return (
    <div className="min-h-screen">
      <section className="w-full py-12 md:py-16 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <Skeleton className="h-10 w-[300px]" />
            <Skeleton className="h-6 w-[500px]" />
            <Skeleton className="h-10 w-[200px] mt-6" />
          </div>
        </div>
      </section>

      <section className="w-full py-12 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div>
                      <Skeleton className="h-6 w-[100px] mb-2" />
                      <Skeleton className="h-4 w-[150px]" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <Skeleton className="h-8 w-[250px] mx-auto mb-4" />
            <Skeleton className="h-6 w-[400px] mx-auto" />
          </div>
          <div className="w-full aspect-[3/2] rounded-lg overflow-hidden shadow-xl bg-background">
            <Skeleton className="w-full h-full" />
          </div>
        </div>
      </section>

      <section className="w-full py-12 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-[200px] mb-2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
