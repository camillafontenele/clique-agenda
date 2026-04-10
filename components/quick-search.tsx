import {
  Eye,
  Footprints,
  Scissors,
  SearchIcon,
  Sparkles,
  User,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageSectionScroller } from "@/components/ui/page";

const QuickSearch = () => {
  return (
    <>
      <div className="flex items-center gap-2">
        <Input className="border-border rounded-full" placeholder="Pesquisar" />
        <Button className="h-10 w-10 rounded-full">
          <SearchIcon />
        </Button>
      </div>
      <PageSectionScroller>
        <Link
          href="/barbershops?search=cabelo"
          className="border-border bg-muted flex shrink-0 items-center justify-center gap-3 rounded-3xl px-4 py-2"
        >
          <Scissors className="size-4" />
          <span className="text-card-foreground text-sm font-medium">
            Cabelo
          </span>
        </Link>

        <Link
          href="/barbershops?search=barba"
          className="border-border bg-muted flex shrink-0 items-center justify-center gap-3 rounded-3xl px-4 py-2"
        >
          <User className="size-4" />
          <span className="text-card-foreground text-sm font-medium">
            Barba
          </span>
        </Link>

        <Link
          href="/barbershops?search=acabamento"
          className="border-border bg-muted flex shrink-0 items-center justify-center gap-3 rounded-3xl px-4 py-2"
        >
          <Sparkles className="size-4" />
          <span className="text-card-foreground text-sm font-medium">
            Acabamento
          </span>
        </Link>

        <Link
          href="/barbershops?search=sobrancelha"
          className="border-border bg-muted flex shrink-0 items-center justify-center gap-3 rounded-3xl px-4 py-2"
        >
          <Eye className="size-4" />
          <span className="text-card-foreground text-sm font-medium">
            Sobrancelha
          </span>
        </Link>

        <Link
          href="/barbershops?search=pezinho"
          className="border-border bg-muted flex shrink-0 items-center justify-center gap-3 rounded-3xl px-4 py-2"
        >
          <Footprints className="size-4" />
          <span className="text-card-foreground text-sm font-medium">
            Pézinho
          </span>
        </Link>
      </PageSectionScroller>
    </>
  );
};

export default QuickSearch;
