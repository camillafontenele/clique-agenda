"use client";

import { startOfDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";

import { createBooking } from "@/action/create-booking";
import BookingSummary from "@/components/booking-summary";
import { Barbershop, BarbershopService } from "@/generated/prisma/client";
import { useGetDateAvailableTimeSlots } from "@/hooks/data/use-get-date-avaliabe-time-slots";
import { formatCurrency } from "@/lib/utils";

import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

interface ServiceItemProps {
  service: BarbershopService;
  barbershop: Pick<Barbershop, "id" | "name">;
}

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  );
  const [sheetOpen, setSheetOpen] = useState(false);
  const { executeAsync: executeCreateBooking, isPending: isCreatingBooking } =
    useAction(createBooking);

  const { data: availableTimeSlots, isPending: isLoadingAvailableTimeSlots } =
    useGetDateAvailableTimeSlots({
      barbershopId: barbershop.id,
      date: selectedDate,
    });

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTime(undefined);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleConfirmBooking = async () => {
    if (!selectedDate || !selectedTime) {
      return;
    }
    const [hours, minutes] = selectedTime.split(":").map(Number);

    const bookingDate = new Date(selectedDate);
    bookingDate.setHours(hours, minutes, 0, 0);

    const result = await executeCreateBooking({
      serviceId: service.id,
      date: bookingDate,
    });
    if (result?.validationErrors) {
      return toast.error(result.validationErrors._errors?.[0]);
    }
    if (result?.serverError) {
      return toast.error(
        "Erro ao criar agendamento. Por favor, tente novamente.",
      );
    }
    toast.success("Agendamento criado com sucesso!");
    setSelectedDate(undefined);
    setSelectedTime(undefined);
    setSheetOpen(false);
  };

  return (
    <div className="border-border bg-card flex gap-3 rounded-2xl border p-3">
      <div className="relative h-27.5 w-27.5 shrink-0">
        <Image
          src={service.imageUrl}
          alt={service.name}
          fill
          className="rounded-xl object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div className="space-y-1">
          <p className="text-sm font-bold">{service.name}</p>
          <p className="text-muted-foreground text-sm">{service.description}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold">
            {formatCurrency(service.priceInCents)}
          </p>

          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button className="rounded-full" size="sm">
                Reservar
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[calc(100%-2.5rem)] gap-0 overflow-y-auto px-0 pb-0 sm:w-92.5 sm:max-w-92.5">
              <SheetHeader className="border-border shrink-0 border-b px-5 py-4">
                <SheetTitle className="text-sm font-bold">
                  Fazer Reserva
                </SheetTitle>
              </SheetHeader>

              <div className="border-border flex justify-center border-b px-5 py-5">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  locale={ptBR}
                  disabled={(date) => date < startOfDay(new Date())}
                  className="mx-auto p-0 [--cell-size:clamp(2.25rem,9vw,2.85rem)]"
                  classNames={{
                    root: "w-fit",
                    months: "relative ",
                    month: "gap-4",
                    weekdays: "grid grid-cols-7",
                    weekday:
                      "text-muted-foreground flex h-[var(--cell-size)] w-[var(--cell-size)] items-center justify-center text-center text-xs font-normal capitalize",
                    week: "grid grid-cols-7 gap-1",
                    day: "flex h-[var(--cell-size)] w-[var(--cell-size)] items-center justify-center p-0",
                    day_button:
                      "mx-auto size-[var(--cell-size)] rounded-full text-sm font-normal hover:bg-muted data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground",
                    caption: "capitalize",
                    caption_label: "text-xs font-bold capitalize",
                    nav: "absolute right-0 top-0 z-10 flex items-center gap-1",
                    button_previous:
                      "size-6 rounded-md border-0 bg-transparent p-0 text-muted-foreground hover:bg-muted",
                    button_next:
                      "size-6 rounded-md bg-muted p-0 text-muted-foreground hover:bg-muted",
                    month_caption:
                      "relative flex h-6 w-full items-center justify-start px-0 pr-14",
                  }}
                />
              </div>

              {selectedDate && (
                <div className="border-border flex gap-2 overflow-x-auto border-b px-5 py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {isLoadingAvailableTimeSlots ? (
                    <Loader2 className="text-muted-foreground size-4 animate-spin" />
                  ) : (
                    availableTimeSlots?.data?.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        className="h-8 shrink-0 rounded-full px-4 text-sm font-normal"
                        onClick={() => handleTimeSelect(time)}
                      >
                        {time}
                      </Button>
                    ))
                  )}
                </div>
              )}

              {selectedDate && selectedTime && (
                <div className="px-5 py-4">
                  <BookingSummary
                    serviceName={service.name}
                    priceInCents={service.priceInCents}
                    date={selectedDate}
                    time={selectedTime}
                    barbershopName={barbershop.name}
                  />
                </div>
              )}

              <SheetFooter className="bg-background px-5 pt-0 pb-4">
                <Button
                  className="h-9 w-full rounded-full text-sm font-bold"
                  disabled={!selectedDate || !selectedTime || isCreatingBooking}
                  onClick={handleConfirmBooking}
                >
                  {isCreatingBooking ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    "Confirmar"
                  )}
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default ServiceItem;
