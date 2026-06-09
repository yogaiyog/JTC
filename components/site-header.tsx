type NavLink = {
  href: string;
  label: string;
};

type SiteHeaderProps = {
  brandHref?: string;
  links?: NavLink[];
};

const trainingLinks: NavLink[] = [
  // {
  //   href: "/timeline",
  //   label: "Timeline"
  // },
  {
    href: "/latihan/submit-karya",
    label: "Submit Karya"
  },
  {
    href: "/latihan/ngerjain-soal",
    label: "Try out Soal"
  }
];

export function SiteHeader({
  brandHref = "/",
  links = []
}: SiteHeaderProps) {
  return (
    <header className="topbar">
      <div className="container topbar__inner">
        <a className="brand" href={brandHref} aria-label="JTC">
          <span className="brand__mark">J</span>
          <span>JTC</span>
        </a>

        <nav className="nav" aria-label="Navigasi utama">
          <details className="nav-dropdown">
            <summary className="nav-dropdown__summary">Latihan</summary>
            <div className="nav-dropdown__menu">
              {trainingLinks.map((item) => (
                <a key={item.href} href={item.href}>
                  {item.label}
                </a>
              ))}
            </div>
          </details>

          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
