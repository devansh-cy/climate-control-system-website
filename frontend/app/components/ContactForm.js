"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const company = formData.get("company");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const product = formData.get("product");
    const message = formData.get("message");

    const payload = {
      customerName: name,
      companyName: company || "Not Specified",
      email: email,
      phone: phone,
      productName: product || "General enquiry",
      message: message || "No message details provided.",
      quantityNeeded: 1,
      application: "Industrial Climate Control",
      budgetRange: "Negotiable",
      timeline: "Flexible"
    };

    try {
      const response = await fetch("http://localhost:5000/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus({
          type: "success",
          message: "Thank you! Your enquiry has been received by our engineering team."
        });
        e.target.reset();
      } else {
        throw new Error(result.message || "Failed to submit enquiry.");
      }
    } catch (err) {
      console.error("API submission error:", err);
      // Fallback message
      setStatus({
        type: "error",
        message: "Could not submit directly to server. Please call or email us directly!"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h3>Request a Quote</h3>
      {status.message && (
        <div className={`form-status ${status.type}`}>
          {status.message}
        </div>
      )}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" name="name" placeholder="Your name" required />
        </div>
        <div className="form-group">
          <label htmlFor="company">Company Name</label>
          <input type="text" id="company" name="company" placeholder="Your company" />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="email@company.com" required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" id="phone" name="phone" placeholder="+91 XXXXX XXXXX" required />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="product">Product of Interest</label>
        <select id="product" name="product">
          <option value="">Select a product category</option>
          <option>Panel Air Conditioner</option>
          <option>Water Chiller</option>
          <option>Oil Cooler / Hydraulic Oil Chiller</option>
          <option>Refrigerated Air Dryer</option>
          <option>Dehumidifier</option>
          <option>Rack AC / Fan Tray</option>
          <option>Custom / Other Requirement</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="message">Requirements / Specifications</label>
        <textarea
          id="message"
          name="message"
          placeholder="Describe your cooling requirements — capacity, application, quantity, any custom specs..."
          rows={4}
        />
      </div>
      <button type="submit" className="form-submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Enquiry →"}
      </button>
    </form>
  );
}

