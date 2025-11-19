import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  gradient?: string;
}

export const CategoryCard = ({
  title,
  description,
  icon: Icon,
  href,
  gradient = "from-primary/20 to-secondary/20",
}: CategoryCardProps) => {
  return (
    <Link to={href}>
      <div className="group relative bg-card rounded-xl border border-border/50 active:border-primary/50 md:hover:border-primary/50 transition-all duration-300 md:hover:shadow-glow-primary md:hover:-translate-y-1 active:scale-[0.98] md:active:scale-100 overflow-hidden p-4 sm:p-5 md:p-6 h-full min-h-[120px] sm:min-h-[140px]">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 md:group-hover:opacity-100 transition-opacity duration-300`} />

        <div className="relative z-10 space-y-3 sm:space-y-4">
          <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-lg bg-primary/10 md:group-hover:bg-primary md:group-hover:text-primary-foreground md:group-hover:scale-110 active:bg-primary active:text-primary-foreground flex items-center justify-center transition-all duration-300">
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>

          <div>
            <h3 className="font-bold text-base sm:text-lg mb-1.5 sm:mb-2 md:group-hover:text-primary active:text-primary transition-colors duration-200 line-clamp-1">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground md:group-hover:text-foreground transition-colors duration-200 line-clamp-2">
              {description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};
