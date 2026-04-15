import { Smartphone } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

import ServiceItem from "@/components/service-item";
import { PageSectionContent, PageSectionTitle } from "@/components/ui/page";
import { Separator } from "@/components/ui/separator";
import { getBarbershopById } from "@/data/Barbershops";

import BackButton from "./_components/back-button";
import CopyButton from "./_components/copy-button";

const BarbershopPage = async ({ params }: PageProps<"/barbershops/[id]">) => {
  const { id } = await params;
  const barbershop = await getBarbershopById(id);

  if (!barbershop) {
    notFound();
  }

  return (
    <div>
      {/* Banner */}
      <div className="relative h-[18.75rem] w-full">
        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          className="object-cover"
        />
        <BackButton />
      </div>

      {/* Container */}
      <div className="bg-background relative z-10 mt-[-1.5rem] rounded-t-3xl">
        {/* Info da barbearia */}
        <div className="px-5 pt-6">
          <div className="flex items-center gap-1.5">
            <div className="relative size-[1.875rem] shrink-0 overflow-hidden rounded-full">
              <Image
                src={barbershop.imageUrl}
                alt={barbershop.name}
                fill
                className="object-cover"
              />
            </div>
            <h1 className="text-foreground text-xl font-bold">
              {barbershop.name}
            </h1>
          </div>
          <p className="text-muted-foreground mt-1 text-sm">
            {barbershop.address}
          </p>
        </div>

        <div className="py-6">
          <Separator />
        </div>

        {/* Sobre Nós */}
        <div className="px-5">
          <PageSectionContent>
            <PageSectionTitle>Sobre Nós</PageSectionTitle>
            <p className="text-foreground text-sm">{barbershop.description}</p>
          </PageSectionContent>
        </div>

        <div className="py-6">
          <Separator />
        </div>

        {/* Serviços */}
        <div className="px-5">
          <PageSectionContent>
            <PageSectionTitle>Serviços</PageSectionTitle>
            {barbershop.services.map((service) => (
              <ServiceItem key={service.id} service={service} />
            ))}
          </PageSectionContent>
        </div>

        <div className="py-6">
          <Separator />
        </div>

        {/* Contato */}
        <div className="px-5">
          <PageSectionContent>
            <PageSectionTitle>Contato</PageSectionTitle>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Smartphone className="size-6" />
                <p className="text-foreground text-sm">{barbershop.phone}</p>
              </div>
              <CopyButton text={barbershop.phone} />
            </div>
          </PageSectionContent>
        </div>

        <div className="pt-[3rem]" />
      </div>
    </div>
  );
};

export default BarbershopPage;
