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
        <AppPagination pageCount={pageCount} onPageChange={handlePageClick} />
      </div>
    </div>
  );
}
