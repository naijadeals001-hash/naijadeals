import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NaijaDeals Platform Foundation',
  description: 'Enterprise platform skeleton for future milestones'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
