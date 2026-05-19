"use server";

import { isPast } from "date-fns";
import { revalidatePath } from "next/cache";
import { returnValidationErrors } from "next-safe-action";
import { z } from "zod";

import { protectedActionClient } from "@/lib/action-client";
import { prisma } from "@/lib/prisma";

const inputSchema = z.object({
  bookingId: z.uuid(),
});

export const cancelBooking = protectedActionClient
  .inputSchema(inputSchema)
  .action(async ({ parsedInput: { bookingId }, ctx: { user } }) => {
    const booking = await prisma.booking.findUnique({
      where: {
        id: bookingId,
      },
    });

    if (!booking || booking.userId !== user.id) {
      returnValidationErrors(inputSchema, {
        _errors: ["Reserva não encontrada."],
      });
    }

    if (booking.cancelledAt) {
      returnValidationErrors(inputSchema, {
        _errors: ["Esta reserva já foi cancelada."],
      });
    }

    if (isPast(booking.date)) {
      returnValidationErrors(inputSchema, {
        _errors: ["Não é possível cancelar uma reserva finalizada."],
      });
    }

    const cancelledBooking = await prisma.booking.update({
      where: {
        id: booking.id,
      },
      data: {
        cancelledAt: new Date(),
      },
    });

    revalidatePath("/bookings");

    return cancelledBooking;
  });
