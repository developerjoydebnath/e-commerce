'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';

interface ProductTabsProps {
  description: string;
  specifications?: { key: string; value: string }[];
}

export default function ProductTabs({ description, specifications = [] }: ProductTabsProps) {
  return (
    <div className="w-full text-left">
      <h2 className="text-foreground mb-6 text-xl font-bold sm:text-2xl">Product details</h2>
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="mb-2 flex h-auto! w-full justify-start rounded-none border-b bg-transparent p-0 sm:mb-4 md:mb-8">
          <TabsTrigger
            value="description"
            className="data-[state=active]:border-border data-[state=active]:border-b-border data-[state=inactive]:bg-background data-[state=active]:text-foreground text-foreground data-[state=active]:bg-muted/50 data-[state=inactive]:text-muted-foreground data-[state=inactive]:border-b-border -mb-px flex h-8 items-center justify-center rounded-none rounded-t-md border border-transparent px-4 text-sm font-medium shadow-none transition-none data-[state=active]:shadow-none! sm:h-12 sm:px-8 sm:text-base"
          >
            Description
          </TabsTrigger>
          <TabsTrigger
            value="specification"
            className="data-[state=active]:border-border data-[state=active]:border-b-border data-[state=inactive]:bg-background data-[state=active]:text-foreground text-foreground data-[state=active]:bg-muted/50 data-[state=inactive]:text-muted-foreground data-[state=inactive]:border-b-border -mb-px flex h-8 items-center justify-center rounded-none rounded-t-md border border-transparent px-4 text-sm font-medium shadow-none transition-none data-[state=active]:shadow-none! sm:h-12 sm:px-8 sm:text-base"
          >
            Specification
          </TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-0">
          <div className="prose prose-sm text-muted-foreground max-w-none">
            <p className="text-xs leading-relaxed sm:text-base">{description}</p>
          </div>
        </TabsContent>

        <TabsContent value="specification" className="mt-0">
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full text-left text-xs sm:text-sm">
              <tbody className="divide-y">
                {specifications.length > 0 ? (
                  specifications.map((spec, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-muted/30' : ''}>
                      <td className="text-foreground w-1/3 px-3 py-2 font-medium sm:px-6 sm:py-4">{spec.key}</td>
                      <td className="text-muted-foreground px-3 py-2 sm:px-6 sm:py-4">{spec.value}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="text-muted-foreground px-3 py-2 text-center sm:px-6 sm:py-4">
                      No specifications available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
