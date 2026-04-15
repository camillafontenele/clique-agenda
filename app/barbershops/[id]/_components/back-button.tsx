"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="bg-background absolute top-6 left-5 rounded-full"
      onClick={() => router.back()}
    >
      <ChevronLeft />
    </Button>
  );
};

export default BackButton;
