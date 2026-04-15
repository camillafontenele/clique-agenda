"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

interface CopyButtonProps {
  text: string;
}

const CopyButton = ({ text }: CopyButtonProps) => {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    toast.success("Telefone copiado!", {
      description: text,
    });
  };

  return (
    <Button variant="outline" className="rounded-full" size="sm" onClick={handleCopy}>
      Copiar
    </Button>
  );
};

export default CopyButton;
