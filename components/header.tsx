import Image from "next/image";

import SidebarMenu from "@/components/sidebar-menu";

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-background px-5 py">
      <Image src="/logo.svg" alt="Clique Agenda" width={91} height={24} />
      <SidebarMenu />
    </header>
  );
};

export default Header;
