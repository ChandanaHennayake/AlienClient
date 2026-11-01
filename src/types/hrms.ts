export type UserRole = 'Employee' | 'Manager' | 'Admin';

export interface User {
  userId: number;
  employeeId: number;
  fullName: string;
  email: string;
  role: UserRole;
  designation: string;
  department: string;
  branchId: number;
  branchName: string;
  companyId: number;
  avatarUrl?: string;
  employeeCode?: string;
}

export interface AttendanceRecord {
  id: number;
  employeeId: number;
  employeeName: string;
  date: string;
  checkInTime: string | null;
  checkOutTime: string | null;
  status: 'Present' | 'Late' | 'Absent' | 'On Leave' | 'Half Day';
  workedMinutes: number;
  overtimeMinutes: number;
  latitude?: number;
  longitude?: number;
  branchName?: string;
}

export interface LeaveBalance {
  leaveTypeId: number;
  leaveTypeName: string;
  allocatedDays: number;
  usedDays: number;
  pendingDays: number;
  availableDays: number;
  colorHex: string;
}

export interface LeaveRequest {
  id: number;
  employeeId: number;
  employeeName: string;
  leaveTypeId: number;
  leaveTypeName: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Cancelled';
  appliedDate: string;
  reviewRemarks?: string;
}

export interface Payslip {
  id: number;
  employeeId: number;
  employeeName: string;
  designation: string;
  periodName: string; // e.g. "October 2026"
  year: number;
  month: number;
  basicSalary: number;
  allowances: number;
  grossSalary: number;
  noPayDeductions: number;
  epfEmployee: number; // 8%
  epfEmployer: number; // 12%
  etfEmployer: number; // 3%
  apitTax: number;
  otherDeductions: number;
  netPay: number;
  status: 'Draft' | 'UnderReview' | 'Approved' | 'Published';
  disbursementDate?: string;
  bankName: string;
  accountNumber: string;
}

export interface Branch {
  id: number;
  branchName: string;
  code: string;
  address: string;
  latitude: number;
  longitude: number;
  geofenceRadiusMeters: number;
  activeEmployeeCount: number;
  managerName: string;
}

export interface Holiday {
  id: number;
  title: string;
  date: string;
  dayOfWeek: string;
  type: 'Public' | 'Bank' | 'Mercantile';
  isMandatory: boolean;
}

export interface AuditLog {
  id: number;
  timestamp: string;
  actorName: string;
  role: string;
  action: string;
  entityName: string;
  severity: 'Info' | 'Warning' | 'Critical';
  ipAddress: string;
  details: string;
}

export interface Notice {
  id: number;
  title: string;
  content: string;
  category: 'Urgent' | 'General' | 'Event' | 'Policy';
  publishedDate: string;
  isActive: boolean;
  author: string;
}

export interface NotificationItem {
  id: number;
  title: string;
  message: string;
  timeAgo: string;
  type: 'leave' | 'attendance' | 'payroll' | 'announcement';
  read: boolean;
}

