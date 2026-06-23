"use client";

export default function ContactForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your enquiry! We will get back to you within 24 hours.");
    e.target.reset();
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h3>Request a Quote</h3>
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
      <button type="submit" className="form-submit">
        Submit Enquiry →
      </button>
    </form>
  );
}
