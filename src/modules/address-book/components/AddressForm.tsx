'use client';

import InputField from '@/shared/components/form/InputField';
import { Button } from '@/shared/components/ui/button';
import { SavedAddress, useCheckoutStore } from '@/shared/store/checkoutStore';
import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { ADDRESS_FORM_FIELDS } from '../constant/addressFields';
import { addressSchema } from '../dto/address.dto';
import { AddressDto, AddressType } from '../type/address.type';

const LocationMap = dynamic(() => import('@/modules/checkout/components/maps/LocationMap'), {
  ssr: false,
  loading: () => <div className="bg-muted h-[300px] w-full animate-pulse rounded-md" />,
});

interface AddressFormProps {
  initialData?: Partial<SavedAddress>;
  onCancel: () => void;
  title: string;
}

export function AddressForm({ initialData, onCancel, title }: AddressFormProps) {
  const store = useCheckoutStore();

  const form = useForm<AddressDto>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      addressType: initialData?.addressType || AddressType.HOME,
      phone: initialData?.phone || '',
      division: initialData?.division || '',
      district: initialData?.district || '',
      upazila: initialData?.upazila || '',
      fullAddress: initialData?.fullAddress || '',
      lat: initialData?.lat,
      lng: initialData?.lng,
    },
  });

  const { setValue, watch, handleSubmit, control } = form;

  const lat = watch('lat');
  const lng = watch('lng');

  const handleMapPositionChange = (pos: { lat: number; lng: number }) => {
    setValue('lat', pos.lat);
    setValue('lng', pos.lng);
  };

  const onSubmit = (data: AddressDto) => {
    if (initialData?.id) {
      store.editAddress(initialData.id, data);
    } else {
      store.addAddress(data);
    }
    onCancel();
  };

  return (
    <div className="flex flex-col gap-6 rounded-lg border border-zinc-200 bg-zinc-50/50 p-4 sm:p-6">
      <h3 className="text-lg font-semibold">{title}</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">Pin Location (Map)</span>
          <LocationMap position={lat && lng ? { lat, lng } : null} onPositionChange={handleMapPositionChange} />
          <p className="text-xs text-zinc-500">Click on the map to accurately place your delivery pin.</p>
          {/* Hidden fields are managed by react-hook-form but not rendered via InputField */}
          <input type="hidden" {...form.register('lat')} />
          <input type="hidden" {...form.register('lng')} />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {ADDRESS_FORM_FIELDS.map((field) => (
            <InputField key={field.name} {...field} control={control} />
          ))}
        </div>

        <div className="mt-4 flex justify-end gap-3">
          <Button type="button" variant="ghost" onClick={onCancel} className="h-10 sm:h-12">
            Cancel
          </Button>
          <Button type="submit" className="h-10 font-medium sm:h-12">
            Save Address
          </Button>
        </div>
      </form>
    </div>
  );
}
