'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import ReactPaginate from 'react-paginate';

interface AppPaginationProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  forcePage?: number;
}

export default function AppPagination({ pageCount, onPageChange, forcePage }: AppPaginationProps) {
  if (pageCount <= 1) return null;

  return (
    <div className="mt-10 flex justify-center lg:justify-end">
      <ReactPaginate
        breakLabel={
          <span className="bg-muted flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-sm font-medium">
            ...
          </span>
        }
        nextLabel={
          <span className="bg-muted hover:bg-muted/80 flex h-10 cursor-pointer items-center justify-center gap-1 rounded-md px-4 text-sm font-semibold transition-colors">
            Next <ChevronRight className="h-4 w-4" />
          </span>
        }
        onPageChange={onPageChange}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        forcePage={forcePage}
        previousLabel={
          <span className="bg-muted hover:bg-muted/80 flex h-10 cursor-pointer items-center justify-center gap-1 rounded-md px-4 text-sm font-semibold transition-colors">
            <ChevronLeft className="h-4 w-4" /> Prev
          </span>
        }
        containerClassName="flex items-center gap-2"
        pageLinkClassName="flex h-10 w-10 items-center justify-center rounded-md bg-muted text-sm font-medium transition-colors hover:bg-muted/80 cursor-pointer"
        activeLinkClassName="!bg-primary text-primary-foreground pointer-events-none cursor-pointer"
        disabledLinkClassName="opacity-50 cursor-not-allowed hidden cursor-pointer"
      />
    </div>
  );
}
