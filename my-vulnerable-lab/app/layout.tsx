import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vulnerable Next.js Lab',
  description: 'A deliberately vulnerable lab environment for testing RSC behaviors.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>
          <h1>Vulnerable Next.js Lab</h1>
          {children}
        </main>
      </body>
    </html>
  );
}
