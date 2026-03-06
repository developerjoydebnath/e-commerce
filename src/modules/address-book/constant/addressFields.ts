import { InputFieldProps } from '@/shared/components/form/InputField';
import { AddressType } from '../type/address.type';

export const ADDRESS_FORM_FIELDS: InputFieldProps[] = [
  {
    name: 'addressType',
    label: 'Address Type',
    type: 'select',
    required: true,
    placeholder: 'Select Address Type',
    inputClassName: 'h-10! sm:h-12!',
    options: [
      { value: AddressType.HOME, label: 'Home' },
      { value: AddressType.OFFICE, label: 'Office' },
      { value: AddressType.OTHER, label: 'Other' },
    ],
  },
  {
    name: 'phone',
    label: 'Phone Number',
    type: 'text', // In InputField.tsx 'tel' is also handled but 'text' is fine for generic
    required: true,
    placeholder: '+8801...',
    inputClassName: 'h-10 sm:h-12',
  },
  {
    name: 'division',
    label: 'Division',
    type: 'text',
    placeholder: 'Select Division',
    inputClassName: 'h-10 sm:h-12',
  },
  {
    name: 'district',
    label: 'District',
    type: 'text',
    placeholder: 'Select District',
    inputClassName: 'h-10 sm:h-12',
  },
  {
    name: 'upazila',
    label: 'Upazila / Thana',
    type: 'text',
    placeholder: 'Select Upazila',
    inputClassName: 'h-10 sm:h-12',
  },
  {
    name: 'fullAddress',
    label: 'Full Address',
    type: 'text',
    required: true,
    placeholder: 'House/Road details...',
    inputClassName: 'h-10 sm:h-12',
  },
];
