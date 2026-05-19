"use server";

import {
  endOfDay,
  format,
  isPast,
  setHours,
  setMinutes,
  startOfDay,
} from "date-fns";
import { headers } from "next/headers";
import { returnValidationErrors } from "next-safe-action";
import { z } from "zod";

import { actionClient } from "@/lib/action-client";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const InputSchema = z.object({
  barbershopId: z.uuid(),
  date: z.date(),
});

const TIME_LIST = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
];

export const getDateAvailableTimeSlots = actionClient
  .inputSchema(InputSchema)
  .action(async ({ parsedInput: { date, barbershopId } }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user) {
      returnValidationErrors(InputSchema, {
        _errors: [
          "Não autorizado. Por favor faça login para acessar os horários disponíveis.",
        ],
      });
    }
    const bookings = await prisma.booking.findMany({
      where: {
        barbershopId,
        date: {
          gte: startOfDay(date),
          lte: endOfDay(date),
        },
      },
      select: {
        date: true,
      },
    });

    const occupiedSlots = new Set(
      bookings.map((booking) => format(booking.date, "HH:mm")),
    );

    const availableTimeSlots = TIME_LIST.filter((slot) => {
      const [hours, minutes] = slot.split(":").map(Number);
      const slotDate = setMinutes(setHours(date, hours), minutes);

      return !occupiedSlots.has(slot) && !isPast(slotDate);
    });

    return availableTimeSlots;
  });
