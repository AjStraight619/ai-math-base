import { features } from "@/lib/data";
import React from "react";
import BgGradient from "./bg-gradient";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";

type FeatureType = (typeof features)[number];

const Feature = ({ name, description, icon, bgImage }: FeatureType) => {
  return (
    <BgGradient>
      <Card className="min-h-48">
        <CardHeader>
          <CardDescription>{description}</CardDescription>
        </CardHeader>

        <CardContent></CardContent>
      </Card>
    </BgGradient>
  );
};

export default Feature;
