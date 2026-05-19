import Link from "next/dist/client/link";
import Image from "next/image";

import SidebarMenu from "@/components/sidebar-menu";

const Header = () => {
  return (
    <header className="bg-background py flex items-center justify-between px-5 pt-5">
      <Link href="/">
        <Image src="/logo.svg" alt="Clique Agenda" width={91} height={24} />
      </Link>
      <SidebarMenu />
    </header>
  );
};

export default Header;
