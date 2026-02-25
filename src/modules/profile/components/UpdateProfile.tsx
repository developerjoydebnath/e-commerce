'use client';

import InputField from '@/shared/components/form/InputField';
import { Button } from '@/shared/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { PROFILE_FORM_FIELDS } from '../constant/formFields';
import { profileSchema } from '../dto/profile.dto';
import { ProfileDto } from '../type/profile.type';

export default function UpdateProfile() {
  const form = useForm<ProfileDto>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      gender: undefined,
      dayOfBirth: undefined,
    },
  });

  const onSubmit = (data: ProfileDto) => {
    console.log(data);
  };

  return (
    <section className="flex flex-col gap-6 pt-4">
      <h2 className="text-xl font-bold text-zinc-900">Personal Information</h2>

      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2">
        {PROFILE_FORM_FIELDS.BASIC.map((field) => (
          <InputField inputClassName="h-12!" key={field.name} {...field} control={form.control} />
        ))}

        <div className="">
          <Button type="submit" className="h-12 text-base font-medium">
            Update Profile
          </Button>
        </div>
      </form>
    </section>
  );
}
