import { cn } from '@/shared/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export interface CategoryCardProps {
  id: string | number;
  name: string;
  count: string | number;
  href: string;
  image: string;
  className?: string; // Allow passing custom structural classes
}

export default function CategoryCard({ id, name, count, href, image, className }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group bg-card relative flex flex-col justify-center overflow-hidden rounded-xl border p-4 transition-all duration-300 hover:shadow-md',
        className
      )}
    >
      {/* Background glow effect on hover */}
      <div className="from-primary/5 absolute inset-0 bg-linear-to-br to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10 flex items-center gap-4">
        <div className="bg-muted border-border/50 relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border shadow-sm">
          <Image
            src={image || '/assets/promo_1.png'}
            alt={name}
            fill
            className="object-cover transition-transform duration-500"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h4 className="text-foreground group-hover:text-primary mb-1 text-base font-bold transition-colors">
            {name}
          </h4>
          <p className="text-muted-foreground text-xs font-medium">{count} Products</p>
        </div>
      </div>
    </Link>
  );
}
