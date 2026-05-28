import { ChevronLeft, ChevronRight } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";

import BarbershopItem from "@/components/barbershop-item";
import BookingItem from "@/components/booking-item";
import Header from "@/components/header";
import QuickSearch from "@/components/quick-search";
import {
  PageContainer,
  PageSectionContent,
  PageSectionScroller,
  PageSectionTitle,
} from "@/components/ui/page";
import { getBarbershops, getPopularBarbershops } from "@/data/Barbershops";
import { getUserScheduledBookings } from "@/data/bookings";
import { auth } from "@/lib/auth";
import banner from "@/public/banner.png";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const [barbershops, popularBarbershops, scheduledBookings] =
    await Promise.all([
      getBarbershops(),
      getPopularBarbershops(),
      session?.user ? getUserScheduledBookings(session.user.id) : [],
    ]);

  return (
    <div>
      <Header />
      <PageContainer>
        <QuickSearch />
        <Image
          src={banner}
          alt="Agende nos melhores com a Clique Agenda"
          sizes="100vw"
          className="h-auto w-full"
        />

        {scheduledBookings.length > 0 && (
          <PageSectionContent>
            <PageSectionTitle>Agendamentos</PageSectionTitle>
            <div className="relative">
              <div
                className="bg-background/80 border-border text-muted-foreground pointer-events-none absolute top-1/2 left-0 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border"
                aria-hidden="true"
              >
                <ChevronLeft className="size-4" />
              </div>
              <div
                className="bg-background/80 border-border text-muted-foreground pointer-events-none absolute top-1/2 right-0 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border"
                aria-hidden="true"
              >
                <ChevronRight className="size-4" />
              </div>
              <PageSectionScroller>
                {scheduledBookings.map((booking) => (
                  <div key={booking.id} className="min-w-100">
                    <BookingItem booking={booking} />
                  </div>
                ))}
              </PageSectionScroller>
            </div>
          </PageSectionContent>
        )}

        <PageSectionContent>
          <PageSectionTitle>Barbearias</PageSectionTitle>
          <PageSectionScroller>
            {barbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </PageSectionScroller>
        </PageSectionContent>
        <PageSectionContent>
          <PageSectionTitle>Barbearias populares</PageSectionTitle>
          <PageSectionScroller>
            {popularBarbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </PageSectionScroller>
        </PageSectionContent>
      </PageContainer>
    </div>
  );
}
