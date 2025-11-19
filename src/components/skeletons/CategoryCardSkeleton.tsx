import { Skeleton } from "@/components/ui/skeleton";

export const CategoryCardSkeleton = () => {
  return (
    <div className="bg-card rounded-xl border border-border/50 p-6 hover:border-primary/50 transition-all duration-300">
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Icon */}
        <Skeleton variant="pulse-glow" className="h-16 w-16 rounded-full" />

        {/* Title */}
        <Skeleton className="h-6 w-32" />

        {/* Description */}
        <div className="space-y-2 w-full">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4 mx-auto" />
        </div>

        {/* Button */}
        <Skeleton className="h-10 w-full rounded-lg mt-2" />
      </div>
    </div>
  );
};
