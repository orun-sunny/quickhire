
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import BrandsSection from "@/components/sections/BrandSection";
import CategorySection from "@/components/sections/Category";
import HeroSection from "@/components/sections/HeroSection";
import GraphSection from "@/components/sections/GraphSection";
import FeaturedSection from "@/components/sections/FeaturedSection";
import LatestSection from "@/components/sections/LatestSection";

export const dynamic = "force-dynamic";

export default async function Home() {

    return (
        <>
            <Navbar />
            <main className="pt-16">
                <HeroSection />
                <BrandsSection />
                <CategorySection />
                <GraphSection />
                <FeaturedSection />
                <LatestSection />
            </main>
            <Footer />

        </>
    );
}
