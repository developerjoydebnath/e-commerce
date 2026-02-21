export default function RelatedCategories() {
  const categories = [
    { title: 'Electronics', count: '1200+ Products' },
    { title: 'Fashion', count: '1200+ Products' },
    { title: 'Home Gadgets', count: '1200+ Products' },
    { title: 'Accessories', count: '1200+ Products' },
  ];

  return (
    <section className="mt-16 border-t pt-12 text-center sm:text-left">
      <h2 className="mb-8 text-xl font-bold md:text-2xl">Related Categories</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {categories.map((cat, i) => (
          <div
            key={i}
            className="bg-muted/50 hover:bg-muted flex h-32 flex-col items-center justify-center rounded-lg p-6 text-center transition-colors sm:items-start sm:text-left"
          >
            <h3 className="mb-2 text-lg font-bold">{cat.title}</h3>
            <p className="text-muted-foreground text-sm">{cat.count}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
