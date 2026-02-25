'use client';

import UpdatePassword from '@/modules/profile/components/UpdatePassword';
import UpdateProfile from '@/modules/profile/components/UpdateProfile';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { useAuthStore } from '@/shared/stores/authStore';

export default function ProfilePage() {
  const { user } = useAuthStore();

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col gap-10 lg:pr-10">
      {/* Information Section */}
      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-bold text-zinc-900">Information</h2>

        {/* Avatar Upload */}
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium text-zinc-700">
            Upload Avatar <span className="text-red-500">*</span>
          </Label>
          <div className="mt-2 flex items-center gap-6">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-md border border-zinc-200 bg-zinc-100">
              {/* Placeholder for uploaded image, using an initial for now */}
              <span className="text-4xl font-bold text-zinc-800">{user.name.charAt(0).toUpperCase()}</span>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-semibold text-zinc-900">Upload File</span>
              <span className="text-xs text-zinc-400">JPG 100x100px</span>
              <div className="flex">
                <Input type="file" id="avatar" className="hidden" accept="image/jpeg" />
                <Label
                  htmlFor="avatar"
                  className="flex cursor-pointer overflow-hidden rounded-md border border-zinc-200"
                >
                  <span className="bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-200">
                    Choose File
                  </span>
                  <span className="bg-white px-4 py-2 text-sm text-zinc-400">No file Choose</span>
                </Label>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* profile update form  */}
      <UpdateProfile />

      {/* Change Password Section */}
      <UpdatePassword />
    </div>
  );
}
