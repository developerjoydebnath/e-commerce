import Footer from '@/shared/components/layout/Footer';
import Navbar from '@/shared/components/layout/Navbar';
import ProfileSidePanel from '@/shared/components/layout/ProfileSidePanel';
import { Button } from '@/shared/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/shared/components/ui/sheet';
import { Menu } from 'lucide-react';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 lg:py-12">
          {/* Mobile Menu Trigger */}
          <div className="mb-6 flex lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Menu className="h-4 w-4" />
                  Menu
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-6">
                <SheetHeader className="mb-6 border-b pb-4 text-left">
                  <SheetTitle>Account Menu</SheetTitle>
                </SheetHeader>
                <ProfileSidePanel />
              </SheetContent>
            </Sheet>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[250px_1fr]">
            {/* Sidebar (Desktop) */}
            <aside className="sticky top-40 hidden h-fit lg:col-span-1 lg:block">
              <ProfileSidePanel />
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-1">{children}</div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
