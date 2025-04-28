import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12 mt-20">
      <div className="h-8 w-40 bg-muted rounded-md mb-8 animate-pulse" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <Skeleton className="h-[500px] w-full rounded-lg" />
        </div>

        <div>
          <Skeleton className="h-10 w-3/4 mb-2" />
          <Skeleton className="h-8 w-1/3 mb-6" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-8" />

          <div className="flex items-center space-x-4 mb-8">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>

          <div className="space-y-4 mb-8">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <Skeleton className="h-5 w-5 mr-3" />
              <Skeleton className="h-4 w-64" />
            </div>
            <div className="flex items-center">
              <Skeleton className="h-5 w-5 mr-3" />
              <Skeleton className="h-4 w-48" />
            </div>
            <div className="flex items-center">
              <Skeleton className="h-5 w-5 mr-3" />
              <Skeleton className="h-4 w-56" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
