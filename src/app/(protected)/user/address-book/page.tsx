'use client';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { SavedAddress, useCheckoutStore } from '@/shared/store/checkoutStore';
import { Edit, MapPin, Trash2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useState } from 'react';

// Dynamic import for Leaflet to fix SSR window issues
const LocationMap = dynamic(() => import('@/modules/checkout/components/maps/LocationMap'), {
  ssr: false,
  loading: () => <div className="bg-muted h-[300px] w-full animate-pulse rounded-md" />,
});

export default function AddressBookPage() {
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

  const handleDeleteAddress = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this address?')) {
      store.deleteAddress(id);
    }
  };

  const handleMapPositionChange = (pos: { lat: number; lng: number }) => {
    setFormData((prev) => ({ ...prev, lat: pos.lat, lng: pos.lng }));
  };

  return (
    <div className="flex flex-col gap-6 lg:pr-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900">Address Book</h1>
        {!showForm && (
          <Button className="h-10 px-6 font-medium" onClick={handleAddNew}>
            + Add New Address
          </Button>
        )}
      </div>

      {!showForm ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {store.savedAddresses.length > 0 ? (
            store.savedAddresses.map((addr) => {
              return (
                <div key={addr.id} className="relative flex flex-col gap-4 rounded-xl border border-zinc-200 p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-zinc-900" />
                      <span className="text-lg font-semibold text-zinc-900">{addr.name}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 text-sm text-zinc-600">
                    <span>{addr.phone}</span>
                    <span>{addr.fullAddress}</span>
                    <span>
                      {addr.upazila}, {addr.district}, {addr.division}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center gap-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(addr);
                      }}
                      className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      <Edit className="h-4 w-4" /> Edit
                    </button>
                    <span className="h-4 w-px bg-zinc-300"></span>
                    <button
                      onClick={(e) => handleDeleteAddress(addr.id, e)}
                      className="flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700 hover:underline"
                    >
                      <Trash2 className="h-4 w-4" /> Delete
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full rounded-lg border border-dashed border-zinc-300 bg-zinc-50 py-12 text-center">
              <p className="text-zinc-500">No saved addresses found.</p>
              <Button variant="link" onClick={handleAddNew} className="text-primary mt-2">
                Add your first address
              </Button>
            </div>
          )}
        </div>
      ) : (
        /* Address Form */
        <div className="flex flex-col gap-6 rounded-xl border border-zinc-200 bg-zinc-50/50 p-6">
          <h3 className="text-lg font-semibold">{editingId ? 'Edit Address' : 'New Address'}</h3>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">Pin Location (Map)</span>
            <LocationMap
              position={formData.lat && formData.lng ? { lat: formData.lat, lng: formData.lng } : null}
              onPositionChange={handleMapPositionChange}
            />
            <p className="text-xs text-zinc-500">Click on the map to accurately place your delivery pin.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Label (e.g., Home, Office)*</label>
              <Input
                className="h-12 border-zinc-200 bg-white shadow-sm"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Home"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Phone Number*</label>
              <Input
                className="h-12 border-zinc-200 bg-white shadow-sm"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+8801..."
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Division</label>
              <Input
                className="h-12 border-zinc-200 bg-white shadow-sm"
                value={formData.division || ''}
                onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                placeholder="Dhaka"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">District</label>
              <Input
                className="h-12 border-zinc-200 bg-white shadow-sm"
                value={formData.district || ''}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                placeholder="Dhaka"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Upazila / Thana</label>
              <Input
                className="h-12 border-zinc-200 bg-white shadow-sm"
                value={formData.upazila || ''}
                onChange={(e) => setFormData({ ...formData, upazila: e.target.value })}
                placeholder="Gulshan"
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-1">
              <label className="text-sm font-medium">Full Address*</label>
              <Input
                className="h-12 border-zinc-200 bg-white shadow-sm"
                value={formData.fullAddress || ''}
                onChange={(e) => setFormData({ ...formData, fullAddress: e.target.value })}
                placeholder="House/Road details..."
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setShowForm(false)} className="h-12 px-6">
              Cancel
            </Button>
            <Button onClick={handleSaveAddress} className="h-12 px-8 font-medium">
              Save Address
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
