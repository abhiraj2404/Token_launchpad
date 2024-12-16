"use client";

import { Card } from "@nextui-org/card";
import React from "react";

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="p-6 text-left" isPressable>
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-default-500">{description}</p>
    </Card>
  );
}

export default FeatureCard;
