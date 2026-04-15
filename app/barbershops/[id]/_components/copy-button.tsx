"use client";

import { Button } from "@/components/ui/button";

interface CopyButtonProps {
  text: string;
}

const CopyButton = ({ text }: CopyButtonProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Button variant="outline" className="rounded-full" size="sm" onClick={handleCopy}>
      Copiar
    </Button>
  );
};

export default CopyButton;
