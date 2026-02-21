'use client';

import { ChevronLeft, ChevronRight, MessageCircleQuestion } from 'lucide-react';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';

import { Product } from '@/shared/constants/mockData';

export interface ProductQAProps {
  product: Product;
}

export default function ProductQA({ product }: ProductQAProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const questionsList = product.questions || [];
  const pageCount = Math.ceil(questionsList.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = questionsList.slice(offset, offset + itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="flex flex-col gap-6 text-left">
      <h2 className="text-foreground mb-4 text-xl font-bold">Questions about this product ({questionsList.length})</h2>

      <div className="flex flex-col gap-8">
        {currentItems.length === 0 ? (
          <p className="text-muted-foreground">No questions have been asked yet.</p>
        ) : (
          currentItems.map((qa) => (
            <div key={qa.id} className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <MessageCircleQuestion className="text-foreground mt-0.5 h-5 w-5 shrink-0" />
                <div className="flex flex-col gap-1">
                  <p className="text-foreground font-semibold">{qa.q}</p>
                  <span className="text-muted-foreground text-xs">
                    {qa.questionedBy?.name || 'Anonymous User'} - {new Date(qa.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {qa.a && (
                <div className="bg-muted/30 mt-2 ml-8 flex items-start gap-3 rounded-md border p-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-primary text-xs font-semibold tracking-wider uppercase">Store Owner</span>
                    <p className="text-muted-foreground text-sm">{qa.a}</p>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="mt-8 border-t pt-8">
        <ReactPaginate
          breakLabel="..."
          nextLabel={
            <span className="flex items-center gap-1">
              Next <ChevronRight className="h-4 w-4" />
            </span>
          }
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel={
            <span className="flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" /> Prev
            </span>
          }
          renderOnZeroPageCount={null}
          containerClassName="flex flex-wrap items-center justify-end gap-2 text-sm font-medium mt-4 sm:mt-0"
          pageLinkClassName="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-md bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
          activeLinkClassName="bg-primary text-primary-foreground shadow-sm"
          previousLinkClassName="flex h-7 px-2 sm:h-9 sm:px-3 items-center justify-center rounded-md bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
          nextLinkClassName="flex h-7 px-2 sm:h-9 sm:px-3 items-center justify-center rounded-md bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
          disabledLinkClassName="opacity-50 cursor-not-allowed hover:bg-muted hover:text-muted-foreground"
        />
      </div>
    </div>
  );
}
