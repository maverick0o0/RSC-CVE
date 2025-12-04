import './globals.css';

export const metadata = {
  title: 'CVE Demo | CVE-2025-55182 & CVE-2025-66478',
  description: 'Lightweight Next.js showcase describing two imaginary CVE scenarios.',
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
