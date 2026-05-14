"use server";

import { headers } from "next/headers";
import { returnValidationErrors } from "next-safe-action";
import { z } from "zod";

import { actionClient } from "@/lib/action-client";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const inputSchema = z.object({
  serviceId: z.uuid(),
  date: z.date(),
});

export const createBooking = actionClient
  .inputSchema(inputSchema)
  .action(async ({ parsedInput: { serviceId, date } }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user) {
      returnValidationErrors(inputSchema, { _errors: ["Não autorizado"] });
    }
    const service = await prisma.barbershopService.findUnique({
      where: { id: serviceId },
    });
    if (!service) {
      returnValidationErrors(inputSchema, {
        _errors: ["Serviço não encontrado"],
      });
    }
    const existingBooking = await prisma.booking.findFirst({
      where: {
        barbershopId: service.barbershopId,
        date,
      },
    });
    if (existingBooking) {
      returnValidationErrors(inputSchema, {
        _errors: ["Já existe um agendamento para este serviço e data"],
      });
    }
    const booking = await prisma.booking.create({
      data: {
        serviceId,
        date,
        barbershopId: service.barbershopId,
        userId: session.user.id,
      },
    });
    return booking;
  });
