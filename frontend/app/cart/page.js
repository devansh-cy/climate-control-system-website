"use client";

import React from "react";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import Image from "next/image";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, getCartSummary } = useCart();
  const { subtotal, tax, total } = getCartSummary();

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

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />
        <div style={{ maxWidth: "800px", margin: "120px auto 60px", padding: "40px 20px", textAlign: "center" }}>
          <div style={{ width: "80px", height: "80px", background: "#f3f4f6", color: "var(--primary)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <svg style={{ width: "40px", height: "40px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h1 style={{ fontSize: "28px", fontWeight: "800", color: "var(--primary)", marginBottom: "12px" }}>Your RFQ Basket is Empty</h1>
          <p style={{ fontSize: "15px", color: "var(--text-light)", marginBottom: "32px", maxWidth: "480px", margin: "0 auto 32px" }}>
            You have not added any industrial climate control systems or cooling units to your RFQ basket yet.
          </p>
          <a href="/#products" className="btn-primary" style={{ padding: "12px 32px", textDecoration: "none", display: "inline-block" }}>
            Browse Catalog
          </a>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: "1200px", margin: "100px auto 60px", padding: "0 20px" }}>
        <nav style={{ fontSize: "12px", fontWeight: "600", color: "var(--text-light)", marginBottom: "20px" }}>
          <a href="/" style={{ color: "var(--text-light)", textDecoration: "none" }}>Home</a> / <span style={{ color: "var(--primary)" }}>RFQ Basket</span>
        </nav>

        <h1 style={{ fontSize: "32px", fontWeight: "800", color: "var(--primary)", marginBottom: "32px" }}>RFQ Basket</h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", lgGridTemplateColumns: "2fr 1fr", gap: "32px" }} className="cart-grid-responsive">
          {/* Basket List */}
          <div style={{ background: "white", padding: "24px", border: "1px solid #e5e7eb", borderRadius: "8px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "4fr 2fr 2fr 1fr", borderBottom: "2px solid #f3f4f6", paddingBottom: "12px", marginBottom: "20px", fontSize: "12px", fontWeight: "800", color: "#9ca3af", textTransform: "uppercase" }} className="cart-header-responsive">
              <div>Product Specifications</div>
              <div style={{ textAlign: "right" }}>Indicative Price</div>
              <div style={{ textAlign: "center" }}>Quantity</div>
              <div style={{ textAlign: "right" }}>Subtotal</div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {cartItems.map((item) => {
                const imgUrl = item.image || getProductImage(item);
                const title = item.name || item.title;
                const category = item.category || item.tag;

                return (
                  <div key={item._id} style={{ display: "grid", gridTemplateColumns: "4fr 2fr 2fr 1fr", alignItems: "center", borderBottom: "1px solid #f3f4f6", paddingBottom: "20px" }} className="cart-item-responsive">
                    {/* Col 1: Details */}
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <div style={{ position: "relative", width: "64px", height: "64px", flexShrink: 0, borderRadius: "6px", overflow: "hidden", border: "1px solid #f3f4f6" }}>
                        <Image src={imgUrl} alt={title} fill style={{ objectFit: "cover" }} />
                      </div>
                      <div>
                        <div style={{ fontSize: "15px", fontWeight: "700", color: "var(--primary)" }}>{title}</div>
                        <div style={{ fontSize: "12px", color: "var(--text-light)", marginTop: "2px" }}>Category: {category}</div>
                        <button 
                          onClick={() => removeFromCart(item._id)}
                          style={{ background: "none", border: "none", color: "#ef4444", fontSize: "12px", fontWeight: "600", padding: "0", cursor: "pointer", marginTop: "6px" }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Col 2: Price */}
                    <div style={{ textAlign: "right", fontSize: "15px", fontWeight: "600" }}>
                      {item.price ? `₹${Number(item.price).toLocaleString('en-IN')}` : "Quote Required"}
                    </div>

                    {/* Col 3: Qty selector */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        style={{ border: "1px solid #d1d5db", background: "white", width: "24px", height: "24px", borderRadius: "4px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                      >
                        -
                      </button>
                      <span style={{ fontSize: "14px", fontWeight: "600", width: "24px", textAlign: "center" }}>{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        style={{ border: "1px solid #d1d5db", background: "white", width: "24px", height: "24px", borderRadius: "4px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                      >
                        +
                      </button>
                    </div>

                    {/* Col 4: Subtotal */}
                    <div style={{ textAlign: "right", fontSize: "15px", fontWeight: "700", color: "var(--primary)" }}>
                      {item.price ? `₹${(Number(item.price) * item.quantity).toLocaleString('en-IN')}` : "—"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quote Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ background: "white", padding: "24px", border: "1px solid #e5e7eb", borderRadius: "8px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "1px solid #f3f4f6", paddingBottom: "12px", marginBottom: "20px" }}>
                RFQ Quote Estimate
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", fontSize: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-light)" }}>
                  <span>Indicative Subtotal</span>
                  <span style={{ fontWeight: "600", color: "var(--primary)" }}>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-light)", paddingBottom: "16px", borderBottom: "1px solid #f3f4f6" }}>
                  <span>Estimated GST (18%)</span>
                  <span style={{ fontWeight: "600", color: "var(--primary)" }}>₹{tax.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingTop: "8px" }}>
                  <span style={{ fontSize: "16px", fontWeight: "800", color: "var(--primary)" }}>Total Indicative Amount</span>
                  <span style={{ fontSize: "20px", fontWeight: "900", color: "var(--primary)" }}>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <a 
                href="/checkout"
                className="btn-primary"
                style={{ width: "100%", textAlign: "center", textDecoration: "none", marginTop: "24px", display: "block", boxSizing: "border-box" }}
              >
                Proceed to RFQ Details
              </a>
            </div>

            {/* B2B Notice Card */}
            <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", padding: "20px", borderRadius: "8px", color: "#1e3a8a", fontSize: "13px", lineHeight: "1.6" }}>
              <h4 style={{ fontWeight: "800", display: "flex", alignItems: "center", gap: "8px", margin: "0 0 8px 0" }}>
                <span>📋</span> B2B Notice
              </h4>
              <p style={{ margin: 0 }}>
                Prices shown are indicative. Custom commercial proposals containing bulk quantity breaks, specific OEM customizations (voltage/paint finishes), and local freight logistics will be prepared individually by Pune-based engineers within 24 hours of form submission.
              </p>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @media (max-width: 1024px) {
          .cart-grid-responsive {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 768px) {
          .cart-header-responsive {
            display: none !important;
          }
          .cart-item-responsive {
            grid-template-columns: 1fr !important;
            gap: 12px;
            text-align: left;
          }
          .cart-item-responsive > div {
            text-align: left !important;
            justify-content: flex-start !important;
          }
        }
      `}</style>
    </>
  );
}
