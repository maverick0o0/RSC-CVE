import './globals.css';

export const metadata = {
  title: 'CVE-2025-55182 insecure deserialization lab',
  description:
    'Intentionally vulnerable Next.js 15 / React 19 demo highlighting insecure deserialization in React Server Components.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
