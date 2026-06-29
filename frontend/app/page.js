"use client";

import Navbar from "./components/Navbar";
import ContactForm from "./components/ContactForm";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useCart } from "./context/CartContext";
import { API_BASE_URL } from "@/app/config";

const LogoHeading = () => (
  <span style={{ fontWeight: 900, letterSpacing: "0.03em" }}>
    <span style={{ color: "#00aeef" }}>CLIMATE</span>{" "}
    <span style={{ color: "#e31e24" }}>CONTROL</span>{" "}
    <span style={{ color: "#fbb03b" }}>SYSTEM INDIA</span>
  </span>
);

const staticProducts = [
  {
    _id: "p1",
    tag: "Chiller",
    name: "CCSI Industrial Oil Cooling Chiller",
    desc: "Mild Steel Industrial Oil Cooling Chiller. Easy to operate with high performance. Equipped with solenoid valve & delay timer, single phase preventer, hermetically sealed air cooled immersion compressor, digital control system, safety fuse, and built-in overload protection.",
    image: "/images/products/industrial-oil-chiller-1.png",
    models: "CCSI IOC 65k",
    price: 65000,
  },
  {
    _id: "p2",
    tag: "Chiller",
    name: "CCSI Refrigerated Oil Chiller",
    desc: "Mild Steel Refrigerated Oil Chiller. Industrial grade air cooled oil chiller designed for hydraulic and cooling loops. Sturdy, reliable, and energy efficient construction.",
    image: "/images/products/refrigerated-oil-chiller-1.png",
    models: "CCSI ROC 40k",
    price: 40000,
  },
  {
    _id: "p3",
    tag: "Chiller",
    name: "CCSI Spindle Oil Chiller",
    desc: "Copper Spindle Oil Chiller. Precision spindle oil cooling chiller with optimum tolerance capacity, heat resistance, long functional life, single phase preventer, solenoid valve, and digital control system.",
    image: "/images/products/spindle-oil-chiller-1.png",
    models: "CCSI SOC 65k",
    price: 65000,
  },
  {
    _id: "p4",
    tag: "Chiller",
    name: "CCSI Hydraulic Oil Chiller",
    desc: "Mild Steel Hydraulic Oil Chiller. Easy to operate with hermetically sealed air cooled immersion compressor, digital controller, built-in overload protection, LP/HP switch, safety fuses, and optional water-cooled condenser.",
    image: "/images/products/hydraulic-oil-chiller-1.png",
    models: "CCSI HOC 55k",
    price: 55000,
  },
  {
    _id: "p5",
    tag: "Panel AC",
    name: "CCSI Industrial Air Conditioner",
    desc: "4 Star rated Industrial Air Conditioner. Heavy-duty, lightweight design, easy installation, and accurate thermal regulation for industrial control rooms and operator cabins.",
    image: "/images/products/industrial-ac-1.png",
    models: "CCSI IAC 70k (4-Star)",
    price: 70000,
  },
  {
    _id: "p6",
    tag: "Panel AC",
    name: "CCSI Panel Air Conditioner",
    desc: "4 Star rated Panel Air Conditioner providing optimum cooling for electrical control cabinets. Features smooth finish, minimum maintenance, weekly filter alarm, and digital temperature controller.",
    image: "/images/products/panel-ac-1.png",
    models: "CCSI PAC 24k (4-Star)",
    price: 24000,
  },
  {
    _id: "p7",
    tag: "Panel AC",
    name: "CCSI Ductable Panel Air Conditioner",
    desc: "High strength, precisely engineered Ductable Panel Air Conditioner for panels requiring external air routing. Suitable for CNC machine tools and dusty environments.",
    image: "/images/products/ductable-ac-1.png",
    models: "CCSI DPAC 40k",
    price: 40000,
  },
  {
    _id: "p8",
    tag: "Chiller",
    name: "CCSI Online Water Chiller",
    desc: "Mild Steel 5 TR Online Water Chiller. Precision water chiller designed specifically for laser machine cooling with highly stable temperature control.",
    image: "/images/products/online-water-chiller-1.png",
    models: "CCSI OWC 5TR",
    price: 120000,
  },
  {
    _id: "p9",
    tag: "Chiller",
    name: "CCSI Water Cooling Chiller Machine",
    desc: "Industrial heavy-duty Water Cooling Chiller Machine with robust construction and optimum performance under continuous operation for large-scale industrial applications.",
    image: "/images/products/water-cooling-machine-1.png",
    models: "CCSI WCCM 20L",
    price: 2000000,
  },
  {
    _id: "p10",
    tag: "Panel AC",
    name: "CCSI Air To Air Heat Exchanger",
    desc: "Mild Steel Air To Air Heat Exchanger, Air-Cooled, 240V. Features precise construction, optimum functionality, and elevated service life for electrical enclosures.",
    image: "/images/products/air-heat-exchanger-1.png",
    models: "CCSI AAHE 11k",
    price: 11000,
  },
  {
    _id: "p11",
    tag: "Chiller",
    name: "CCSI Water Cooled Scroll Chiller",
    desc: "Mild Steel 10 Ton Water Cooled Scroll Chiller. Low power consumption, less heat emission, and smooth functioning for centralized industrial cooling.",
    image: "/images/products/scroll-chiller-1.png",
    models: "CCSI WCSC 10T",
    price: 85000,
  },
  {
    _id: "p12",
    tag: "Chiller",
    name: "CCSI Water Soluble Coolant Chiller",
    desc: "Mild Steel 6 TR Water Soluble Coolant Chiller. Easy to install, highly flexible, with increased effectiveness for CNC machining center coolant sumps.",
    image: "/images/products/coolant-chiller-1.png",
    models: "CCSI WSCC 6TR",
    price: 80000,
  },
  {
    _id: "p13",
    tag: "Dehumidifier",
    name: "CCSI Industrial Dehumidifier",
    desc: "High capacity refrigerated moisture removal unit designed to protect raw materials, pharma products, and dry warehouses from moisture damage.",
    image: "/images/products/dehumidifier.png",
    models: "CCSI Dehumidifier 100 LPD – 500 LPD",
    price: 28000,
  },
  {
    _id: "p14",
    tag: "Air Dryer",
    name: "CCSI Refrigerated Air Dryer",
    desc: "Compressed air moisture separation system protecting pneumatic tools, instrumentation, and processes by drying input air.",
    image: "/images/products/air-dryer.png",
    models: "CCSI Air Dryer 15 CFM – 500 CFM",
    price: 35000,
  },
  {
    _id: "p15",
    tag: "Fan Tray",
    name: "CCSI Fan Tray",
    desc: "Standard cabinet mounting fan array providing active top air circulation and quick heat dissipation inside server and network rack configurations.",
    image: "/images/products/rack-ac.png",
    models: "CCSI Fan Tray 2-Way – 6-Way",
    price: 15000,
  }
];


const whyCards = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: "32px", height: "32px", color: "var(--primary)" }}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: "Made in Pune",
    desc: "Manufactured in our own facility using premium-grade raw materials from certified vendors.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: "32px", height: "32px", color: "var(--primary)" }}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Custom Engineering",
    desc: "Every unit can be tailored to your exact specifications — capacity, voltage, dimensions, and more.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: "32px", height: "32px", color: "var(--primary)" }}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Quality Tested",
    desc: "Each product undergoes rigorous quality checks on multiple parameters before dispatch.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: "32px", height: "32px", color: "var(--primary)" }}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9v12z" />
        <circle cx="7.5" cy="18.5" r="1.5" stroke="currentColor" strokeWidth={1.8} fill="none" />
        <circle cx="16.5" cy="18.5" r="1.5" stroke="currentColor" strokeWidth={1.8} fill="none" />
      </svg>
    ),
    title: "Pan-India Delivery",
    desc: "Extensive distribution network ensuring timely delivery across India.",
  },
];

const industries = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: "32px", height: "32px", margin: "0 auto 8px" }}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      </svg>
    ),
    name: "CNC & Machine Tools"
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: "32px", height: "32px", margin: "0 auto 8px" }}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    name: "Pharmaceuticals"
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: "32px", height: "32px", margin: "0 auto 8px" }}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    name: "Heavy Engineering"
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: "32px", height: "32px", margin: "0 auto 8px" }}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
      </svg>
    ),
    name: "Plastics & Moulding"
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: "32px", height: "32px", margin: "0 auto 8px" }}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    name: "IT & Telecom"
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: "32px", height: "32px", margin: "0 auto 8px" }}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    name: "Electrical Panels"
  },
];

export default function Home() {
  const { addToCart } = useCart();
  const [dbProducts, setDbProducts] = useState([]);
  const [addedItems, setAddedItems] = useState({});

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/products`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data && json.data.length > 0) {
            setDbProducts(json.data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch products from backend:", error);
      }
    }
    fetchProducts();
  }, []);

  const handleAddToRFQ = (p) => {
    addToCart(p, 1);
    const key = p._id || p.name;
    setAddedItems((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [key]: false }));
    }, 2000);
  };

  const getProductImage = (product) => {
    const category = product.category || "";
    const name = product.name || "";

    if (category === "Panel AC") {
      if (name.toLowerCase().includes("rack") || name.toLowerCase().includes("tray")) {
        return "/images/products/rack-ac.png";
      }
      return "/images/products/panel-ac.png";
    }
    if (category === "Chiller" || category === "Chillers") {
      if (name.toLowerCase().includes("oil") || name.toLowerCase().includes("oc")) {
        return "/images/products/oil-chiller.png";
      }
      return "/images/products/water-chiller.png";
    }
    if (category === "Air Dryer") {
      return "/images/products/air-dryer.png";
    }
    if (category === "Dehumidifier") {
      return "/images/products/dehumidifier.png";
    }
    if (category === "Fan Tray") {
      return "/images/products/rack-ac.png";
    }
    return "/images/products/panel-ac.png";
  };

  const displayedProducts = dbProducts.length > 0 ? dbProducts : staticProducts;
  return (
    <>
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="hero" id="home">
        <div className="hero-inner">
          <div>
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
            {displayedProducts.map((p, i) => {
              const imgUrl = p.image || getProductImage(p);
              const titleText = p.name || p.title;
              const descText = p.description || p.desc;
              const tagText = p.category || p.tag;
              const key = p._id || titleText;
              const isAdded = !!addedItems[key];

              return (
                <div className="product-card" key={key}>
                  <div className="product-card-image">
                    <Image
                      src={imgUrl}
                      alt={`${titleText} manufactured by Climate Control System India`}
                      width={300}
                      height={200}
                    />
                  </div>
                  <div className="product-card-body">
                    <div className="product-card-tag">{tagText}</div>
                    <h3 className="product-card-title">{titleText}</h3>
                    <p className="product-card-desc">{descText}</p>
                    {p.models && (
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
                    )}
                    {p.price && (
                      <p
                        style={{
                          fontSize: "15px",
                          color: "var(--primary)",
                          marginBottom: "14px",
                          fontWeight: 700,
                        }}
                      >
                        Indicative Price: ₹{Number(p.price).toLocaleString('en-IN')}
                      </p>
                    )}
                    <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
                      <a href="#contact" className="product-card-link" style={{ flex: 1, textAlign: "center", textDecoration: "none", display: "inline-block" }}>
                        Get Quote →
                      </a>
                      <button
                        onClick={() => handleAddToRFQ(p)}
                        className="btn-primary"
                        style={{
                          padding: "8px 16px",
                          fontSize: "12px",
                          borderRadius: "var(--radius-sm)",
                          background: isAdded ? "var(--success)" : "var(--primary)",
                          color: "white",
                          border: "none",
                          cursor: "pointer",
                          fontWeight: "bold",
                          transition: "all 0.2s ease"
                        }}
                      >
                        {isAdded ? "✓ Added" : "+ Add to RFQ"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
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
              href="https://dir.indiamart.com/impcat/climate-control-system.html"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-white"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: "20px", height: "20px" }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Buy on IndiaMart
            </a>
            <a href="#contact" className="btn-ghost" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: "20px", height: "20px" }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Request Custom Quote
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
              <h3 style={{ fontSize: "24px", fontWeight: "800", marginBottom: "16px" }}>
                <LogoHeading />
              </h3>
              <p>
                Established in 2021 under the guidance of Mr. S. A.
                Suryawanshi, we are a Pune-based manufacturer and service
                provider of industrial refrigeration and climate control
                equipment.
              </p>
              <div className="contact-detail">
                <div className="contact-detail-icon">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: "20px", height: "20px", color: "var(--primary)" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="contact-detail-label">Address</div>
                  <div className="contact-detail-value">
                    Pune, Maharashtra, India
                  </div>
                </div>
              </div>
              <div className="contact-detail">
                <div className="contact-detail-icon">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: "20px", height: "20px", color: "var(--primary)" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="contact-detail-label">Phone</div>
                  <div className="contact-detail-value">
                    +91-XXXXXXXXXX
                  </div>
                </div>
              </div>
              <div className="contact-detail">
                <div className="contact-detail-icon">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: "20px", height: "20px", color: "var(--primary)" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="contact-detail-label">Email</div>
                  <div className="contact-detail-value">
                    info@climatecontrolsystemindia.com
                  </div>
                </div>
              </div>
              <div className="contact-detail">
                <div className="contact-detail-icon">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: "20px", height: "20px", color: "var(--primary)" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
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
                <img src="/images/logo.png" alt="Climate Control System India Logo" style={{ width: "48px", height: "auto", background: "white", padding: "2px", borderRadius: "4px" }} />
                <strong><LogoHeading /></strong>
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
                    href="https://dir.indiamart.com/impcat/climate-control-system.html"
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
