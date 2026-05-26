"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Loader2, Smartphone } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";

import { cancelBooking } from "@/action/cancel-booking";
import CopyButton from "@/app/barbershops/[id]/_components/copy-button";
import BookingSummary from "@/components/booking-summary";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { BookingWithRelations } from "@/data/bookings";
import { type BookingStatus, getBookingStatus } from "@/lib/get-booking-status";
import { cn } from "@/lib/utils";

interface BookingItemProps {
  booking: BookingWithRelations;
}

const STATUS_CLASS_NAMES: Record<BookingStatus, string> = {
  scheduled: "bg-primary/10 text-primary",
  finished: "bg-muted text-muted-foreground",
  cancelled: "bg-destructive/10 text-destructive",
};

const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

const BookingItem = ({ booking }: BookingItemProps) => {
  const router = useRouter();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const { executeAsync: executeCancelBooking, isPending: isCancellingBooking } =
    useAction(cancelBooking);
  const { status, label } = getBookingStatus(booking);
  const month = capitalize(format(booking.date, "MMMM", { locale: ptBR }));
  const canCancel = status === "scheduled";

  const handleCancelBooking = async () => {
    const result = await executeCancelBooking({
      bookingId: booking.id,
    });

    if (result?.validationErrors) {
      toast.error(result.validationErrors._errors?.[0]);
      return;
    }

    if (result?.serverError) {
      toast.error("Erro ao cancelar reserva. Por favor, tente novamente.");
      return;
    }

    toast.success("Reserva cancelada com sucesso!");
    setAlertOpen(false);
    setSheetOpen(false);
    router.refresh();
  };

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Card className="bg-card-background border-border flex h-full w-full cursor-pointer flex-row items-center justify-between gap-0 rounded-2xl border p-0 shadow-none">
          <div className="flex min-w-0 flex-1 flex-col gap-4 p-4">
            <Badge
              className={cn(
                "px-2 py-1.5 text-xs font-semibold uppercase",
                STATUS_CLASS_NAMES[status],
              )}
            >
              {label}
            </Badge>

            <div className="flex min-w-0 flex-col gap-2.5">
              <p className="text-card-foreground truncate text-base font-bold">
                {booking.service.name}
              </p>

              <div className="flex min-w-0 items-center gap-2">
                <div className="relative size-6 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={booking.barbershop.imageUrl}
                    alt={booking.barbershop.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-card-foreground truncate text-sm">
                  {booking.barbershop.name}
                </p>
              </div>
            </div>
          </div>

          <div className="border-border text-card-foreground flex h-full w-26.5 shrink-0 flex-col items-center justify-center border-l py-3">
            <p className="text-xs">{month}</p>
            <p className="text-2xl leading-tight">
              {format(booking.date, "dd")}
            </p>
            <p className="text-xs">{format(booking.date, "HH:mm")}</p>
          </div>
        </Card>
      </SheetTrigger>

      <SheetContent className="w-[calc(100%-2.5rem)] gap-0 overflow-y-auto px-0 pb-0 sm:w-92.5 sm:max-w-92.5">
        <SheetHeader className="border-border shrink-0 border-b px-5 py-6">
          <SheetTitle className="text-lg font-bold">
            Informações da Reserva
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-6 px-5 py-6">
          <div className="relative flex h-45 items-end overflow-hidden rounded-lg p-5">
            <Image
              src="/booking-map.png"
              alt={`Mapa de ${booking.barbershop.name}`}
              fill
              className="object-cover"
            />
            <div className="bg-background relative flex min-w-0 items-center gap-3 rounded-lg px-5 py-3">
              <div className="relative size-12 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={booking.barbershop.imageUrl}
                  alt={booking.barbershop.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="truncate text-base font-bold">
                  {booking.barbershop.name}
                </p>
                <p className="text-muted-foreground truncate text-xs">
                  {booking.barbershop.address}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-3">
            <Badge
              className={cn(
                "px-2 py-1.5 text-xs font-semibold uppercase",
                STATUS_CLASS_NAMES[status],
              )}
            >
              {label}
            </Badge>
            <BookingSummary
              serviceName={booking.service.name}
              priceInCents={booking.service.priceInCents}
              date={booking.date}
              barbershopName={booking.barbershop.name}
            />
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2.5">
                <Smartphone className="size-6 shrink-0" />
                <p className="truncate text-sm">{booking.barbershop.phone}</p>
              </div>
              <CopyButton text={booking.barbershop.phone} />
            </div>
          </div>
        </div>

        <SheetFooter className="bg-background flex-row gap-3 px-5 pt-0 pb-5">
          <SheetClose asChild>
            <Button
              variant="outline"
              className="h-9 flex-1 rounded-full text-sm font-bold"
            >
              Voltar
            </Button>
          </SheetClose>

          {canCancel && (
            <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
              <Button
                variant="destructive"
                className="h-9 flex-1 rounded-full text-sm font-bold"
                onClick={() => setAlertOpen(true)}
              >
                Cancelar Reserva
              </Button>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Cancelar reserva?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta ação não pode ser desfeita. Sua reserva será marcada
                    como cancelada.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isCancellingBooking}>
                    Voltar
                  </AlertDialogCancel>
                  <Button
                    variant="destructive"
                    disabled={isCancellingBooking}
                    onClick={handleCancelBooking}
                  >
                    {isCancellingBooking ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      "Confirmar"
                    )}
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default BookingItem;
