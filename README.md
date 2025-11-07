# Website Komunitas Kalurahan Pondokrejo

Website komunitas berbasis web untuk Kalurahan Pondokrejo, Sleman, Yogyakarta, sebagai wadah digital terpadu bagi seluruh komunitas warga (UMKM, internet marketing, olahraga, TTG, seni, lingkungan, dll).

## Deskripsi

Website ini dibangun untuk memfasilitasi koordinasi, informasi, dan kolaborasi antar komunitas yang ada di Kalurahan Pondokrejo. Dengan adanya platform digital ini, diharapkan setiap komunitas dapat mempromosikan kegiatannya, warga dapat dengan mudah menemukan informasi tentang komunitas yang sesuai dengan minatnya, serta memfasilitasi komunikasi yang lebih efektif antar warga.

## Fitur Utama

### Frontend (Publik)
- **Halaman Utama**: Hero section, card komunitas populer, event terdekat, dan call-to-action
- **Direktori Komunitas**: Daftar semua komunitas dengan filter berdasarkan kategori
- **Detail Komunitas**: Informasi lengkap, anggota, jadwal kegiatan, dan galeri
- **Kalender Kegiatan**: Kalender interaktif dengan daftar kegiatan berbasis tanggal
- **Peta Lokasi**: Peta interaktif dengan marker lokasi kegiatan
- **Galeri**: Galeri foto/video kegiatan dari semua komunitas
- **Berita & Pengumuman**: Artikel/pengumuman dari admin
- **Form Pendaftaran**: Formulir untuk warga mengusulkan komunitas baru

### Backend (Admin Panel)
- **Autentikasi**: Login admin sederhana (username/password + session-based auth)
- **Dashboard**: Ringkasan statistik dan informasi penting
- **Manajemen Komunitas**: Tambah/edit/hapus komunitas
- **Manajemen Kegiatan**: Buat dan kelola event komunitas
- **Manajemen Berita**: CRUD berita dan pengumuman
- **Manajemen Galeri**: Upload foto/video
- **Permintaan Komunitas**: Verifikasi permintaan komunitas baru

## Teknologi yang Digunakan

### Core Framework
- **Frontend**: Next.js 15 dengan App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui component library

### Database & Backend
- **Database**: SQLite dengan Prisma ORM
- **Authentication**: Session-based authentication
- **State Management**: Zustand untuk client state, TanStack Query untuk server state

### Development Tools
- **Package Manager**: npm
- **Code Quality**: ESLint
- **Development Server**:tsx

## Struktur Aplikasi

```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin panel pages
│   ├── berita/            # News & announcements
│   ├── daftar-komunitas/   # Community registration
│   ├── galeri/            # Photo/video gallery
│   ├── kegiatan/          # Activities & events
│   ├── komunitas/         # Community pages
│   ├── lokasi/            # Location & map
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   └── navigation.tsx    # Navigation component
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
│   ├── db.ts            # Database client
│   ├── socket.ts        # Socket.io configuration
│   └── utils.ts         # Utility functions
└── app/globals.css       # Global styles
```

## Database Schema

Aplikasi menggunakan database dengan model utama:
- **Community**: Data komunitas (nama, deskripsi, kategori, kontak)
- **Activity**: Kegiatan/event (judul, deskripsi, tanggal, lokasi)
- **News**: Berita dan pengumuman
- **Gallery**: Foto dan video kegiatan
- **Location**: Lokasi kegiatan dengan koordinat
- **Admin**: Data admin untuk autentikasi
- **CommunityRequest**: Permintaan komunitas baru

## Instalasi & Pengaturan

### Prasyarat
- Node.js 18+ 
- npm atau yarn

### Langkah-langkah Instalasi

1. **Clone repository**
   ```bash
   git clone https://github.com/diskonnekted/Web-Komunitas.git
   cd Web-Komunitas
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   Buat file `.env` di root directory:
   ```
   DATABASE_URL="file:./dev.db"
   ```

4. **Setup database**
   ```bash
   npm run db:push
   ```

5. **Jalankan development server**
   ```bash
   npm run dev
   ```

6. **Buka browser**
   Akses http://localhost:3000

## Penggunaan

### Untuk Pengunjung (Publik)
1. **Jelajahi Komunitas**: Kunjungi halaman /komunitas untuk melihat daftar komunitas
2. **Filter Komunitas**: Gunakan filter kategori untuk menemukan komunitas sesuai minat
3. **Lihat Detail**: Klik komunitas untuk melihat informasi lengkap dan kegiatan
4. **Cek Kegiatan**: Kunjungi /kegiatan untuk melihat jadwal kegiatan terkini
5. **Lihat Lokasi**: Akses /lokasi untuk melihat peta lokasi kegiatan
6. **Galeri**: Kunjungi /galeri untuk melihat dokumentasi kegiatan
7. **Baca Berita**: Akses /berita untuk informasi terkini
8. **Daftar Komunitas**: Isi formulir di /daftar-komunitas untuk mengajukan komunitas baru

### Untuk Admin
1. **Login Admin**: Akses /admin/login
   - Username: admin
   - Password: admin123 (untuk demo)

2. **Dashboard**: Setelah login, admin akan diarahkan ke dashboard dengan:
   - Statistik komunitas, kegiatan, berita
   - Permintaan komunitas yang menunggu persetujuan
   - Kegiatan terkini

3. **Manajemen Konten**:
   - Kelola komunitas (tambah, edit, hapus)
   - Kelola kegiatan dan event
   - Publish berita dan pengumuman
   - Upload media ke galeri
   - Verifikasi permintaan komunitas baru

## Konfigurasi

### Variabel Lingkungan
- `DATABASE_URL`: URL koneksi database (SQLite untuk development)

### Database Migration
Untuk mengubah schema database:
1. Edit file `prisma/schema.prisma`
2. Jalankan `npm run db:push` untuk menerapkan perubahan

### Customisasi
- **Warna**: Edit variabel CSS di `src/app/globals.css`
- **Konten**: Ubah konten di halaman-halaman yang relevan
- **Komponen**: Tambah atau modifikasi komponen di `src/components/`

## Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## Demo Credentials

Untuk mengakses admin panel:
- **URL**: http://localhost:3000/admin/login
- **Username**: admin
- **Password**: admin123

## Kontribusi

1. Fork repository
2. Buat branch fitur baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

## Lisensi

Hak Cipta © 2024 Komunitas Kalurahan Pondokrejo. Hak Cipta Dilindungi.

## Dukungan

Untuk bantuan atau informasi lebih lanjut, hubungi:
- Email: admin@pondokrejo.desa.id
- Telepon: (0274) 123456

## Catatan Pengembangan

- Website ini dibangun dengan fokus pada kemudahan penggunaan untuk admin non-teknis
- Desain responsif untuk mobile dan desktop
- Menggunakan bahasa Indonesia secara konsisten
- Dioptimalkan untuk shared hosting
- Tidak menggunakan dependensi berat yang sulit di-maintain