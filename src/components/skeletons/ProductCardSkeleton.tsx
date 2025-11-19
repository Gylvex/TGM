import { Skeleton } from "@/components/ui/skeleton";

export const ProductCardSkeleton = () => {
  return (
    <div className="bg-card rounded-xl border border-border/50 overflow-hidden group">
      {/* Image */}
      <Skeleton variant="shimmer" className="aspect-square w-full" />

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* Price */}
        <div className="h-[3.5rem] flex flex-col justify-end space-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-6 w-32" />
        </div>

        {/* Button */}
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
    </div>
  );
};
