import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ProvidersWrapper from "@/components/provider/ProvidersWrapper";
import { Header } from "@/components/layout";
import NextTopLoader from 'nextjs-toploader';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pair Dev",
  description: "An application to pair with random dev who are working on same path.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>

        <NextTopLoader />
        <ProvidersWrapper>
          <Header />
          {children}
        </ProvidersWrapper>

      </body>
    </html>
  );
}
