"use client";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Products", href: isHome ? "#products" : "/#products" },
    { label: "Manufacturing", href: isHome ? "#manufacturing" : "/#manufacturing" },
    { label: "Why CCSI", href: isHome ? "#why-us" : "/#why-us" },
    { label: "Industries", href: isHome ? "#industries" : "/#industries" },
    { label: "Contact", href: isHome ? "#contact" : "/#contact" },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-inner">
          <a href={isHome ? "#" : "/"} className="navbar-logo" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <div className="navbar-logo-icon" style={{ background: "#00aeef" }}>CC</div>
            <div className="navbar-logo-text" style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", letterSpacing: "0.02em", lineHeight: "1" }}>
              <span style={{ color: "#00aeef", fontWeight: 900 }}>CLIMATE</span>{" "}
              <span style={{ color: "#e31e24", fontWeight: 900 }}>CONTROL</span>{" "}
              <span style={{ color: "#fbb03b", fontWeight: 900, display: "block", fontSize: "9px", letterSpacing: "0.15em", marginTop: "4px" }}>SYSTEM INDIA</span>
            </div>
          </a>
          <ul className="navbar-links">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
          <div className="navbar-actions" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <a
              href="/cart"
              className="navbar-basket"
              title="View RFQ Basket"
              aria-label="View RFQ Basket"
              style={{ position: "relative", display: "flex", alignItems: "center", color: "var(--primary)", textDecoration: "none" }}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: "24px", height: "24px" }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalItems > 0 && (
                <span
                  className="basket-badge"
                  style={{
                    position: "absolute",
                    top: "-6px",
                    right: "-8px",
                    background: "var(--accent)",
                    color: "white",
                    fontSize: "10px",
                    fontWeight: "bold",
                    borderRadius: "50%",
                    padding: "2px 5px",
                    minWidth: "16px",
                    textAlign: "center",
                    border: "1.5px solid white",
                    lineHeight: "1"
                  }}
                >
                  {totalItems}
                </span>
              )}
            </a>
            <a href={isHome ? "#contact" : "/#contact"} className="navbar-cta">
              Request a Quote
            </a>
          </div>
          <button
            className="navbar-mobile-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
            {l.label}
          </a>
        ))}
        <a href="/cart" onClick={() => setMenuOpen(false)} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          RFQ Basket ({totalItems})
        </a>
        <a href={isHome ? "#contact" : "/#contact"} onClick={() => setMenuOpen(false)}>
          Request a Quote
        </a>
      </div>
    </>
  );
}
