# SmartEnterpriseHub — Database Design Specification

The database is built on PostgreSQL (with support for SQLite / In-Memory testing) containing 35+ core relational entities structured across 11 enterprise domains.

---

## 📐 Entity Relationship Diagram Overview

```
[Organizations] 1 --- * [Companies] 1 --- * [Departments] 1 --- * [Teams]
       |                      |                    |                  |
       *                      *                    *                  *
    [Users] <--------------------------------- [Employees] <----- [Attendances]
       |                                           |              [LeaveRequests]
       |-- * [Sessions]                            |              [Payrolls]
       |-- * [AuditLogs]                           |
       |                                           v
       |---------------------------------> [Projects] 1 --- * [Tasks] --- * [Subtasks]
       |                                       |                |
       v                                       *                *
  [Workflows]                              [Milestones]     [Worklogs]
       |
       v
 [ApprovalRequests] --- * [ApprovalSteps]

  [Customers] 1 --- * [Leads] 1 --- * [Deals]
       |
       v
  [Invoices] 1 --- * [InvoiceItems]

  [Suppliers] 1 --- * [Products] 1 --- * [Inventories] (Warehouses)
       |
       v
  [PurchaseOrders] 1 --- * [PurchaseOrderItems]

  [Expenses] (submitted by Employees, linked to Approvals & Budget)

  [Folders] 1 --- * [Documents]
```

---

## 🗄 Core Table Specifications

### 1. Identity & Corporate Structure
- **`organizations`**: `id`, `name`, `code`, `domain`, `settings_json`, `created_at`, `updated_at`.
- **`companies`**: `id`, `org_id`, `name`, `tax_id`, `email`, `phone`, `address`, `created_at`.
- **`departments`**: `id`, `company_id`, `name`, `code`, `manager_id`, `budget`, `created_at`.
- **`teams`**: `id`, `department_id`, `name`, `lead_id`, `created_at`.
- **`users`**: `id`, `org_id`, `email`, `password_hash`, `role`, `is_active`, `last_login`, `created_at`.
- **`user_profiles`**: `id`, `user_id`, `first_name`, `last_name`, `phone`, `avatar_url`, `bio`, `timezone`.

### 2. HR, Timekeeping & Payroll
- **`employees`**: `id`, `user_id`, `company_id`, `dept_id`, `team_id`, `employee_code`, `designation`, `employment_type`, `hire_date`, `salary_amount`, `status`.
- **`attendances`**: `id`, `employee_id`, `date`, `check_in`, `check_out`, `total_hours`, `status` (PRESENT, LATE, ABSENT, HALF_DAY).
- **`leave_requests`**: `id`, `employee_id`, `leave_type`, `start_date`, `end_date`, `days_count`, `reason`, `status` (PENDING, APPROVED, REJECTED), `approved_by`.
- **`payrolls`**: `id`, `employee_id`, `pay_period_month`, `pay_period_year`, `base_salary`, `bonuses`, `deductions`, `tax_amount`, `net_salary`, `status` (DRAFT, PROCESSED, PAID).

### 3. Projects & Execution
- **`projects`**: `id`, `org_id`, `dept_id`, `name`, `code`, `description`, `status`, `priority`, `start_date`, `end_date`, `budget`, `manager_id`.
- **`project_members`**: `id`, `project_id`, `user_id`, `role_in_project`, `allocated_hours`.
- **`milestones`**: `id`, `project_id`, `title`, `due_date`, `status`.
- **`tasks`**: `id`, `project_id`, `milestone_id`, `title`, `description`, `assignee_id`, `reporter_id`, `status` (BACKLOG, TODO, IN_PROGRESS, REVIEW, DONE), `priority`, `estimated_hours`.
- **`subtasks`**: `id`, `task_id`, `title`, `is_completed`.
- **`worklogs`**: `id`, `task_id`, `user_id`, `log_date`, `hours`, `description`.

### 4. CRM & Sales
- **`customers`**: `id`, `org_id`, `company_name`, `contact_name`, `email`, `phone`, `industry`, `status`.
- **`leads`**: `id`, `customer_id`, `title`, `estimated_value`, `source`, `stage` (NEW, CONTACTED, QUALIFIED, PROPOSAL, CLOSED_WON, CLOSED_LOST), `assigned_to`.
- **`deals`**: `id`, `lead_id`, `title`, `deal_amount`, `probability`, `expected_close_date`, `status`.

### 5. Supply Chain & Inventory
- **`products`**: `id`, `org_id`, `sku`, `name`, `description`, `category`, `unit_price`, `cost_price`, `reorder_level`.
- **`warehouses`**: `id`, `org_id`, `name`, `location`, `manager_id`.
- **`inventories`**: `id`, `product_id`, `warehouse_id`, `quantity_on_hand`, `quantity_reserved`.
- **`suppliers`**: `id`, `org_id`, `company_name`, `contact_name`, `email`, `phone`.
- **`purchase_orders`**: `id`, `org_id`, `supplier_id`, `po_number`, `order_date`, `expected_date`, `total_amount`, `status`.
- **`purchase_order_items`**: `id`, `po_id`, `product_id`, `quantity`, `unit_cost`, `total_cost`.

### 6. Finance & Billing
- **`invoices`**: `id`, `org_id`, `customer_id`, `invoice_number`, `issue_date`, `due_date`, `subtotal`, `tax_total`, `discount_total`, `grand_total`, `status` (DRAFT, SENT, PAID, OVERDUE).
- **`invoice_items`**: `id`, `invoice_id`, `description`, `quantity`, `unit_price`, `amount`.
- **`expenses`**: `id`, `org_id`, `employee_id`, `category`, `amount`, `expense_date`, `description`, `receipt_url`, `status`.

### 7. Workflow Engine & Governance
- **`workflows`**: `id`, `org_id`, `name`, `module_type`, `description`, `is_active`.
- **`approval_requests`**: `id`, `workflow_id`, `requester_id`, `entity_type`, `entity_id`, `current_step`, `status`.
- **`approval_steps`**: `id`, `approval_request_id`, `step_number`, `approver_role`, `approver_user_id`, `action` (PENDING, APPROVED, REJECTED), `comments`, `acted_at`.
- **`documents`**: `id`, `org_id`, `folder_id`, `title`, `file_name`, `file_size`, `mime_type`, `storage_key`, `version`, `uploaded_by`.
- **`audit_logs`**: `id`, `org_id`, `user_id`, `action`, `entity_name`, `entity_id`, `changes_json`, `ip_address`, `timestamp`.
