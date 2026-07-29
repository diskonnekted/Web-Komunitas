import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Search, Phone, Clock, ExternalLink, Mail, Calendar } from "lucide-react";
import { useState } from "react";

const officeLocation = {
  name: "Kantor Kalurahan Pondokrejo",
  address: "Banjarharjo, Pondokrejo, Tempel, Sleman",
  kelurahan: "Pondokrejo",
  kapanewon: "Tempel",
  kabupaten: "Sleman",
  kodepos: "55552",
  phone: "087742203602",
  email: "pondokrejo57@gmail.com",
  latitude: -7.664933879625454,
  longitude: 110.30728317089088,
  openHours: [
    { day: "Senin", start: "08:00", end: "16:00" },
    { day: "Selasa", start: "08:00", end: "16:00" },
    { day: "Rabu", start: "08:00", end: "16:00" },
    { day: "Kamis", start: "08:00", end: "16:00" },
    { day: "Jumat", start: "08:00", end: "16:00" },
    { day: "Sabtu", start: "Libur", end: "" },
    { day: "Minggu", start: "Libur", end: "" },
  ],
};

const padukuhan = [
  { name: "Banjarharjo", dukuh: "Banjarharjo" },
  { name: "Ngentak", dukuh: "Ngentak" },
  { name: "Plotengan", dukuh: "Plotengan" },
  { name: "Jlapan", dukuh: "Jlapan" },
  { name: "Watupecah", dukuh: "Watupecah" },
  { name: "Karanglo", dukuh: "Karanglo" },
  { name: "Dukuh", dukuh: "Dukuh" },
];

const aparaturs = [
  { name: "R WIDAYATMA SE", position: "Lurah" },
  { name: "BUDI NURMILA SARI", position: "Carik" },
  { name: "RAHMAT NURYANTO", position: "Jagabaya" },
  { name: "WIWIN ARYANTO", position: "Ulu-ulu" },
  { name: "AJI CANDRA PARAHITA, S.E", position: "Kamituwo" },
  { name: "SUCI ROKHANI, SI", position: "Kaur Tata Usaha & Umum" },
  { name: "SUKAMDI", position: "Kaur Keuangan & Aset" },
  { name: "NITA ARZELLA", position: "Kaur Perencanaan" },
];

export default function LocationPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPadukuhan = padukuhan.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.dukuh.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Lokasi & Kontak</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Informasi lokasi kantor, padukuhan, dan aparatur Kalurahan Pondokrejo
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Cari padukuhan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Kantor Kalurahan Pondokrejo
                </CardTitle>
                <CardDescription>
                  {officeLocation.address}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <iframe
                    src={`https://www.google.com/maps?q=${officeLocation.latitude},${officeLocation.longitude}&z=15&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Peta Kantor Kalurahan Pondokrejo"
                  />
                </div>
                <Button asChild variant="outline" className="w-full">
                  <a
                    href={`https://www.google.com/maps?q=${officeLocation.latitude},${officeLocation.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Buka di Google Maps
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Informasi Kontak</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">Alamat</p>
                    <p className="text-sm text-muted-foreground">{officeLocation.address}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">Telepon</p>
                    <p className="text-sm text-muted-foreground">{officeLocation.phone}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">Email</p>
                    <p className="text-sm text-muted-foreground">{officeLocation.email}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">Jam Kerja</p>
                    <p className="text-sm text-muted-foreground">
                      Senin - Jumat: 08:00 - 16:00 WIB<br />
                      Sabtu - Minggu: Libur
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Jam Kerja Table */}
            <Card>
              <CardHeader>
                <CardTitle>Jam Kerja Detail</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 font-medium">Hari</th>
                        <th className="text-left py-2 font-medium">Mulai</th>
                        <th className="text-left py-2 font-medium">Selesai</th>
                      </tr>
                    </thead>
                    <tbody>
                      {officeLocation.openHours.map((hour) => (
                        <tr key={hour.day} className="border-b">
                          <td className="py-2">{hour.day}</td>
                          <td className="py-2">{hour.start}</td>
                          <td className="py-2">{hour.end}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Padukuhan Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Daftar Padukuhan</CardTitle>
                <CardDescription>
                  7 Padukuhan di Kalurahan Pondokrejo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredPadukuhan.map((padukuhanItem, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">📍</span>
                        <div>
                          <p className="font-medium">{padukuhanItem.name}</p>
                          <p className="text-xs text-muted-foreground">Padukuhan {padukuhanItem.dukuh}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Aparatur */}
            <Card>
              <CardHeader>
                <CardTitle>Aparatur Kalurahan</CardTitle>
                <CardDescription>
                  Pejabat Pemerintah Kalurahan Pondokrejo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {aparaturs.map((aparat, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{aparat.name}</p>
                        <Badge variant="outline" className="text-xs mt-1">{aparat.position}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Tautan Resmi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button asChild variant="outline" className="w-full justify-start">
                  <a href="https://pondokrejo.sleman-desa.id/" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Website Resmi Kalurahan
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <a href="https://pustaka.pondokrejo.id/" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Perpustakaan Digital
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* No Results */}
        {filteredPadukuhan.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">Tidak ada padukuhan ditemukan</h3>
            <p className="text-muted-foreground mb-4">
              Coba kata kunci lain.
            </p>
            <Button
              variant="outline"
              onClick={() => setSearchTerm("")}
            >
              Reset Filter
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
