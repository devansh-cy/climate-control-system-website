import Navbar from "./components/Navbar";
import ContactForm from "./components/ContactForm";
import Image from "next/image";

const products = [
  {
    tag: "Chillers",
    title: "Industrial Water Chillers",
    desc: "Precision water and glycol chillers for CNC machines, injection moulding, and process cooling. Available from 0.5 TR to 20 TR.",
    image: "/images/products/water-chiller.png",
    models: "Combi-Chiller · Water Chiller · Glycol Chiller · Immersion Chiller",
  },
  {
    tag: "Panel AC",
    title: "Panel Air Conditioners",
    desc: "Wall mount, ductable, and water-cooled panel ACs engineered for electrical enclosure cooling. 300W to 7000W capacity.",
    image: "/images/products/panel-ac.png",
    models: "CCSI PAC 300W–7000W · DPAC · WC PAC · OPAC",
  },
  {
    tag: "Chillers",
    title: "Oil Coolers & Hydraulic Oil Chillers",
    desc: "Heavy-duty oil cooling systems for hydraulic presses, CNC lathes, and industrial machinery. Engineered for 24/7 operation.",
    image: "/images/products/oil-chiller.png",
    models: "CCSI OC 1.5 TR · 2 TR · 3 TR · OC 2700W",
  },
  {
    tag: "Air Treatment",
    title: "Refrigerated Air Dryers",
    desc: "Compressed air drying systems that remove moisture to protect pneumatic tools, pipelines, and instrumentation.",
    image: "/images/products/air-dryer.png",
    models: "Cycling & Non-cycling variants available",
  },
  {
    tag: "Air Treatment",
    title: "Industrial Dehumidifiers",
    desc: "High-capacity dehumidification for warehouses, pharmaceutical plants, and food processing units.",
    image: "/images/products/dehumidifier.png",
    models: "Custom capacity as per requirement",
  },
  {
    tag: "Panel AC",
    title: "Rack AC & Fan Tray Units",
    desc: "Compact cooling for server racks, telecom enclosures, and outdoor electrical cabinets. Indoor and outdoor units available.",
    image: "/images/products/rack-ac.png",
    models: "CCSI Rack AC Indoor · Outdoor · Fan Tray",
  },
];

const whyCards = [
  {
    icon: "🏭",
    title: "Made in Pune",
    desc: "Manufactured in our own facility using premium-grade raw materials from certified vendors.",
  },
  {
    icon: "🔧",
    title: "Custom Engineering",
    desc: "Every unit can be tailored to your exact specifications — capacity, voltage, dimensions, and more.",
  },
  {
    icon: "✅",
    title: "Quality Tested",
    desc: "Each product undergoes rigorous quality checks on multiple parameters before dispatch.",
  },
  {
    icon: "🚚",
    title: "Pan-India Delivery",
    desc: "Extensive distribution network ensuring timely delivery across India.",
  },
];

const industries = [
  { icon: "⚙️", name: "CNC & Machine Tools" },
  { icon: "🧪", name: "Pharmaceuticals" },
  { icon: "🏗️", name: "Heavy Engineering" },
  { icon: "🍶", name: "Plastics & Moulding" },
  { icon: "🖥️", name: "IT & Telecom" },
  { icon: "🔌", name: "Electrical Panels" },
];

export default function Home() {
  return (
    <>
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="hero" id="home">
        <div className="hero-inner">
          <div>
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Established 2021 · Pune, Maharashtra
            </div>
            <h1>
              Precision Engineered <span>Climate Solutions</span> for Industry
            </h1>
            <p className="hero-sub">
              We design and manufacture industrial chillers, panel air
              conditioners, oil coolers, and refrigeration equipment — built
              to spec, built to last.
            </p>
            <div className="hero-buttons">
              <a href="#products" className="btn-primary">
                View Products →
              </a>
              <a href="#contact" className="btn-outline">
                Request a Quote
              </a>
            </div>
          </div>
          <div className="hero-image">
            <Image
              src="/images/factory-floor.png"
              alt="Climate Control System India manufacturing facility in Pune"
              width={600}
              height={400}
              priority
            />
          </div>
        </div>
        <div className="container">
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-number">50+</div>
              <div className="hero-stat-label">Product Variants</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">500+</div>
              <div className="hero-stat-label">Units Delivered</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">100+</div>
              <div className="hero-stat-label">Clients Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRODUCTS ===== */}
      <section className="section" id="products">
        <div className="container">
          <div className="section-header">
            <div className="section-label">Our Product Range</div>
            <h2 className="section-title">
              Industrial Cooling & Climate Control Equipment
            </h2>
            <p className="section-desc">
              From compact panel ACs to heavy-duty water chillers — precision
              engineered and manufactured at our Pune facility.
            </p>
          </div>
          <div className="products-grid">
            {products.map((p, i) => (
              <div className="product-card" key={i}>
                <div className="product-card-image">
                  <Image
                    src={p.image}
                    alt={`${p.title} manufactured by Climate Control System India`}
                    width={300}
                    height={200}
                  />
                </div>
                <div className="product-card-body">
                  <div className="product-card-tag">{p.tag}</div>
                  <h3 className="product-card-title">{p.title}</h3>
                  <p className="product-card-desc">{p.desc}</p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "var(--text-light)",
                      marginBottom: "14px",
                      fontWeight: 500,
                    }}
                  >
                    {p.models}
                  </p>
                  <a href="#contact" className="product-card-link">
                    Get Quote →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MANUFACTURING ===== */}
      <section className="section section-alt" id="manufacturing">
        <div className="container">
          <div className="mfg-grid">
            <div className="mfg-image">
              <Image
                src="/images/factory-floor.png"
                alt="CCSI manufacturing facility interior"
                width={600}
                height={420}
              />
            </div>
            <div className="mfg-content">
              <div className="section-label">OEM Manufacturing</div>
              <h3>
                Built In-House. Engineered to Your Exact Specifications.
              </h3>
              <p>
                At Climate Control System India, manufacturing is our core
                strength. We design, fabricate, assemble, and test every unit
                in our own Pune-based facility — giving you complete control
                over quality, lead time, and customisation.
              </p>
              <ul className="mfg-features">
                <li>
                  <span className="check">✓</span>
                  Premium-grade raw materials from certified vendors
                </li>
                <li>
                  <span className="check">✓</span>
                  Custom capacity, voltage &amp; dimension engineering
                </li>
                <li>
                  <span className="check">✓</span>
                  Multi-parameter quality testing before dispatch
                </li>
                <li>
                  <span className="check">✓</span>
                  OEM &amp; white-label manufacturing available
                </li>
                <li>
                  <span className="check">✓</span>
                  Bulk order capability with on-time delivery
                </li>
              </ul>
              <a href="#contact" className="btn-primary">
                Discuss Custom Requirements →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY CCSI ===== */}
      <section className="section" id="why-us">
        <div className="container">
          <div className="section-header">
            <div className="section-label">Why Choose Us</div>
            <h2 className="section-title">
              The CCSI Advantage
            </h2>
            <p className="section-desc">
              Trusted by engineering industries across India for reliable,
              quality-tested refrigeration and climate control equipment.
            </p>
          </div>
          <div className="why-grid">
            {whyCards.map((c, i) => (
              <div className="why-card" key={i}>
                <div className="why-card-icon">{c.icon}</div>
                <h3 className="why-card-title">{c.title}</h3>
                <p className="why-card-desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INDUSTRIES ===== */}
      <section className="section section-alt" id="industries">
        <div className="container">
          <div className="section-header">
            <div className="section-label">Industries We Serve</div>
            <h2 className="section-title">Trusted Across Sectors</h2>
            <p className="section-desc">
              Our equipment powers critical processes in diverse industries.
            </p>
          </div>
          <div className="industries-grid">
            {industries.map((ind, i) => (
              <div className="industry-chip" key={i}>
                <div className="industry-chip-icon">{ind.icon}</div>
                {ind.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Order or Need a Custom Solution?</h2>
          <p>
            Whether you need a standard unit from our catalogue or a fully
            custom-engineered cooling system — we are ready to help.
          </p>
          <div className="cta-buttons">
            <a
              href="https://www.indiamart.com/climate-control-system-india/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-white"
            >
              🛒 Buy on IndiaMart
            </a>
            <a href="#contact" className="btn-ghost">
              ✉️ Request Custom Quote
            </a>
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section className="section" id="contact">
        <div className="container">
          <div className="section-header">
            <div className="section-label">Get In Touch</div>
            <h2 className="section-title">Contact Us Directly</h2>
            <p className="section-desc">
              Skip the middleman. Talk to us directly about your requirements.
            </p>
          </div>
          <div className="contact-grid">
            <div className="contact-info">
              <h3>Climate Control System India</h3>
              <p>
                Established in 2021 under the guidance of Mr. S. A.
                Suryawanshi, we are a Pune-based manufacturer and service
                provider of industrial refrigeration and climate control
                equipment.
              </p>
              <div className="contact-detail">
                <div className="contact-detail-icon">📍</div>
                <div>
                  <div className="contact-detail-label">Address</div>
                  <div className="contact-detail-value">
                    Pune, Maharashtra, India
                  </div>
                </div>
              </div>
              <div className="contact-detail">
                <div className="contact-detail-icon">📞</div>
                <div>
                  <div className="contact-detail-label">Phone</div>
                  <div className="contact-detail-value">
                    +91-XXXXXXXXXX
                  </div>
                </div>
              </div>
              <div className="contact-detail">
                <div className="contact-detail-icon">✉️</div>
                <div>
                  <div className="contact-detail-label">Email</div>
                  <div className="contact-detail-value">
                    info@climatecontrolsystemindia.com
                  </div>
                </div>
              </div>
              <div className="contact-detail">
                <div className="contact-detail-icon">🕐</div>
                <div>
                  <div className="contact-detail-label">Working Hours</div>
                  <div className="contact-detail-value">
                    Mon – Sat, 9:00 AM – 6:00 PM
                  </div>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <div
                  className="navbar-logo-icon"
                  style={{ background: "white", color: "var(--primary)" }}
                >
                  CC
                </div>
                <strong>Climate Control System India</strong>
              </div>
              <p>
                Pune-based manufacturer of industrial chillers, panel air
                conditioners, oil coolers &amp; refrigeration equipment.
                Established 2021 under the guidance of Mr. S. A. Suryawanshi.
              </p>
            </div>
            <div>
              <h4>Products</h4>
              <ul className="footer-links">
                <li><a href="#products">Panel Air Conditioners</a></li>
                <li><a href="#products">Water Chillers</a></li>
                <li><a href="#products">Oil Coolers</a></li>
                <li><a href="#products">Air Dryers</a></li>
                <li><a href="#products">Dehumidifiers</a></li>
              </ul>
            </div>
            <div>
              <h4>Company</h4>
              <ul className="footer-links">
                <li><a href="#manufacturing">Manufacturing</a></li>
                <li><a href="#why-us">Why CCSI</a></li>
                <li><a href="#industries">Industries</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <ul className="footer-links">
                <li><a href="tel:+91XXXXXXXXXX">+91-XXXXXXXXXX</a></li>
                <li>
                  <a href="mailto:info@climatecontrolsystemindia.com">
                    info@climatecontrolsystemindia.com
                  </a>
                </li>
                <li><a>Pune, Maharashtra, India</a></li>
                <li>
                  <a
                    href="https://www.indiamart.com/climate-control-system-india/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    IndiaMart Store →
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} Climate Control System India. All
              rights reserved.
            </span>
            <span>Designed &amp; Developed with ❤️ in India</span>
          </div>
        </div>
      </footer>
    </>
  );
}
