import { isFuture } from "date-fns";
import { headers } from "next/headers";

import BookingItem, { type BookingStatus } from "@/components/booking-item";
import Header from "@/components/header";
import {
  PageContainer,
  PageSectionContent,
  PageSectionTitle,
} from "@/components/ui/page";
import {
  type BookingWithRelations,
  getUserBookings,
} from "@/data/bookings";
import { auth } from "@/lib/auth";

const getBookingStatus = (booking: BookingWithRelations): BookingStatus => {
  if (booking.cancelledAt) {
    return "cancelled";
  }

  if (isFuture(booking.date)) {
    return "scheduled";
  }

  return "finished";
};

const BookingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { scheduledBookings, finishedBookings } = session?.user
    ? await getUserBookings(session.user.id)
    : { scheduledBookings: [], finishedBookings: [] };

  return (
    <div>
      <Header />
      <PageContainer>
        <h1 className="text-xl font-bold">Agendamentos</h1>

        <PageSectionContent>
          <PageSectionTitle>Confirmados</PageSectionTitle>
          {scheduledBookings.length > 0 ? (
            scheduledBookings.map((booking) => (
              <BookingItem
                key={booking.id}
                booking={booking}
                status={getBookingStatus(booking)}
              />
            ))
          ) : (
            <p className="text-muted-foreground text-sm">
              Você ainda não possui agendamentos confirmados.
            </p>
          )}
        </PageSectionContent>

        <PageSectionContent>
          <PageSectionTitle>Finalizados</PageSectionTitle>
          {finishedBookings.length > 0 ? (
            finishedBookings.map((booking) => (
              <BookingItem
                key={booking.id}
                booking={booking}
                status={getBookingStatus(booking)}
              />
            ))
          ) : (
            <p className="text-muted-foreground text-sm">
              Você ainda não possui agendamentos finalizados.
            </p>
          )}
        </PageSectionContent>
      </PageContainer>
    </div>
  );
};

export default BookingsPage;
