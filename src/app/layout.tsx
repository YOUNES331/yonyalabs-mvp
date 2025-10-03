import '@/styles/globals.css';
import Nav from '@/components/Nav';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'YonYa Labs – MVP',
  description: 'Planning, CRM, Facturation, SAV – MVP',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Nav />
        <main className="container-narrow space-y-6">{children}</main>
      </body>
    </html>
  );
}
