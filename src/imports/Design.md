# LectureZap — Advanced UI/UX Design Specification

> **Role**: UI/UX Pro Max Designer · Front-end Engineer · Graphic Designer · Brand Identity Expert · Typography Expert · Interaction Designer

---

## App Context

**LectureZap** adalah Smart Academic App untuk mahasiswa universitas.

Platform ini memungkinkan pengguna untuk:

- Upload file rekaman Zoom lokal (`MP4`)
- Mengekstrak konten kuliah secara otomatis menjadi ringkasan terstruktur menggunakan:
  - OCR
  - Audio transcription
- Berinteraksi dengan **Context-Aware RAG Chatbot**
- "Chat with the lecture video" — mencari penjelasan, konsep, timestamp, dan diskusi penting

Aplikasi harus terasa:

- Energetik
- Eksperimental
- Akademis
- Kreatif
- Berkesan
- Sangat mudah digunakan

> ❌ Hindari estetika SaaS dashboard yang generik.

---

## Design Direction

### Core Style

Gabungkan identitas visual:

- **Neo-Brutalism**
- **Vintage Comic Book Art**
- Sedikit atmosfer **Cyber-Academic**

Interface harus terasa:

- Bold · Rebellious · Loud · Dynamic · Smart · Highly Interactive

### ❌ Hindari

| Hindari | Alasan |
|---|---|
| Glassmorphism | Terlalu modern/minimal |
| Soft gradients | Tidak sesuai karakter |
| Blurred shadows | Bertentangan dengan neo-brutalism |
| Rounded startup aesthetics | Terlalu corporate |

---

## 1. Color Palette

### Primary Background

```
#FFF9E6  →  Warm Comic Paper
```

Gunakan sebagai warna dasar dominan untuk menjaga keterbacaan.

---

### Primary Action Color

```
#FFCC00  →  Cyber Yellow
```

Digunakan untuk:
- Primary CTA
- Aksi penting
- Highlight
- Navigasi aktif

---

### Secondary / Accent Colors

```
#FF0055  →  Crimson Accent
```

Digunakan untuk:
- Alert
- Badge
- Focus ring
- Hover accent

```
#00F0FF  →  Electric Cyan
```

Digunakan untuk:
- Metadata interaktif
- Smart timestamp
- Indikator AI
- Tag informasi

---

### Text & Borders

```
#000000  →  Pure Black
```

Digunakan untuk:
- Border
- Heading
- Body text
- Shadow
- Definisi struktural

> ⚠️ **Maximum contrast adalah wajib.**

---

### Interactive States

Primary button saat hover harus invert:

```
Background → Black (#000000)
Text       → Yellow (#FFCC00)
```

---

## 2. Typography

### Heading Fonts

Pilih salah satu:

- `Bangers`
- `Righteous`
- `Lexend Mega`

**Aturan:**
- Uppercase only
- Extremely bold
- Comic-style visual impact
- Terapkan text shadow:

```css
text-shadow: 2px 2px 0px #000000;
```

---

### Body Text

Gunakan:

- `Space Mono`
- `IBM Plex Mono`

Tujuan:
- Nuansa teknis
- Keterbacaan akademis
- Pembacaan ringkasan panjang yang bersih

---

### Chatbot Typography

Gunakan:

- `Comic Neue Bold`

Tujuan:
- Kepribadian AI yang ramah
- Nuansa comic speech bubble
- Kontras terhadap panel ringkasan teknis

---

## 3. Layout System

### Grid

Gunakan grid responsif **12 kolom** yang ketat.

---

## 4. Main Dashboard Structure

### Header

**Style:**
- Thick 4px black bottom border
- Struktur horizontal yang kuat

**Left Section:**
- Logo "LectureZap"
- Ikon lightning bolt ⚡

**Right Section:**
- Upload Video CTA
- User profile / avatar

---

### Main Workspace — Split View Layout

---

#### Left Panel (6 Kolom)

**Video Player**

Persyaratan:
- Frame 4px hitam tebal
- Tampilan neo-brutalist
- Hirarki visual dominan

---

**Smart Timestamps Panel** (di bawah video)

Tampilkan timestamp sebagai:
- Clickable comic-style pills
- Cyan accent
- Hover animation

Contoh:

```
⚡ 03:22  Neural Network Intro
⚡ 14:50  Important Formula
⚡ 27:10  Final Exam Hint
```

---

#### Right Panel (6 Kolom)

**Tabbed Interface**

---

**Tab 1 — Summary**

Tampilkan ringkasan kuliah sebagai:
- Bullet list
- Chunked academic notes
- Kartu berpola halftone

Persyaratan kartu:
- Hard black shadow
- Tekstur comic-paper
- Slight rotation:

```css
rotate(-1deg) /* atau */ rotate(1deg)
```

---

**Tab 2 — Chat with Video**

Bangun antarmuka chatbot di mana:
- Pesan pengguna muncul dalam blok brutalist
- Respons AI muncul sebagai comic speech bubbles

Include:
- Timestamp pesan
- Badge AI
- Percakapan scrollable
- Input box dengan bold border

---

## 5. Sidebar / Library

Buat sidebar collapsible atau off-canvas.

**Tujuan:**
- Kelola 3–5 proyek kuliah

**Visual Style:**
- Ikon folder terinspirasi comic issue covers
- Kartu proyek seperti thumbnail
- Outline hitam tebal

---

## 6. Badge System

Label status harus menyerupai comic sound effects.

**Contoh:**

```
⭐ ZAP!
💥 BOOM!
✅ DONE!
⚙️ PROCESSING!
```

**Persyaratan:**
- Bentuk starburst bergerigi
- Outline tebal
- Warna saturasi tinggi

---

## 7. Buttons & Interaction Design

### Base Button Style

```css
border: 4px solid black;
border-radius: 0px;
box-shadow: 4px 4px 0px black;
```

Karakteristik:
- Sudut tajam
- Nuansa taktil fisik
- Tidak ada soft UI

---

### Hover State

```css
transform: translate(-2px, -2px);
box-shadow: 6px 6px 0px black;
transition: all 0.1s ease-in-out;
```

---

### Active / Click State

Simulasikan tekanan fisik:

```css
transform: translate(0px, 0px);
box-shadow: none;
```

---

## 8. Visual Elements

### Halftone Patterns

Gunakan pola titik komik halus:

- Opacity: `10–15%`
- Terapkan di dalam:
  - Panel chat
  - Kartu ringkasan
  - Aksen latar belakang

---

### Action Lines

Tambahkan garis aksi komik diagonal minimal:

- Di belakang hero header
- Di sekitar area CTA

> Harus tetap halus dan tidak mengganggu.

---

### Dynamic Containers

Beberapa kartu/tooltip harus sedikit dirotasi:

```css
rotate(-1deg)
rotate(1deg)
```

Untuk menciptakan energi visual kinetik.

---

## 9. Shadows & Depth

### ❌ NO BLUR ALLOWED

Semua shadow harus:

```css
X:    6px
Y:    6px
Blur: 0px
Color: #000000
```

Terapkan secara konsisten pada:
- Cards
- Buttons
- Modals
- Panels
- Tabs

---

## 10. Icons

**Gunakan:**
- SVG ikon dengan outline tebal
- Gaya ikon brutalist filled
- **Phosphor Icons** (mode `bold` atau `fill` diutamakan)

**Hindari:**
- Ikon minimalis tipis
- Sistem outline soft

---

## 11. Accessibility

Pastikan kepatuhan **WCAG AA**.

**Persyaratan:**
- Rasio kontras yang kuat
- Ukuran font yang mudah dibaca
- Dukungan navigasi keyboard
- Status hover/focus yang jelas

### Focus Ring

```css
outline: 3px dashed #FF0055;
```

---

## 12. Expected Output

### Functional Frontend Code

Generate menggunakan:

- **HTML**
- **Tailwind CSS**

Wajib mencakup:

- Responsive layout (mobile-friendly, berbasis 12-col grid)
- Component structure yang modular dan terpisah per section
- Typography imports (Google Fonts)
- Design tokens (CSS custom properties)
- Shadow variables
- Color variables

---

## 13. Google Fonts Imports

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bangers&family=Righteous&family=Lexend+Mega:wght@400;700;900&family=Space+Mono:wght@400;700&family=IBM+Plex+Mono:wght@400;500;700&family=Comic+Neue:wght@700&display=swap" rel="stylesheet">
```

---

## 14. Design Tokens

### Color Variables

```css
:root {
  /* Backgrounds */
  --color-bg-primary:    #FFF9E6;

  /* Primary Action */
  --color-yellow:        #FFCC00;

  /* Accents */
  --color-crimson:       #FF0055;
  --color-cyan:          #00F0FF;

  /* Structural */
  --color-black:         #000000;
  --color-white:         #FFFFFF;
}
```

---

### Shadow Presets

```css
:root {
  --shadow-sm:     2px 2px 0px #000000;
  --shadow-md:     4px 4px 0px #000000;
  --shadow-lg:     6px 6px 0px #000000;
  --shadow-xl:     8px 8px 0px #000000;
  --shadow-hover:  6px 6px 0px #000000;
  --shadow-active: 0px 0px 0px #000000;
}
```

---

### Border Presets

```css
:root {
  --border-thin:   2px solid #000000;
  --border-base:   3px solid #000000;
  --border-thick:  4px solid #000000;
  --border-heavy:  6px solid #000000;
  --border-radius: 0px; /* NO rounding */
}
```

---

### Spacing Scale

```css
:root {
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
}
```

**Aturan penggunaan spacing:**

| Token | Penggunaan |
|---|---|
| `--space-1` – `--space-2` | Gap antar elemen inline (icon + label, badge + text) |
| `--space-3` – `--space-4` | Padding internal komponen kecil (button, pill, tag) |
| `--space-6` – `--space-8` | Padding card, panel, tab content |
| `--space-10` – `--space-12` | Jarak antar section dalam satu panel |
| `--space-16` – `--space-24` | Margin antar section besar, padding layout utama |

> ⚠️ Seluruh spacing harus mengacu pada token ini — tidak boleh menggunakan nilai arbitrary (px hardcoded) di luar sistem ini.

---

### Typography Scale

```css
:root {
  /* Heading — Comic Style */
  --font-heading:  'Bangers', 'Righteous', 'Lexend Mega', cursive;

  /* Body — Monospace Technical */
  --font-body:     'Space Mono', 'IBM Plex Mono', monospace;

  /* Chat — Comic Friendly */
  --font-chat:     'Comic Neue', cursive;

  /* Scale */
  --text-xs:   0.75rem;   /* 12px */
  --text-sm:   0.875rem;  /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg:   1.125rem;  /* 18px */
  --text-xl:   1.25rem;   /* 20px */
  --text-2xl:  1.5rem;    /* 24px */
  --text-3xl:  1.875rem;  /* 30px */
  --text-4xl:  2.25rem;   /* 36px */
  --text-5xl:  3rem;      /* 48px */
  --text-hero: 4.5rem;    /* 72px */
}
```

---

## 15. UX Rationale

### Mengapa chatbot diposisikan di sebelah video player?

Pendekatan **split-view** menempatkan chatbot tepat di samping video player agar mahasiswa dapat bertanya *saat* menonton tanpa harus beralih konteks. Proksimitas spasial antara media dan interaksi menciptakan alur kognitif yang linear — lihat → tanya → pahami — tanpa kehilangan posisi dalam video.

---

### Bagaimana split-view meningkatkan efisiensi belajar?

**Dual-channel learning** (audio-visual + teks/interaktif) terbukti meningkatkan retensi informasi. Split-view memungkinkan:
- Akses ringkasan tanpa pause video
- Klik timestamp yang langsung menavigasi ke momen relevan
- Chat inline yang mempertahankan konteks tanpa berpindah tab atau aplikasi

Hasilnya adalah **zero-friction study loop**: tonton → konfirmasi → catat → tanyakan → kembali.

---

### Bagaimana hirarki visual komik meningkatkan keterlibatan dan retensi memori?

Visual neo-brutalism dan gaya komik memanfaatkan **teknik encoding ganda**:

1. **Emotional salience** — warna-warna saturasi tinggi (kuning, merah, cyan) memicu perhatian selektif dan meningkatkan *arousal* kognitif yang sehat.
2. **Pattern disruption** — rotasi kartu, halftone, dan sudut tajam menciptakan keunikan visual yang memudahkan otak membentuk *memory anchors*.
3. **Familiar metaphor** — estetika komik buku adalah format narasi yang sudah dikenal secara budaya, sehingga otak memproses konten akademis dalam bingkai yang menyenangkan dan tidak mengancam.

---

## Final Goal

> Hasil akhir harus terasa seperti:
>
> **"Sebuah ruang kerja akademis AI generasi berikutnya yang berani — memadukan energi buku komik dengan produktivitas edukatif yang serius."**

Interface harus:

- ✅ Tak terlupakan secara visual
- ✅ Sangat mudah digunakan
- ✅ Kredibel secara teknis
- ✅ Siap produksi sebagai frontend
- ✅ Kohesif di setiap komponen
- ✅ Konsisten dalam spacing, tipografi, border, shadow, dan perilaku interaksi

---

*LectureZap Design Specification — v1.0*
