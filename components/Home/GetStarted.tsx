import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { Rocket, Coins } from "lucide-react";

export function GetStarted() {
  return (
    <div className="bg-content2 dark:bg-content1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10" />
          <div className="relative p-12 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Launch Your Token?
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto mb-8">
              Join the growing community of projects on Solana. Create your
              token in minutes.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
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
                color="primary"
                size="lg"
                endContent={<Coins className="ml-2" size={20} />}
              >
                Get Test SOL
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
