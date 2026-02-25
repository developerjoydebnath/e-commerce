import z from 'zod';
import { Gender } from '../type/profile.type';

export const profileSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters long'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters long'),
  email: z.email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters long'),
  gender: z.enum(Gender, {
    message: 'Please select a gender',
  }),
  dayOfBirth: z.date().refine((value) => new Date(value) < new Date(), 'Invalid date'),
});

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'New password must be at least 8 characters long'),
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
