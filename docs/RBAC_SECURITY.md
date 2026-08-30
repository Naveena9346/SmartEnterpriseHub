# SmartEnterpriseHub — RBAC & Security Specification

This document details the Role-Based Access Control (RBAC), multi-tenant isolation, and data protection mechanisms enforced across SmartEnterpriseHub.

---

## 🔒 1. Role Hierarchy & Levels

```
SUPER_ADMIN (Level 100)
    │
    ├── ORG_ADMIN (Level 90)
    │     │
    │     ├── HR_MANAGER (Level 75)
    │     ├── PROJECT_MANAGER / SALES_MANAGER / ACCOUNTANT / INVENTORY_MANAGER (Level 70)
    │     │     │
    │     │     └── TEAM_MANAGER (Level 60)
    │     │           │
    │     │           └── EMPLOYEE (Level 30)
    │     │                 │
    │     │                 └── VIEWER (Level 10)
```

---

## 🛡 2. Multi-Tenant Data Isolation

Every domain model contains an explicit `orgId` constraint. The authentication middleware verifies `req.user.orgId` against all database queries, preventing cross-organization data leakage.

---

## 📝 3. Immutable System Audit Logging

Any state-modifying request (`POST`, `PUT`, `PATCH`, `DELETE`) is captured by the `auditLogger` middleware and stored with:
- Unique audit ID
- Organization ID & User ID
- Resource name & ID
- Action string (e.g. `CREATE_EMPLOYEE`, `PROCESS_APPROVAL`)
- Request payload JSON
- Client IP address & Timestamp
