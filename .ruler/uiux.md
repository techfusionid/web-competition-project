# Design System & UI/UX Documentation

## Design Philosophy

### Core Principles
- Minimalis = komponen UI secukupnya, tanpa elemen dekoratif yang tidak punya fungsi
- Simple = alur pengguna jelas, mudah dipahami sejak pertama kali pakai
- Modern = tampilan bersih, tipografi rapi, spacing lega, dan konsisten dengan tren UI terkini

### Aesthetic Direction
- boleh tambahkan sedikit microinteraction tapi jangan mebuat website nya menjadi berat
- 

## 🎨 Desain system

https://ui.shadcn.com/create

```
pnpm dlx shadcn@latest create --preset "https://ui.shadcn.com/init?base=radix&style=nova&baseColor=neutral&theme=neutral&iconLibrary=hugeicons&font=inter&menuAccent=subtle&menuColor=default&radius=default&template=next" --template next
```

https://tweakcn.com/

## Colors
"primary": "violet",
"secondary": "cyan",
"neutral": "zinc"

## Typography

Greed standard standard
Geist Mono Regular

---

## Components

### Navbar Components

minimalis dan berisi informasi penting aja, fokus ke cepat dan responsif
untuk di mobile

### Competition Components*

user tuh bisa dapet informasi cpeat -> web nya harus aman

lomba nya pop up di mobile gdn mekasniem mirip instagram

multiple view on off in image


### Randomize Lomba Components

ini nanti aja, bakal ada lomba acak yg bisa dipilih

### Footer Components

## PAGE

## / (Home)
  - Navbar: Logo , categories, resources, contact us
  - Hero
    - headings: All in One Competition Hub in Indonesia
    - subheadings: Update tiap minggu
  - Search bar and filters: Kategori, Status
  - Comp Card Component
  - Categories grid (6 card)
  - CTA: Join WA Channel
  - footer
  
## /discover

- navbar
- discover by category
- discover by organizer
- discover by region

## /categories
- Hero: Title + deskripsi singkat
- Category list (card/grid):
   - Tech & Programming
   - Design & Creative
   - Business & Entrepreneurship
   - Essay & Writing
   - Video & Photography
   - Academic & Olympiad
- Masing-masing card: icon, nama, jumlah lomba aktif

## /resources
- Headings: Kumpulan
- tools card components
- instagram card components
- community card components
- footer

## /about-us
- Hero: Photo + Nama + Tagline
- About section: Kenapa buat platform ini
- Mission: Apa yang mau dicapai
- Tech stack: Built with (opsional)
- Contact links: GitHub, LinkedIn, Email
- CTA: Join WA Channel

## /terms
- Title: Syarat & Ketentuan
- Sections:
   - Penggunaan platform
   - Hak & kewajiban user
   - Kebijakan konten lomba
   - Disclaimer
   - Kontak untuk pertanyaan

## /contact
- Hero: "Hubungi Kami"
- Contact form: Nama, Email, Subject, Message
- Social links: WA Channel, LinkedIn, GitHub
- FAQ section (3-5 pertanyaan umum)
- Response time promise

## /privacy
- Title: Kebijakan Privasi
- Sections:
   - Data yang dikumpulkan
   - Penggunaan data
   - Cookies
   - Pihak ketiga
   - Hak user
   - Contact info

## Component

## 🚀 Performance Considerations

### Image Optimization
- [ ] WebP format with JPEG fallback
- [ ] Lazy loading below fold
- [ ] Responsive images (srcset)
- [ ] Max width constraints

### Font Loading
- [ ] Font-display: swap
- [ ] Critical CSS inline
- [ ] Subset fonts when possible
- [ ] Preload key fonts

### Animation Performance
- [ ] Use transform and opacity
- [ ] Avoid animating layout properties
- [ ] GPU acceleration where possible
- [ ] Will-change for heavy animations

---

## 🎯 Content Guidelines

### Microcopy
- Action-oriented buttons
- Clear error messages
- Helpful empty states
- Progressive disclosure

### Competition Listing Info
- Title (max 60 chars)
- Description (max 150 chars)
- Date format: "15-17 Maret 2026"
- Prize format: "$X,XXX" or "$XM+"

### Status Messages
- Registration open
- Closing soon (with countdown)
- Accepting submissions
- Judging in progress
- Winners announced


### JavaScript Interactions
- Page navigation (SPA or multi-page)
- Filter functionality
- Search autocomplete
- Modal open/close
- Countdown timers
- Form validation
- Load more pagination
- Save/bookmark functionality

---

## 📝 Design Checklist

### Before Development
- [ ] Color palette approved
- [ ] Typography scale defined
- [ ] Component inventory complete
- [ ] Responsive breakpoints set
- [ ] Accessibility requirements met

### During Development
- [ ] Design tokens implemented
- [ ] Component library created
- [ ] Responsive tested on devices
- [ ] Accessibility tested with screen reader
- [ ] Browser compatibility verified

### Before Launch
- [ ] All user flows tested
- [ ] Error states designed
- [ ] Loading states implemented
- [ ] Empty states handled
- [ ] Performance optimized

