import { Button } from "@nextui-org/button";
import { Coins, Rocket } from "lucide-react";
import Link from "next/link";
import React from "react";

function HeroSection() {
  return (
    <div className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="lg:flex lg:items-center lg:gap-12">
          <div className="lg:w-1/2">
            <div className="flex items-center gap-2 mb-6">
              <Coins className="h-10 w-10 text-primary" />
              <span className="text-xl font-semibold text-primary">
                Token Launchpad
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-foreground">
              Launch Your Own <span className="text-primary">Solana Token</span>{" "}
              in Minutes
            </h1>
            <p className="text-xl text-foreground/70 mb-8">
              Create, deploy, and manage your custom token on Solana with our
              simple and secure platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                as={Link}
                href="/create"
                color="primary"
                size="lg"
                endContent={<Rocket className="ml-2" size={20} />}
              >
                Create Token
              </Button>
              <Button
                as={Link}
                href="/airdrop"
                variant="bordered"
                size="lg"
                color="primary"
              >
                Get Test SOL
              </Button>
            </div>
          </div>
          <div className="hidden lg:block lg:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop&q=80"
              alt="Blockchain Illustration"
              className="w-full h-auto rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
