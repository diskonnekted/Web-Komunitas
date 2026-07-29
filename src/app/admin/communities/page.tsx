"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2 } from "lucide-react";

interface Community {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  isActive: boolean;
  members: { id: string }[];
}

const categoryColors: Record<string, string> = {
  PERTANIAN: "bg-green-100 text-green-800",
  EKONOMI: "bg-blue-100 text-blue-800",
  DIGITAL: "bg-indigo-100 text-indigo-800",
  OLAHRAGA: "bg-emerald-100 text-emerald-800",
  KESEHATAN: "bg-red-100 text-red-800",
  RELIGI: "bg-yellow-100 text-yellow-800",
  SOSIAL: "bg-orange-100 text-orange-800",
  BUDAYA: "bg-purple-100 text-purple-800",
  KELUARGA: "bg-pink-100 text-pink-800",
  PEMUDA: "bg-cyan-100 text-cyan-800",
  PENDIDIKAN: "bg-teal-100 text-teal-800",
  INOVASI: "bg-violet-100 text-violet-800",
  LINGKUNGAN: "bg-lime-100 text-lime-800",
  LAINNYA: "bg-gray-100 text-gray-800"
};

export default function AdminCommunitiesPage() {
  const router = useRouter();
  const [communities, setCommunities] = useState<Community[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
    if (!isLoggedIn) {
      router.push("/admin/login");
      return;
    }
    fetchCommunities();
  }, [router]);

  const fetchCommunities = async () => {
    try {
      const response = await fetch("/api/communities-full");
      const data = await response.json();
      setCommunities(data);
    } catch (error) {
      console.error("Failed to fetch communities:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold">Admin - Kelola Komunitas</h1>
            <Button variant="outline" size="sm" onClick={() => router.push("/admin/dashboard")}>
              Kembali ke Dashboard
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Komunitas</h2>
          <p className="text-muted-foreground">{communities.length} komunitas</p>
        </div>

        <Card>
          <CardContent className="p-0">
            {communities.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                Belum ada komunitas.
              </div>
            ) : (
              <div className="space-y-4 p-6">
                {communities.map((community) => (
                  <div key={community.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className={categoryColors[community.category as keyof typeof categoryColors]}>
                            {community.category}
                          </Badge>
                          <Badge variant={community.isActive ? "default" : "secondary"}>
                            {community.isActive ? "Aktif" : "Nonaktif"}
                          </Badge>
                        </div>
                        <h4 className="font-medium text-lg">{community.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{community.description}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {community.members.length} anggota
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Hapus
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
