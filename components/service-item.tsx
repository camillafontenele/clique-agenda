"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";
import { useMemo, useState } from "react";

import { Barbershop, BarbershopService } from "@/generated/prisma/client";
import { formatCurrency } from "@/lib/utils";

import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Card, CardContent } from "./ui/card";
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
  barbershop: Pick<Barbershop, "name">;
}

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

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  );

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTime(undefined);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const timeList = useMemo(() => {
    if (!selectedDate) {
      return [];
    }
    return TIME_LIST;
  }, [selectedDate]);

  return (
    <div className="border-border bg-card flex gap-3 rounded-2xl border p-3">
      {/* Service Image */}
      <div className="relative h-[110px] w-[110px] shrink-0">
        <Image
          src={service.imageUrl}
          alt={service.name}
          fill
          className="rounded-xl object-cover"
        />
      </div>

      {/* Service Info */}
      <div className="flex flex-1 flex-col justify-between">
        <div className="space-y-1">
          <p className="text-sm font-bold">{service.name}</p>
          <p className="text-muted-foreground text-sm">{service.description}</p>
        </div>

        {/* Price and Booking Button */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold">
            {formatCurrency(service.priceInCents)}
          </p>

          <Sheet>
            <SheetTrigger asChild>
              <Button className="rounded-full" size="sm">
                Reservar
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full gap-0 overflow-y-auto px-0 pb-0 sm:max-w-[400px]">
              <SheetHeader className="border-border shrink-0 border-b px-5 py-6">
                <SheetTitle>Fazer Reserva</SheetTitle>
              </SheetHeader>

              <div className="border-border border-b px-5 py-6">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  locale={ptBR}
                  className="w-full p-0 [--cell-size:2.25rem]"
                  classNames={{
                    root: "w-full",
                    months: "w-full",
                    month: "w-full gap-4",
                    weekdays: "grid grid-cols-7",
                    weekday:
                      "text-muted-foreground text-center text-xs font-normal capitalize",
                    week: "grid w-full grid-cols-7 gap-1",
                    day: "h-9 w-full p-0",
                    caption: "capitalize",
                    caption_label: "text-base font-bold",
                    nav: "absolute right-0 top-0 z-10 flex gap-1",
                    button_previous:
                      "size-8 rounded-lg border border-border bg-transparent hover:bg-muted",
                    button_next:
                      "size-8 rounded-lg bg-muted text-muted-foreground hover:bg-muted",
                    month_caption:
                      "relative flex h-9 w-full items-center justify-start px-0",
                  }}
                />
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div className="border-border flex gap-2 overflow-x-auto border-b px-5 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {timeList.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      className="h-9 shrink-0 rounded-full px-4"
                      onClick={() => handleTimeSelect(time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              )}

              {/* Booking Summary */}
              {selectedDate && selectedTime && (
                <div className="px-5 py-5">
                  <Card className="gap-0 rounded-xl py-0">
                    <CardContent className="flex flex-col gap-3 p-4">
                      <div className="flex items-center justify-between">
                        <h2 className="font-bold">{service.name}</h2>
                        <p className="text-sm font-bold">
                          {formatCurrency(service.priceInCents)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-muted-foreground text-sm">Data</p>
                        <p className="text-sm">
                          {format(selectedDate, "d 'de' MMMM", {
                            locale: ptBR,
                          })}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-muted-foreground text-sm">Horário</p>
                        <p className="text-sm">{selectedTime}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-muted-foreground text-sm">
                          Barbearia
                        </p>
                        <p className="text-sm">{barbershop.name}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              <SheetFooter className="border-border border-t bg-background px-5 py-4">
                <Button
                  className="w-full"
                  disabled={!selectedDate || !selectedTime}
                >
                  Confirmar
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
