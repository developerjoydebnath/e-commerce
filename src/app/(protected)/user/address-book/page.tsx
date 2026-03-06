'use client';

import { AddressForm } from '@/modules/address-book/components/AddressForm';
import ConfirmationDialog from '@/shared/components/custom/ConfirmationDialog';
import { Button } from '@/shared/components/ui/button';
import { SavedAddress, useCheckoutStore } from '@/shared/store/checkoutStore';
import { Edit, MapPin, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function AddressBookPage() {
  const store = useCheckoutStore();

  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<SavedAddress | null>(null);

  const handleEdit = (addr: SavedAddress) => {
    setEditingAddress(addr);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditingAddress(null);
    setShowForm(true);
  };

  const handleDeleteAddress = (id: string) => {
    store.deleteAddress(id);
  };

  return (
    <div className="flex flex-col gap-6 lg:pr-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900">Address Book</h1>
        {!showForm && (
          <Button className="h-10 font-medium" onClick={handleAddNew}>
            Add New Address
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
                      <span className="text-lg font-semibold text-zinc-900">{addr.addressType}</span>
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
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(addr);
                      }}
                      className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      <Edit className="h-3 w-3" /> Edit
                    </Button>
                    <span className="h-4 w-px bg-zinc-300"></span>
                    <ConfirmationDialog
                      title="Delete Address"
                      description="Are you sure you want to delete this address?"
                      onConfirm={() => handleDeleteAddress(addr.id)}
                      onCancel={() => {}}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" /> Delete
                      </Button>
                    </ConfirmationDialog>
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
        <AddressForm
          title={editingAddress ? 'Edit Address' : 'New Address'}
          initialData={editingAddress || {}}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
