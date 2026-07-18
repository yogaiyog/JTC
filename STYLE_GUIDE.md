# JTC Style Guide

Catatan desain untuk agent AI agar seluruh pengembangan selanjutnya memiliki gaya visual yang seragam.

---

## 1. Fonts

| Role | Font | CSS Variable | Weights |
|---|---|---|---|
| Display (heading, hero, judul) | **Baloo 2** | `var(--font-display)` | 400, 500, 600, 700, 800 |
| Body (teks, navigasi, UI) | **Manrope** | `var(--font-body)` | 400, 500, 600, 700, 800 |
| Mono (code, terminal) | `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas` | (fallback stack) | — |

**Aturan pakai:**
- Semua heading (`h1`, `h2`, `h3`) wajib pakai `font-family: var(--font-display), sans-serif`.
- Semua body text, paragraf, link nav, label, badge pakai `Manrope` (default dari `body`).
- Code blocks / terminal output pakai fallback monospace stack.
- Font di-load via `next/font/google` di `app/layout.tsx`, di-inject sebagai CSS variables.

---

## 2. Color Palette (Hierarki Penggunaan)

### CSS Custom Properties (`:root` di `globals.css:4-22`)

| Rank | Variable | Value | Peran |
|---|---|---|---|
| **1** | `--text` | `#eef4ff` | Semua teks utama, heading |
| **2** | `--muted` | `#b7c5df` | Teks sekunder, deskripsi, placeholder (`#d9e5f8` di mobile via `--muted-mobile`) |
| **3** | `--bg` | `#07111f` | Warna latar dasar solid |
| **4** | `--primary` | `#7ce7ff` | Aksen cyan — highlight link, icon, border aktif, label nav |
| **5** | `--accent` | `#ffcf5d` | Aksen emas — CTA buttons, harga, countdown, progress bar, badge |
| **6** | `--accent-2` | `#ff8f7a` | Aksen coral — aksen gradient sekunder, warning label |
| **7** | `--card` | `rgba(10, 18, 35, 0.78)` | Base surface cards |
| **8** | `--card-2` | `rgba(15, 27, 50, 0.94)` | Card highlighted (`panel--highlight`) |
| **9** | `--line` | `rgba(193, 210, 255, 0.14)` | Border / garis pemisah |
| **10** | `--primary-strong` | `#45baff` | Glow orb pada `body::before` |
| 11 | `--muted-mobile` | `#d9e5f8` | Muted override untuk mobile (<720px) |
| 12 | `--bg-soft` | `rgba(10, 19, 35, 0.72)` | Background semi-transparan alternatif |

### Aturan penggunaan warna:
- **JANGAN** pernah pakai hex/rgba hardcode di komponen. Selalu referensi CSS variable.
- `--primary` (cyan `#7ce7ff`) → elemen interaktif, highlight text, icon, border-card aktif.
- `--accent` (emas `#ffcf5d`) → CTA button, badge harga, countdown timer, bullet list.
- `--accent-2` (coral `#ff8f7a`) → warning teks, variasi gradient, progress bar alternatif.
- `--text` → heading dan teks utama readable.
- `--muted` → semua paragraf body dan teks pendukung.
- `rgba(193, 210, 255, X)` → `var(--line)` channel digunakan seragam untuk border di seluruh komponen.

---

## 3. Global Background

Body/HTML memiliki 3 lapis radial gradient + linear gradient:

```css
background:
  radial-gradient(circle at top left,      rgba(124, 231, 255, 0.18), transparent 30%),
  radial-gradient(circle at right 15%,     rgba(255, 143, 122, 0.15), transparent 28%),
  radial-gradient(circle at 50% 100%,      rgba(255, 207, 93, 0.13),  transparent 24%),
  linear-gradient(180deg, #081021 0%, #050b16 100%);
```

**Glow orbs** (`body::before` / `body::after`):
- Kiri atas: biru `rgba(69, 186, 255, 0.18)`, `blur(40px)`, 26rem.
- Kanan bawah: coral `rgba(255, 143, 122, 0.16)`, `blur(40px)`, 24rem.

---

## 4. Border Radius Scale

| Token | Value | Penggunaan |
|---|---|---|
| `--radius-xl` | `32px` | Card utama, `.panel`, `.section-card`, `.hero__graphic` |
| `--radius-lg` | `24px` | Feature/track/FAQ cards, `.timeline-item`, `.pricing-card`, `.device` |
| `--radius-md` | `18px` | `.mini-card`, `.stat`, `.hero-timeline-item` |
| Round kecil | `12px`–`16px` | Index/number badge, icon container, accordion content |
| Pill | `999px` | Semua `.btn`, `.badge`, `.pill`, `.eyebrow`, nav links, pagination dots |

---

## 5. Card / Glassmorphism Pattern

### Card Standar
Dipake di `.feature`, `.track`, `.timeline-item`, `.faq-item`, `.cta`, `.panel`, `.section-card`:

```css
background:
  linear-gradient(180deg, rgba(255, 255, 255, 0.04), transparent 48%),
  rgba(8, 16, 31, 0.74);
border: 1px solid rgba(193, 210, 255, 0.1);
border-radius: var(--radius-lg); /* atau var(--radius-xl) */
```

### Panel Highlight (`.panel--highlight`)
```css
background:
  linear-gradient(180deg, rgba(124, 231, 255, 0.12), rgba(255, 143, 122, 0.04)),
  var(--card-2);
```

### Card dengan Box Shadow
`.pricing-card`, `.app-card`, `.table-wrap` punya tambahan:
```css
box-shadow: 0 16px 40px rgba(0, 0, 0, 0.18);
```

### Shadow Global
```css
--shadow: 0 24px 80px rgba(0, 0, 0, 0.34);
```

---

## 6. Layout System

### Container
```css
.container {
  width: min(100% - 2rem, var(--container)); /* --container = 1180px */
  margin: 0 auto;
}
```

### Section
```css
.section {
  padding: 1rem 0 4rem;
}
```

### Grid
```css
.grid-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; }
.grid-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
```
Di bawah 960px, grid collapse ke 1 kolom.

### Shell
`.shell` digunakan pada `<main>` untuk isolation + gradient mask pseudo-element.

---

## 7. Button System

### Base
```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  min-height: 3.35rem;
  padding: 0.9rem 1.25rem;
  border-radius: 999px;
  font-weight: 800;
  border: 1px solid transparent;
  transition: transform 180ms ease, box-shadow 180ms ease,
              border-color 180ms ease, background-color 180ms ease;
}
.btn:hover { transform: translateY(-1px); }
```

### Variants
- **`.btn--primary`** — Emas gradient, teks gelap, shadow glow emas.
  ```css
  color: #04111f;
  background: linear-gradient(135deg, var(--accent) 0%, #ffe49a 100%);
  box-shadow: 0 18px 40px rgba(255, 207, 93, 0.22);
  ```
- **`.btn--secondary`** — Outline, background subtle.
  ```css
  color: var(--text);
  border-color: rgba(193, 210, 255, 0.15);
  background: rgba(255, 255, 255, 0.04);
  ```

Pada mobile (<720px), `.btn` menjadi `width: 100%`.

---

## 8. Typography Rules

### Hero Title (`.hero h1`)
```css
font-family: var(--font-display), sans-serif;
font-size: clamp(3rem, 7vw, 5.8rem);
line-height: 0.95;
letter-spacing: -0.04em;
```

### Section Heading (`.section__header h2`)
```css
font-family: var(--font-display), sans-serif;
font-size: clamp(2rem, 4vw, 3.2rem);
line-height: 1;
letter-spacing: -0.03em;
```

### Body Text (`.hero p`, `.feature p`, `.track p`, dll.)
```css
color: var(--muted);
line-height: 1.7;
/* atau 1.8 untuk teks panjang seperti .hero p */
```

### Eyebrow / Kicker (`.eyebrow`, `.soal-showcase-card__level`, `.webcontainer-card__eyebrow`)
```css
color: var(--primary);
font-weight: 700 atau 800;
font-size: 0.78rem – 0.93rem;
text-transform: uppercase;
letter-spacing: 0.08em – 0.12em;
```

### Navigasi Link
```css
color: var(--muted);
font-weight: (inherit dari body);
/* hover → color: var(--text) + cyan border */
```

---

## 9. Navigasi / Navbar

- **`.topbar`**: `position: sticky; top: 0; z-index: 30`, `backdrop-filter: blur(18px)`, bg `rgba(5,11,22,0.62)`.
- **`.nav--desktop`**: 3-column grid (`auto 1fr auto`) — links di tengah.
- **Nav link hover**: `color: var(--text)`, border `rgba(124,231,255,0.22)`, bg `rgba(255,255,255,0.04)`, `translateY(-1px)`.
- **`.nav__cta-simulasi`**: Highlight cyan untuk halaman Simulasi.
- **Mobile** (`<720px`): `<details>` toggle `.nav-mobile`, panel floating dropdown dengan backdrop.

---

## 10. Input Fields

```css
.input {
  width: 100%;
  border-radius: 14px;
  border: 1px solid rgba(193, 210, 255, 0.18);
  background: rgba(8, 16, 31, 0.6);
  color: var(--text);
  padding: 0.8rem 0.9rem;
}
.input:focus {
  border-color: rgba(124, 231, 255, 0.6);
  box-shadow: 0 0 0 4px rgba(124, 231, 255, 0.12);
}
```

---

## 11. Component-Specific Tokens

### Badge
```css
.badge {
  padding: 0.58rem 0.82rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(193, 210, 255, 0.08);
  color: var(--muted);
  font-size: 0.9rem;
  font-weight: 600;
}
```

### Pill
```css
.pill {
  min-height: 2.25rem;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(193, 210, 255, 0.08);
  color: var(--muted);
  font-size: 0.86rem;
  font-weight: 600;
}
```

### Terminal Preview
```css
.terminal-preview {
  border-radius: 24px;
  border: 1px solid rgba(193, 210, 255, 0.1);
  background:
    linear-gradient(180deg, rgba(124, 231, 255, 0.08), transparent 22%),
    #06101d;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.22);
}
```
- Top bar: traffic lights (merah `#ff6b6b`, kuning `#ffd166`, hijau `#4cd964`).
- Body: `color: #d8f3ff`, monospace font 0.92rem, line-height 1.7.
- Prompt: `color: #8cf0c5`.

### Countdown Timer (`.hero-timeline-item__countdown-box`)
```css
b { color: var(--accent); font-size: 1rem; }
span { color: var(--muted); font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.04em; }
```

### Timeline Index
- Primary: `background: rgba(124, 231, 255, 0.12); color: var(--primary);` (hero-timeline)
- Accent: `background: rgba(255, 207, 93, 0.12); color: #ffe49a;` (main timeline)

### Accordion (`.accordion`)
- `<details>` element, `.accordion__summary` sebagai toggler.
- Panel: border-radius `var(--radius-xl)`.
- Chevron: rotate 180deg saat `[open]`, color berubah ke `var(--text)`.
- Content: padding `0 1.25rem 1.25rem`, batas atas border saat open.

### Level Switcher (`.level-pill`)
- Default: muted border + subtle bg.
- `.is-active`: cyan border `rgba(124,231,255,0.38)`, cyan bg `rgba(124,231,255,0.09)`, shadow glow.

---

## 12. React Component Layout Pattern

Setiap halaman/komponen besar mengikuti struktur:
```
<section className="section" id="...">
  <div className="container">
    <div className="section__header">
      <h2>Judul</h2>
    </div>
    <div className="grid-3">  <!-- atau grid-2 -->
      <article className="track">  <!-- atau feature, faq-item, dll -->
        ...
      </article>
    </div>
  </div>
</section>
```

---

## 13. Responsive Breakpoints

| Breakpoint | Target |
|---|---|
| `@media (max-width: 960px)` | Grid-3/grid-2 → 1 kolom, hero grid collapse, soal showcase card single column, cta grid collapse |
| `@media (max-width: 720px)` | Mobile nav aktif, `--muted` diganti `--muted-mobile`, buttons full-width, stat grid single column |
| `@media (max-width: 700px)` | Carousel controls wrap |
| `@media print` | Hapus background gelap, topbar, glow orbs, buat certificate full-page putih |

---

## 14. Animations & Transitions

- **Interaksi hover/click**: `180ms ease` — digunakan pada `.btn`, nav links, `.level-pill`, accordion.
- **Accordion chevron**: `160ms ease` — rotate 180deg.
- **Carousel controls**: `200ms ease` — arrow hover, dot transition (width + color).
- **Efek hover standar**: `transform: translateY(-1px)` + perubahan border/bg/shadow (jangan tambah `scale`).

---

## 15. Z-Index Scale

| Layer | z-index | Element |
|---|---|---|
| -1 | -1 | `body::before`, `body::after` (glow orbs), `.shell::before` (mask) |
| 0 | 0 (default) | Semua konten normal |
| 30 | 30 | `.topbar` (sticky navbar) |

---

## 16. CSS Naming Convention

Gunakan **BEM** (`Block__Element--Modifier`):
- Block: `.hero`, `.nav`, `.section`, `.track`, `.btn`
- Element: `.hero__grid`, `.nav__links`, `.section__header`
- Modifier: `.btn--primary`, `.panel--highlight`, `.hero-timeline-item--nearest`
- State: `.is-active`, `.nav__cta-simulasi`

**PENTING:** Tidak boleh menggunakan Tailwind CSS, utility classes, atau CSS-in-JS. Semua styling ditulis manual di `app/globals.css` dengan BEM convention.

---

## 17. Checklist untuk Komponen Baru

Sebelum merge, pastikan komponen baru:

- [ ] Font display pakai `var(--font-display)`, body pakai `var(--font-body)`.
- [ ] Warna hanya via CSS variables (`--text`, `--muted`, `--primary`, `--accent`, `--line`).
- [ ] Border radius pakai token (`--radius-xl`/`--radius-lg`/`--radius-md` atau `999px`).
- [ ] Card background mengikuti formula `linear-gradient(180deg, rgba(255,255,255,0.04), transparent 48%), rgba(8,16,31,0.74)`.
- [ ] Border pakai `1px solid rgba(193,210,255,0.1)` (atau variasi opacity-nya).
- [ ] Transition pakai `180ms ease` (atau `160ms`/`200ms` sesuai konteks).
- [ ] Hover effect: `translateY(-1px)`.
- [ ] Responsive di 960px dan 720px.
- [ ] Class name mengikuti BEM convention.
- [ ] Style disimpan di `app/globals.css`, bukan inline atau CSS module.
