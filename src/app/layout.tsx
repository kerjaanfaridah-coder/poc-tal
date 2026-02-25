import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FirebaseProvider } from "@/components/FirebaseProvider";
import { ProjectProvider } from "@/contexts/ProjectContext";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "POCTAL",
  description: "Manage your projects and tasks efficiently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <FirebaseProvider>
          <ProjectProvider>
            <div className="min-h-screen bg-gray-50">
              <Sidebar />
              <div className="ml-64">
                <Navbar />
                <main>
                  {children}
                </main>
              </div>
            </div>
          </ProjectProvider>
        </FirebaseProvider>
      </body>
    </html>
  );
}
