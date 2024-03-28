"use client";
import React from "react";
import Feature from "./feature";
import { features } from "@/lib/data";
import SectionDivider from "./section-divider";
import { useSection } from "@/hooks/use-section";

const Features = () => {
  const { ref } = useSection("Features", 0.5);

  return (
    <section ref={ref} id="features" className="container py-12">
      <SectionDivider>Key Features</SectionDivider>
      <div className="grid md:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <Feature key={index} {...feature} />
        ))}
      </div>
    </section>
  );
};

export default Features;
