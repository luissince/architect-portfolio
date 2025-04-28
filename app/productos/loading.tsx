import { ProductGridSkeleton } from "@/components/product-skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12 mt-20">
      <div className="text-center mb-12">
        <div className="h-12 w-64 bg-muted rounded-md mx-auto mb-4 animate-pulse" />
        <div className="h-4 w-full max-w-2xl mx-auto bg-muted rounded-md animate-pulse" />
        <div className="h-4 w-3/4 max-w-xl mx-auto bg-muted rounded-md mt-2 animate-pulse" />
      </div>

      <div className="flex justify-center mb-12">
        <div className="h-10 w-full max-w-2xl bg-muted rounded-md animate-pulse" />
      </div>

      <ProductGridSkeleton count={8} />
    </div>
  )
}
