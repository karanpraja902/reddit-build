import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Readit Sanity Admin Panel",
  description: "Reddit Clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
      <html lang="en">
        <body>
            {children}
        </body>
      </html>
    
  );
}
