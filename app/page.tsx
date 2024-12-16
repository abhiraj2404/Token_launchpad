"use client";

import { Link } from "@nextui-org/link";
import FeatureCard from "@/components/Home/FeatureCard";
import { Button } from "@nextui-org/button";
import { Coins, Rocket, Shield, Zap } from "lucide-react";
import { Card } from "@nextui-org/card";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
      <div className="text-center mb-16">
        <div className="flex justify-center mb-4">
          <Coins className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-5xl font-bold mb-6">Launch Your Solana Token</h1>
        <p className="text-xl text-default-500 max-w-2xl mx-auto mb-8">
          Create and deploy your own token on the Solana blockchain in minutes.
          Simple, fast, and secure.
        </p>
        <Button
          as={Link}
          href="/create"
          color="primary"
          size="lg"
          endContent={<Rocket className="ml-2" />}
        >
          Create Token
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 mb-16">
        <FeatureCard
          icon={<Zap className="h-8 w-8 text-primary" />}
          title="Fast Deployment"
          description="Launch your token in seconds with our streamlined process."
        />
        <FeatureCard
          icon={<Shield className="h-8 w-8 text-primary" />}
          title="Secure"
          description="Built on Solana's secure and scalable blockchain infrastructure."
        />
        <FeatureCard
          icon={<Coins className="h-8 w-8 text-primary" />}
          title="Low Cost"
          description="Minimal fees for token creation and transactions."
        />
      </div>

      <Card className="bg-primary-50 p-8 text-center max-w-7xl mx-auto ">
        <h2 className="text-2xl font-semibold mb-4">
          Ready to Create Your Token?
        </h2>
        <p className="text-default-500 mb-6">
          Join thousands of projects already launched on Solana
        </p>
        <Button as={Link} href="/create" variant="flat" color="primary">
          Get Started
        </Button>
      </Card>
    </div>
  );
}
