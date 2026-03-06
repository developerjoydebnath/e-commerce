import z from 'zod';

export const loginSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
  remember: z.boolean().optional(),
});

export const registerSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  remember: z.boolean().optional(),
  privacyAccept: z.boolean().refine((val) => val === true, {
    message: 'You must accept the privacy policy',
  }),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});

export const verifyOtpSchema = z.object({
  otp: z.string().length(6, { message: 'OTP must be exactly 6 characters' }),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z.string().min(8, { message: 'Please confirm your password' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
