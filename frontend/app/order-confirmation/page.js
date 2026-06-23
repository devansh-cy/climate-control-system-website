"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";

function RFQConfirmationContent() {
  const searchParams = useSearchParams();
  const rfqId = searchParams.get("id");
  const [rfq, setRfq] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!rfqId) return;
    async function fetchRfq() {
      try {
        const res = await fetch(`http://localhost:5001/api/orders/${rfqId}`);
        if (res.ok) {
          const json = await res.json();
          if (json.success) {
            setRfq(json.data);
          }
        }
      } catch (error) {
        console.error("Error fetching RFQ:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRfq();
  }, [rfqId]);

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <div style={{ width: "32px", height: "32px", border: "3px solid var(--primary)", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }}></div>
        <p style={{ marginTop: "12px", fontSize: "14px", fontWeight: "600", color: "var(--primary)" }}>Retrieving RFQ Details...</p>
        <style jsx>{`
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  if (!rfq) {
    return (
      <>
        <Navbar />
        <div style={{ maxWidth: "600px", margin: "140px auto 60px", padding: "0 20px", textAlign: "center" }}>
          <h2 style={{ color: "#ef4444" }}>RFQ Reference Not Found</h2>
          <p style={{ color: "var(--text-light)", marginTop: "12px" }}>We couldn't retrieve the details for this RFQ reference. Please check your network or contact support.</p>
          <a href="/" className="btn-primary" style={{ textDecoration: "none", display: "inline-block", marginTop: "24px" }}>
            Return to Homepage
          </a>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="no-print">
        <Navbar />
      </div>

      <div style={{ maxWidth: "800px", margin: "100px auto 60px", padding: "0 20px" }} className="confirmation-container">
        
        {/* Success Header Banner */}
        <div style={{ background: "#ecfdf5", border: "1px solid #10b981", borderRadius: "8px", padding: "24px", marginBottom: "32px", display: "flex", alignItems: "flex-start", gap: "16px" }} className="no-print">
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#10b981", color: "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "16px", fontWeight: "bold" }}>✓</div>
          <div>
            <h1 style={{ fontSize: "20px", fontWeight: "800", color: "#065f46", margin: "0 0 6px 0" }}>RFQ Submitted Successfully!</h1>
            <p style={{ fontSize: "14px", color: "#047857", margin: 0, lineHeight: "1.5" }}>
              Thank you for choosing Climate Control System India. Your RFQ has been logged. Our engineering sales office at <strong>Bhosari, Pune</strong> is reviewing your technical specifications and will compile an official commercial quote within 24 hours.
            </p>
          </div>
        </div>

        {/* Printable RFQ Document */}
        <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "40px", boxSizing: "border-box" }} className="print-document">
          
          {/* Header Info */}
          <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "2px solid #f3f4f6", paddingBottom: "24px", marginBottom: "24px" }} className="doc-header">
            <div>
              <div style={{ fontSize: "18px", fontWeight: "900", color: "var(--primary)" }}>Climate Control System India</div>
              <div style={{ fontSize: "12px", color: "var(--text-light)", marginTop: "4px" }}>
                Plot No. X, Industrial Block, Bhosari MIDC,<br />
                Pune, Maharashtra - 411026<br />
                Email: info@climatecontrolsystemindia.com
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <h2 style={{ fontSize: "14px", fontWeight: "800", color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>REQUEST FOR QUOTATION REFERENCE</h2>
              <div style={{ fontSize: "15px", fontWeight: "800", color: "var(--accent)", marginTop: "6px" }}>{rfq.orderNumber}</div>
              <div style={{ fontSize: "12px", color: "var(--text-light)", marginTop: "4px" }}>Date: {new Date(rfq.createdAt).toLocaleDateString()}</div>
            </div>
          </div>

          {/* Business & Technical Details Side-by-Side */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "32px" }} className="doc-grid">
            <div style={{ background: "#f9fafb", padding: "16px", borderRadius: "6px", border: "1px solid #f3f4f6" }}>
              <h4 style={{ fontSize: "11px", fontWeight: "800", color: "#9ca3af", textTransform: "uppercase", margin: "0 0 10px 0" }}>Business & Contact Details</h4>
              <div style={{ fontSize: "13px", color: "var(--primary)", display: "flex", flexDirection: "column", gap: "6px" }}>
                <div><strong>Client Person:</strong> {rfq.customer.name}</div>
                <div><strong>Company:</strong> {rfq.customer.company}</div>
                <div><strong>GSTIN:</strong> <span style={{ fontFamily: "monospace", fontWeight: "700" }}>{rfq.gstin || "Not Provided"}</span></div>
                <div><strong>Email:</strong> {rfq.customer.email}</div>
                <div><strong>Phone:</strong> {rfq.customer.phone}</div>
              </div>
            </div>

            <div style={{ background: "#f9fafb", padding: "16px", borderRadius: "6px", border: "1px solid #f3f4f6" }}>
              <h4 style={{ fontSize: "11px", fontWeight: "800", color: "#9ca3af", textTransform: "uppercase", margin: "0 0 10px 0" }}>Project Details</h4>
              <div style={{ fontSize: "13px", color: "var(--primary)", display: "flex", flexDirection: "column", gap: "6px" }}>
                <div><strong>Required Timeline:</strong> <span style={{ fontWeight: "700", color: "var(--accent)" }}>{rfq.timeline}</span></div>
                <div><strong>Site Coordinates:</strong> {rfq.shippingAddress.street}, {rfq.shippingAddress.city}, {rfq.shippingAddress.state} - {rfq.shippingAddress.zip}</div>
                {rfq.notes && <div><strong>RFQ Notes:</strong> {rfq.notes}</div>}
              </div>
            </div>
          </div>

          {/* Technical Specs Large Box */}
          <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", padding: "20px", borderRadius: "6px", marginBottom: "32px", fontSize: "13px" }}>
            <h4 style={{ fontSize: "11px", fontWeight: "800", color: "#1e3a8a", textTransform: "uppercase", margin: "0 0 8px 0" }}>Cooling Application & Environmental Specifications</h4>
            <p style={{ color: "#1e3a8a", margin: 0, whiteSpace: "pre-wrap", lineHeight: "1.5" }}>{rfq.application}</p>
          </div>

          {/* Items Table */}
          <div style={{ marginBottom: "32px" }}>
            <h4 style={{ fontSize: "11px", fontWeight: "800", color: "#9ca3af", textTransform: "uppercase", margin: "0 0 12px 0" }}>Requested Cooling Systems</h4>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #e5e7eb", color: "var(--primary)" }}>
                  <th style={{ padding: "8px 0", fontWeight: "800" }}>System Model / Description</th>
                  <th style={{ padding: "8px 0", textAlign: "center", fontWeight: "800" }}>Quantity</th>
                  <th style={{ padding: "8px 0", textAlign: "right", fontWeight: "800" }}>Indicative Price</th>
                  <th style={{ padding: "8px 0", textAlign: "right", fontWeight: "800" }}>Total Indicative</th>
                </tr>
              </thead>
              <tbody>
                {rfq.products.map((item) => (
                  <tr key={item._id} style={{ borderBottom: "1px solid #f3f4f6", color: "var(--primary)" }}>
                    <td style={{ padding: "12px 0", fontWeight: "600" }}>{item.productName}</td>
                    <td style={{ padding: "12px 0", textAlign: "center" }}>{item.quantity}</td>
                    <td style={{ padding: "12px 0", textAlign: "right" }}>{item.price ? `₹${item.price.toLocaleString()}` : "Quote Required"}</td>
                    <td style={{ padding: "12px 0", textAlign: "right", fontWeight: "700" }}>{item.price ? `₹${(item.price * item.quantity).toLocaleString()}` : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pricing Totals */}
          <div style={{ display: "flex", justifyContent: "flex-end", borderTop: "2px solid #f3f4f6", paddingTop: "20px" }}>
            <div style={{ width: "250px", fontSize: "13px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", color: "var(--text-light)" }}>
                <span>Indicative Subtotal:</span>
                <span style={{ fontWeight: "600" }}>₹{rfq.subtotalAmount.toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", color: "var(--text-light)" }}>
                <span>Estimated GST (18%):</span>
                <span style={{ fontWeight: "600" }}>₹{rfq.taxAmount.toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "800", fontSize: "15px", borderTop: "1px solid #f3f4f6", paddingTop: "8px", color: "var(--primary)" }}>
                <span>Indicative Total:</span>
                <span>₹{rfq.totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Footer Notice */}
          <div style={{ borderTop: "1px solid #f3f4f6", marginTop: "40px", paddingTop: "20px", fontSize: "11px", color: "var(--text-light)", textAlign: "center", lineHeight: "1.5" }}>
            This is an official Request for Quotation reference generated by Climate Control System India.<br />
            Our engineering team will contact you at your business credentials to finalize shipment, site constraints, and custom payment milestones.
          </div>

        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "32px" }} className="no-print">
          <button onClick={() => window.print()} className="btn-primary" style={{ padding: "12px 28px" }}>
            🖨️ Print RFQ Summary
          </button>
          <a href="/" className="btn-outline" style={{ padding: "12px 28px", textDecoration: "none", display: "inline-block" }}>
            Back to Home
          </a>
        </div>

      </div>

      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          .no-print {
            display: none !important;
          }
          .confirmation-container {
            margin: 0 !important;
            padding: 0 !important;
            max-width: 100% !important;
          }
          .print-document {
            border: none !important;
            padding: 0 !important;
          }
        }
        @media (max-width: 768px) {
          .doc-grid {
            grid-template-columns: 1fr !important;
          }
          .doc-header {
            flex-direction: column !important;
            gap: 16px;
            text-align: left !important;
          }
          .doc-header > div {
            text-align: left !important;
          }
        }
      `}</style>
    </>
  );
}

export default function RFQConfirmationPage() {
  return (
    <Suspense fallback={<div style={{ padding: "40px", textAlign: "center" }}>Loading RFQ confirmation details...</div>}>
      <RFQConfirmationContent />
    </Suspense>
  );
}
