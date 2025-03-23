import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata = {
  title: "AiCare",
  description: "Healthcare Management Platform"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow bg-gray-100">{children}</main>
        </div>
      </body>
    </html>
  );
}
