'use client';

const brands = ['Apple', 'Samsung', 'Sony', 'Microsoft', 'Logitech', 'Asus', 'Razer', 'Bose'];

export default function TopBrands() {
  return (
    <section className="border-border/50 bg-muted/30 border-y py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-12 md:flex-row">
          {/* Left Side: Text Description */}
          <div className="text-center md:w-1/3 md:text-left">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Trusted by the Industry&apos;s Best</h2>
            <p className="text-muted-foreground mt-4 text-lg">
              We partner with top-tier technology brands to bring you the highest quality products and absolute
              reliability.
            </p>
          </div>

          {/* Right Side: Brand Grid */}
          <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4 md:w-2/3">
            {brands.map((brand, index) => (
              <div
                key={index}
                className="bg-background border-border/50 hover:border-primary/50 group flex h-24 items-center justify-center rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <span className="text-muted-foreground group-hover:text-foreground text-lg font-bold tracking-wider transition-colors">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
