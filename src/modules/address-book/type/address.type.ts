import z from 'zod';
import { addressSchema } from '../dto/address.dto';

export type AddressDto = z.infer<typeof addressSchema>;

export enum AddressType {
  HOME = 'home',
  OFFICE = 'office',
  OTHER = 'other',
}
