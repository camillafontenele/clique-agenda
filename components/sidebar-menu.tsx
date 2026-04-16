"use client";

import { CalendarDays, House, LogIn, LogOut, MenuIcon } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const isLoggedIn = false;

const CATEGORIES = [
  { label: "Cabelo", search: "cabelo" },
  { label: "Barba", search: "barba" },
  { label: "Acabamento", search: "acabamento" },
  { label: "Sombrancelha", search: "sombrancelha" },
  { label: "Massagem", search: "massagem" },
  { label: "Hidratação", search: "hidratacao" },
];

const SidebarMenu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[20rem] p-0">
        <SheetHeader className="border-border border-b px-5 py-6">
          <SheetTitle className="text-left text-lg font-bold">Menu</SheetTitle>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-6 overflow-y-auto py-6">
          <div className="flex items-center justify-between px-5">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="" alt="Camilla Fontenele" />
                  <AvatarFallback>CF</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-foreground text-sm font-semibold">
                    Camilla Fontenele
                  </span>
                  <span className="text-muted-foreground text-xs">
                    camilla@email.com
                  </span>
                </div>
              </div>
            ) : (
              <>
                <p className="text-foreground text-base font-semibold">
                  Olá. Faça seu login!
                </p>
                <Button
                  size="sm"
                  className="font-noemal gap-3 rounded-full px-6 font-normal"
                >
                  Login
                  <LogIn className="size-4" strokeWidth={1.5} />
                </Button>
              </>
            )}
          </div>

          <Separator />

          <nav className="flex flex-col">
            <Link
              href="/"
              className="text-foreground hover:bg-accent flex items-center gap-3 rounded-full px-5 py-3 text-sm font-medium transition-colors"
            >
              <House className="size-4" />
              Início
            </Link>
            <Link
              href="/bookings"
              className="text-foreground hover:bg-accent flex items-center gap-3 rounded-full px-5 py-3 text-sm font-medium transition-colors"
            >
              <CalendarDays className="size-4" />
              Agendamentos
            </Link>
          </nav>

          <Separator />

          <div className="flex flex-col gap-1">
            {CATEGORIES.map((category) => (
              <Link
                key={category.search}
                href={`/barbershops?search=${category.search}`}
                className="text-foreground hover:bg-accent flex h-10 items-center rounded-full px-5 text-sm font-medium transition-colors"
              >
                {category.label}
              </Link>
            ))}
          </div>

          <Separator />

          <Button
            variant="ghost"
            className="text-muted-foreground w-full justify-start gap-3 rounded-full px-5 py-3 text-sm font-medium"
          >
            <LogOut className="size-4" />
            Sair da conta
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarMenu;
