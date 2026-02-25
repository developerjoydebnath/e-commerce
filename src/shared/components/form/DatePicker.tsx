'use client';

import { Button } from '@/shared/components/ui/button';
import { Calendar } from '@/shared/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import { cn } from '@/shared/lib/utils';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useState } from 'react';

export default function DatePicker({
  value,
  onValueChange,
  className,
  futureDaysDisabled,
}: {
  value: Date | undefined;
  onValueChange: (date: Date | undefined) => void;
  className?: string;
  futureDaysDisabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="w-full" asChild>
        <Button
          variant="secondary"
          size="lg"
          className={cn(
            'hover:bg-gray-25/5 h-9 w-full justify-start border bg-transparent text-sm text-gray-600',
            className
          )}
        >
          <CalendarIcon className="h-4 w-4 opacity-50" />
          {value ? format(value, 'dd-MM-yyyy') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-fit min-w-fit rounded-[10px] p-1 leading-6">
        <Calendar
          mode="single"
          selected={value}
          captionLayout="dropdown"
          defaultMonth={value}
          onSelect={(date) => {
            onValueChange(date);
            setOpen(false);
          }}
          classNames={{
            day_outside: 'day-outside !text-white ',
          }}
          disabled={futureDaysDisabled ? (date) => date > new Date() : false}
        />
      </PopoverContent>
    </Popover>
  );
}
