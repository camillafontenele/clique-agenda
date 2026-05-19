import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { BookingWithRelations } from "@/data/bookings";
import { cn } from "@/lib/utils";

export type BookingStatus = "scheduled" | "finished" | "cancelled";

interface BookingItemProps {
  booking: BookingWithRelations;
  status: BookingStatus;
}

const STATUS_LABELS: Record<BookingStatus, string> = {
  scheduled: "Confirmado",
  finished: "Finalizado",
  cancelled: "Cancelado",
};

const STATUS_CLASS_NAMES: Record<BookingStatus, string> = {
  scheduled: "bg-primary/10 text-primary",
  finished: "bg-muted text-muted-foreground",
  cancelled: "bg-destructive/10 text-destructive",
};

const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

const BookingItem = ({ booking, status }: BookingItemProps) => {
  const month = capitalize(format(booking.date, "MMMM", { locale: ptBR }));

  return (
    <Card className="bg-card-background border-border flex h-full w-full cursor-pointer flex-row items-center justify-between gap-0 rounded-2xl border p-0 shadow-none">
      <div className="flex min-w-0 flex-1 flex-col gap-4 p-4">
        <Badge
          className={cn(
            "px-2 py-1.5 text-xs font-semibold uppercase",
            STATUS_CLASS_NAMES[status],
          )}
        >
          {STATUS_LABELS[status]}
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

      <div className="border-border text-card-foreground flex h-full w-[6.625rem] shrink-0 flex-col items-center justify-center border-l py-3">
        <p className="text-xs">{month}</p>
        <p className="text-2xl leading-tight">{format(booking.date, "dd")}</p>
        <p className="text-xs">{format(booking.date, "HH:mm")}</p>
      </div>
    </Card>
  );
};

export default BookingItem;
