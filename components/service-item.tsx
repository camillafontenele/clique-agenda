import Image from "next/image";

import type { BarbershopService } from "@/generated/prisma/client";

import { Button } from "./ui/button";

interface ServiceItemProps {
  service: BarbershopService;
}

const ServiceItem = ({ service }: ServiceItemProps) => {
  return (
    <div className="bg-card-background border-border flex items-center gap-3 rounded-2xl border p-3">
      <div className="border-border relative size-27.5 shrink-0 overflow-hidden rounded-[0.625rem]">
        <Image
          src={service.imageUrl}
          alt={service.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between self-stretch">
        <div className="flex flex-col gap-1">
          <p className="text-card-foreground text-sm font-bold">
            {service.name}
          </p>
          <p className="text-muted-foreground text-sm">{service.description}</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-card-foreground text-sm font-bold">
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(service.priceInCents / 100)}
          </p>
          <Button className="rounded-full" size="sm">
            Reservar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceItem;
