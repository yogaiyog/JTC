import Image from "next/image";

type NavLink = {
  href: string;
  label: string;
};

type SiteHeaderProps = {
  brandHref?: string;
  links?: NavLink[];
};

const registrationUrl =
  process.env.NEXT_PUBLIC_REGISTRATION_URL ??
  "https://docs.google.com/forms/d/e/1FAIpQLSfAEOa4r4wSEHkiNMPox2bEan6Ljok5Be_xa6SqrgGPmHMH2Q/viewform?usp=header";

export function SiteHeader({
  brandHref = "/",
  links = []
}: SiteHeaderProps) {
  const primaryLinks = [{ href: "/latihan", label: "Simulasi" }, ...links];

  return (
    <header className="topbar">
      <div className="container topbar__inner">
        <a className="brand" href={brandHref} aria-label="JTC">
          <Image className="brand__logo" src="/logo.png" alt="JTC" width={172} height={48} priority />
        </a>

        <nav className="nav nav--desktop" aria-label="Navigasi utama">
          <div className="nav__links">
            {links.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
                <a className="nav__cta-simulasi" href="/latihan">
              Simulasi
            </a>
          </div>

          <div className="nav__actions">
            <a className="btn btn--primary nav__cta-daftar" href={registrationUrl} target="_blank" rel="noreferrer">
              Daftar
            </a>
        
          </div>
        </nav>

        <details className="nav-mobile">
          <summary className="nav-mobile__toggle" aria-label="Buka menu">
            <span />
            <span />
            <span />
          </summary>
          <nav className="nav-mobile__panel" aria-label="Navigasi mobile">
            {primaryLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
            <a className="btn btn--primary nav-mobile__cta" href={registrationUrl} target="_blank" rel="noreferrer">
              Daftar
            </a>
          </nav>
        </details>
      </div>
    </header>
  );
}
