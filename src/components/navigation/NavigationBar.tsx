import { Navbar, NavbarContent } from '@nextui-org/navbar';
import { Image } from '@nextui-org/react';
import Link from 'next/link';

export default function NavigationBar() {
  return (
    <Navbar
      className="bg-content1 justify-between px-4 lg:px-8"
      height={'3rem'}
      maxWidth="full"
    >
      <NavbarContent justify="start" className="!grow-[3]">
        <header className="m-1 flex justify-center">
          <Link href="/dashboard">
            <Image
              width={30}
              src="/images/bluesky-logo.png"
              alt="Bluesky Logo"
            />
          </Link>
        </header>
      </NavbarContent>
    </Navbar>
  );
}
