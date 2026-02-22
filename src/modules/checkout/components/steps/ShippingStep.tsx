'use client';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { cn } from '@/shared/lib/utils';
import { SavedAddress, useCheckoutStore } from '@/shared/store/checkoutStore';
import { Edit, MapPin, Truck, Zap } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useState } from 'react';

// Dynamic import for Leaflet to fix SSR window issues
const LocationMap = dynamic(() => import('@/modules/checkout/components/maps/LocationMap'), {
  ssr: false,
  loading: () => <div className="bg-muted h-[300px] w-full animate-pulse rounded-md" />,
});

export default function ShippingStep() {
  const store = useCheckoutStore();

  // Local state for address form
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<SavedAddress>>({
    name: '',
    phone: '',
    division: '',
    district: '',
    upazila: '',
    fullAddress: '',
  });

  const handleEdit = (addr: SavedAddress) => {
    setFormData(addr);
    setEditingId(addr.id);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setFormData({
      name: '',
      phone: '',
      division: '',
      district: '',
      upazila: '',
      fullAddress: '',
    });
    setEditingId(null);
    setShowForm(true);
  };

  const handleSaveAddress = () => {
    // Basic validation
    if (!formData.name || !formData.phone || !formData.fullAddress) {
      alert('Please fill in the required fields (Name, Phone, Full Address).');
      return;
    }

    if (editingId) {
      store.editAddress(editingId, formData as Omit<SavedAddress, 'id'>);
    } else {
      store.addAddress(formData as Omit<SavedAddress, 'id'>);
    }
    setShowForm(false);
  };

  const handleMapPositionChange = (pos: { lat: number; lng: number }) => {
    setFormData((prev) => ({ ...prev, lat: pos.lat, lng: pos.lng }));
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Saved Addresses Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Shipping Address</h2>
          {!showForm && (
            <Button variant="outline" size="sm" onClick={handleAddNew}>
              + Add New Address
            </Button>
          )}
        </div>

        {!showForm ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {store.savedAddresses.length > 0 ? (
              store.savedAddresses.map((addr) => {
                const isSelected = store.selectedAddressId === addr.id;
                return (
                  <div
                    key={addr.id}
                    onClick={() => store.setSelectedAddress(addr.id)}
                    className={cn(
                      'relative flex cursor-pointer flex-col gap-2 rounded-xl border p-4 transition-all',
                      isSelected ? 'border-primary bg-primary/5 ring-primary ring-1' : 'hover:border-primary/50'
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className={cn('h-4 w-4', isSelected ? 'text-primary' : 'text-muted-foreground')} />
                        <span className="text-foreground font-semibold">{addr.name}</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(addr);
                        }}
                        className="text-muted-foreground hover:text-primary flex items-center gap-1 text-xs transition-colors"
                      >
                        <Edit className="h-3 w-3" /> Edit
                      </button>
                    </div>

                    <div className="text-muted-foreground mt-2 flex flex-col gap-1 text-sm">
                      <span>{addr.phone}</span>
                      <span>{addr.fullAddress}</span>
                      <span>
                        {addr.upazila}, {addr.district}, {addr.division}
                      </span>
                    </div>

                    {isSelected && (
                      <div className="bg-primary text-primary-foreground absolute -top-2 -right-2 rounded-full px-2 py-0.5 text-[10px] font-bold shadow-sm">
                        SELECTED
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="bg-muted/30 col-span-full rounded-lg border border-dashed py-8 text-center">
                <p className="text-muted-foreground">No saved addresses found.</p>
                <Button variant="link" onClick={handleAddNew}>
                  Add your first address
                </Button>
              </div>
            )}
          </div>
        ) : (
          /* Address Form */
          <div className="bg-muted/10 flex flex-col gap-6 rounded-xl border p-6">
            <h3 className="text-lg font-semibold">{editingId ? 'Edit Address' : 'New Address'}</h3>

            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Pin Location (Map)</span>
              <LocationMap
                position={formData.lat && formData.lng ? { lat: formData.lat, lng: formData.lng } : null}
                onPositionChange={handleMapPositionChange}
              />
              <p className="text-muted-foreground text-xs">Click on the map to accurately place your delivery pin.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Label (e.g., Home, Office)*</label>
                <Input
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Home"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Phone Number*</label>
                <Input
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+8801..."
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Division</label>
                <Input
                  value={formData.division || ''}
                  onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                  placeholder="Dhaka"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">District</label>
                <Input
                  value={formData.district || ''}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  placeholder="Dhaka"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Upazila / Thana</label>
                <Input
                  value={formData.upazila || ''}
                  onChange={(e) => setFormData({ ...formData, upazila: e.target.value })}
                  placeholder="Gulshan"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Full Address*</label>
                <Input
                  value={formData.fullAddress || ''}
                  onChange={(e) => setFormData({ ...formData, fullAddress: e.target.value })}
                  placeholder="House/Road details..."
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveAddress}>Save Address</Button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-border h-px w-full" />

      {/* Shipping Method Section */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Shipping Method</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div
            onClick={() => store.setShippingMethod('regular')}
            className={cn(
              'flex cursor-pointer flex-col gap-2 rounded-xl border p-4 transition-all',
              store.shippingMethod === 'regular'
                ? 'border-primary bg-primary/5 ring-primary ring-1'
                : 'hover:border-primary/50'
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-semibold">
                <Truck className="h-4 w-4" /> Regular Delivery
              </div>
              <span className="font-bold">৳50</span>
            </div>
            <p className="text-muted-foreground ml-6 text-sm">Estimated 3-5 Business Days</p>
          </div>

          <div
            onClick={() => store.setShippingMethod('express')}
            className={cn(
              'flex cursor-pointer flex-col gap-2 rounded-xl border p-4 transition-all',
              store.shippingMethod === 'express'
                ? 'border-primary bg-primary/5 ring-primary ring-1'
                : 'hover:border-primary/50'
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-semibold">
                <Zap className="h-4 w-4 text-orange-500" /> Express Delivery
              </div>
              <span className="font-bold">৳120</span>
            </div>
            <p className="text-muted-foreground ml-6 text-sm">Estimated 1-2 Business Days</p>
          </div>
        </div>
      </div>
    </div>
  );
}
