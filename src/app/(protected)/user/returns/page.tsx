'use client';

import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog';
import { Label } from '@/shared/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { Textarea } from '@/shared/components/ui/textarea';
import { publicRoutes } from '@/shared/constants/routes';
import { RotateCcw } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// Define the Return type and statuses
type ReturnStatus = 'Pending' | 'Approved' | 'Refunded' | 'Rejected';

interface ReturnItem {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
  productId: string;
}

interface ReturnRecord {
  id: string;
  returnId: string;
  orderId: string;
  date: string;
  status: ReturnStatus;
  reason: string;
  refundAmount: number;
  items: ReturnItem[];
}

// Mock Data
const MOCK_RETURNS: ReturnRecord[] = [
  {
    id: 'ret1',
    returnId: '#RET-54321',
    orderId: '#ORD-987654',
    date: '2023-10-28',
    status: 'Pending',
    reason: 'Product arrived damaged',
    refundAmount: 1250,
    items: [
      {
        id: 'item1',
        name: 'Wireless Noise-Cancelling Headphones Pro',
        image: '/images/products/product-1a.png',
        quantity: 1,
        price: 1250,
        productId: 'prod_1',
      },
    ],
  },
  {
    id: 'ret2',
    returnId: '#RET-54322',
    orderId: '#ORD-987656',
    date: '2023-10-22',
    status: 'Approved',
    reason: 'Item defective',
    refundAmount: 44.5,
    items: [
      {
        id: 'item3',
        name: 'Ergonomic Vertical Mouse',
        image: '/images/products/product-3a.png',
        quantity: 1,
        price: 44.5,
        productId: 'prod_3',
      },
    ],
  },
  {
    id: 'ret3',
    returnId: '#RET-54323',
    orderId: '#ORD-987657',
    date: '2023-10-10',
    status: 'Refunded',
    reason: 'Changed mind after ordering',
    refundAmount: 120,
    items: [
      {
        id: 'item4',
        name: 'Smart Desk Lamp',
        image: '/images/products/product-4a.png',
        quantity: 1,
        price: 120,
        productId: 'prod_4',
      },
    ],
  },
  {
    id: 'ret4',
    returnId: '#RET-54324',
    orderId: '#ORD-987655',
    date: '2023-10-05',
    status: 'Rejected',
    reason: 'Past the 30-day return window',
    refundAmount: 450,
    items: [
      {
        id: 'item2',
        name: 'Mechanical Gaming Keyboard RGB',
        image: '/images/products/product-2a.png',
        quantity: 1,
        price: 450,
        productId: 'prod_2',
      },
    ],
  },
];

const COMPLETED_ORDERS = [
  {
    id: '#ORD-987654',
    date: '2023-10-25',
    totalAmount: 1250,
    items: [
      {
        id: 'item1',
        name: 'Wireless Noise-Cancelling Headphones Pro',
        image: '/images/products/product-1a.png',
        quantity: 1,
        price: 1250,
        productId: 'prod_1',
      },
    ],
  },
  {
    id: '#ORD-987658',
    date: '2023-10-15',
    totalAmount: 2950,
    items: [
      {
        id: 'item5',
        name: 'Ultra-Wide 34-inch Monitor',
        image: '/images/products/product-5a.png',
        quantity: 1,
        price: 2500,
        productId: 'prod_5',
      },
    ],
  },
];

const ITEMS_PER_PAGE = 3;

export default function MyReturnsPage() {
  const [returns, setReturns] = useState<ReturnRecord[]>(MOCK_RETURNS);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string>('');
  const [returnReason, setReturnReason] = useState<string>('');

  // Calculate pagination
  const totalPages = Math.ceil(returns.length / ITEMS_PER_PAGE);
  const paginatedReturns = returns.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleMakeReturn = () => {
    if (!selectedOrderId || !returnReason) return;

    const selectedOrder = COMPLETED_ORDERS.find((o) => o.id === selectedOrderId);
    if (!selectedOrder) return;

    const newReturn: ReturnRecord = {
      id: `ret${Date.now()}`,
      returnId: `#RET-${Math.floor(Math.random() * 90000) + 10000}`,
      orderId: selectedOrder.id,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending',
      reason: returnReason,
      refundAmount: selectedOrder.totalAmount,
      items: selectedOrder.items.map((item) => ({ ...item })),
    };

    setReturns([newReturn, ...returns]);
    setIsDialogOpen(false);
    setSelectedOrderId('');
    setReturnReason('');
  };

  // Helper function to get status background colors
  const getStatusColor = (status: ReturnStatus) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-100 text-amber-800';
      case 'Approved':
        return 'bg-blue-100 text-blue-800';
      case 'Refunded':
        return 'bg-emerald-100 text-emerald-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-zinc-100 text-zinc-800';
    }
  };

  return (
    <div className="flex flex-col gap-6 lg:pr-10">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-zinc-900">My Returns</h1>
          <p className="text-sm text-zinc-500">Track and manage your returned items and refund statuses.</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Make Return</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Make a Return</DialogTitle>
              <DialogDescription>Select a completed order and provide a reason for the return.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="order">Select Order</Label>
                <Select value={selectedOrderId} onValueChange={setSelectedOrderId}>
                  <SelectTrigger id="order">
                    <SelectValue placeholder="Select an order" />
                  </SelectTrigger>
                  <SelectContent>
                    {COMPLETED_ORDERS.map((order) => (
                      <SelectItem key={order.id} value={order.id}>
                        {order.id} ({order.date})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="reason">Reason for Return</Label>
                <Textarea
                  id="reason"
                  placeholder="Tell us why you're returning this item..."
                  value={returnReason}
                  onChange={(e) => setReturnReason(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleMakeReturn} disabled={!selectedOrderId || !returnReason}>
                Submit Request
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Returns List */}
      <div className="flex flex-col gap-6">
        {paginatedReturns.length > 0 ? (
          paginatedReturns.map((record) => (
            <div key={record.id} className="flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white">
              {/* Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-100 bg-zinc-50 px-6 py-4 sm:flex-nowrap">
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex flex-col">
                    <span className="text-xs text-zinc-500 uppercase">Return ID</span>
                    <span className="font-semibold text-zinc-900">{record.returnId}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-zinc-500 uppercase">Original Order</span>
                    <span className="font-medium text-zinc-700">{record.orderId}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-zinc-500 uppercase">Date Requested</span>
                    <span className="font-medium text-zinc-700">{record.date}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-zinc-500 uppercase">Est. Refund</span>
                    <span className="text-primary font-medium tracking-tight">
                      ৳ {record.refundAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase ${getStatusColor(record.status)}`}
                  >
                    {record.status}
                  </span>
                </div>
              </div>

              {/* Card Body - Items */}
              <div className="flex flex-col px-6 py-4">
                {record.items.map((item, index) => (
                  <div
                    key={item.id}
                    className={`flex flex-col items-center gap-4 py-4 sm:flex-row ${index > 0 ? 'border-t border-zinc-100' : ''}`}
                  >
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border border-zinc-200">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>

                    <div className="flex flex-1 flex-col justify-between gap-2 sm:flex-row sm:items-center">
                      <div className="flex flex-col">
                        <Link
                          href={`${publicRoutes.PRODUCT(item.productId)}`}
                          className="hover:text-primary line-clamp-2 font-semibold text-zinc-900 transition-colors"
                        >
                          {item.name}
                        </Link>
                        <span className="text-sm text-zinc-500">
                          Qty: {item.quantity} • ৳ {item.price.toLocaleString()} each
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Card Footer - Reason */}
              <div className="flex items-center justify-between border-t border-zinc-100 bg-zinc-50 px-6 py-3">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <span className="text-xs font-medium text-zinc-500">Reason for Return:</span>
                  <span className="text-sm text-zinc-800">{record.reason}</span>
                </div>

                {record.status === 'Rejected' && (
                  <Button variant="link" className="h-auto p-0 text-blue-600">
                    View Details
                  </Button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-200 bg-zinc-50 p-12">
            <RotateCcw className="mb-4 h-12 w-12 text-zinc-400" />
            <p className="text-lg font-medium text-zinc-900">No returns found</p>
            <p className="max-w-sm text-center text-sm text-zinc-500">You haven&apos;t filed any returns yet.</p>
            <Button asChild className="mt-6 rounded-full px-8">
              <Link href={publicRoutes.SHOP}>Continue Shopping</Link>
            </Button>
          </div>
        )}
      </div>

      {/* Pagination UI */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center pt-8">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="h-9"
            >
              Previous
            </Button>

            <div className="flex items-center">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors ${
                    currentPage === i + 1 ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:bg-zinc-100'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="h-9"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
