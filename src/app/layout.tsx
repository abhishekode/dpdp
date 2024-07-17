import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/context/ThemeContext";
import { UserContextProvider } from "@/components/context/UserContext";
import Header from "@/components/Layout/header";
import Footer from "@/components/Layout/footer";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <UserContextProvider>
            <Header />
            <div className="min-h-screen">{children}</div>
          </UserContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
