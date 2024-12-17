import { Card } from "@nextui-org/card";
import { Shield, Zap, Lock, Settings } from "lucide-react";

export function Benefits() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Why Choose Our Platform?
        </h2>
        <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
          Built with security and simplicity in mind
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {benefits.map((benefit) => (
          <Card
            key={benefit.title}
            className="p-6 bg-content2 max-w-xl sm:w-[calc(50%-1rem)] text-left"
            isPressable
          >
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="p-3 bg-primary/10 rounded-lg">
                  {benefit.icon}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {benefit.title}
                </h3>
                <p className="text-foreground/70">{benefit.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

const benefits = [
  {
    icon: <Zap className="h-6 w-6 text-primary" />,
    title: "Fast Deployment",
    description:
      "Launch your token in seconds with our optimized deployment process. No complex setup required.",
  },
  {
    icon: <Shield className="h-6 w-6 text-primary" />,
    title: "Secure Platform",
    description:
      "Built on Solana's secure blockchain with industry-standard security practices.",
  },
  {
    icon: <Lock className="h-6 w-6 text-primary" />,
    title: "Full Control",
    description:
      "Maintain complete control as the mint authority of your token with no restrictions.",
  },
  {
    icon: <Settings className="h-6 w-6 text-primary" />,
    title: "Easy Management",
    description:
      "Intuitive interface to manage your tokens and mint additional supply when needed.",
  },
];
