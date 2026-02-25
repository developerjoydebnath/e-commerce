'use client';

import InputField from '@/shared/components/form/InputField';
import { Button } from '@/shared/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { PROFILE_FORM_FIELDS } from '../constant/formFields';
import { updatePasswordSchema } from '../dto/profile.dto';
import { UpdatePasswordDto } from '../type/profile.type';

export default function UpdatePassword() {
  const form = useForm<UpdatePasswordDto>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: UpdatePasswordDto) => {
    console.log(data);
  };

  return (
    <section className="flex flex-col gap-6 border-t border-zinc-100 pt-4">
      <h2 className="text-xl font-bold text-zinc-900">Change Password</h2>

      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-6">
          {PROFILE_FORM_FIELDS.PASSWORD.map((field) => (
            <InputField inputClassName="h-12!" key={field.name} {...field} control={form.control} />
          ))}
        </div>

        <div className="">
          <Button type="submit" className="h-12 text-base font-medium">
            Update Password
          </Button>
        </div>
      </form>
    </section>
  );
}
