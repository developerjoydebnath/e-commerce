'use client';

import ReviewModal from '@/modules/checkout/components/ReviewModal';
import { Button } from '@/shared/components/ui/button';
import { publicRoutes } from '@/shared/constants/routes';
import { useReviewsStore } from '@/shared/store/reviewsStore';
import { Package, Printer, RefreshCw, Star, Truck, XCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// Define the Order type and statuses
type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Completed' | 'Canceled';

interface OrderItem {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
  productId: string;
}

interface Order {
  id: string;
  orderId: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  totalPrice: number;
}

// Mock Data
const MOCK_ORDERS: Order[] = [
  {
    id: '1',
    orderId: '#ORD-987654',
    date: '2023-10-25',
    status: 'Completed',
    totalPrice: 1250,
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
    id: '2',
    orderId: '#ORD-987655',
    date: '2023-10-26',
    status: 'Pending',
    totalPrice: 450,
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
  {
    id: '3',
    orderId: '#ORD-987656',
    date: '2023-10-27',
    status: 'Shipped',
    totalPrice: 89,
    items: [
      {
        id: 'item3',
        name: 'Ergonomic Vertical Mouse',
        image: '/images/products/product-3a.png',
        quantity: 2,
        price: 44.5,
        productId: 'prod_3',
      },
    ],
  },
  {
    id: '4',
    orderId: '#ORD-987657',
    date: '2023-10-20',
    status: 'Canceled',
    totalPrice: 120,
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
    id: '5',
    orderId: '#ORD-987658',
    date: '2023-10-15',
    status: 'Completed',
    totalPrice: 2950,
    items: [
      {
        id: 'item5',
        name: 'Ultra-Wide 34-inch Monitor',
        image: '/images/products/product-5a.png',
        quantity: 1,
        price: 2500,
        productId: 'prod_5',
      },
      {
        id: 'item6',
        name: 'Mechanical Gaming Keyboard RGB',
        image: '/images/products/product-2a.png',
        quantity: 1,
        price: 450,
        productId: 'prod_2',
      },
    ],
  },
];

const TABS = ['All', 'Pending', 'Shipped', 'Completed', 'Canceled'] as const;
type TabType = (typeof TABS)[number];

const ITEMS_PER_PAGE = 3;

export default function MyOrdersPage() {
  const [activeTab, setActiveTab] = useState<TabType>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const { hasReviewed } = useReviewsStore();

  // State for the Review Modal
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [productToReview, setProductToReview] = useState<{ id: string; name: string; image: string } | null>(null);

  const openReviewModal = (item: OrderItem) => {
    setProductToReview({ id: item.productId, name: item.name, image: item.image });
    setIsReviewModalOpen(true);
  };

  // Filter orders based on the active tab
  const filteredOrders = MOCK_ORDERS.filter((order) => {
    if (activeTab === 'All') return true;
    return order.status === activeTab;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // Handle Tab Change
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset to page 1 on tab change
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8 lg:px-0">
      <div className="flex flex-col gap-1">
        <h1 className="text-foreground text-3xl font-extrabold tracking-tight sm:text-4xl">My Orders</h1>
        <p className="text-muted-foreground text-sm">Track, manage and review your recent purchases.</p>
      </div>

      {/* Status Tabs - Glassmorphism Style */}
      <div className="sticky top-0 z-10 -mx-4 overflow-hidden px-4 py-2 backdrop-blur-md">
        <div className="hide-scrollbar flex w-full gap-2 overflow-x-auto pb-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`relative rounded-full px-5 py-2 text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-primary shadow-primary/25 ring-primary/10 text-white shadow-lg ring-2'
                  : 'border-border bg-card/80 text-muted-foreground hover:bg-card hover:text-foreground border shadow-sm'
              }`}
            >
              {tab}
              {tab === 'All' && (
                <span
                  className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${activeTab === tab ? 'bg-white/20 text-white' : 'bg-muted text-muted-foreground'}`}
                >
                  {MOCK_ORDERS.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Order List */}
      <div className="grid gap-6 sm:grid-cols-1">
        {paginatedOrders.length > 0 ? (
          paginatedOrders.map((order) => (
            <div
              key={order.id}
              className="group border-border bg-card text-card-foreground hover:shadow-primary/10 relative flex flex-col overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:shadow-xl"
            >
              {/* Status Badge - Absolute on Mobile, Top Right */}
              <div className="absolute top-4 right-4 z-10">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold tracking-wider uppercase ring-1 ring-inset ${
                    order.status === 'Completed'
                      ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20'
                      : order.status === 'Shipped'
                        ? 'bg-blue-50 text-blue-700 ring-blue-600/20'
                        : order.status === 'Canceled'
                          ? 'bg-red-50 text-red-700 ring-red-600/20'
                          : 'bg-amber-50 text-amber-700 ring-amber-600/20'
                  }`}
                >
                  <span
                    className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                      order.status === 'Completed'
                        ? 'bg-emerald-500'
                        : order.status === 'Shipped'
                          ? 'bg-blue-500'
                          : order.status === 'Canceled'
                            ? 'bg-red-500'
                            : 'bg-amber-500'
                    }`}
                  />
                  {order.status}
                </span>
              </div>

              {/* Card Content */}
              <div className="flex flex-col p-5 sm:p-6">
                {/* Header Info */}
                <div className="mb-6 flex flex-col gap-1 pr-24">
                  <span className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
                    Order {order.orderId}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-foreground text-xl font-bold">৳{order.totalPrice.toLocaleString()}</span>
                    <span className="text-muted-foreground text-xs">•</span>
                    <span className="text-muted-foreground text-xs font-medium">{order.date}</span>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 transition-opacity group-hover:opacity-100">
                      <div className="border-border bg-muted/50 relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border shadow-inner">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>

                      <div className="flex min-w-0 flex-1 flex-col justify-center">
                        <Link
                          href={`${publicRoutes.PRODUCT(item.productId)}`}
                          className="hover:text-primary text-foreground line-clamp-1 text-sm font-bold transition-colors"
                        >
                          {item.name}
                        </Link>
                        <div className="text-muted-foreground mt-1 flex items-center gap-2 text-xs">
                          <span>Qty: {item.quantity}</span>
                          <span>•</span>
                          <span>৳{item.price.toLocaleString()}</span>
                        </div>

                        {order.status === 'Completed' && (
                          <div className="mt-3">
                            <Button
                              variant="link"
                              size="sm"
                              disabled={hasReviewed(item.productId)}
                              onClick={() => !hasReviewed(item.productId) && openReviewModal(item)}
                              className={`h-auto p-0 text-xs font-bold tracking-tight uppercase ${
                                hasReviewed(item.productId)
                                  ? 'flex cursor-default items-center gap-1 text-emerald-600 opacity-80'
                                  : 'text-primary hover:text-primary/80'
                              }`}
                            >
                              {hasReviewed(item.productId) ? (
                                <>
                                  Reviewed <Star className="h-3 w-3 fill-emerald-500" />
                                </>
                              ) : (
                                'Write a Review'
                              )}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Actions - Compact Footer */}
              <div className="divide-border border-border bg-muted/50 mt-auto grid grid-cols-2 divide-x border-t">
                <button className="text-muted-foreground hover:bg-muted hover:text-foreground flex h-12 items-center justify-center gap-2 text-[10px] font-bold tracking-widest uppercase transition-colors">
                  <Printer className="h-4 w-4" /> Receipt
                </button>

                {order.status === 'Completed' ? (
                  <button className="text-primary hover:bg-primary/5 flex h-12 items-center justify-center gap-2 text-[10px] font-bold tracking-widest uppercase transition-colors">
                    <RefreshCw className="h-4 w-4" /> Reorder
                  </button>
                ) : order.status === 'Pending' || order.status === 'Processing' ? (
                  <button className="flex h-12 items-center justify-center gap-2 text-[10px] font-bold tracking-widest text-red-500 uppercase transition-colors hover:bg-red-50">
                    <XCircle className="h-4 w-4" /> Cancel
                  </button>
                ) : order.status === 'Shipped' ? (
                  <button className="flex h-12 items-center justify-center gap-2 text-[10px] font-bold tracking-widest text-blue-600 uppercase transition-colors hover:bg-blue-50">
                    <Truck className="h-4 w-4" /> Track
                  </button>
                ) : (
                  <div className="text-muted-foreground flex h-12 items-center justify-center px-4 text-[10px] font-bold tracking-widest uppercase italic">
                    Closed
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="border-border bg-muted/50 flex flex-col items-center justify-center rounded-3xl border border-dashed px-6 py-20 text-center">
            <div className="bg-background ring-muted mb-6 flex h-20 w-20 items-center justify-center rounded-full shadow-sm ring-4">
              <Package className="text-muted-foreground h-10 w-10" />
            </div>
            <h3 className="text-foreground text-xl font-bold">No orders yet</h3>
            <p className="text-muted-foreground mt-2 max-w-[240px] text-sm">
              Looks like you haven&apos;t placed any orders in this category yet.
            </p>
            <Button
              asChild
              className="bg-foreground text-background mt-8 rounded-full px-8 py-6 text-sm font-bold transition-transform hover:scale-105 active:scale-95"
            >
              <Link href={publicRoutes.SHOP}>Start Shopping</Link>
            </Button>
          </div>
        )}
      </div>

      {/* Pagination - Minimalist */}
      {totalPages > 1 && (
        <div className="border-border flex items-center justify-between border-t pt-8 pb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="text-muted-foreground hover:text-foreground h-10 px-4 text-xs font-bold tracking-widest uppercase"
          >
            Prev
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`h-8 w-8 rounded-full text-xs font-bold transition-all ${
                  currentPage === i + 1
                    ? 'bg-foreground text-background shadow-md'
                    : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="text-muted-foreground hover:text-foreground h-10 px-4 text-xs font-bold tracking-widest uppercase"
          >
            Next
          </Button>
        </div>
      )}

      {/* Review Modal */}
      <ReviewModal isOpen={isReviewModalOpen} onClose={() => setIsReviewModalOpen(false)} product={productToReview} />
    </div>
  );
}
