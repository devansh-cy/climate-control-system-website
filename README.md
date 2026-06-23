# Climate Control System India (CCSI) - Integrated Website

This repository contains the integrated industrial B2B website for Climate Control System India (CCSI).

- **`/frontend`**: Premium Next.js 16 landing page with local Pune SEO, modern white theme, and interactive enquiry flow.
- **`/backend`**: Express.js server connected to MongoDB for handling products and submitting customer inquiries.

---

## 🚀 Quick Start (Running Locally)

### 1. Start the Backend Server
The backend handles database connections and API endpoints for enquiries/contacts. If no remote MongoDB is configured, it automatically starts a local in-memory Mongo database.

```bash
cd backend
npm install
npm run dev
# → API server runs on http://localhost:5000
```

### 2. Start the Frontend Dev Server
The frontend fetches dynamic data from the backend and handles forms.

```bash
cd frontend
npm install
npm run dev
# → Website runs on http://localhost:3000
```

---

## 🛠️ Integrated Endpoints
- **Product Enquiry**: Submitting the form on the frontend makes a `POST` request to `http://localhost:5000/api/inquiries`.
- **Products Catalog**: The backend includes a seeding script (`backend/seed.js`) that automatically populates standard catalog data.
