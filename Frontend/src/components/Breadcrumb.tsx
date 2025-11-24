import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import cn from "../lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={cn("flex items-center gap-2 text-sm mb-6", className)}>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && (
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          )}
          {item.href ? (
            <Link
              to={item.href}
              className=" hover:text-black-text dark:hover:text-white/80  transition-colors font-medium"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-blue font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
