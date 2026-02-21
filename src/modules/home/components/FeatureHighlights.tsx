import { Headset, RotateCcw, TicketPercent, Truck } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Free Shipping On All Order',
  },
  {
    icon: RotateCcw,
    title: 'Money Guarantee',
    description: '30 Day Money Back Guarantee',
  },
  {
    icon: Headset,
    title: 'Online Support 24/7',
    description: 'Technical Support 24/7',
  },
  {
    icon: TicketPercent,
    title: 'Discount',
    description: 'Upto 40% Discount All Products',
  },
];

export default function FeatureHighlights() {
  return (
    <section className="container mx-auto px-4">
      <div className="bg-background grid grid-cols-1 gap-6 rounded-xl border p-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`flex items-center gap-4 ${
              index !== features.length - 1 ? 'lg:border-r lg:pr-6' : ''
            } ${index !== 0 ? 'lg:pl-6' : ''}`}
          >
            <feature.icon className="text-foreground h-10 w-10 stroke-[1.5]" />
            <div className="flex flex-col">
              <h3 className="text-foreground text-sm font-semibold uppercase">{feature.title}</h3>
              <p className="text-muted-foreground text-xs">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
