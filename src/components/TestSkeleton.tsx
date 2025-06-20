import React from "react";
import { Skeleton } from "./ui/skeleton";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

function TestSkeleton() {
  return (
    <div className="flex flex-col sm:gap-10 gap-4 sm:p-10 p-4 max-w-8xl mx-auto">
      <Skeleton className="w-80 h-12" />
      <div className="space-y-6">
        <div className="space-y-1">
          <Skeleton className="w-40 h-4" />
          <Skeleton className="w-40 h-4" />
          <Skeleton className="w-40 h-4" />
        </div>
        {Array.from({ length: 5 }).map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>
                <Skeleton className="w-40 h-8" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">
                <Skeleton className="w-full h-5" />
              </p>
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <Skeleton className="w-5 h-5 rounded-full" />
                  <Skeleton className="w-28 h-5" />
                </div>
                <div className="flex space-x-2">
                  <Skeleton className="w-5 h-5 rounded-full" />
                  <Skeleton className="w-28 h-5" />
                </div>
                <div className="flex space-x-2">
                  <Skeleton className="w-5 h-5 rounded-full" />
                  <Skeleton className="w-28 h-5" />
                </div>
                <div className="flex space-x-2">
                  <Skeleton className="w-5 h-5 rounded-full" />
                  <Skeleton className="w-28 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default TestSkeleton;
