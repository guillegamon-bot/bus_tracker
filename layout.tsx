import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bus Panel — Elisabethenstraße",
  description: "Personal departure board concept for Frankfurt am Main."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
