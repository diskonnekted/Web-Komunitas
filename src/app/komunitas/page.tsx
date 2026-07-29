"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface Community {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  members: { id: string }[];
}

const categories = [
  { value: "ALL", label: "Semua Kategori" },
  { value: "PERTANIAN", label: "Pertanian & Lingkungan" },
  { value: "EKONOMI", label: "Ekonomi & UMKM" },
  { value: "DIGITAL", label: "Digital & Literasi" },
  { value: "OLAHRAGA", label: "Olahraga" },
  { value: "KESEHATAN", label: "Kesehatan" },
  { value: "RELIGI", label: "Keagamaan" },
  { value: "SOSIAL", label: "Sosial" },
  { value: "BUDAYA", label: "Seni & Budaya" },
  { value: "KELUARGA", label: "Keluarga & Pemberdayaan" },
  { value: "PEMUDA", label: "Pemuda & Inovasi" },
  { value: "PENDIDIKAN", label: "Pendidikan" },
  { value: "INOVASI", label: "Inovasi" },
  { value: "LINGKUNGAN", label: "Lingkungan" },
  { value: "LAINNYA", label: "Lainnya" }
];

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

export default function CommunitiesPage() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  useEffect(() => {
    fetch("/api/communities-full")
      .then(res => res.json())
      .then((data: Community[]) => {
        // Sort: Karang Taruna Pondokrejo always first
        const sorted = data.sort((a, b) => {
          if (a.slug === 'karang-taruna-pondokrejo') return -1;
          if (b.slug === 'karang-taruna-pondokrejo') return 1;
          return 0;
        });
        setCommunities(sorted);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch communities:", err);
        setIsLoading(false);
      });
  }, []);

  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         community.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "ALL" || community.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Komunitas Kalurahan Pondokrejo</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Temukan komunitas yang sesuai dengan minat dan bakat Anda. Bergabunglah untuk berkembang bersama.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card border rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Cari komunitas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Communities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCommunities.map((community) => (
            <Card key={community.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{community.name}</CardTitle>
                    <Badge className={categoryColors[community.category as keyof typeof categoryColors]}>
                      {community.category}
                    </Badge>
                  </div>
                </div>
                <CardDescription className="text-sm line-clamp-3">
                  {community.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-2" />
                    {community.members.length} anggota aktif
                  </div>
                  
                  <Button asChild className="w-full">
                    <Link href={`/komunitas/${community.slug}`}>
                      Lihat Detail Komunitas
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredCommunities.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">Tidak ada komunitas ditemukan</h3>
            <p className="text-muted-foreground mb-4">
              Coba ubah filter pencarian Anda.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("ALL");
              }}
            >
              Reset Filter
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center bg-accent/10 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Tidak menemukan komunitas yang sesuai?</h2>
          <p className="text-muted-foreground mb-6">
            Buat komunitas baru dan ajak warga lain untuk bergabung!
          </p>
          <Button asChild size="lg">
            <Link href="/daftar-komunitas">
              Daftarkan Komunitas Baru
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
