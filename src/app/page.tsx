import HeroTow from "@/components/HeroTow";

import Banner from "@/components/Banner";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Banner />
      <WhyChooseUs />
    <Testimonials />
      <HeroTow />
  
    </main>
  );
}
