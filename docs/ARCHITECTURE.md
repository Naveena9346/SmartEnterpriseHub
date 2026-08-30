# SmartEnterpriseHub — Architecture Documentation

SmartEnterpriseHub is architected to meet enterprise standards of scalability, maintainability, modularity, security, and performance.

---

## 🏛 1. High-Level Architecture Pattern

The system employs a **Decoupled Layered Architecture (N-Tier)** with domain-driven modularity.

```
                           +------------------------+
                           |  Client Web Interface  |
                           |  React 18 / TypeScript |
                           +------------------------+
                                       |
                                       | HTTPS / JSON REST API
                                       v
                           +------------------------+
                           |   API Gateway & Auth   |
                           |   Express + Middleware |
                           +------------------------+
                                       |
           +---------------------------+---------------------------+
           |                           |                           |
           v                           v                           v
+--------------------+   +--------------------+   +--------------------+
| Auth & Security    |   | HR & Payroll       |   | Project & Tasks    |
| Module             |   | Module             |   | Module             |
+--------------------+   +--------------------+   +--------------------+
| CRM & Sales        |   | Supply & Inventory |   | Finance & Expenses |
| Module             |   | Module             |   | Module             |
+--------------------+   +--------------------+   +--------------------+
| Document Repository|   | Workflow Approvals |   | Analytics & BI     |
| Module             |   | Module             |   | Module             |
+--------------------+   +--------------------+   +--------------------+
           |                           |                           |
           +---------------------------+---------------------------+
                                       |
                                       v
                           +------------------------+
                           |    Data & Cache Layer  |
                           |   PostgreSQL / SQLite  |
                           +------------------------+
```

---

## 🛠 2. Domain Module Isolation

Each domain module in the backend contains:
1. **Controller Layer (`*.controller.ts`)**: Handles HTTP request parsing, status codes, route mapping, and response serialization.
2. **Service Layer (`*.service.ts`)**: Contains core business rules, transaction orchestration, state machines, and calculations.
3. **Repository / Data Access (`*.repository.ts`)**: Executes ORM queries (Prisma/TypeORM/SQL) with strongly-typed interfaces.
4. **DTO & Validation (`*.dto.ts`)**: Defines Zod validation schemas for input sanitization.
5. **Types & Interfaces (`*.types.ts`)**: Domain models and enum definitions.

---

## 🔐 3. Security Infrastructure

1. **Authentication**: State-less JWT (JSON Web Tokens) with asymmetric signing or secret key verification. Short-lived Access Tokens (15 min) + Refresh Tokens (7 days).
2. **Authorization**: Granular Role-Based Access Control (RBAC) & Attribute-Based Access Control (ABAC) guards injected at middleware level.
3. **Data Sanitization**: Defensive input validation via Zod schemas, escaping SQL queries against injection, and XSS sanitization on rich inputs.
4. **Audit Engine**: Immutable audit logs capturing user ID, org ID, action type, resource modified, previous state vs new state, and client IP address.

---

## 📊 4. Real-Time & Event Dispatching

- **Internal Event Emitter**: Asynchronous events (e.g. `leave.created`, `expense.submitted`, `invoice.paid`) trigger notification dispatches and workflow state progression.
- **Audit Dispatcher**: Listens to system events and asynchronously records detailed audit logs without blocking the primary request loop.
