import { Skeleton } from "@/components/ui/skeleton";

export const ProductDetailSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <Skeleton variant="shimmer" className="aspect-square w-full rounded-xl" />

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} variant="pulse-glow" className="aspect-square rounded-lg" />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Badge */}
          <Skeleton className="h-6 w-24 rounded-full" />

          {/* Title */}
          <div className="space-y-3">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-3/4" />
          </div>

          {/* Rating */}
          <div className="flex items-center gap-4">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-20" />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-48" />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>

          {/* Stock */}
          <Skeleton className="h-5 w-40" />

          {/* Quantity */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-12 w-32" />
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 w-12" />
          </div>

          {/* Benefits */}
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-4 flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="space-y-6">
        <div className="flex gap-4 border-b">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-40" />
        </div>

        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <Skeleton className="h-8 w-64 mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-card rounded-xl border border-border/50 overflow-hidden">
              <Skeleton variant="shimmer" className="aspect-square w-full" />
              <div className="p-4 space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
