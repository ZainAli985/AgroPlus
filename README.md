<div align="center">

<img src="https://img.shields.io/badge/version-1.0.0-111827?style=for-the-badge&labelColor=111827&color=4ade80" />
<img src="https://img.shields.io/badge/license-Proprietary-111827?style=for-the-badge&labelColor=111827&color=4ade80" />
<img src="https://img.shields.io/badge/status-Production-111827?style=for-the-badge&labelColor=111827&color=4ade80" />
<img src="https://img.shields.io/badge/stack-MERN-111827?style=for-the-badge&labelColor=111827&color=4ade80" />

<br /><br />

```
   █████╗  ██████╗ ██████╗  ██████╗     ██████╗ ██╗     ██╗   ██╗███████╗
  ██╔══██╗██╔════╝ ██╔══██╗██╔═══██╗    ██╔══██╗██║     ██║   ██║██╔════╝
  ███████║██║  ███╗██████╔╝██║   ██║    ██████╔╝██║     ██║   ██║███████╗
  ██╔══██║██║   ██║██╔══██╗██║   ██║    ██╔═══╝ ██║     ██║   ██║╚════██║
  ██║  ██║╚██████╔╝██║  ██║╚██████╔╝    ██║     ███████╗╚██████╔╝███████║
  ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝ ╚═════╝    ╚═╝     ╚══════╝ ╚═════╝ ╚══════╝
```

### **Rice Mill Management Platform**
*Complete ERP solution built for the Pakistani rice milling industry*

**by [ORCA TECH. AND VENTURES](https://www.my-agroplus.com)**

<br />

[🌾 Live Platform](https://www.my-agroplus.com) · [📧 Support](mailto:support@my-agroplus.com) · [📱 WhatsApp](https://wa.me/923001234567)

</div>

---

## 📖 Overview

**Agro Plus+** is a full-stack SaaS ERP platform purpose-built for rice mills in Pakistan. It handles the complete operational lifecycle — from procurement quotations and purchase invoicing to sales, weight bridging, double-entry bookkeeping, cheque management, and financial reporting — all under a multi-tenant architecture where each mill gets its own isolated MongoDB database.

The platform is subscription-based and managed through a private master portal. Mill admins log in with their CNIC, manage their own accounts, employees, and seasons, while the platform operator (ORCA TECH.) handles onboarding, billing, and support from the master dashboard.

---

## ✨ Feature Highlights

### 💼 Accounting & Finance
| Feature | Details |
|---|---|
| **Double-Entry Bookkeeping** | Every invoice auto-generates a balanced General Journal Entry (DR/CR) |
| **Chart of Accounts** | 18 account categories across Assets, Liabilities, Equity, Revenue, Expense |
| **Ledger & Trial Balance** | Full ledger by account or reference; real-time trial balance |
| **Balance Sheet & P&L** | Auto-generated from journal entries at any point in time |
| **Cashbook** | Daily cashbook with opening balance carry-forward per season |

### 🌾 Procurement & Sales
| Feature | Details |
|---|---|
| **Purchase Quotations** | Record partial delivery info before goods arrive; convert to invoice on arrival |
| **Purchase Invoices** | Full moisture adjustment, bag deduction, multi-rate rows, rent adjustment |
| **Sales Invoices** | Sutli/silai, bardana, brokery calculations with auto journal entries |
| **SR Continuity** | Quotations and invoices share a single sequential number series |

### ⚖️ Weight Bridge
- First/second weighing with driver adjustment
- Net weight auto-calculation (kg, Maund, Ton)
- Vehicle type + rate per trip

### 🏦 Cheque Book Management
- Create and manage multiple cheque books per bank account
- Issue cheques with payee, amount in words, branch details
- Status tracking: Pending → Cleared / Discarded
- Auto-reversal journal entries

### 📦 Product Catalogue
- Hardcoded catalogue of **323 rice products** (19 varieties × 17 type/subtype combinations)
- Supported types: Rice, Broken, Paddy, Polish, Phukar
- Activation creates a linked inventory account automatically

### 👷 Employee Management
- Full employee profiles with CNIC, role, and route-based access control
- Document uploads (CV, CNIC copy) via Cloudinary
- Auto-creates a Current Liabilities salary ledger account per employee

### 📅 Season Management
- Season-based data isolation: each season has its own cashbook and journal entries
- Activating a new season archives all operational data to a separate archive DB
- Account balances carry forward; Cash In Hand gets a configurable opening adjustment

### 🏢 Multi-Tenant Master Portal
- Approve/restrict/delete mills
- Dynamic package creation with allowed routes per package
- Payment recording, billing date management, scheduled reminder emails
- Analytics: revenue by category, overdue mills, 12-month trend charts

---

## 🛠️ Tech Stack

```
Frontend                    Backend                     Infrastructure
─────────────────────────   ─────────────────────────   ─────────────────────────
React 18 + Vite             Node.js + Express 5         MongoDB Atlas
React Router v6             Mongoose (multi-tenant)     Cloudinary (file storage)
DM Sans + DM Mono fonts     JWT Authentication          Resend (transactional email)
Google Translate API        Bcrypt password hashing     Railway (deployment)
PWA (installable)           Multer (file uploads)       Vercel / Static hosting
```

---

## 🗂️ Project Structure

```
agro-plus/
├── backend/
│   └── server/
│       ├── config/
│       │   ├── masterDB.js        # Master DB schemas (Mill, Package, Invoice)
│       │   └── millDB.js          # Per-mill DB schemas (all operational models)
│       ├── controllers/           # Route handlers
│       │   ├── auth.js
│       │   ├── accountController.js
│       │   ├── purchaseInvoiceController.js
│       │   ├── purchaseQuotationController.js
│       │   ├── salesInvoiceController.js
│       │   ├── productController.js
│       │   ├── profileController.js
│       │   ├── masterPortalController.js
│       │   ├── stockController.js
│       │   └── ...
│       ├── middlewares/
│       │   └── protect.js         # JWT auth + millId injection
│       ├── routes/
│       │   └── router.js          # All 80+ API routes
│       ├── utils/
│       │   ├── bankMeta.js        # 26 Pakistani bank metadata
│       │   ├── cloudinaryUpload.js
│       │   └── emailService.js    # Resend integration
│       └── server.js              # Express app + static serving
│
├── src/
│   ├── components/
│   │   ├── accounts/              # CreateAccount, ViewAccounts, AccountsPage
│   │   ├── invoices/              # PurchaseInvoice, SalesInvoice, PurchaseQuotation
│   │   ├── reports/               # BalanceSheet, TrialBalance, IncomeStatement
│   │   ├── Cashbook/              # CashbookForm, CashbookReport
│   │   ├── chequebook/            # CreateChequeBook, CreateChequeEntry, ViewChequeBooks
│   │   ├── Products/              # ProductsList
│   │   ├── employees/             # CreateEmployee, ViewEmployees
│   │   ├── WeightBridge/          # WeightBridge form + invoices
│   │   ├── stock/                 # StockManagement ledger
│   │   ├── dashboard/             # Dashboard with KPIs
│   │   ├── profile/               # AdminProfile (5 tabs)
│   │   ├── master/                # MasterPortal (admin-only)
│   │   └── layout/                # SidebarLayout, FloatingLauncher
│   ├── utils/
│   │   ├── authFetch.js           # Authenticated fetch wrapper
│   │   └── ProtectedRoute.jsx
│   └── App.jsx
│
├── public/
│   ├── 1.png – 26.png             # Pakistani bank logos
│   └── logo.png
│
└── dist/                          # Vite build output (served by Express)
```

---

## 🔐 Authentication Model

```
Login via CNIC + Password
        │
        ├─▶ MASTER_CNIC match → Master Portal (full system access)
        │
        ├─▶ Mill adminCnic match → Mill Admin (all routes)
        │         └─ Checks approvalStatus: pending | approved | restricted
        │
        └─▶ Employee CNIC search across all active mills
                  └─ Returns allowedRoutes[] for route-based access control
```

---

## 🗄️ Database Architecture

Agro Plus+ uses **MongoDB multi-tenancy** — one master database for platform management and one isolated database per mill:

```
MongoDB Atlas Cluster
├── master                    ← Mills, Packages, Invoices, GlobalRequests
├── mill_ahmed-mills_a1b2     ← Accounts, Products, Invoices, Journal Entries…
├── mill_ali-rice_c3d4        ← Same schema, completely isolated data
├── mill_ahmed-mills_a1b2_archive  ← Season archive collections
└── ...
```

Each mill's DB is accessed via `mongoose.connection.useDb(millId, { useCache: true })` — no cross-mill data leakage is possible at the query level.

---

## ⚙️ Environment Variables

Create `backend/server/.env`:

```env
# Database
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/master

# Auth
JWT_SECRET=<your-256-bit-secret>

# Master Admin
MASTER_CNIC=0000000000000
MASTER_PASSWORD=<strong-password>

# Email (Resend)
RESEND_API_KEY=re_<your-key>
FROM_EMAIL=support@your-domain.com

# App
APP_URL=https://your-domain.com
PORT=3000

# Cloudinary
CLOUDINARY_CLOUD_NAME=<name>
CLOUDINARY_API_KEY=<key>
CLOUDINARY_API_SECRET=<secret>

# WhatsApp (shown in billing reminder emails)
WHATSAPP_1=+92XXXXXXXXXX
WHATSAPP_2=+92XXXXXXXXXX
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Cloudinary account
- Resend account (for emails)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-org/agro-plus.git
cd agro-plus

# 2. Install frontend dependencies
npm install

# 3. Install backend dependencies
cd backend/server
npm install
cd ../..

# 4. Configure environment
cp backend/server/.env.example backend/server/.env
# Edit .env with your credentials

# 5. Build the frontend
npm run build

# 6. Start the server
cd backend/server
node server.js
# or for development:
nodemon server.js
```

Visit `http://localhost:3000`

### First-Time Setup

1. Log in with your `MASTER_CNIC` and `MASTER_PASSWORD` at `/master`
2. Create a Package (with allowed routes and pricing)
3. Register a Mill or create one from the master portal
4. Approve the mill → it receives a welcome email with credentials
5. Log in as mill admin → go to **Products** → click **Re-seed Catalogue**
6. Go to **Profile → Seasons** → create and activate the first season
7. Go to **Profile → Mill** → add vehicle types and bag types

---

## 📊 Key Business Logic

### Invoice SR Numbering
Purchase Quotations and Purchase Invoices share a single SR sequence. The next SR is computed as `max(PurchaseInvoice.sr, PurchaseQuotation.sr) + 1`, ensuring no gaps or conflicts when quotations are converted to invoices.

### Moisture Adjustment Formula
```
weightCut = (moisturePercent - baseMoisture) × weightCutPerPercent × quantity
```
Can be overridden per invoice with manual entry.

### Account Balance Rules
- `totalDebit` / `totalCredit` on Account documents = **opening balance only**
- Running balance is computed dynamically from journal entries
- Season activation rolls balances forward; Cash In Hand gets a configurable opening adjustment

### Season Archiving
Activating a new season copies all `GeneralJournalEntry`, `PurchaseInvoice`, `SalesInvoice`, `Cashbook`, `WeightBridge`, and an `Account` snapshot into a separate `{millId}_archive` database with season-prefixed collection names.

---

## 🛣️ API Reference (key endpoints)

```
POST   /api/login
GET    /api/profile
PUT    /api/profile/logo
PUT    /api/profile/profile-pic
POST   /api/create-account
GET    /api/accounts
POST   /api/products/seed
PATCH  /api/products/:id/activate
GET    /api/purchase-quotation/next-sr     ← must be before /:id in router
POST   /api/purchase-quotation/create
GET    /api/purchase-invoice/next-sr
POST   /api/purchase-invoice/create
POST   /api/sales-invoice/create
GET    /api/stock/entries
GET    /api/reports/balance-sheet
GET    /api/reports/trial-balance
POST   /api/profile/seasons/:id/activate
GET    /api/master/mills                   ← protectMaster middleware
POST   /api/master/mills/:millId/approve
```

---

## 🎨 Design System

| Token | Value |
|---|---|
| **Body Font** | DM Sans |
| **Numbers/Code** | DM Mono |
| **Report Headings** | Lora / Cormorant Garamond |
| **Primary** | `#111827` |
| **Input Border** | `1px solid #d1d5db` → `#6b7280` on focus |
| **Focus Ring** | `2px rgba(107,114,128,.12)` |
| **Debit / Positive** | `#15803d` green |
| **Credit / Negative** | `#dc2626` red |
| **Card Border Radius** | `8px` |
| **Header Strip** | `#f9fafb` |

---

## 📱 PWA Support

Agro Plus+ is a Progressive Web App. Users can install it directly from the browser on both mobile and desktop. The install prompt is captured at module level in `SidebarLayout.jsx` to avoid losing the `beforeinstallprompt` event.

---

## 🌐 Localization

Three languages supported via Google Translate integration (cookie + reload strategy to avoid React DOM conflicts):

| Language | Code |
|---|---|
| English | `en` |
| اردو | `ur` |
| हिन्दी | `hi` |

---

## 📄 License

This software is proprietary and confidential.
© 2025 ORCA TECH. AND VENTURES. All rights reserved.

Unauthorized copying, distribution, or use of this software, via any medium, is strictly prohibited.

---

<div align="center">

**Built with ❤️ by ORCA TECH. AND VENTURES**

`MongoDB` · `Express` · `React` · `Node.js` · `Cloudinary` · `Resend` · `Railway`

*Empowering Pakistan's rice industry — one mill at a time.*

</div>
