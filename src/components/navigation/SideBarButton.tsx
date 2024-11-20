'use client';

import { Button, ButtonProps } from '@nextui-org/button';
import Link, { LinkProps } from 'next/link';
//import { usePathname } from 'next/navigation';

export default function SidebarButton(props: ButtonProps & LinkProps) {
  //const pathname = usePathname();
  //const active = pathname === props.href;
  return (
    <Button
      as={Link}
      radius="none"
      size="lg"
      className="bg-transparent hover:bg-content6 justify-start py-4 px-6 h-[auto]"
      fullWidth
      {...props}
    />
  );
}
