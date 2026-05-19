import type { BookingGetPayload } from "@/generated/prisma/models/Booking";
import { prisma } from "@/lib/prisma";

export type BookingWithRelations = BookingGetPayload<{
  include: {
    barbershop: true;
    service: true;
  };
}>;

export const getUserBookings = async (userId: string) => {
  const now = new Date();
  const include = {
    barbershop: true,
    service: true,
  } as const;

  const [scheduledBookings, finishedBookings] = await Promise.all([
    prisma.booking.findMany({
      where: {
        userId,
        cancelledAt: null,
        date: {
          gte: now,
        },
      },
      include,
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
      include,
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
