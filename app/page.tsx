
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import BrandsSection from "@/components/sections/BrandSection";
import CategorySection from "@/components/sections/Category";
import HeroSection from "@/components/sections/HeroSection";
import GraphSection from "@/components/sections/GraphSection";
import FeaturedSection from "@/components/sections/FeaturedSection";
import LatestSection from "@/components/sections/LatestSection";
import { getJobs } from "@/lib/api.server";

export const dynamic = "force-dynamic";

export default async function Home() {
    const allJobs = await getJobs();

    // First 8 jobs for featured, next 8 for latest
    const featuredJobs = allJobs.slice(0, 8);
    const latestJobs = allJobs.slice(8, 16);

    return (
        <>
            <Navbar />
            <main className="pt-16">
                <HeroSection />
                <BrandsSection />
                <CategorySection />
                <GraphSection />
                <FeaturedSection jobs={featuredJobs} />
                <LatestSection jobs={latestJobs} />
            </main>
            <Footer />

        </>
    );
}
