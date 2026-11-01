import { User, AttendanceRecord, LeaveBalance, LeaveRequest, Payslip, Branch, Holiday, AuditLog, Notice, NotificationItem } from '../types/hrms';

export const DEMO_USERS: Record<string, User> = {
  employee: {
    userId: 101,
    employeeId: 42,
    fullName: 'David Chen',
    email: 'david.chen@alienhr.io',
    role: 'Employee',
    designation: 'Senior AI Systems Engineer',
    department: 'Machine Intelligence',
    branchId: 1,
    branchName: 'Colombo Tech Hub (HQ)',
    companyId: 1,
    employeeCode: 'EMP-0042',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  manager: {
    userId: 102,
    employeeId: 18,
    fullName: 'Elena Rostova',
    email: 'elena.rostova@alienhr.io',
    role: 'Manager',
    designation: 'Engineering & People Manager',
    department: 'Engineering',
    branchId: 1,
    branchName: 'Colombo Tech Hub (HQ)',
    companyId: 1,
    employeeCode: 'MGR-0018',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  },
  admin: {
    userId: 103,
    employeeId: 1,
    fullName: 'Sarah Vance',
    email: 'sarah.vance@alienhr.io',
    role: 'Admin',
    designation: 'Chief Human Resources Officer (CHRO)',
    department: 'Executive Leadership',
    branchId: 1,
    branchName: 'Global Headquarters',
    companyId: 1,
    employeeCode: 'ADM-0001',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
  }
};

export const INITIAL_LEAVE_BALANCES: LeaveBalance[] = [
  { leaveTypeId: 1, leaveTypeName: 'Annual Leave', allocatedDays: 14, usedDays: 4, pendingDays: 1, availableDays: 9, colorHex: '#7C2FCE' },
  { leaveTypeId: 2, leaveTypeName: 'Casual Leave', allocatedDays: 7, usedDays: 2, pendingDays: 0, availableDays: 5, colorHex: '#A855F7' },
  { leaveTypeId: 3, leaveTypeName: 'Medical Leave', allocatedDays: 14, usedDays: 1, pendingDays: 0, availableDays: 13, colorHex: '#10B981' },
  { leaveTypeId: 4, leaveTypeName: 'Maternity/Paternity', allocatedDays: 84, usedDays: 0, pendingDays: 0, availableDays: 84, colorHex: '#3B82F6' },
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  { id: 1, employeeId: 42, employeeName: 'David Chen', date: '2026-10-30', checkInTime: '08:42 AM', checkOutTime: null, status: 'Present', workedMinutes: 420, overtimeMinutes: 30, branchName: 'Colombo Tech Hub (HQ)' },
  { id: 2, employeeId: 18, employeeName: 'Elena Rostova', date: '2026-10-30', checkInTime: '08:15 AM', checkOutTime: null, status: 'Present', workedMinutes: 450, overtimeMinutes: 45, branchName: 'Colombo Tech Hub (HQ)' },
  { id: 3, employeeId: 104, employeeName: 'Marcus Aurelius', date: '2026-10-30', checkInTime: '09:25 AM', checkOutTime: null, status: 'Late', workedMinutes: 380, overtimeMinutes: 0, branchName: 'Colombo Tech Hub (HQ)' },
  { id: 4, employeeId: 105, employeeName: 'Samantha Ray', date: '2026-10-30', checkInTime: null, checkOutTime: null, status: 'On Leave', workedMinutes: 0, overtimeMinutes: 0, branchName: 'Kandy Innovation Lab' },
  { id: 5, employeeId: 106, employeeName: 'Liam Tanaka', date: '2026-10-30', checkInTime: '08:50 AM', checkOutTime: null, status: 'Present', workedMinutes: 410, overtimeMinutes: 0, branchName: 'Colombo Tech Hub (HQ)' },
  { id: 6, employeeId: 107, employeeName: 'Priya Sharma', date: '2026-10-30', checkInTime: null, checkOutTime: null, status: 'Absent', workedMinutes: 0, overtimeMinutes: 0, branchName: 'Galle Coastal Hub' },
  { id: 7, employeeId: 108, employeeName: 'Kenji Sato', date: '2026-10-30', checkInTime: '08:30 AM', checkOutTime: null, status: 'Present', workedMinutes: 435, overtimeMinutes: 15, branchName: 'Colombo Tech Hub (HQ)' },
  { id: 8, employeeId: 109, employeeName: 'Chloe Bennett', date: '2026-10-30', checkInTime: '08:58 AM', checkOutTime: null, status: 'Present', workedMinutes: 405, overtimeMinutes: 0, branchName: 'Kandy Innovation Lab' }
];

export const INITIAL_LEAVE_REQUESTS: LeaveRequest[] = [
  {
    id: 1,
    employeeId: 42,
    employeeName: 'David Chen',
    leaveTypeId: 1,
    leaveTypeName: 'Annual Leave',
    startDate: '2026-11-04',
    endDate: '2026-11-05',
    totalDays: 2,
    reason: 'Family trip to Nuwara Eliya & rest.',
    status: 'Pending',
    appliedDate: '2026-10-29'
  },
  {
    id: 2,
    employeeId: 104,
    employeeName: 'Marcus Aurelius',
    leaveTypeId: 2,
    leaveTypeName: 'Casual Leave',
    startDate: '2026-11-10',
    endDate: '2026-11-10',
    totalDays: 1,
    reason: 'Personal administrative work and passport renewal.',
    status: 'Pending',
    appliedDate: '2026-10-28'
  },
  {
    id: 3,
    employeeId: 105,
    employeeName: 'Samantha Ray',
    leaveTypeId: 3,
    leaveTypeName: 'Medical Leave',
    startDate: '2026-10-30',
    endDate: '2026-10-30',
    totalDays: 1,
    reason: 'Medical checkup and lab tests at Asiri Hospital.',
    status: 'Approved',
    appliedDate: '2026-10-27',
    reviewRemarks: 'Approved by Elena Rostova'
  }
];

export const INITIAL_PAYSLIPS: Payslip[] = [
  {
    id: 101,
    employeeId: 42,
    employeeName: 'David Chen',
    designation: 'Senior AI Systems Engineer',
    periodName: 'October 2026',
    year: 2026,
    month: 10,
    basicSalary: 280000,
    allowances: 45000,
    grossSalary: 325000,
    noPayDeductions: 0,
    epfEmployee: 22400, // 8% of 280,000
    epfEmployer: 33600, // 12% of 280,000
    etfEmployer: 8400,  // 3% of 280,000
    apitTax: 18500,
    otherDeductions: 2500,
    netPay: 281600,
    status: 'Published',
    disbursementDate: '2026-10-28',
    bankName: 'Commercial Bank of Ceylon',
    accountNumber: '**** **** 8921'
  },
  {
    id: 102,
    employeeId: 42,
    employeeName: 'David Chen',
    designation: 'Senior AI Systems Engineer',
    periodName: 'September 2026',
    year: 2026,
    month: 9,
    basicSalary: 280000,
    allowances: 45000,
    grossSalary: 325000,
    noPayDeductions: 0,
    epfEmployee: 22400,
    epfEmployer: 33600,
    etfEmployer: 8400,
    apitTax: 18500,
    otherDeductions: 2500,
    netPay: 281600,
    status: 'Published',
    disbursementDate: '2026-09-28',
    bankName: 'Commercial Bank of Ceylon',
    accountNumber: '**** **** 8921'
  }
];

export const INITIAL_BRANCHES: Branch[] = [
  {
    id: 1,
    branchName: 'Colombo Tech Hub (HQ)',
    code: 'HQ-CMB',
    address: 'World Trade Center, Level 24, Echelon Square, Colombo 01',
    latitude: 6.9334,
    longitude: 79.8437,
    geofenceRadiusMeters: 150,
    activeEmployeeCount: 148,
    managerName: 'Elena Rostova'
  },
  {
    id: 2,
    branchName: 'Kandy Innovation Lab',
    code: 'LAB-KDY',
    address: 'Peradeniya Road, Gatambe, Kandy',
    latitude: 7.2711,
    longitude: 80.6014,
    geofenceRadiusMeters: 200,
    activeEmployeeCount: 42,
    managerName: 'Ruwan Wijesinghe'
  },
  {
    id: 3,
    branchName: 'Galle Coastal Engineering Hub',
    code: 'HUB-GLE',
    address: 'Light House Street, Galle Fort, Galle',
    latitude: 6.0268,
    longitude: 80.2170,
    geofenceRadiusMeters: 250,
    activeEmployeeCount: 26,
    managerName: 'Chaminda Fernando'
  }
];

export const UPCOMING_HOLIDAYS: Holiday[] = [
  { id: 1, title: 'Deepavali Festival Day', date: '2026-11-08', dayOfWeek: 'Sunday', type: 'Public', isMandatory: true },
  { id: 2, title: 'Ill Full Moon Poya Day', date: '2026-11-23', dayOfWeek: 'Monday', type: 'Public', isMandatory: true },
  { id: 3, title: 'Christmas Day', date: '2026-12-25', dayOfWeek: 'Friday', type: 'Public', isMandatory: true }
];

export const INITIAL_NOTICES: Notice[] = [
  {
    id: 1,
    title: '🚀 Q4 Strategic Townhall & AI Roadmap Launch',
    content: 'Join our leadership team this Friday at 4:00 PM for the unveiling of our 2027 Autonomous Workforce integrations and company-wide bonus announcements.',
    category: 'Urgent',
    publishedDate: '2026-10-28',
    isActive: true,
    author: 'Sarah Vance (CHRO)'
  },
  {
    id: 2,
    title: '🏥 Annual Health & Life Insurance Policy Enhancement',
    content: 'All outpatient benefits and dependent surgical caps have been raised by 35% effective November 1st. Claim submissions are now zero-paperwork via the AlienHR portal.',
    category: 'Policy',
    publishedDate: '2026-10-24',
    isActive: true,
    author: 'People Operations Team'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  { id: 1001, timestamp: '2026-10-30 08:42:15', actorName: 'David Chen', role: 'Employee', action: 'GPS_CHECK_IN', entityName: 'Attendance', severity: 'Info', ipAddress: '192.168.1.104', details: 'Geofence match (6.9334, 79.8437, accuracy: 4.2m)' },
  { id: 1002, timestamp: '2026-10-30 08:15:02', actorName: 'Elena Rostova', role: 'Manager', action: 'GPS_CHECK_IN', entityName: 'Attendance', severity: 'Info', ipAddress: '192.168.1.102', details: 'Geofence match verified' },
  { id: 1003, timestamp: '2026-10-29 17:30:20', actorName: 'Sarah Vance', role: 'Admin', action: 'PAYROLL_EXECUTE', entityName: 'PayrollRun', severity: 'Warning', ipAddress: '10.0.4.12', details: 'October 2026 batch processed for 216 employees' },
  { id: 1004, timestamp: '2026-10-29 14:12:00', actorName: 'David Chen', role: 'Employee', action: 'LEAVE_SUBMIT', entityName: 'LeaveRequest', severity: 'Info', ipAddress: '192.168.1.104', details: '2 days Annual Leave requested' },
  { id: 1005, timestamp: '2026-10-28 11:20:44', actorName: 'Elena Rostova', role: 'Manager', action: 'LEAVE_APPROVE', entityName: 'LeaveRequest', severity: 'Info', ipAddress: '192.168.1.102', details: 'Samantha Ray Medical Leave approved' }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  { id: 1, title: 'October Payslip Ready', message: 'Your salary payslip for October 2026 is published and ready for download.', timeAgo: '2 hours ago', type: 'payroll', read: false },
  { id: 2, title: 'Leave Status Update', message: 'Your Annual Leave request for Nov 04 - Nov 05 has been submitted to Elena Rostova.', timeAgo: '1 day ago', type: 'leave', read: false },
  { id: 3, title: 'GPS Check-In Confirmed', message: 'Clocked in at 08:42 AM within Colombo Tech Hub geofence boundary.', timeAgo: '7 hours ago', type: 'attendance', read: true },
  { id: 4, title: 'Townhall Announcement', message: 'New urgent notice posted regarding the upcoming Q4 Townhall meeting.', timeAgo: '2 days ago', type: 'announcement', read: true }
];

