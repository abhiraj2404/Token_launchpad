import { Card } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Link } from "@nextui-org/link";
import { Wallet, Plus, Coins, Waves } from "lucide-react";

export function MainFeatures() {
  return (
    <div className="bg-content2 dark:bg-content1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Create Your Token in Simple Steps
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Follow our streamlined process to launch your token
          </p>
        </div>

        <div className="relative">
          {/* Connection Lines */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-primary/20 -translate-y-1/2 hidden lg:block" />

          <div className="flex flex-wrap justify-center gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)]"
              >
                {feature.link ? (
                  <Link href={feature.link} className="block h-full">
                    <FeatureCard feature={feature} index={index + 1} />
                  </Link>
                ) : (
                  <FeatureCard feature={feature} index={index + 1} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  link?: string;
  comingSoon?: boolean;
}

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  return (
    <Card
      isPressable
      className={`p-6 bg-content2 h-full transition-colors text-left`}
    >
      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <div className="p-3 bg-primary/10 rounded-lg">{feature.icon}</div>
          <div className="flex items-center gap-2">
            {feature.comingSoon && (
              <Chip color="warning" size="sm">
                Coming Soon
              </Chip>
            )}
            <span className="text-2xl font-bold text-primary">{index}</span>
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-3 text-foreground">
          {feature.title}
        </h3>
        <p className="text-foreground/70">{feature.description}</p>
      </div>
    </Card>
  );
}

const features: Feature[] = [
  {
    icon: <Wallet className="h-6 w-6 text-primary" />,
    title: "Get Test SOL",
    description:
      "Start with an airdrop of 1 SOL to test your token on Solana Devnet",
    link: "/airdrop",
  },
  {
    icon: <Plus className="h-6 w-6 text-primary" />,
    title: "Create Token",
    description:
      "Configure your token with custom name, symbol, and initial supply",
    link: "/create",
  },
  {
    icon: <Coins className="h-6 w-6 text-primary" />,
    title: "Manage Token",
    description: "View your tokens and mint additional supply whenever needed",
    link: "/my-tokens",
  },
  {
    icon: <Waves className="h-6 w-6 text-primary" />,
    title: "Create Liquidity",
    description: "Add liquidity pool for your token to enable trading",
    comingSoon: true,
  },
];
