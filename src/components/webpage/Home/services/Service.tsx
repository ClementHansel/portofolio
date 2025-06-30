"use client";

import ServiceCard from "./ServiceCard";
import { FaBriefcase, FaStore, FaHeart } from "react-icons/fa";

import hireAnim from "@/assets/lotties/hire.json";
import shopAnim from "@/assets/lotties/shop.json";
import supportAnim from "@/assets/lotties/support.json";

const Service = () => {
  const services = {
    hire: {
      title: "Hire Me",
      description:
        "Open to commission, freelancing, or full-time opportunities as a full stack software engineer.",
      href: "/service",
      icon: FaBriefcase,
      lottie: hireAnim,
    },
    shop: {
      title: "Digital Shop",
      description:
        "Buy custom code, templates, 3D assets, animations, courses, and ready-made apps.",
      href: "/shop",
      icon: FaStore,
      lottie: shopAnim,
    },
    support: {
      title: "Support Me",
      description:
        "Support my journey and projects through donations. Membership perks coming soon!",
      href: "/support",
      icon: FaHeart,
      lottie: supportAnim,
    },
  };

  return (
    <section
      id="services"
      className="py-20 px-4 sm:px-6 lg:px-12 bg-black text-center"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-yellow-400 drop-shadow-md">
          What I Offer
        </h2>
        <p className="text-neutral-400 mb-12 max-w-2xl mx-auto">
          Whether you&apos;re here to hire, shop, or support — I&apos;m glad
          you&apos;re here.
        </p>

        {/* HIRE ME - Full width on top */}
        <div className="max-w-2xl mx-auto mb-12">
          <ServiceCard {...services.hire} delay={0} />
        </div>

        {/* SHOP + SUPPORT - Two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <ServiceCard {...services.shop} delay={0.2} />
          <ServiceCard {...services.support} delay={0.4} />
        </div>
      </div>
    </section>
  );
};

export default Service;
