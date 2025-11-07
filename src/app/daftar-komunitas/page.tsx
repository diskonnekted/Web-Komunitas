"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Users, Building, Mail, Phone, MapPin, FileText, CheckCircle, AlertCircle } from "lucide-react";

const categories = [
  { value: "UMKM", label: "UMKM (Usaha Mikro Kecil Menengah)" },
  { value: "OLAHRAGA", label: "Olahraga" },
  { value: "SENI", label: "Seni & Budaya" },
  { value: "LINGKUNGAN", label: "Lingkungan Hidup" },
  { value: "INTERNET_MARKETING", label: "Internet Marketing" },
  { value: "TTG", label: "Teknologi Tepat Guna" },
  { value: "RELIGI", label: "Keagamaan" },
  { value: "PEMUDA", label: "Pemuda & Remaja" },
  { value: "WANITA", label: "Perempuan" },
  { value: "PENDIDIKAN", label: "Pendidikan" },
  { value: "KESEHATAN", label: "Kesehatan" },
  { value: "LAINNYA", label: "Lainnya" }
];

const categoryColors = {
  UMKM: "bg-blue-100 text-blue-800",
  OLAHRAGA: "bg-green-100 text-green-800",
  SENI: "bg-purple-100 text-purple-800",
  LINGKUNGAN: "bg-emerald-100 text-emerald-800",
  INTERNET_MARKETING: "bg-indigo-100 text-indigo-800",
  TTG: "bg-orange-100 text-orange-800",
  RELIGI: "bg-yellow-100 text-yellow-800",
  PEMUDA: "bg-red-100 text-red-800",
  WANITA: "bg-pink-100 text-pink-800",
  PENDIDIKAN: "bg-cyan-100 text-cyan-800",
  KESEHATAN: "bg-teal-100 text-teal-800",
  LAINNYA: "bg-gray-100 text-gray-800"
};

export default function CommunityRegistrationPage() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    contact: "",
    email: "",
    phone: "",
    address: "",
    reason: "",
    agreeTerms: false,
    agreeData: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nama komunitas wajib diisi";
    }

    if (!formData.category) {
      newErrors.category = "Kategori komunitas wajib dipilih";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Deskripsi komunitas wajib diisi";
    } else if (formData.description.length < 50) {
      newErrors.description = "Deskripsi minimal 50 karakter";
    }

    if (!formData.contact.trim()) {
      newErrors.contact = "Nama kontak person wajib diisi";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Nomor telepon wajib diisi";
    } else if (!/^[0-9+\-\s()]+$/.test(formData.phone)) {
      newErrors.phone = "Format nomor telepon tidak valid";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Alamat wajib diisi";
    }

    if (!formData.reason.trim()) {
      newErrors.reason = "Alasan pendirian komunitas wajib diisi";
    } else if (formData.reason.length < 30) {
      newErrors.reason = "Alasan minimal 30 karakter";
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "Anda harus menyetujui syarat dan ketentuan";
    }

    if (!formData.agreeData) {
      newErrors.agreeData = "Anda harus menyetujui pengolahan data";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would normally send the data to your API
      console.log("Form submitted:", formData);
      
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      description: "",
      contact: "",
      email: "",
      phone: "",
      address: "",
      reason: "",
      agreeTerms: false,
      agreeData: false
    });
    setErrors({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Pendaftaran Berhasil!</h2>
            <p className="text-muted-foreground mb-6">
              Terima kasih telah mendaftarkan komunitas Anda. Permohonan Anda akan kami proses dalam 2-3 hari kerja.
            </p>
            <div className="space-y-2 text-sm text-left text-muted-foreground mb-6">
              <p>• Kami akan menghubungi Anda melalui email atau telepon untuk verifikasi</p>
              <p>• Proses review meliputi kesesuaian dengan visi misi desa</p>
              <p>• Setelah disetujui, komunitas Anda akan ditampilkan di website</p>
            </div>
            <div className="space-y-2">
              <Button onClick={resetForm} className="w-full">
                Daftarkan Komunitas Lain
              </Button>
              <Button variant="outline" onClick={() => window.location.href = "/komunitas"} className="w-full">
                Lihat Komunitas Lainnya
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Daftarkan Komunitas Baru</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ajukan komunitas Anda untuk menjadi bagian dari ekosistem komunitas Kalurahan Pondokrejo
          </p>
        </div>

        {/* Info Card */}
        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-4">
              <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold mb-2">Informasi Penting</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Komunitas harus berorientasi pada kemajuan Kalurahan Pondokrejo</li>
                  <li>• Memiliki tujuan dan kegiatan yang jelas</li>
                  <li>• Terbuka untuk warga Kalurahan Pondokrejo</li>
                  <li>• Bersedia bekerja sama dengan pemerintah desa</li>
                  <li>• Proses verifikasi memerlukan waktu 2-3 hari kerja</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Registration Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Formulir Pendaftaran Komunitas
            </CardTitle>
            <CardDescription>
              Isi formulir berikut dengan lengkap dan benar. Data yang Anda berikan akan kami jaga kerahasiaannya.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Informasi Dasar</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nama Komunitas *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Masukkan nama komunitas"
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <Label htmlFor="category">Kategori Komunitas *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && <p className="text-sm text-red-500 mt-1">{errors.category}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Deskripsi Komunitas *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Jelaskan secara detail tentang komunitas Anda, tujuan, dan kegiatan yang akan dilakukan"
                    rows={4}
                    className={errors.description ? "border-red-500" : ""}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Minimal 50 karakter
                  </p>
                  {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Informasi Kontak</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact">Nama Kontak Person *</Label>
                    <Input
                      id="contact"
                      value={formData.contact}
                      onChange={(e) => handleInputChange("contact", e.target.value)}
                      placeholder="Nama lengkap kontak person"
                      className={errors.contact ? "border-red-500" : ""}
                    />
                    {errors.contact && <p className="text-sm text-red-500 mt-1">{errors.contact}</p>}
                  </div>

                  <div>
                    <Label htmlFor="phone">Nomor Telepon *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="Contoh: 0812-3456-7890"
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="email@komunitas.com"
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="address">Alamat *</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="Alamat lengkap tempat tinggal atau sekretariat komunitas"
                    rows={2}
                    className={errors.address ? "border-red-500" : ""}
                  />
                  {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address}</p>}
                </div>
              </div>

              {/* Reason for Establishment */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Alasan Pendirian Komunitas</h3>
                
                <div>
                  <Label htmlFor="reason">Alasan dan Tujuan *</Label>
                  <Textarea
                    id="reason"
                    value={formData.reason}
                    onChange={(e) => handleInputChange("reason", e.target.value)}
                    placeholder="Jelaskan mengapa komunitas ini perlu didirikan dan apa tujuannya untuk kemajuan Kalurahan Pondokrejo"
                    rows={4}
                    className={errors.reason ? "border-red-500" : ""}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Minimal 30 karakter
                  </p>
                  {errors.reason && <p className="text-sm text-red-500 mt-1">{errors.reason}</p>}
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Persetujuan</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agreeTerms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) => handleInputChange("agreeTerms", checked as boolean)}
                      className={errors.agreeTerms ? "border-red-500" : ""}
                    />
                    <label htmlFor="agreeTerms" className="text-sm leading-relaxed">
                      Saya menyetujui syarat dan ketentuan yang berlaku untuk komunitas di Kalurahan Pondokrejo, 
                      termasuk kewajiban melaporkan kegiatan secara berkala dan bekerja sama dengan pemerintah desa.
                    </label>
                  </div>
                  {errors.agreeTerms && <p className="text-sm text-red-500">{errors.agreeTerms}</p>}

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agreeData"
                      checked={formData.agreeData}
                      onCheckedChange={(checked) => handleInputChange("agreeData", checked as boolean)}
                      className={errors.agreeData ? "border-red-500" : ""}
                    />
                    <label htmlFor="agreeData" className="text-sm leading-relaxed">
                      Saya menyetujui bahwa data yang saya berikan dapat digunakan untuk keperluan verifikasi dan 
                      komunikasi terkait pendaftaran komunitas ini.
                    </label>
                  </div>
                  {errors.agreeData && <p className="text-sm text-red-500">{errors.agreeData}</p>}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Reset Form
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Mengirim..." : "Kirim Pendaftaran"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-2">
            Butuh bantuan atau informasi lebih lanjut?
          </p>
          <p className="text-sm">
            Hubungi kami di: <strong>admin@pondokrejo.desa.id</strong> atau <strong>(0274) 123456</strong>
          </p>
        </div>
      </div>
    </div>
  );
}