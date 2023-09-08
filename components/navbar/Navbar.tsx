import Image from "next/image";
import Link from "next/link";

import { MainNav } from "./MainNav";
import NavRight from "./NavRight";

const Navbar = () => {

  return (
    <nav className="border-b bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 shadow-xl">
      <div className="flex h-16 items-center px-4 gap-10">
        <Link href="/">
          <Image 
            src="/logo-light.png"
            alt="logo"
            width={150}
            height={150}
            className="cursor-pointer"
          />
        </Link>
        <MainNav />
        <NavRight />       
      </div>
    </nav>
  );
}

export default Navbar;