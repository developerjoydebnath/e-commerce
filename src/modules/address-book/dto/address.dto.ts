import z from 'zod';
import { AddressType } from '../type/address.type';

export const addressSchema = z.object({
  addressType: z.enum(AddressType, { message: 'Address type is required' }),
  phone: z.string().min(1, { message: 'Phone number is required' }),
  division: z.string().min(1, { message: 'Division is required' }),
  district: z.string().min(1, { message: 'District is required' }),
  upazila: z.string().min(1, { message: 'Upazila is required' }),
  fullAddress: z.string().min(1, { message: 'Full address is required' }),
  lat: z.number().optional(),
  lng: z.number().optional(),
});
