import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12 mt-20">
      <div className="text-center mb-12">
        <Skeleton className="h-12 w-64 mx-auto mb-4" />
        <Skeleton className="h-4 w-full max-w-2xl mx-auto mb-1" />
        <Skeleton className="h-4 w-3/4 max-w-xl mx-auto" />
      </div>

      <div className="flex justify-center mb-12">
        <Skeleton className="h-10 w-full max-w-2xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array(9)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} className="h-64 w-full rounded-lg" />
          ))}
      </div>

      <div className="mt-16 text-center">
        <Skeleton className="h-4 w-full max-w-lg mx-auto mb-8" />
        <Skeleton className="h-10 w-40 mx-auto" />
      </div>
    </div>
  )
}
