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
      <div className="group relative bg-card rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow-primary hover:-translate-y-1 overflow-hidden p-6 h-full">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

        <div className="relative z-10 space-y-4">
          <div className="h-12 w-12 rounded-lg bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 flex items-center justify-center transition-all duration-300">
            <Icon className="h-6 w-6" />
          </div>

          <div>
            <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors duration-200">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-200">
              {description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};
