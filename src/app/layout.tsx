import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Navigation from "@/components/navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Komunitas Kalurahan Pondokrejo",
  description: "Wadah digital terpadu bagi seluruh komunitas warga Kalurahan Pondokrejo, Sleman, Yogyakarta",
  keywords: ["Kalurahan Pondokrejo", "Komunitas", "Sleman", "Yogyakarta", "UMKM", "Olahraga", "Seni"],
  authors: [{ name: "Komunitas Kalurahan Pondokrejo" }],
  openGraph: {
    title: "Komunitas Kalurahan Pondokrejo",
    description: "Wadah digital terpadu bagi seluruh komunitas warga Kalurahan Pondokrejo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Komunitas Kalurahan Pondokrejo",
    description: "Wadah digital terpadu bagi seluruh komunitas warga Kalurahan Pondokrejo",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-primary text-primary-foreground py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm">
                © {new Date().getFullYear()} Komunitas Kalurahan Pondokrejo. Hak Cipta Dilindungi.
              </p>
              <p className="text-xs mt-2 opacity-75">
                Kalurahan Pondokrejo, Sleman, Yogyakarta
              </p>
            </div>
          </div>
        </footer>
        <Toaster />
      </body>
    </html>
  );
}
