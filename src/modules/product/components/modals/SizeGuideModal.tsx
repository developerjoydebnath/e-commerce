'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/ui/table';
import { sizeGuide } from '@/shared/constants/mockData';
import Image from 'next/image';

interface SizeGuideModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SizeGuideModal({ isOpen, onOpenChange }: SizeGuideModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{sizeGuide.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-8 py-4">
          <section>
            <h4 className="mb-4 px-1 text-lg font-semibold">Size Guide (Inches)</h4>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="font-bold">Size</TableHead>
                    <TableHead className="text-center font-bold">US</TableHead>
                    <TableHead className="text-center font-bold">Bust</TableHead>
                    <TableHead className="text-center font-bold">Waist</TableHead>
                    <TableHead className="text-center font-bold">Low Hip</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sizeGuide.chart.map((entry) => (
                    <TableRow key={entry.size} className="hover:bg-transparent">
                      <TableCell className="text-primary font-medium uppercase">{entry.size}</TableCell>
                      <TableCell className="text-center">{entry.us}</TableCell>
                      <TableCell className="text-center">{entry.bust}</TableCell>
                      <TableCell className="text-center">{entry.waist}</TableCell>
                      <TableCell className="text-center">{entry.lowHip}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-8 pt-4 md:grid-cols-2">
            <div className="space-y-6">
              <h4 className="text-lg font-semibold">Measuring Tips</h4>
              {sizeGuide.measuringTips.map((tip) => (
                <div key={tip.title} className="space-y-1">
                  <p className="text-sm font-bold uppercase">{tip.title}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{tip.description}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center">
              <div className="relative aspect-square w-full max-w-[240px] overflow-hidden rounded-lg border bg-white shadow-sm">
                <Image src="/images/size-chart.jpg" alt="Measurement Guide" fill className="object-contain p-2" />
              </div>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
