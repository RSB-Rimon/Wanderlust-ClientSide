import Image from "next/image";

const features = [
  {
    icon: "/images/ShieldCheck.png",
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 security support.",
  },
  {
    icon: "/images/MapTrifold.png",
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with personalized cultural insights.",
  },
  {
    icon: "/images/Headset.png",
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you whenever and wherever travels take you.",
  },
] as const;

export default function WhyChooseUs() {
  return (
    <section className="w-full bg-gradient-to-b from-[#e6f1fc] via-[#edf5fd] to-[#f7fbff] px-6 py-16 font-sans md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-900 md:text-4xl">
            Why Choose Wanderlust
          </h2>
          <p className="mt-3 text-sm text-gray-500 md:text-base">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-gray-100 bg-white p-7 shadow-[0_4px_24px_rgba(16,24,40,0.06)] transition-shadow hover:shadow-[0_8px_28px_rgba(16,24,40,0.10)]"
            >
              <Image
                src={feature.icon}
                alt=""
                width={48}
                height={48}
                className="h-12 w-12"
              />
              <h3 className="mt-5 text-lg font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-gray-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
