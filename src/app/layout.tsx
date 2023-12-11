import { Roboto } from "next/font/google";
import { NextAuthProvider } from "providers/NextAuthProvider";
import type { Metadata } from "next";
import "../styles/globals.css";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Memory Game",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={roboto.className}>
      <body className={"bg-slate-400"}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
