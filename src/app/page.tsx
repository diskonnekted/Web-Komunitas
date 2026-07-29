import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";

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

export default async function Home() {
  const communities = await db.community.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' },
    include: {
      members: true,
    },
    take: 8,
  });

  const activities = await db.activity.findMany({
    where: { isActive: true, startDate: { gte: new Date() } },
    orderBy: { startDate: 'asc' },
    take: 3,
    include: {
      community: true,
    },
  });

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Selamat Datang di Komunitas Kalurahan Pondokrejo
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Wadah digital terpadu bagi seluruh komunitas warga untuk berkembang, berkolaborasi, dan memajukan desa
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="bg-accent text-primary hover:bg-accent/90">
                <Link href="/komunitas">
                  Jelajahi Komunitas
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link href="/daftar-komunitas">
                  Daftar Komunitas Baru
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Communities Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Komunitas Populer</h2>
          <p className="text-lg text-muted-foreground">
            Temukan komunitas yang sesuai dengan minat dan bakat Anda
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {communities.map((community) => (
            <Card key={community.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-lg">{community.name}</CardTitle>
                  <Badge className={categoryColors[community.category as keyof typeof categoryColors]}>
                    {community.category}
                  </Badge>
                </div>
                <CardDescription className="text-sm line-clamp-2">
                  {community.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-1" />
                    {community.members.length} anggota
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/komunitas/${community.slug}`}>
                      Detail
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Button asChild variant="outline">
            <Link href="/komunitas">
              Lihat Semua Komunitas
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="bg-muted/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Kegiatan Terdekat</h2>
            <p className="text-lg text-muted-foreground">
              Jangan lewatkan kegiatan-kegiatan menarik dari komunitas kami
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity) => (
              <Card key={activity.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg">{activity.title}</CardTitle>
                    <Badge variant="secondary">{activity.community.name}</Badge>
                  </div>
                  <CardDescription className="text-sm">
                    {activity.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <CalendarDays className="h-4 w-4 mr-2" />
                      {new Date(activity.startDate).toLocaleDateString('id-ID', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                    {activity.location && (
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {activity.location}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {activities.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Belum ada kegiatan mendatang.
            </div>
          )}
          
          <div className="text-center mt-8">
            <Button asChild>
              <Link href="/kegiatan">
                Lihat Semua Kegiatan
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-accent text-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Bergabunglah dengan Komunitas Kami</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Jadilah bagian dari komunitas yang dinamis dan contributif untuk kemajuan Kalurahan Pondokrejo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/daftar-komunitas">
                Daftarkan Komunitas Anda
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-accent">
              <Link href="/komunitas">
                Temukan Komunitas
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
