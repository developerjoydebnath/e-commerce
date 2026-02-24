'use client';

import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { cn } from '@/shared/lib/utils';
import { Box, CheckCircle2, ChevronRight, Clock, Info, MapPin, Package, Search, Truck } from 'lucide-react';
import { useState } from 'react';

const STEPS = [
  { id: 'pending', label: 'Order Pending', icon: Clock, description: 'We have received your order' },
  { id: 'processing', label: 'Processing', icon: Box, description: 'Your order is being prepared' },
  { id: 'shipped', label: 'Shipped', icon: Truck, description: 'Order is on the way to you' },
  { id: 'delivered', label: 'Delivered', icon: CheckCircle2, description: 'Order has been delivered' },
];

export default function OrderTrackingPage() {
  const [orderId, setOrderId] = useState('');
  const [contact, setContact] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [currentStep, setCurrentStep] = useState(2); // Mocked progress (Shipped)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);

    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
      setShowResults(true);
      // Randomize step between 1 and 3 for variety in demo
      setCurrentStep(Math.floor(Math.random() * 3) + 1);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-zinc-900 md:text-5xl lg:text-6xl">
              Track your <span className="text-primary">Order</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-500">
              Enter your order details below to see the real-time status of your package. No login required.
            </p>
          </div>
        </div>

        {/* Tracking Form */}
        <div className="mb-16">
          <Card className="rounded-3xl border-zinc-200 bg-white p-0 shadow-2xl shadow-zinc-200/50 sm:rounded-4xl sm:p-2 md:rounded-[2.5rem]">
            <CardContent className="p-6 sm:p-8 md:p-12">
              <form onSubmit={handleSearch} className="grid grid-cols-1 gap-6 md:grid-cols-3 md:items-end">
                <div className="space-y-2">
                  <Label htmlFor="order-id" className="text-xs font-black tracking-widest text-zinc-400 uppercase">
                    Order ID
                  </Label>
                  <div className="relative">
                    <Input
                      id="order-id"
                      placeholder="e.g. #ORD-12345"
                      className="focus:ring-primary h-12 rounded-xl border-zinc-200 bg-zinc-50/50 pl-11 focus:bg-white sm:h-14 sm:rounded-2xl"
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      required
                    />
                    <Package className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact" className="text-xs font-black tracking-widest text-zinc-400 uppercase">
                    Email or Mobile
                  </Label>
                  <div className="relative">
                    <Input
                      id="contact"
                      placeholder="name@example.com"
                      className="focus:ring-primary h-12 rounded-lg border-zinc-200 bg-zinc-50/50 pl-11 focus:bg-white sm:h-14 sm:rounded-2xl"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      required
                    />
                    <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={isSearching}
                  className="bg-primary shadow-primary/20 h-12 rounded-xl text-sm font-black tracking-wider text-white uppercase disabled:opacity-70 sm:h-14 sm:rounded-2xl sm:tracking-widest"
                >
                  {isSearching ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      Track Order
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Results with Stepper */}
        {showResults && (
          <div className="space-y-8">
            {/* Order Info Card */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <Card className="rounded-2xl border-zinc-200 py-0 shadow-lg shadow-zinc-200/30 sm:rounded-3xl md:py-4">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="bg-primary/10 text-primary rounded-2xl p-3">
                    <Package className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-black tracking-widest text-zinc-400 uppercase">Order ID</p>
                    <p className="font-bold text-zinc-900">{orderId || '#ORD-88294'}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-2xl border-zinc-200 py-0 shadow-lg shadow-zinc-200/30 md:rounded-3xl md:py-4">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="rounded-2xl bg-orange-100 p-3 text-orange-600">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-black tracking-widest text-zinc-400 uppercase">Order Date</p>
                    <p className="font-bold text-zinc-900">Feb 24, 2026</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-2xl border-zinc-200 py-0 shadow-lg shadow-zinc-200/30 md:rounded-3xl md:py-4">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="rounded-2xl bg-blue-100 p-3 text-blue-600">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-black tracking-widest text-zinc-400 uppercase">Destination</p>
                    <p className="font-bold text-zinc-900">Dhaka, Bangladesh</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* STUNNING STEPPER (Static) */}
            <Card className="overflow-hidden rounded-3xl border-zinc-200 bg-white p-0 shadow-2xl shadow-zinc-200/50 sm:rounded-4xl md:rounded-[2.5rem]">
              <CardContent className="p-6 sm:p-10 md:p-16">
                <div className="relative">
                  {/* Progress Bar Background */}
                  <div className="absolute top-[30px] bottom-[30px] left-[22px] w-1 rounded-full bg-zinc-100 sm:left-[30px] md:top-[30px] md:right-0 md:bottom-auto md:left-0 md:h-1 md:w-full" />

                  {/* Progress Path (Static) - Desktop */}
                  <div
                    className="bg-primary absolute left-0 hidden h-1 rounded-full sm:top-[30px] md:block"
                    style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
                  />

                  {/* Progress Path (Static) - Mobile */}
                  <div
                    className="bg-primary absolute top-[30px] left-[22px] w-1 rounded-full sm:left-[30px] md:hidden"
                    style={{ height: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
                  />

                  {/* Steps */}
                  <div className="relative flex flex-col gap-12 md:flex-row md:justify-between md:gap-4">
                    {STEPS.map((step, index) => {
                      const Icon = step.icon;
                      const isCompleted = index <= currentStep;
                      const isActive = index === currentStep;

                      return (
                        <div
                          key={step.id}
                          className="flex flex-1 items-start gap-6 md:flex-col md:items-center md:gap-4 md:text-center"
                        >
                          <div
                            className={cn(
                              'relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl sm:h-16 sm:w-16 sm:rounded-2xl',
                              isCompleted ? 'bg-primary text-white' : 'border-2 border-zinc-100 bg-white text-zinc-300'
                            )}
                          >
                            <Icon className={cn('h-6 w-6')} />
                          </div>

                          <div className="flex flex-col gap-1">
                            <h4
                              className={cn(
                                'text-sm font-black tracking-widest uppercase',
                                isCompleted ? 'text-zinc-900' : 'text-zinc-300'
                              )}
                            >
                              {step.label}
                            </h4>
                            <p className="line-clamp-2 max-w-[150px] text-sm text-zinc-500 md:max-w-none">
                              {isCompleted ? step.description : 'Pending next step'}
                            </p>
                            {isActive && (
                              <div className="text-primary bg-primary/10 mt-2 inline-flex w-fit items-center gap-1 rounded-full px-3 py-1 text-[10px] font-bold md:mx-auto">
                                IN PROGRESS
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>

              {/* Footer Info */}
              <div className="flex flex-col items-center justify-between gap-4 border-t border-zinc-100 bg-zinc-50 px-10 py-6 md:flex-row">
                <div className="flex flex-wrap items-center justify-center gap-2 text-center text-sm text-zinc-500 md:justify-start md:text-left">
                  <Info className="h-4 w-4 text-zinc-400" />
                  Estimating delivery: <span className="font-bold text-zinc-900">Tomorrow, by 10:00 PM</span>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" className="h-10 rounded-xl border-zinc-200 px-6">
                    View Details
                  </Button>
                  <Button className="h-10 rounded-xl bg-zinc-900 px-6 text-white hover:bg-zinc-800">Support</Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
