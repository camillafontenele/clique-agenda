import { MenuIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";


const Header = () => {
  return (
    <header className="flex items-center justify-between bg-background px-5 py">
      <Image src="/logo.svg" alt="Clique Agenda" width={91} height={24} />
      <Button variant="outline" size="icon">
        <MenuIcon/>
      </Button>
      
    </header>
  );
};

export default Header;
