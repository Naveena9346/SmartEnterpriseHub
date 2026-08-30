# SmartEnterpriseHub — REST API Documentation

All API endpoints follow the standard base URL format: `/api/v1` and require JSON payload format (`Content-Type: application/json`).

---

## 🔐 1. Authentication & Security Endpoints

### `POST /api/v1/auth/login`
Authenticates a user with email and password, returning JWT pair tokens.
- **Request Body**:
  ```json
  {
    "email": "admin@smartenterprisehub.com",
    "password": "Admin@123456"
  }
  ```
- **Response envelope (200 OK)**:
  ```json
  {
    "success": true,
    "message": "User logged in successfully",
    "data": {
      "user": {
        "id": "usr-admin",
        "email": "admin@smartenterprisehub.com",
        "role": "SUPER_ADMIN",
        "orgId": "org-global-1"
      },
      "accessToken": "<JWT_TOKEN>",
      "refreshToken": "<REFRESH_TOKEN>"
    }
  }
  ```

### `POST /api/v1/auth/register`
Registers a new user account within an organization.
- **Request Body**:
  ```json
  {
    "email": "user@enterprise.com",
    "password": "SecurePassword123",
    "firstName": "Jane",
    "lastName": "Doe",
    "role": "EMPLOYEE"
  }
  ```

---

## 👥 2. Employee & HR Management Endpoints

### `GET /api/v1/employees`
Lists employees with optional search query filtering.
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Query Params**: `?search=John&deptId=dept-eng`

### `POST /api/v1/employees`
Creates a new employee profile and user account.
- **Required Roles**: `SUPER_ADMIN`, `ORG_ADMIN`, `HR_MANAGER`

---

## 📋 3. Project & Task Endpoints

### `GET /api/v1/projects`
Retrieves enterprise projects with status, task progress percentage, budget metrics.

### `POST /api/v1/projects`
Creates a new enterprise project workspace.
- **Required Roles**: `SUPER_ADMIN`, `ORG_ADMIN`, `PROJECT_MANAGER`

### `GET /api/v1/tasks/my-tasks`
Fetches assigned tasks for the authenticated user for Kanban view rendering.

### `PATCH /api/v1/tasks/:id/status`
Updates task status state (`TODO`, `IN_PROGRESS`, `IN_REVIEW`, `DONE`).

---

## 🔄 4. Multi-Step Workflow & Approval Endpoints

### `GET /api/v1/workflows/approvals`
Lists approval requests where the authenticated user's role is eligible to approve/reject.

### `POST /api/v1/workflows/approvals/:requestId/action`
Executes an approval or rejection step in the workflow state machine.

---

## 📊 5. Analytics & BI Endpoints

### `GET /api/v1/analytics/dashboard`
Fetches consolidated executive metrics (employees, active projects, pending tasks, financials, attendance stats, audit stream).
