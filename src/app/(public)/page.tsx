import FeatureHighlights from '@/modules/home/components/FeatureHighlights';
import FlashSale from '@/modules/home/components/FlashSale';
import HeroSection from '@/modules/home/components/HeroSection';
import HotTrendingProducts from '@/modules/home/components/HotTrendingProducts';
import NewArrivals from '@/modules/home/components/NewArrivals';
import PopularCategories from '@/modules/home/components/PopularCategories';
import PromoBanner from '@/modules/home/components/PromoBanner';

export default function Home() {
  return (
    <div className="flex flex-col gap-8 pb-20">
      <HeroSection />
      {/* <TopBrands /> */}
      <FeatureHighlights />
      <PopularCategories />
      <HotTrendingProducts />
      <PromoBanner />
      <NewArrivals />
      <FlashSale />
    </div>
  );
}
