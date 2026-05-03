import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PropList AI',
  description: 'AI listing copywriting for Singapore property agents.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
