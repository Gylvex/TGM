import { cn } from "@/lib/utils";

type SkeletonVariant = "default" | "shimmer" | "pulse-glow";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
}

function Skeleton({
  className,
  variant = "shimmer",
  ...props
}: SkeletonProps) {
  const variants = {
    default: "animate-pulse bg-muted",
    shimmer: "bg-gradient-to-r from-muted via-primary/10 to-muted bg-[length:200%_100%] animate-shimmer",
    "pulse-glow": "bg-muted animate-pulse-glow"
  };

  return (
    <div
      className={cn(
        "rounded-md",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
export type { SkeletonVariant };
