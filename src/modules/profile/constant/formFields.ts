import { InputFieldProps } from '@/shared/components/form/InputField';

export const PROFILE_FORM_FIELDS: Record<string, InputFieldProps[]> = {
  BASIC: [
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      label: 'Phone',
      type: 'tel',
      required: true,
    },
    {
      name: 'gender',
      label: 'Gender',
      type: 'select',
      required: true,
      placeholder: 'Select Gender',
      options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' },
      ],
    },
    {
      name: 'dayOfBirth',
      label: 'Day of Birth',
      type: 'date',
      required: true,
      futureDaysDisabled: true,
    },
  ],
  PASSWORD: [
    {
      name: 'currentPassword',
      label: 'Current Password',
      type: 'password',
      required: true,
      placeholder: 'Current password',
    },
    {
      name: 'newPassword',
      label: 'New Password',
      type: 'password',
      required: true,
      placeholder: 'New password',
    },
    {
      name: 'confirmPassword',
      label: 'Confirm New Password',
      type: 'password',
      required: true,
      placeholder: 'Confirm new password',
    },
  ],
};
