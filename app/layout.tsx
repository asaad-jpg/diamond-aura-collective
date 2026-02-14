import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Diamond Aura Collective",
  description: "Luxury streetwear catalog. Order via Instagram.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AnnouncementBar />
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
