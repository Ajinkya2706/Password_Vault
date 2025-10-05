import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SecureVault - Password Manager',
  description: 'Secure password manager with client-side encryption',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}