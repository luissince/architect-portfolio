"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function ProfileSkeleton() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navbar skeleton */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Skeleton className="h-8 w-32" />
            <div className="flex items-center space-x-4">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar skeleton */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex flex-col items-center">
                  <Skeleton className="w-24 h-24 rounded-full mb-4" />
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-48" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-1">
                  {Array(4)
                    .fill(0)
                    .map((_, index) => (
                      <Skeleton key={index} className="h-10 w-full" />
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main content skeleton */}
          <div className="md:col-span-3">
            {/* Tabs skeleton */}
            <div className="grid grid-cols-4 mb-4">
              {Array(4)
                .fill(0)
                .map((_, index) => (
                  <Skeleton key={index} className="h-10 mx-1" />
                ))}
            </div>

            {/* Content card skeleton */}
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48 mb-2" />
                <Skeleton className="h-4 w-64" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array(3)
                    .fill(0)
                    .map((_, index) => (
                      <div
                        key={index}
                        className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex flex-col mb-4 md:mb-0">
                          <div className="flex items-center">
                            <Skeleton className="h-5 w-24 mr-2" />
                            <Skeleton className="h-6 w-20" />
                          </div>
                          <Skeleton className="h-4 w-32 mt-1" />
                          <Skeleton className="h-4 w-20 mt-1" />
                        </div>
                        <div className="flex flex-col md:items-end w-full md:w-auto">
                          <Skeleton className="h-5 w-20 mb-2" />
                          <Skeleton className="h-8 w-24" />
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
