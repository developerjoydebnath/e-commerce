'use client';

import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';
import { useCompareStore } from '@/shared/store/compareStore';
import { AnimatePresence, motion } from 'framer-motion';
import { Repeat } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CompareButton() {
  const items = useCompareStore((state) => state.items);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {items.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="fixed right-6 bottom-6 z-50 sm:right-8 sm:bottom-8"
        >
          <Link prefetch={false} href="/compare" passHref>
            <Button
              size="icon"
              className={cn(
                'relative h-12 w-12 rounded-full shadow-lg transition-all hover:shadow-xl',
                'bg-blue-600 text-white hover:bg-blue-700'
              )}
              aria-label="Compare Products"
            >
              <Repeat className="h-6 w-6" />

              {/* Count Badge */}
              <motion.span
                key={items.length}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white shadow ring-2 ring-white dark:ring-gray-900"
              >
                {items.length}
              </motion.span>
            </Button>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
