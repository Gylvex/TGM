import { Skeleton } from "@/components/ui/skeleton";

export const TestimonialSkeleton = () => {
  return (
    <div className="bg-card rounded-xl border border-border/50 p-6">
      <div className="space-y-4">
        {/* Stars */}
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} variant="pulse-glow" className="h-5 w-5 rounded-sm" />
          ))}
        </div>

        {/* Quote */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        {/* Author */}
        <div className="flex items-center gap-3 pt-4 border-t border-border/50">
          <Skeleton variant="shimmer" className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
};
