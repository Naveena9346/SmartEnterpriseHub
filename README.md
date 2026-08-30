# SmartEnterpriseHub — Large-Scale Enterprise Platform

SmartEnterpriseHub is an enterprise-grade Management Platform engineered to unify corporate operations, HR & Payroll, Project Management, CRM & Sales, Supply Chain & Inventory, Financial Accounting, Document & Workflow Management, Audit Tracking, and Business Analytics into a centralized, real-world platform.

---

## 🌟 Key Features

### 🏢 Corporate & Organization Management
- **Multi-Tenant / Multi-Company Support**: Manage organizations, subsidiary companies, regional branches.
- **Hierarchical Structure**: Department management, team allocation, position definitions, and org charts.

### 👥 Human Resource & Payroll Management
- **Employee Lifecycle Management**: Employee profiles, digital onboarding, contract tracking, job classifications.
- **Attendance & Timekeeping**: Clock-in/clock-out logs, automated attendance records, overtime calculation.
- **Leave Management**: Leave requests, multi-level approval workflows, leave balance tracking, holiday calendar.
- **Payroll Processing**: Automated salary calculation, tax deductions, bonuses, pay stub generation, payment logs.

### 📋 Project & Task Management
- **Project Workspaces**: Budget tracking, timelines, milestone planning, health status metrics.
- **Kanban & Task Boards**: Task assignment, priority flags, dependencies, subtask checklists.
- **Time Tracking & Worklogs**: Log billable/non-billable hours per task, time utilization reports.

### 🤝 Customer Relationship Management (CRM)
- **Customer & Contact Directory**: Client profiles, communication histories, tag categorizations.
- **Sales Funnel & Pipelines**: Lead capture, deal tracking through dynamic sales stages, probability scoring.
- **Activities & Quotations**: Meeting notes, call logs, quotation management, conversion metrics.

### 📦 Supply Chain & Inventory Management
- **Product Catalog**: SKU management, pricing tiers, reorder point alerts, product categories.
- **Multi-Warehouse Stock**: Real-time stock counts, inter-warehouse transfers, stock adjustment logs.
- **Supplier & Purchase Orders**: Supplier directory, purchase requisition workflows, PO receiving workflows.

### 💰 Finance & Accounting Management
- **General Ledger & Expense Tracking**: Categorized expense tracking, receipt uploads, budget enforcement.
- **Invoicing & Billing**: Multi-line item invoice creation, tax rate rules, payment status, PDF generation.
- **Financial Analytics**: P&L metrics, revenue forecasting, aging receivables summaries.

### 📁 Document & Workflow Engine
- **Enterprise Document Repository**: Folder trees, file metadata, permissions, document versioning.
- **Multi-Stage Approval Engine**: Configurable approval chains (sequential/parallel) for Expenses, Leaves, POs, and Custom Requests.

### 🔒 Security, Audit & Analytics
- **Role-Based Access Control (RBAC)**: 10 distinct roles (Super Admin, Org Admin, HR Manager, Proj Manager, Team Manager, Employee, Sales Manager, Accountant, Inventory Manager, Viewer).
- **Comprehensive Audit Logs**: Immutably record all user actions, data modifications, security events, and IP addresses.
- **Interactive BI Dashboards**: Executive metrics, department charts, real-time KPI scorecards.

---

## 🏗 System Architecture

SmartEnterpriseHub follows a **modular clean architecture pattern**:

```
SmartEnterpriseHub/
├── backend/                  # Node.js + TypeScript REST API Server
│   ├── src/
│   │   ├── config/           # App & database configurations
│   │   ├── middleware/       # Auth, RBAC, Validation, Error Handling, Audit Log
│   │   ├── modules/          # 11 Domain modules (Controllers, Services, Repositories, DTOs)
│   │   ├── database/         # Prisma schema, migrations, seeders
│   │   ├── utils/            # JWT, Logger, Cryptography, Helpers
│   │   └── server.ts         # Application entry point
│   └── tests/                # Automated test suites (Unit, Integration, API, RBAC)
│
├── frontend/                 # React 18 + TypeScript + Vite + Tailwind CSS
│   ├── src/
│   │   ├── assets/           # Static media assets
│   │   ├── components/       # Reusable UI component library (Tables, Modals, Forms, Charts)
│   │   ├── context/          # Auth Context, Notification Context, UI Theme Context
│   │   ├── hooks/            # Custom React hooks (Data fetching, permissions, state)
│   │   ├── pages/            # View components for 11 Domain modules
│   │   ├── services/         # API integration services (Axios client)
│   │   ├── types/            # Shared TypeScript interfaces & types
│   │   └── App.tsx           # Router & Layout structure
│
└── docs/                     # Comprehensive Architecture, DB, API & Security Documentation
```

---

## ⚡ Quick Start & Setup Instructions

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **NPM**: v9.0.0 or higher
- **PostgreSQL**: v14.0 or higher (or SQLite/In-Memory driver for testing)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/<your-username>/SmartEnterpriseHub.git
   cd SmartEnterpriseHub
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   cmd /c "npm install"
   cp .env.example .env
   cmd /c "npm run db:seed"  # Seeds default roles, admin user, and sample data
   cmd /c "npm run dev"      # Runs server on http://localhost:5000
   ```

3. **Frontend Setup**:
   ```bash
   cd ../frontend
   cmd /c "npm install"
   cmd /c "npm run dev"      # Runs client on http://localhost:3000
   ```

4. **Running Automated Tests**:
   ```bash
   cd ../backend
   cmd /c "npm run test"
   ```

---

## 🧪 Testing Suite Coverage

The project includes **automated test suites** covering core enterprise functionalities:
1. **Auth & Identity**: JWT generation, token refresh, password hashing, invalid credentials rejection.
2. **Employee & HR**: Employee creation, contract updates, attendance log calculations, leave deductions.
3. **Projects & Tasks**: Project creation, Kanban stage transitions, task assignment, worklog aggregations.
4. **Workflow Approval Engine**: Multi-step sequential approval state transitions, rejection branching.
5. **RBAC Authorization**: Endpoint authorization enforcement across all 10 user roles.

---

## 📄 License

This project is licensed under the MIT License.
