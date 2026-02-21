'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/components/ui/carousel';
import { cn } from '@/shared/lib/utils';
import Image from 'next/image';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

interface ProductGalleryProps {
  images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0] || '');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!images || images.length === 0) {
    return <div className="bg-muted h-[400px] w-full animate-pulse rounded-lg"></div>;
  }

  return (
    <div className="flex w-full flex-col gap-4">
      {/* Main Image */}
      <div
        className="bg-muted relative flex aspect-square cursor-pointer items-center justify-center overflow-hidden rounded-lg transition-opacity hover:opacity-90"
        onClick={() => {
          const idx = images.indexOf(selectedImage);
          setLightboxIndex(idx !== -1 ? idx : 0);
          setLightboxOpen(true);
        }}
      >
        <Image src={selectedImage} alt="Main Product Image" fill className="object-cover" priority />
      </div>

      {/* Thumbnails Carousel */}
      {images.length > 1 && (
        <div className="relative w-full px-12">
          <Carousel
            opts={{
              align: 'start',
              loop: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {images.map((image, index) => (
                <CarouselItem key={index} className="basis-1/4 pl-2 sm:basis-1/5 md:basis-1/4 md:pl-4 lg:basis-1/5">
                  <div
                    className={cn(
                      'bg-muted relative aspect-square cursor-pointer overflow-hidden rounded-md border-2 transition-all hover:opacity-80',
                      selectedImage === image ? 'border-primary' : 'border-transparent'
                    )}
                    onClick={() => setSelectedImage(image)}
                  >
                    <Image src={image} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      )}

      {lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          slides={images.map((src) => ({ src }))}
          styles={{ container: { backgroundColor: 'rgba(0, 0, 0, 0.85)' } }}
        />
      )}
    </div>
  );
}
