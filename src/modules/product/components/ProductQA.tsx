'use client';

import AppPagination from '@/shared/components/ui/app-pagination';
import { MessageCircleQuestion } from 'lucide-react';
import { useState } from 'react';

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
      <h2 className="text-foreground mb-4 text-lg font-bold sm:text-xl">
        Questions about this product ({questionsList.length})
      </h2>

      <div className="flex flex-col gap-6 sm:gap-8">
        {currentItems.length === 0 ? (
          <p className="text-muted-foreground">No questions have been asked yet.</p>
        ) : (
          currentItems.map((qa) => (
            <div key={qa.id} className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <MessageCircleQuestion className="text-foreground mt-0.5 h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
                <div className="flex flex-col gap-1">
                  <p className="text-foreground text-sm font-semibold sm:text-base">{qa.q}</p>
                  <span className="text-muted-foreground text-xs">
                    {qa.questionedBy?.name || 'Anonymous User'} - {new Date(qa.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {qa.a && (
                <div className="bg-muted/30 ml-8 flex items-start gap-3 rounded-md border p-3 sm:mt-2 sm:p-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-primary text-xs font-semibold tracking-wider uppercase">Store Owner</span>
                    <p className="text-muted-foreground text-xs sm:text-sm">{qa.a}</p>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <AppPagination pageCount={pageCount} onPageChange={handlePageClick} />
    </div>
  );
}
