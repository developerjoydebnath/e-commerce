'use client';

import { Input } from '@/shared/components/ui/input';
import { cn } from '@/shared/lib/utils';
import { Eye, EyeOff } from 'lucide-react';
import { ComponentProps, useState } from 'react';

type PasswordInputProps = ComponentProps<typeof Input> & {
  name: string;
  placeholder?: string;
  hasError?: boolean;
  className?: string;
};

export default function PasswordInput({ name, placeholder, hasError, className, ...props }: PasswordInputProps) {
  const [passShow, setPassShow] = useState(false);
  const Icon = passShow ? EyeOff : Eye;

  return (
    <div className="relative">
      <Input
        id={name}
        type={passShow ? 'text' : 'password'}
        placeholder={placeholder}
        className={cn(
          '',
          hasError && 'border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive',
          className
        )}
        {...props}
      />
      <button
        aria-label="Toggle password visibility"
        type="button"
        onClick={() => setPassShow(!passShow)}
        tabIndex={-1}
        className="text-muted-foreground absolute top-1/2 right-1 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded"
      >
        <Icon size={20} />
      </button>
    </div>
  );
}
