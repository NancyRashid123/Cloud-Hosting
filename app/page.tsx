import HeroSection from "@/components/hero/hero";
import WebHostingPlane from "@/components/webHosting/webHosting";

export default async function Home() {
  return (
    <main>
      <div className="container m-auto px-4 py-10 min-h-dvh  ">
        <HeroSection />
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          <WebHostingPlane />
          <WebHostingPlane />
          <WebHostingPlane />
        </div>
        
      </div>
    </main>
  );
}
