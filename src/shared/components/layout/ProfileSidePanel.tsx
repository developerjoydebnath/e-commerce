'use client';

import { profileMenuItems } from '@/shared/constants/profileMenu';
import { cn } from '@/shared/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ProfileSidePanel({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <div className={cn('flex w-full max-w-[280px] flex-col gap-8', className)}>
      {profileMenuItems.map((section, idx) => (
        <div key={idx} className="flex flex-col gap-4">
          <h3 className="text-foreground text-sm font-bold tracking-wider uppercase">{section.category}</h3>
          <div className="flex flex-col gap-1">
            {section.items.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={false}
                  className={cn(
                    'flex items-center gap-3 rounded-md px-4 py-2.5 text-sm font-medium transition-all',
                    isActive
                      ? 'border-primary bg-muted text-foreground border-l-4'
                      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                  )}
                >
                  <Icon className={cn('h-4 w-4', isActive ? 'text-primary' : 'text-muted-foreground')} />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
