"use client";

import { Card } from "@nextui-org/card";

interface WalletStatusProps {
  message: string;
}

export function WalletStatus({ message }: WalletStatusProps) {
  return (
    <Card>
      <div className="p-6 text-center">
        <p className="text-gray-600 mb-4">{message}</p>
      </div>
    </Card>
  );
}
