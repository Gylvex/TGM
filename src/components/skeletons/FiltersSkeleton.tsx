import { Skeleton } from "@/components/ui/skeleton";

export const FiltersSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Category filters */}
      <div>
        <Skeleton className="h-6 w-24 mb-4" />
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 flex-1" />
            </div>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <Skeleton className="h-6 w-32 mb-4" />
        <Skeleton className="h-2 w-full mb-4" />
        <div className="flex gap-4">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 flex-1" />
        </div>
      </div>

      {/* Brand filters */}
      <div>
        <Skeleton className="h-6 w-20 mb-4" />
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 flex-1" />
            </div>
          ))}
        </div>
      </div>

      {/* Stock filter */}
      <div>
        <Skeleton className="h-6 w-28 mb-4" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    </div>
  );
};
