import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const BookingItem = () => {
  return (
    <Card className="bg-card-background flex h-full w-full cursor-pointer flex-row items-center justify-between p-0">
      {/* ESQUERDA */}
      <div className="flex flex-1 flex-col gap-4 p-4">
        <Badge>Confirmado</Badge>
        <div className="flex flex-col gap-2">
          <p className="p font-bold">Corte de Cabelo</p>
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src="https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png" />
            </Avatar>
            <p className="text-sm font-medium">Barbearia do João</p>
          </div>
        </div>
      </div>
      {/* DIREITA */}
      <div className="flex h-full w-26 flex-col items-center justify-center border-l py-3">
        <p className="text-xs capitalize">Fevereiro</p>
        <p className="text-2xl">13</p>
        <p className="text-xs">10:00</p>
      </div>
    </Card>
  );
};

export default BookingItem;
