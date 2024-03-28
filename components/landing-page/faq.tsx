"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import SectionDivider from "./section-divider";
import { useSection } from "@/hooks/use-section";

const FAQ = () => {
  const { ref } = useSection("FAQ", 0.5);

  return (
    <section ref={ref} id="faq" className="mb-24 w-2/3 container">
      <SectionDivider>Frequently Asked Questions</SectionDivider>
      <Accordion className="w-full" type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default FAQ;
