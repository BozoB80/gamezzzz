import { ClerkProvider } from "@clerk/nextjs";
import { Anek_Gujarati } from "next/font/google";
import Sidebar from "@/components/admin/Sidebar";

import "../globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const font = Anek_Gujarati({ subsets: ["latin"] });

export const metadata = {
  title: "Gamezzzz | Admin",
  description: "Go administrate",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            <main className="flex flex-row">
              <Sidebar />
              {children}
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
