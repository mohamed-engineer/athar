import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Athar | Provix Tech",
  description: "لحظة ذكر هادئة",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.className} bg-gradient-to-b from-green-900 via-green-800 to-black text-white`}>
        {children}
      </body>
    </html>
  );
}
