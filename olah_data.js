
// File: olah_data.js
// Praktik Manipulasi Array of Objects dengan ES6+

// 1. Daftar data proyek
const projects = [
    {
        id: 1,
        title: "Sistem Inventaris Keuangan",
        category: "Web App",
        budget: 2500000,
        completed: true
    },
    {
        id: 2,
        title: "Sistem Kasir Digital POS",
        category: "Desktop App",
        budget: 5000000,
        completed: true
    },
    {
        id: 3,
        title: "Landing Page Profil Perusahaan",
        category: "Web App",
        budget: 1500000,
        completed: false
    },
    {
        id: 4,
        title: "Aplikasi Presensi GPS Mobile",
        category: "Mobile App",
        budget: 4500000,
        completed: false
    }
];

// 2. Helper function untuk memformat angka ke Rupiah
const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(angka);
};

// 3. Menampilkan semua daftar proyek menggunakan forEach
console.log("=== 1. SEMUA DAFTAR PROYEK (forEach) ===");

projects.forEach((proj, idx) => {
    const status = proj.completed ? "[SELESAI]" : "[PROSES]";

    console.log(
        `${idx + 1}. ${status} ${proj.title} (${proj.category}) - ${formatRupiah(proj.budget)}`
    );
});

// 4. Memfilter proyek kategori Web App menggunakan filter
console.log("\n=== 2. PROYEK KATEGORI WEB APP (filter) ===");

const webProjects = projects.filter(
    (proj) => proj.category === "Web App"
);

console.log(webProjects);

// 5. Membuat ringkasan nama dan anggaran menggunakan map
console.log("\n=== 3. RINGKASAN NAMA & ANGGARAN (map) ===");

const ringkasanProyek = projects.map((proj) => ({
    nama: proj.title,
    status: proj.completed ? "Selesai" : "Belum",
    biaya: formatRupiah(proj.budget)
}));

console.table(ringkasanProyek);

// 6. Menghitung total anggaran menggunakan reduce
console.log("\n=== 4. TOTAL ANGGARAN (reduce) ===");

const totalAnggaran = projects.reduce(
    (total, proj) => total + proj.budget,
    0
);

console.log(
    `Total Estimasi Anggaran Portofolio: ${formatRupiah(totalAnggaran)}`
);

// 7. Menghitung jumlah proyek yang selesai
console.log("\n=== 5. JUMLAH PROYEK SELESAI ===");

const totalSelesai = projects.filter(
    (proj) => proj.completed
).length;

console.log(`Total Proyek Selesai: ${totalSelesai} proyek`);

// 8. Menghitung jumlah proyek yang masih dalam proses
const totalProses = projects.filter(
    (proj) => !proj.completed
).length;

console.log(`Total Proyek Dalam Proses: ${totalProses} proyek`);
