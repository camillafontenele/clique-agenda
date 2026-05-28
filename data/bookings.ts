import type { BookingGetPayload } from "@/generated/prisma/models/Booking";
import { prisma } from "@/lib/prisma";

export type BookingWithRelations = BookingGetPayload<{
  include: {
    barbershop: true;
    service: true;
  };
}>;

const bookingRelations = {
  barbershop: true,
  service: true,
} as const;

export const getUserScheduledBookings = async (userId: string) => {
  const now = new Date();
  const scheduledBookings = await prisma.booking.findMany({
    where: {
      userId,
      cancelledAt: null,
      date: {
        gte: now,
      },
    },
    include: bookingRelations,
    orderBy: {
      date: "asc",
    },
  });

  return scheduledBookings;
};

export const getUserBookings = async (userId: string) => {
  const now = new Date();

  const [scheduledBookings, finishedBookings] = await Promise.all([
    prisma.booking.findMany({
      where: {
        userId,
        cancelledAt: null,
        date: {
          gte: now,
        },
      },
      include: bookingRelations,
      orderBy: {
        date: "asc",
      },
    }),
    prisma.booking.findMany({
      where: {
        userId,
        OR: [
          {
            date: {
              lt: now,
            },
          },
          {
            cancelledAt: {
              not: null,
            },
          },
        ],
      },
      include: bookingRelations,
      orderBy: {
        date: "desc",
      },
    }),
  ]);

  return {
    scheduledBookings,
    finishedBookings,
  };
};
