
# Raw prompt

Website ini adalah directory lomba yang berisi berbagai kompetisi, baik dari Indonesia maupun luar negeri. Pengguna dapat dengan cepat mengakses daftar lomba melalui UI yang mudah digunakan, cepat, dan variatif, dengan tampilan modern serta mudah dibaca. Navigasi dirancang sederhana, dengan beberapa mode tampilan untuk memudahkan pengguna melihat daftar lomba. Website ini diharapkan membantu mahasiswa menemukan lomba sesuai dengan minat mereka secara efisien.


# Product References

[https://www.classcentral.com](https://www.classcentral.com)

[https://infolomba.id](https://infolomba.id)


# Product overview 


## Description

LombaKu adalah direktori kompetisi modern yang membantu mahasiswa menemukan lomba sesuai minat mereka secara efisien, baik dari Indonesia maupun luar negeri.


## Problems & Solutions

Problem 1: Informasi tersebar di banyak platform

Satu platform terpusat yang mengumpulkan semua info lomba dalam satu tempat yang mudah diakses.

Problem 2: Sulit filter berdasarkan kategori

Filter kategori lomba (bisnis, teknologi, seni, olahraga, dll) untuk menemukan kompetisi yang sesuai minat.

Problem 3: Info kadaluarsa sulit dihindari

Filter status aktif untuk menampilkan hanya lomba yang masih buka pendaftarannya.

Problem 4: Kurangnya akses ke lomba internasional

Directory lomba dari seluruh dunia yang membuka akses ke kompetisi global.

Problem 5: Sulit filter berdasarkan institusi

Filter berdasarkan penyelenggara/institusi untuk memudahkan pencarian lomba spesifik.


## Key Features



* Filter kategori lomba (IT, olahraga, desain, dll)
* Filter status aktif (lomba yang masih buka)
* Filter berdasarkan institusi/penyelenggara
* Grid view dengan tampilan kartu
* Dark mode
* Multiple view dengan tombol switch untuk mengatur properti yang ditampilkan
* Newsletter dengan pilihan kategori yang ingin dilanggankan
* Placement ads (banner, featured/pinned, soft-selling interspersed)
* Submit lomba publik dengan sistem moderasi


# Application Shell Specification


## Overview

Top navigation shell untuk LombaKu — direktori kompetisi modern dengan fokus pada exploration experience tanpa login.


## Navigation Structure



* **Resources** → External links page
* **About** → About page
* **Explore Lomba** → Main discovery area dengan filter kategori dan institusi (default active)


## User Menu

Tidak ada user menu — pure exploration experience tanpa autentikasi.


## Layout Pattern

Top navigation dengan logo di kiri, nav items terbagi kiri (Resources, About) dan kanan (Explore Lomba).


## Responsive Behavior



* **Desktop:** Full top nav dengan semua items visible
* **Tablet:** Compressed nav, items tetap visible
* **Mobile:** Hamburger menu untuk nav items


## Design Notes



* Primary (violet) untuk active nav state
* Secondary (cyan) untuk hover states
* Neutral (zinc) untuk backgrounds dan text
* Lomba Detail muncul sebagai modal/slide-over
* Geist font untuk seluruh aplikasi


## Sitemap



* Categories*
* Randomize*
* About
* Resources


# Product Roadmap

1. Discovery

Core browsing experience dengan daftar lomba, filter kategori, institusi, dan status aktif, serta grid view dengan multiple view options.

2. Lomba Detail

Halaman detail lomba dengan informasi lengkap, deadline, hadiah, dan tombol aksi untuk daftar atau share.

3. Monetisasi

Placement ads (banner, featured, soft-selling interspersed) dan opsi submit lomba berbayar untuk visibility prioritized.

4. Kontribusi

Form submit lomba sederhana untuk publik dengan sistem moderasi sebelum ditayangkan.


# Data Model


## Entities



1. Lomba

Kompetisi yang ditampilkan di direktori dengan informasi lengkap (nama, deadline, hadiah, deskripsi). Memiliki status (active, pending, expired) dan bisa ditandai sebagai featured.



2. Kategori

Grup lomba berdasarkan bidang seperti IT, olahraga, desain, bisnis, seni, dll.



3. Institusi

Penyelenggara lomba seperti kampus, perusahaan, atau organisasi.



4. Banner Iklan

Iklan jasa atau produk yang dipasang di area tertentu website untuk monetisasi.


## Relationships



* Lomba belongs to Kategori
* Lomba belongs to Institusi
* Lomba can be featured (prioritized placement)
* Banner Iklan is independent (linked to advertiser)