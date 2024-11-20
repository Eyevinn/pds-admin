import { Providers } from './providers';

import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PDS Admin',
  description: 'Adminstration user interface for PDS'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
