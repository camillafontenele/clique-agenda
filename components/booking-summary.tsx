import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

interface BookingSummaryProps {
  serviceName: string;
  priceInCents: number;
  date: Date;
  time?: string;
  barbershopName: string;
}

const BookingSummary = ({
  serviceName,
  priceInCents,
  date,
  time,
  barbershopName,
}: BookingSummaryProps) => {
  return (
    <Card className="bg-card-background border-border gap-0 rounded-xl py-0 shadow-none">
      <CardContent className="flex flex-col gap-3 p-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-card-foreground truncate text-base font-bold">
            {serviceName}
          </h2>
          <p className="text-card-foreground shrink-0 text-sm font-bold">
            {formatCurrency(priceInCents)}
          </p>
        </div>

        <div className="text-muted-foreground flex items-center justify-between gap-3 text-sm">
          <p>Data</p>
          <p className="text-right">
            {format(date, "dd 'de' MMMM", { locale: ptBR })}
          </p>
        </div>

        <div className="text-muted-foreground flex items-center justify-between gap-3 text-sm">
          <p>Horário</p>
          <p className="text-right">{time ?? format(date, "HH:mm")}</p>
        </div>

        <div className="text-muted-foreground flex items-center justify-between gap-3 text-sm">
          <p>Barbearia</p>
          <p className="truncate text-right">{barbershopName}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingSummary;
