import { Skeleton } from "@/components/ui/skeleton";

export const HeroSkeleton = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-3xl space-y-8">
          {/* Title */}
          <div className="space-y-4">
            <Skeleton variant="shimmer" className="h-12 md:h-16 lg:h-20 w-3/4" />
            <Skeleton variant="shimmer" className="h-12 md:h-16 lg:h-20 w-2/3" />
          </div>

          {/* Subtitle */}
          <div className="space-y-3">
            <Skeleton className="h-6 md:h-7 w-full max-w-2xl" />
            <Skeleton className="h-6 md:h-7 w-4/5 max-w-xl" />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Skeleton className="h-12 w-48" />
            <Skeleton className="h-12 w-40" />
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-6 pt-4">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-5 w-28" />
          </div>
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
