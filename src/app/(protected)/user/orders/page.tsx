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

  // Helper function to get status background colors
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'Pending':
      case 'Processing':
        return 'bg-amber-100 text-amber-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-emerald-100 text-emerald-800';
      case 'Canceled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-zinc-100 text-zinc-800';
    }
  };

  return (
    <div className="flex flex-col gap-6 lg:pr-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-zinc-900">My Orders</h1>

        {/* Status Tabs */}
        <div className="hide-scrollbar flex w-full overflow-x-auto border-b border-zinc-200">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`mr-6 border-b-2 px-1 pb-3 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-zinc-500 hover:text-zinc-900'
              }`}
            >
              {tab}
              {tab === 'All' && ` (${MOCK_ORDERS.length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Order List */}
      <div className="flex flex-col gap-6">
        {paginatedOrders.length > 0 ? (
          paginatedOrders.map((order) => (
            <div key={order.id} className="flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white">
              {/* Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-100 bg-zinc-50 px-6 py-4 sm:flex-nowrap">
                <div className="flex items-center gap-6">
                  <div className="flex flex-col">
                    <span className="text-xs text-zinc-500 uppercase">Order ID</span>
                    <span className="font-semibold text-zinc-900">{order.orderId}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-zinc-500 uppercase">Order Date</span>
                    <span className="font-medium text-zinc-700">{order.date}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-zinc-500 uppercase">Total Amount</span>
                    <span className="text-primary font-medium tracking-tight">
                      ৳ {order.totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase ${getStatusColor(order.status)}`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Card Body - Items */}
              <div className="flex flex-col px-6 py-4">
                {order.items.map((item, index) => (
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

                      {order.status === 'Completed' && (
                        <Button
                          variant={hasReviewed(item.productId) ? 'secondary' : 'outline'}
                          size="sm"
                          disabled={hasReviewed(item.productId)}
                          onClick={() => !hasReviewed(item.productId) && openReviewModal(item)}
                          className={
                            hasReviewed(item.productId)
                              ? 'text-zinc-500'
                              : 'text-primary border-primary/20 hover:bg-primary/5'
                          }
                        >
                          {hasReviewed(item.productId) ? (
                            <>
                              Reviewed <Star className="ml-1 h-3 w-3 fill-zinc-400 text-zinc-400" />
                            </>
                          ) : (
                            'Write a Review'
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Card Footer - Actions */}
              <div className="flex items-center justify-between border-t border-zinc-100 bg-zinc-50 px-6 py-4">
                <Button variant="ghost" className="-ml-2 h-9 px-3 text-zinc-600 hover:text-zinc-900">
                  <Printer className="mr-2 h-4 w-4" /> Print Receipt
                </Button>

                <div className="flex items-center gap-3">
                  {(order.status === 'Pending' || order.status === 'Processing') && (
                    <Button
                      variant="outline"
                      className="h-9 border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
                    >
                      <XCircle className="mr-2 h-4 w-4" /> Cancel Order
                    </Button>
                  )}

                  {order.status === 'Shipped' && (
                    <Button className="h-9 bg-blue-600 hover:bg-blue-700">
                      <Truck className="mr-2 h-4 w-4" /> Track Order
                    </Button>
                  )}

                  {order.status === 'Completed' && (
                    <Button variant="outline" className="h-9">
                      <RefreshCw className="mr-2 h-4 w-4" /> Order Again
                    </Button>
                  )}

                  {order.status === 'Canceled' && (
                    <span className="hidden text-sm text-zinc-500 sm:inline-block">This order was canceled.</span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-200 bg-zinc-50 p-12">
            <Package className="mb-4 h-12 w-12 text-zinc-400" />
            <p className="text-lg font-medium text-zinc-900">No orders found</p>
            <p className="max-w-sm text-center text-sm text-zinc-500">
              We couldn&apos;t find any orders matching the &quot;{activeTab}&quot; status.
            </p>
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

      {/* Review Modal */}
      <ReviewModal isOpen={isReviewModalOpen} onClose={() => setIsReviewModalOpen(false)} product={productToReview} />
    </div>
  );
}
