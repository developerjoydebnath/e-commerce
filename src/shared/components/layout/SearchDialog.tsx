'use client';

import { Button } from '@/shared/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/shared/components/ui/command';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog';
import { PackageX, Search, Type } from 'lucide-react';
import * as React from 'react';
import { Input } from '../ui/input';

export default function SearchDialog({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const [query, setQuery] = React.useState('');

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex h-[80vh] w-full max-w-[90vw] flex-col gap-0 overflow-hidden p-0 md:max-w-[70vw]">
        <DialogHeader className="sr-only">
          <DialogTitle>Search Products</DialogTitle>
        </DialogHeader>

        <div className="border-b p-6">
          <div className="focus-within:ring-primary/20 flex w-full items-center rounded-full border py-1 pr-2 pl-4 transition-shadow focus-within:ring-2">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Products ..."
              className="placeholder:text-muted-foreground h-10 flex-1 border-none bg-transparent text-sm shadow-none ring-0 outline-none focus-visible:ring-0"
            />

            <Button className="bg-primary/20 text-foreground hover:bg-primary/30 rounded-full px-4 text-xs shadow-none sm:px-8 sm:text-sm">
              Search
            </Button>
          </div>
        </div>

        <Command className="flex-1 rounded-none border-none bg-transparent shadow-none">
          <CommandList className="h-full max-h-none p-6">
            {query === '' ? (
              <div className="text-muted-foreground flex h-full flex-col items-center justify-center gap-4">
                <Type className="h-16 w-16 opacity-20" />
                <p className="text-lg">Type to search...</p>
              </div>
            ) : (
              <>
                <CommandEmpty>
                  <div className="text-muted-foreground flex flex-col items-center justify-center gap-4 p-8">
                    <PackageX className="h-16 w-16 opacity-20" />
                    <p className="text-lg">No product found.</p>
                  </div>
                </CommandEmpty>

                <CommandGroup heading="Suggestions">
                  <CommandItem onSelect={() => console.log('selected electronics')}>
                    <Search className="mr-2 h-4 w-4" />
                    <span>Electronics</span>
                  </CommandItem>
                  <CommandItem onSelect={() => console.log('selected fashion')}>
                    <Search className="mr-2 h-4 w-4" />
                    <span>Fashion</span>
                  </CommandItem>
                  <CommandItem onSelect={() => console.log('selected home')}>
                    <Search className="mr-2 h-4 w-4" />
                    <span>Home & Garden</span>
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
