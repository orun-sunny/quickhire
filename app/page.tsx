
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";

export const dynamic = "force-dynamic";

export default async function Home() {

    return (
        <>
            <Navbar />
            <main className="pt-16">
                <HeroSection />
            </main>
            <Footer />

        </>
    );
}
