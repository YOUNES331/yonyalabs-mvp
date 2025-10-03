'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const items = [
  { href: '/', label: 'Dashboard' },
  { href: '/crm', label: 'CRM' },
  { href: '/planning', label: 'Planning' },
  { href: '/invoices', label: 'Factures' },
  { href: '/tickets', label: 'SAV' },
];

export default function Nav(){
  const pathname = usePathname();
  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b">
      <div className="container mx-auto flex items-center justify-between p-3">
        <Link href="/" className="font-bold text-lg">YonYa Labs</Link>
        <div className="flex gap-1">
          {items.map(it => (
            <Link key={it.href} href={it.href} className={cn('navlink', pathname===it.href && 'navlink-active')}>
              {it.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
