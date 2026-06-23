"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cartItems, getCartSummary, clearCart } = useCart();
  const { subtotal, tax, total } = getCartSummary();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    gstin: "",
    timeline: "ASAP",
    application: "",
    notes: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Full Name is required";
    if (!formData.email.trim()) tempErrors.email = "Business Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) tempErrors.email = "Invalid email format";
    
    if (!formData.phone.trim()) tempErrors.phone = "Phone Number is required";
    else if (formData.phone.replace(/\D/g, "").length < 10) tempErrors.phone = "Must be at least 10 digits";

    if (!formData.company.trim()) tempErrors.company = "Company Name is required";
    
    if (!formData.street.trim()) tempErrors.street = "Street Address is required";
    if (!formData.city.trim()) tempErrors.city = "City is required";
    if (!formData.state.trim()) tempErrors.state = "State is required";
    if (!formData.zip.trim()) tempErrors.zip = "Postal Code is required";

    if (formData.gstin && formData.gstin.trim()) {
      const cleanGstin = formData.gstin.trim();
      if (cleanGstin.length !== 15 || !/^[a-zA-Z0-9]{15}$/.test(cleanGstin)) {
        tempErrors.gstin = "GSTIN must be exactly 15 alphanumeric characters";
      }
    }

    if (!formData.timeline) tempErrors.timeline = "Timeline is required";
    if (!formData.application.trim()) tempErrors.application = "Application Details are required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const payload = {
      products: cartItems.map((item) => ({
        productId: item._id,
        quantity: item.quantity
      })),
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company
      },
      shippingAddress: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        country: "India"
      },
      gstin: formData.gstin || undefined,
      timeline: formData.timeline,
      application: formData.application,
      notes: formData.notes || undefined
    };

    try {
      const res = await fetch("http://localhost:5001/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const json = await res.json();
      if (res.ok && json.success) {
        clearCart();
        router.push(`/order-confirmation?id=${json.data.orderNumber}`);
      } else {
        alert(json.message || "Failed to submit RFQ. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting RFQ:", error);
      alert("Network error. Please make sure the backend server is running.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />
        <div style={{ maxWidth: "600px", margin: "120px auto 60px", padding: "0 20px", textAlign: "center" }}>
          <h2>Your RFQ Basket is Empty</h2>
          <a href="/#products" className="btn-primary" style={{ textDecoration: "none", display: "inline-block", marginTop: "16px" }}>
            Return to Products
          </a>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: "1200px", margin: "100px auto 60px", padding: "0 20px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "800", color: "var(--primary)", marginBottom: "32px" }}>RFQ Details</h1>
        
        <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1.8fr 1.2fr", gap: "40px" }} className="checkout-grid-responsive">
          {/* Form Side */}
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            
            {/* Section 1: Business Details */}
            <div style={{ background: "white", padding: "24px", border: "1px solid #e5e7eb", borderRadius: "8px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "800", color: "var(--primary)", borderBottom: "1px solid #f3f4f6", paddingBottom: "12px", marginBottom: "20px", textTransform: "uppercase" }}>
                1. Company & Contact Details
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="form-cols-responsive">
                <div className="form-group">
                  <label htmlFor="name" style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "var(--primary)", textTransform: "uppercase", marginBottom: "6px" }}>Contact Person Name *</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} style={{ width: "100%", padding: "10px", border: errors.name ? "1px solid #ef4444" : "1px solid #d1d5db", borderRadius: "6px", fontSize: "14px", boxSizing: "border-box" }} required />
                  {errors.name && <div style={{ color: "#ef4444", fontSize: "11px", marginTop: "4px", fontWeight: "600" }}>{errors.name}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="company" style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "var(--primary)", textTransform: "uppercase", marginBottom: "6px" }}>Company / Business Name *</label>
                  <input type="text" id="company" name="company" value={formData.company} onChange={handleInputChange} style={{ width: "100%", padding: "10px", border: errors.company ? "1px solid #ef4444" : "1px solid #d1d5db", borderRadius: "6px", fontSize: "14px", boxSizing: "border-box" }} required />
                  {errors.company && <div style={{ color: "#ef4444", fontSize: "11px", marginTop: "4px", fontWeight: "600" }}>{errors.company}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="email" style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "var(--primary)", textTransform: "uppercase", marginBottom: "6px" }}>Business Email *</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} style={{ width: "100%", padding: "10px", border: errors.email ? "1px solid #ef4444" : "1px solid #d1d5db", borderRadius: "6px", fontSize: "14px", boxSizing: "border-box" }} required />
                  {errors.email && <div style={{ color: "#ef4444", fontSize: "11px", marginTop: "4px", fontWeight: "600" }}>{errors.email}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="phone" style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "var(--primary)", textTransform: "uppercase", marginBottom: "6px" }}>Phone / Mobile *</label>
                  <input type="text" id="phone" name="phone" placeholder="e.g. +91 98220 12345" value={formData.phone} onChange={handleInputChange} style={{ width: "100%", padding: "10px", border: errors.phone ? "1px solid #ef4444" : "1px solid #d1d5db", borderRadius: "6px", fontSize: "14px", boxSizing: "border-box" }} required />
                  {errors.phone && <div style={{ color: "#ef4444", fontSize: "11px", marginTop: "4px", fontWeight: "600" }}>{errors.phone}</div>}
                </div>
              </div>
            </div>

            {/* Section 2: Address */}
            <div style={{ background: "white", padding: "24px", border: "1px solid #e5e7eb", borderRadius: "8px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "800", color: "var(--primary)", borderBottom: "1px solid #f3f4f6", paddingBottom: "12px", marginBottom: "20px", textTransform: "uppercase" }}>
                2. Shipping & Site Location
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div className="form-group">
                  <label htmlFor="street" style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "var(--primary)", textTransform: "uppercase", marginBottom: "6px" }}>Street Address *</label>
                  <input type="text" id="street" name="street" value={formData.street} onChange={handleInputChange} style={{ width: "100%", padding: "10px", border: errors.street ? "1px solid #ef4444" : "1px solid #d1d5db", borderRadius: "6px", fontSize: "14px", boxSizing: "border-box" }} required />
                  {errors.street && <div style={{ color: "#ef4444", fontSize: "11px", marginTop: "4px", fontWeight: "600" }}>{errors.street}</div>}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }} className="form-cols-responsive">
                  <div className="form-group">
                    <label htmlFor="city" style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "var(--primary)", textTransform: "uppercase", marginBottom: "6px" }}>City *</label>
                    <input type="text" id="city" name="city" value={formData.city} onChange={handleInputChange} style={{ width: "100%", padding: "10px", border: errors.city ? "1px solid #ef4444" : "1px solid #d1d5db", borderRadius: "6px", fontSize: "14px", boxSizing: "border-box" }} required />
                    {errors.city && <div style={{ color: "#ef4444", fontSize: "11px", marginTop: "4px", fontWeight: "600" }}>{errors.city}</div>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="state" style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "var(--primary)", textTransform: "uppercase", marginBottom: "6px" }}>State *</label>
                    <input type="text" id="state" name="state" value={formData.state} onChange={handleInputChange} style={{ width: "100%", padding: "10px", border: errors.state ? "1px solid #ef4444" : "1px solid #d1d5db", borderRadius: "6px", fontSize: "14px", boxSizing: "border-box" }} required />
                    {errors.state && <div style={{ color: "#ef4444", fontSize: "11px", marginTop: "4px", fontWeight: "600" }}>{errors.state}</div>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="zip" style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "var(--primary)", textTransform: "uppercase", marginBottom: "6px" }}>PIN / Postal Code *</label>
                    <input type="text" id="zip" name="zip" value={formData.zip} onChange={handleInputChange} style={{ width: "100%", padding: "10px", border: errors.zip ? "1px solid #ef4444" : "1px solid #d1d5db", borderRadius: "6px", fontSize: "14px", boxSizing: "border-box" }} required />
                    {errors.zip && <div style={{ color: "#ef4444", fontSize: "11px", marginTop: "4px", fontWeight: "600" }}>{errors.zip}</div>}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: B2B RFQ Details */}
            <div style={{ background: "white", padding: "24px", border: "1px solid #e5e7eb", borderRadius: "8px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "800", color: "var(--primary)", borderBottom: "1px solid #f3f4f6", paddingBottom: "12px", marginBottom: "20px", textTransform: "uppercase" }}>
                3. B2B Quote Requirements
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div className="form-group">
                  <label htmlFor="gstin" style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "var(--primary)", textTransform: "uppercase", marginBottom: "6px" }}>
                    Company GSTIN <span style={{ fontSize: "11px", color: "var(--text-light)" }}>(Optional, 15 characters)</span>
                  </label>
                  <input type="text" id="gstin" name="gstin" placeholder="e.g. 27AAAAA0000A1Z5" value={formData.gstin} onChange={handleInputChange} style={{ width: "100%", padding: "10px", border: errors.gstin ? "1px solid #ef4444" : "1px solid #d1d5db", borderRadius: "6px", fontSize: "14px", boxSizing: "border-box" }} />
                  {errors.gstin ? (
                    <div style={{ color: "#ef4444", fontSize: "11px", marginTop: "4px", fontWeight: "600" }}>{errors.gstin}</div>
                  ) : (
                    <div style={{ fontSize: "11px", color: "var(--text-light)", marginTop: "4px" }}>Provide GSTIN to obtain business tax credit returns on purchase quotes.</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="timeline" style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "var(--primary)", textTransform: "uppercase", marginBottom: "6px" }}>Installation Timeline *</label>
                  <select id="timeline" name="timeline" value={formData.timeline} onChange={handleInputChange} style={{ width: "100%", padding: "10px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "14px", boxSizing: "border-box", background: "white" }} required>
                    <option value="ASAP">ASAP (Immediate Requirement)</option>
                    <option value="1-3 months">1 - 3 Months</option>
                    <option value="3-6 months">3 - 6 Months</option>
                    <option value="6+ months">6+ Months (Planning stage)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="application" style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "var(--primary)", textTransform: "uppercase", marginBottom: "6px" }}>Application Details / Specifications *</label>
                  <textarea id="application" name="application" rows="4" value={formData.application} onChange={handleInputChange} placeholder="Please specify your panel dimensions, ambient temperature requirements, estimated heat dissipation in Watts, installation environment dust/humidity constraints, or any custom specifications..." style={{ width: "100%", padding: "10px", border: errors.application ? "1px solid #ef4444" : "1px solid #d1d5db", borderRadius: "6px", fontSize: "14px", boxSizing: "border-box", resize: "none" }} required></textarea>
                  {errors.application && <div style={{ color: "#ef4444", fontSize: "11px", marginTop: "4px", fontWeight: "600" }}>{errors.application}</div>}
                </div>
              </div>
            </div>

          </div>

          {/* Right Side summary */}
          <div>
            <div style={{ background: "white", padding: "24px", border: "1px solid #e5e7eb", borderRadius: "8px", position: "sticky", top: "100px", display: "flex", flexDirection: "column", gap: "24px" }}>
              <div>
                <h3 style={{ fontSize: "14px", fontWeight: "800", color: "var(--primary)", textTransform: "uppercase", borderBottom: "1px solid #f3f4f6", paddingBottom: "12px", marginBottom: "16px" }}>
                  Items in RFQ Basket
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxHeight: "200px", overflowY: "auto" }}>
                  {cartItems.map((item) => (
                    <div key={item._id} style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                      <div style={{ maxWidth: "70%" }}>
                        <span style={{ fontWeight: "700", color: "var(--primary)", display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name || item.title}</span>
                        <span style={{ fontSize: "11px", color: "var(--text-light)" }}>Qty: {item.quantity}</span>
                      </div>
                      <span style={{ fontWeight: "600", textAlign: "right" }}>
                        {item.price ? `₹${(Number(item.price) * item.quantity).toLocaleString()}` : "Quote Required"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: "16px" }}>
                <h3 style={{ fontSize: "11px", fontWeight: "800", color: "#9ca3af", textTransform: "uppercase", marginBottom: "12px" }}>Quote Totals</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-light)" }}>
                    <span>Indicative Subtotal</span>
                    <span style={{ fontWeight: "600", color: "var(--primary)" }}>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-light)", paddingBottom: "12px", borderBottom: "1px solid #f3f4f6" }}>
                    <span>GST (18%)</span>
                    <span style={{ fontWeight: "600", color: "var(--primary)" }}>₹{tax.toLocaleString()}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingTop: "8px" }}>
                    <span style={{ fontSize: "14px", fontWeight: "800", color: "var(--primary)" }}>Total Indicative Amount</span>
                    <span style={{ fontSize: "18px", fontWeight: "900", color: "var(--primary)" }}>₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label htmlFor="notes" style={{ fontSize: "11px", fontWeight: "700", color: "var(--primary)", textTransform: "uppercase" }}>Order Notes / Freight Instructions (Optional)</label>
                <textarea id="notes" name="notes" rows="3" value={formData.notes} onChange={handleInputChange} placeholder="Include site constraints, custom paint RAL numbers, or freight gateway instructions..." style={{ width: "100%", padding: "8px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "13px", boxSizing: "border-box", resize: "none" }}></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
                style={{ width: "100%", border: "none", cursor: isSubmitting ? "not-allowed" : "pointer", padding: "14px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
              >
                {isSubmitting ? (
                  <>
                    <div style={{ width: "16px", height: "16px", border: "2px solid white", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }}></div>
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <span>Submit Request for Quote</span>
                )}
              </button>
            </div>
          </div>

        </form>
      </div>

      <style jsx global>{`
        @media (max-width: 1024px) {
          .checkout-grid-responsive {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 768px) {
          .form-cols-responsive {
            grid-template-columns: 1fr !important;
          }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
