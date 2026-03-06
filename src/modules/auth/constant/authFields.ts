import { InputFieldProps } from '@/shared/components/form/InputField';

export const LOGIN_FORM_FIELDS: InputFieldProps[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    required: true,
    placeholder: 'name@example.com',
    inputClassName: 'h-11',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    required: true,
    placeholder: '••••••••',
    inputClassName: 'h-11 pr-10',
  },
];

export const REGISTER_FORM_FIELDS: InputFieldProps[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    required: true,
    placeholder: 'name@example.com',
    inputClassName: 'h-11',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    required: true,
    placeholder: 'Minimum 8 characters',
    inputClassName: 'h-11',
  },
  {
    name: 'remember',
    label: 'Remember me',
    type: 'checkbox',
    required: false,
    inputClassName: '',
  },
  {
    name: 'privacyAccept',
    label: 'I agree to the terms and conditions',
    type: 'checkbox',
    required: true,
    inputClassName: '',
  },
];

export const FORGOT_PASSWORD_FORM_FIELDS: InputFieldProps[] = [
  // Email will be rendered manually for the Mail icon, but keeping constants here for consistency if they want to build an enhanced InputField later
  {
    name: 'email',
    label: 'Email address',
    type: 'email',
    required: true,
    placeholder: 'name@example.com',
    inputClassName: 'h-11',
  },
];

export const RESET_PASSWORD_FORM_FIELDS: InputFieldProps[] = [
  {
    name: 'password',
    label: 'New Password',
    type: 'password',
    required: true,
    placeholder: 'Minimum 8 characters',
    inputClassName: 'h-11 pr-10',
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    required: true,
    placeholder: 'Minimum 8 characters',
    inputClassName: 'h-11 pr-10',
  },
];

export const VERIFY_OTP_FORM_FIELDS: InputFieldProps[] = [
  {
    name: 'otp',
    label: 'One-Time Password',
    type: 'otp',
    required: true,
    inputClassName: 'h-12 w-12 rounded-md bg-white text-lg font-bold sm:h-14 sm:w-14',
  },
];
