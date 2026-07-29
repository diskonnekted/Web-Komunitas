"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminGalleryPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold">Admin - Kelola Galeri</h1>
            <Button variant="outline" size="sm" onClick={() => router.push("/admin/dashboard")}>
              Kembali ke Dashboard
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Galeri Media</h2>
          <p className="text-muted-foreground">Kelola foto dan video kegiatan</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Fitur kelola galeri sedang dalam pengembangan.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
