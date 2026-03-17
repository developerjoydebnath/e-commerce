'use client';

import ReviewModal from '@/modules/checkout/components/ReviewModal';
import { Button } from '@/shared/components/ui/button';
import { publicRoutes } from '@/shared/constants/routes';
import { useReviewsStore } from '@/shared/store/reviewsStore';
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  CreditCard,
  Package,
  Printer,
  RefreshCw,
  Star,
  Truck,
  XCircle,
} from 'lucide-react';
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
    date: 'Oct 25, 2023',
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
    date: 'Oct 26, 2023',
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
    date: 'Oct 27, 2023',
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
    date: 'Oct 20, 2023',
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
    date: 'Oct 15, 2023',
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

const ITEMS_PER_PAGE = 5;

export default function MyOrdersPageV3() {
  const [activeTab, setActiveTab] = useState<TabType>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const { hasReviewed } = useReviewsStore();

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [productToReview, setProductToReview] = useState<{ id: string; name: string; image: string } | null>(null);

  const openReviewModal = (item: OrderItem) => {
    setProductToReview({ id: item.productId, name: item.name, image: item.image });
    setIsReviewModalOpen(true);
  };

  const filteredOrders = MOCK_ORDERS.filter((order) => {
    if (activeTab === 'All') return true;
    return order.status === activeTab;
  });

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'Pending':
        return <Clock className="h-4 w-4" />;
      case 'Processing':
        return <AlertCircle className="h-4 w-4" />;
      case 'Shipped':
        return <Truck className="h-4 w-4" />;
      case 'Completed':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'Canceled':
        return <XCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'Pending':
        return 'text-amber-500 bg-amber-500/10';
      case 'Processing':
        return 'text-muted-foreground bg-muted';
      case 'Shipped':
        return 'text-blue-500 bg-blue-500/10';
      case 'Completed':
        return 'text-emerald-500 bg-emerald-500/10';
      case 'Canceled':
        return 'text-red-500 bg-red-500/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12">
          <h1 className="text-foreground text-4xl font-light tracking-tight">Orders</h1>
          <p className="text-muted-foreground mt-2 font-medium">History & Tracking</p>
        </header>

        {/* Minimal Tabs */}
        <nav className="border-border mb-12 flex items-center gap-8 border-b pb-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`relative pb-3 text-sm font-semibold transition-all ${
                activeTab === tab ? 'text-foreground' : 'text-muted-foreground hover:text-muted-foreground'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="bg-foreground text-background absolute bottom-0 left-0 h-0.5 w-full rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Vertical Timeline / List */}
        <div className="space-y-12">
          {paginatedOrders.length > 0 ? (
            paginatedOrders.map((order) => (
              <section key={order.id} className="group border-border relative border-l pl-8 sm:pl-12">
                {/* Timeline Dot */}
                <div
                  className={`absolute top-0 -left-1.5 h-3 w-3 rounded-full border-2 border-white ring-2 ${
                    order.status === 'Completed'
                      ? 'bg-emerald-500 ring-emerald-500'
                      : order.status === 'Canceled'
                        ? 'bg-red-500 ring-red-500'
                        : 'bg-background ring-border'
                  }`}
                />

                {/* Content */}
                <div className="flex flex-col gap-6">
                  {/* Order Meta */}
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="space-y-1">
                      <h2 className="text-foreground text-xl font-bold">{order.orderId}</h2>
                      <div className="text-muted-foreground flex items-center gap-3 text-sm">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> {order.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <CreditCard className="h-3 w-3" /> ৳{order.totalPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase ${getStatusColor(order.status)}`}
                    >
                      {getStatusIcon(order.status)}
                      {order.status}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="border-border bg-muted/50 hover:bg-muted/50 relative flex flex-col rounded-xl border p-4 transition-all"
                      >
                        <Link href={`${publicRoutes.PRODUCT(item.productId)}`} className="absolute inset-0 z-10" />
                        <div className="border-border bg-card relative mb-3 aspect-square w-full overflow-hidden rounded-lg border shadow-sm">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <h3 className="text-foreground mb-1 line-clamp-1 text-xs font-bold">{item.name}</h3>
                        <p className="text-muted-foreground text-[10px]">
                          Qty: {item.quantity} • ৳{item.price.toLocaleString()}
                        </p>

                        {order.status === 'Completed' && (
                          <div className="border-border/50 relative z-20 mt-4 flex items-center justify-between border-t pt-4">
                            <span className="text-primary text-[10px] font-bold tracking-tight uppercase">
                              {hasReviewed(item.productId) ? 'Reviewed' : 'Awaiting Review'}
                            </span>
                            {!hasReviewed(item.productId) && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openReviewModal(item)}
                                className="h-6 px-2 text-[10px] font-bold uppercase transition-transform active:scale-95"
                              >
                                Review <Star className="ml-1 h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Actions Bar */}
                  <div className="mt-2 flex flex-wrap items-center gap-4 py-4">
                    <Button
                      variant="outline"
                      className="border-border hover:bg-foreground text-background h-9 rounded-full px-6 text-xs font-bold tracking-widest uppercase transition-all hover:text-white"
                    >
                      Details <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-muted-foreground hover:text-foreground h-9 px-4 text-xs font-bold tracking-widest uppercase"
                    >
                      Print Invoice <Printer className="ml-2 h-4 w-4 opacity-50" />
                    </Button>

                    {order.status === 'Completed' ? (
                      <Button
                        variant="ghost"
                        className="text-primary hover:bg-primary/5 h-9 px-4 text-xs font-bold tracking-widest uppercase"
                      >
                        Buy Again <RefreshCw className="ml-2 h-4 w-4" />
                      </Button>
                    ) : order.status === 'Shipped' ? (
                      <Button
                        variant="ghost"
                        className="h-9 px-4 text-xs font-bold tracking-widest text-blue-600 uppercase hover:bg-blue-50"
                      >
                        Live Tracking <Truck className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      (order.status === 'Pending' || order.status === 'Processing') && (
                        <Button
                          variant="ghost"
                          className="h-9 px-4 text-xs font-bold tracking-widest text-red-500 uppercase hover:bg-red-50"
                        >
                          Request Cancellation <XCircle className="ml-2 h-4 w-4" />
                        </Button>
                      )
                    )}
                  </div>
                </div>
              </section>
            ))
          ) : (
            <div className="border-border bg-muted/50 flex flex-col items-center justify-center rounded-3xl border border-dashed px-6 py-20 text-center">
              <Package className="text-muted-foreground mb-6 h-16 w-16" />
              <h2 className="text-foreground mb-2 text-2xl font-light">Clean Slate</h2>
              <p className="text-muted-foreground mx-auto mb-8 max-w-xs text-sm">
                No orders found in this category. Time for some fresh gear?
              </p>
              <Button
                asChild
                className="bg-foreground text-background h-12 rounded-full px-10 text-sm font-bold tracking-widest uppercase"
              >
                <Link href={publicRoutes.SHOP}>Shop Collection</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Minimalist Pagination */}
        {totalPages > 1 && (
          <footer className="border-border mt-20 flex items-center justify-center border-t pt-8">
            <div className="border-border bg-muted/50 flex items-center rounded-full border p-1.5 shadow-sm">
              <Button
                variant="ghost"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="h-8 rounded-full px-4 text-[10px] font-bold tracking-widest uppercase"
              >
                Back
              </Button>
              <div className="flex items-center gap-2 px-4">
                <span className="text-foreground text-[10px] font-bold">{currentPage}</span>
                <span className="text-muted-foreground text-[10px]">/</span>
                <span className="text-muted-foreground text-[10px] font-bold">{totalPages}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="h-8 rounded-full px-4 text-[10px] font-bold tracking-widest uppercase"
              >
                Next
              </Button>
            </div>
          </footer>
        )}
      </div>

      <ReviewModal isOpen={isReviewModalOpen} onClose={() => setIsReviewModalOpen(false)} product={productToReview} />
    </div>
  );
}
