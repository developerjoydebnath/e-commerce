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
        <h2 className="text-foreground text-xl font-bold">Information</h2>

        {/* Avatar Upload */}
        <div className="flex flex-col gap-2">
          <Label className="text-muted-foreground text-sm font-medium">
            Upload Avatar <span className="text-red-500">*</span>
          </Label>
          <div className="mt-2 flex items-center gap-6">
            <div className="border-border bg-muted flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-md border">
              {/* Placeholder for uploaded image, using an initial for now */}
              <span className="text-foreground text-4xl font-bold">{user.name.charAt(0).toUpperCase()}</span>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-foreground font-semibold">Upload File</span>
              <span className="text-muted-foreground text-xs">JPG 100x100px</span>
              <div className="flex">
                <Input type="file" id="avatar" className="hidden" accept="image/jpeg" />
                <Label htmlFor="avatar" className="border-border flex cursor-pointer overflow-hidden rounded-md border">
                  <span className="bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2 text-sm font-medium transition-colors">
                    Choose File
                  </span>
                  <span className="bg-background text-muted-foreground px-4 py-2 text-sm">No file Choose</span>
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
