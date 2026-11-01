import React, { useState, useEffect } from 'react';
import {
  UserRole,
  User,
  AttendanceRecord,
  LeaveBalance,
  LeaveRequest,
  Payslip,
  Branch,
  NotificationItem
} from '../types/hrms';
import {
  DEMO_USERS,
  INITIAL_LEAVE_BALANCES,
  INITIAL_ATTENDANCE,
  INITIAL_LEAVE_REQUESTS,
  INITIAL_PAYSLIPS,
  INITIAL_BRANCHES,
  UPCOMING_HOLIDAYS,
  INITIAL_NOTICES,
  INITIAL_AUDIT_LOGS,
  INITIAL_NOTIFICATIONS
} from '../data/mockData';
import {
  LayoutDashboard,
  Clock,
  Calendar,
  FileText,
  MapPin,
  Shield,
  Bell,
  Sparkles,
  CheckCircle,
  Search,
  Download,
  Plus,
  ArrowLeft,
  Check,
  X
} from 'lucide-react';
import { fireSuccessConfetti } from '../utils/confetti';

interface PortalAppProps {
  onBackToLanding: () => void;
  onOpenAiCopilot: () => void;
}

export const PortalApp: React.FC<PortalAppProps> = ({ onBackToLanding, onOpenAiCopilot }) => {
  const [role, setRole] = useState<UserRole>('Employee');
  const currentUser: User =
    role === 'Employee'
      ? DEMO_USERS.employee
      : role === 'Manager'
      ? DEMO_USERS.manager
      : DEMO_USERS.admin;

  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'attendance' | 'leave' | 'payroll' | 'branches' | 'audit' | 'notices'
  >('dashboard');

  const [currentTime, setCurrentTime] = useState<string>('');
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })
      );
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  // Attendance state
  const [isClockedIn, setIsClockedIn] = useState<boolean>(true);
  const [clockInTime, setClockInTime] = useState<string>('08:42 AM');
  const [clockOutTime, setClockOutTime] = useState<string>('--:--');
  const [attendanceList, setAttendanceList] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE);
  const [attendanceSearch, setAttendanceSearch] = useState<string>('');
  const [attendanceFilter, setAttendanceFilter] = useState<string>('All');

  // Leave state
  const [leaveBalances, setLeaveBalances] = useState<LeaveBalance[]>(INITIAL_LEAVE_BALANCES);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(INITIAL_LEAVE_REQUESTS);
  const [showLeaveModal, setShowLeaveModal] = useState<boolean>(false);
  const [leaveTypeInput, setLeaveTypeInput] = useState<string>('Annual Leave');
  const [leaveDaysInput, setLeaveDaysInput] = useState<number>(1);
  const [leaveReasonInput, setLeaveReasonInput] = useState<string>('');

  // Payslips state
  const [payslips] = useState<Payslip[]>(INITIAL_PAYSLIPS);
  const [selectedPayslip, setSelectedPayslip] = useState<Payslip | null>(INITIAL_PAYSLIPS[0]);

  // Branches state
  const [branches] = useState<Branch[]>(INITIAL_BRANCHES);

  // Notification state
  const [notifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);

  // Handlers
  const handleToggleClock = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    if (!isClockedIn) {
      setClockInTime(timeStr);
      setClockOutTime('--:--');
      setIsClockedIn(true);
      const newRec: AttendanceRecord = {
        id: Date.now(),
        employeeId: currentUser.employeeId,
        employeeName: currentUser.fullName,
        date: '2026-10-30',
        checkInTime: timeStr,
        checkOutTime: null,
        status: 'Present',
        workedMinutes: 0,
        overtimeMinutes: 0,
        branchName: currentUser.branchName
      };
      setAttendanceList([newRec, ...attendanceList]);
      fireSuccessConfetti();
    } else {
      setClockOutTime(timeStr);
      setIsClockedIn(false);
      fireSuccessConfetti();
    }
  };

  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveReasonInput.trim()) return;

    const newReq: LeaveRequest = {
      id: Date.now(),
      employeeId: currentUser.employeeId,
      employeeName: currentUser.fullName,
      leaveTypeId: leaveTypeInput === 'Annual Leave' ? 1 : leaveTypeInput === 'Casual Leave' ? 2 : 3,
      leaveTypeName: leaveTypeInput,
      startDate: '2026-11-15',
      endDate: '2026-11-16',
      totalDays: leaveDaysInput,
      reason: leaveReasonInput,
      status: 'Pending',
      appliedDate: '2026-10-30'
    };

    setLeaveRequests([newReq, ...leaveRequests]);
    setLeaveBalances((prev) =>
      prev.map((b) =>
        b.leaveTypeName === leaveTypeInput
          ? { ...b, pendingDays: b.pendingDays + leaveDaysInput, availableDays: Math.max(0, b.availableDays - leaveDaysInput) }
          : b
      )
    );

    setShowLeaveModal(false);
    setLeaveReasonInput('');
    fireSuccessConfetti();
  };

  const handleApproveLeave = (id: number) => {
    setLeaveRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'Approved', reviewRemarks: `Approved by ${currentUser.fullName}` } : r))
    );
    fireSuccessConfetti();
  };

  const handleRejectLeave = (id: number) => {
    setLeaveRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'Rejected', reviewRemarks: 'Rejected due to operational limits' } : r))
    );
  };

  const filteredAttendance = attendanceList.filter((rec) => {
    const matchesSearch = rec.employeeName.toLowerCase().includes(attendanceSearch.toLowerCase());
    const matchesFilter = attendanceFilter === 'All' || rec.status === attendanceFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 flex flex-col selection:bg-purple-100 selection:text-purple-900">
      
      {/* Top Portal Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-3 shadow-2xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          
          {/* Left: Back & Brand */}
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToLanding}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-purple-700 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Site</span>
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-purple-700 flex items-center justify-center">
                <img src="/alien_logo.png" alt="Logo" className="w-5 h-5 object-contain" />
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                  <span>AlienHR Portal</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-purple-50 text-purple-700 font-bold border border-purple-200">
                    CLIENT
                  </span>
                </div>
                <div className="text-[10px] text-slate-500">{currentUser.branchName}</div>
              </div>
            </div>
          </div>

          {/* Center: Role Switcher & Clock */}
          <div className="flex items-center gap-3">
            <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs">
              {(['Employee', 'Manager', 'Admin'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    role === r
                      ? 'bg-purple-700 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-700">
              <Clock className="w-3.5 h-3.5 text-purple-700" />
              <span>{currentTime}</span>
            </div>
          </div>

          {/* Right: Profile & Notifications */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAiCopilot}
              className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 text-xs font-semibold hover:bg-purple-100 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-700" />
              <span>Ask AI</span>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 relative"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl p-4 shadow-xl z-50">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
                    <span className="text-xs font-bold text-slate-900">Notifications</span>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-slate-400 hover:text-slate-700 text-xs"
                    >
                      Close
                    </button>
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
                    {notifications.map((n) => (
                      <div key={n.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                        <div className="font-bold text-slate-900 mb-0.5">{n.title}</div>
                        <div className="text-[11px] text-slate-500">{n.message}</div>
                        <div className="text-[9px] text-purple-700 font-mono mt-1">{n.timeAgo}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.fullName}
                className="w-8 h-8 rounded-full border border-slate-200 object-cover"
              />
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-slate-900">{currentUser.fullName}</div>
                <div className="text-[10px] text-slate-500 font-mono">{currentUser.designation}</div>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* Tabs Navigation */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-slate-200 text-xs font-semibold custom-scrollbar">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'dashboard'
                ? 'bg-purple-700 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('attendance')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'attendance'
                ? 'bg-purple-700 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Attendance Roster</span>
          </button>

          <button
            onClick={() => setActiveTab('leave')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'leave'
                ? 'bg-purple-700 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Leave Quotas</span>
          </button>

          <button
            onClick={() => setActiveTab('payroll')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'payroll'
                ? 'bg-purple-700 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Statutory Payroll</span>
          </button>

          <button
            onClick={() => setActiveTab('branches')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'branches'
                ? 'bg-purple-700 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Branch Geofences</span>
          </button>

          {role === 'Admin' && (
            <button
              onClick={() => setActiveTab('audit')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'audit'
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Audit Trail</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('notices')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'notices'
                ? 'bg-purple-700 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Notices & Calendar</span>
          </button>
        </div>

        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            
            {/* Top Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <span className="text-xs font-mono font-semibold text-slate-400 uppercase">Today's Attendance</span>
                <div className="text-2xl font-black font-mono text-slate-900 mt-1">94.2%</div>
                <div className="text-xs text-emerald-600 font-medium mt-1 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>186 of 216 On Time</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <span className="text-xs font-mono font-semibold text-slate-400 uppercase">Available Leave Days</span>
                <div className="text-2xl font-black font-mono text-purple-700 mt-1">27 Days</div>
                <div className="text-xs text-slate-500 mt-1">9 Annual • 5 Casual • 13 Medical</div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <span className="text-xs font-mono font-semibold text-slate-400 uppercase">Next Pay Date</span>
                <div className="text-2xl font-black font-mono text-slate-900 mt-1">Nov 28, 2026</div>
                <div className="text-xs text-emerald-600 font-medium mt-1">EPF/ETF Auto-Filed</div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <span className="text-xs font-mono font-semibold text-slate-400 uppercase">GPS Perimeter Status</span>
                <div className="text-2xl font-black font-mono text-emerald-600 mt-1">Verified</div>
                <div className="text-xs text-slate-500 mt-1">Accuracy: 4.2m (Colombo Hub)</div>
              </div>
            </div>

            {/* Main Interactive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left: Punch Card */}
              <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-700">
                      GPS Mobile Punch Terminal
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                      Hardware Verified
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-5">
                    <div className="text-xs text-slate-500">Designated Work Hub</div>
                    <div className="text-base font-bold text-slate-900 mt-0.5">{currentUser.branchName}</div>
                    <div className="text-xs text-slate-400 font-mono mt-1">
                      Lat: 6.9334° N • Lng: 79.8437° E • Radius: 150m
                    </div>
                  </div>

                  <div className="text-center py-4">
                    <button
                      onClick={handleToggleClock}
                      className={`w-36 h-36 mx-auto rounded-full font-bold text-xs tracking-wider transition-all flex flex-col items-center justify-center gap-1 shadow-md ${
                        isClockedIn
                          ? 'bg-emerald-600 text-white'
                          : 'bg-purple-700 text-white animate-pulse'
                      }`}
                    >
                      <Clock className="w-6 h-6" />
                      <span>{isClockedIn ? 'CLOCK OUT' : 'CLOCK IN'}</span>
                      <span className="text-[9px] font-mono opacity-80">
                        {isClockedIn ? 'Working: 07h 14m' : 'Tap to clock in'}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 text-xs">
                  <div className="bg-slate-50 p-3 rounded-xl">
                    <span className="text-slate-400 text-[10px]">Today Check-In</span>
                    <div className="font-bold text-slate-900 font-mono">{clockInTime}</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl">
                    <span className="text-slate-400 text-[10px]">Today Check-Out</span>
                    <div className="font-bold text-slate-900 font-mono">{clockOutTime}</div>
                  </div>
                </div>
              </div>

              {/* Right: Role-Specific Action Board */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Approvals queue */}
                {(role === 'Manager' || role === 'Admin') && (
                  <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-base font-bold text-slate-900">Pending Leave Requests</h3>
                        <p className="text-xs text-slate-500">Requires managerial sign-off</p>
                      </div>
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                        {leaveRequests.filter((r) => r.status === 'Pending').length} Pending
                      </span>
                    </div>

                    <div className="space-y-3">
                      {leaveRequests
                        .filter((r) => r.status === 'Pending')
                        .map((req) => (
                          <div
                            key={req.id}
                            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                          >
                            <div>
                              <div className="font-bold text-slate-900 flex items-center gap-2">
                                <span>{req.employeeName}</span>
                                <span className="text-[10px] px-2 py-0.5 rounded bg-purple-50 text-purple-700 font-mono">
                                  {req.leaveTypeName}
                                </span>
                              </div>
                              <p className="text-slate-600 mt-1 italic">"{req.reason}"</p>
                              <div className="text-[11px] text-purple-700 font-mono mt-1">
                                {req.startDate} ({req.totalDays} Day{req.totalDays > 1 ? 's' : ''})
                              </div>
                            </div>

                            <div className="flex items-center gap-2 w-full sm:w-auto">
                              <button
                                onClick={() => handleApproveLeave(req.id)}
                                className="flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1"
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>Approve</span>
                              </button>
                              <button
                                onClick={() => handleRejectLeave(req.id)}
                                className="flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs"
                              >
                                Reject
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Leave Quota Balances */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Leave Quota Balances</h3>
                      <p className="text-xs text-slate-500">Allocated vs Used for 2026</p>
                    </div>
                    <button
                      onClick={() => setShowLeaveModal(true)}
                      className="px-3 py-1.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Apply Leave</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {leaveBalances.slice(0, 3).map((b) => (
                      <div key={b.leaveTypeId} className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                        <div className="text-xs font-bold text-slate-800">{b.leaveTypeName}</div>
                        <div className="text-2xl font-black text-slate-900 font-mono mt-1">{b.availableDays}</div>
                        <div className="text-[11px] text-slate-500 mt-1">
                          {b.usedDays} used • {b.pendingDays} pending
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* TAB 2: ATTENDANCE ROSTER */}
        {activeTab === 'attendance' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Company Attendance Roster</h3>
                <p className="text-xs text-slate-500">Live GPS punch logs across active branches</p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search personnel..."
                    value={attendanceSearch}
                    onChange={(e) => setAttendanceSearch(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-purple-600"
                  />
                </div>

                <select
                  value={attendanceFilter}
                  onChange={(e) => setAttendanceFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
                >
                  <option value="All">All Statuses</option>
                  <option value="Present">Present</option>
                  <option value="Late">Late</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Absent">Absent</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-mono uppercase tracking-wider font-semibold">
                    <th className="py-3 px-4">Employee</th>
                    <th className="py-3 px-4">Branch</th>
                    <th className="py-3 px-4">Clock-In</th>
                    <th className="py-3 px-4">Clock-Out</th>
                    <th className="py-3 px-4">Worked</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAttendance.map((rec) => (
                    <tr key={rec.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">{rec.employeeName}</td>
                      <td className="py-3 px-4 text-slate-600">{rec.branchName || 'Colombo Tech Hub'}</td>
                      <td className="py-3 px-4 font-mono text-slate-700">{rec.checkInTime || '--:--'}</td>
                      <td className="py-3 px-4 font-mono text-slate-700">{rec.checkOutTime || '--:--'}</td>
                      <td className="py-3 px-4 font-mono text-emerald-600 font-semibold">
                        {rec.workedMinutes > 0 ? `${Math.floor(rec.workedMinutes / 60)}h ${rec.workedMinutes % 60}m` : '--'}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                            rec.status === 'Present'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : rec.status === 'Late'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : rec.status === 'On Leave'
                              ? 'bg-purple-50 text-purple-700 border border-purple-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {rec.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: LEAVE MANAGEMENT */}
        {activeTab === 'leave' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Leave Governance & Balances</h3>
                <p className="text-xs text-slate-500">Statutory leave entitlements and history</p>
              </div>
              <button
                onClick={() => setShowLeaveModal(true)}
                className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Submit Leave Request</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {leaveBalances.map((b) => (
                <div key={b.leaveTypeId} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <div className="text-xs font-bold text-slate-800">{b.leaveTypeName}</div>
                  <div className="text-3xl font-black text-slate-900 font-mono mt-1">{b.availableDays}</div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {b.usedDays} used • {b.allocatedDays} allocated
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs">
              <h4 className="text-sm font-bold text-slate-900 mb-4">Leave Application Log</h4>
              <div className="space-y-3">
                {leaveRequests.map((req) => (
                  <div
                    key={req.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{req.employeeName}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-purple-50 text-purple-700 font-mono">
                          {req.leaveTypeName}
                        </span>
                      </div>
                      <p className="text-slate-600 mt-1 italic">"{req.reason}"</p>
                      <div className="text-[11px] text-slate-500 font-mono mt-1">
                        Dates: {req.startDate} to {req.endDate} ({req.totalDays} Days)
                      </div>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold font-mono ${
                        req.status === 'Approved'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : req.status === 'Pending'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PAYROLL */}
        {activeTab === 'payroll' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 mb-3">Published Monthly Payslips</h3>
              {payslips.map((slip) => (
                <div
                  key={slip.id}
                  onClick={() => setSelectedPayslip(slip)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    selectedPayslip?.id === slip.id
                      ? 'bg-purple-50/60 border-purple-300 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-900 text-sm">{slip.periodName}</span>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {slip.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mb-2 font-mono">
                    Gross: Rs. {slip.grossSalary.toLocaleString()} • EPF: -Rs. {slip.epfEmployee.toLocaleString()}
                  </div>
                  <div className="text-base font-black text-purple-700 font-mono">
                    Net Take-Home: Rs. {slip.netPay.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs">
              {selectedPayslip && (
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                    <div>
                      <div className="text-base font-extrabold text-slate-900">Itemized Payslip Voucher</div>
                      <div className="text-xs text-slate-500 font-mono">
                        Period: {selectedPayslip.periodName} • Voucher #{selectedPayslip.id}
                      </div>
                    </div>
                    <button
                      onClick={() => alert('Voucher ready for PDF download')}
                      className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5 text-slate-600" />
                      <span>Export PDF</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6">
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-mono">Employee</span>
                      <div className="font-bold text-slate-900">{selectedPayslip.employeeName}</div>
                      <div className="text-[11px] text-slate-500">{selectedPayslip.designation}</div>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-mono">Disbursement Bank</span>
                      <div className="font-bold text-slate-900">{selectedPayslip.bankName}</div>
                      <div className="text-[11px] font-mono text-slate-500">{selectedPayslip.accountNumber}</div>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="flex justify-between p-2.5 rounded-xl bg-slate-50">
                      <span className="text-slate-700">Basic Monthly Salary</span>
                      <span className="font-mono font-bold text-slate-900">
                        Rs. {selectedPayslip.basicSalary.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between p-2.5 rounded-xl bg-slate-50">
                      <span className="text-slate-700">Fixed Monthly Allowances</span>
                      <span className="font-mono font-bold text-slate-900">
                        Rs. {selectedPayslip.allowances.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between p-2.5 rounded-xl bg-slate-100">
                      <span className="text-slate-900 font-bold">Total Gross Earnings</span>
                      <span className="font-mono font-bold text-slate-900">
                        Rs. {selectedPayslip.grossSalary.toLocaleString()}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-100 space-y-2">
                      <div className="flex justify-between p-2 rounded-lg bg-rose-50 text-rose-700">
                        <span>EPF Employee (8%)</span>
                        <span className="font-mono font-bold">-Rs. {selectedPayslip.epfEmployee.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between p-2 rounded-lg bg-rose-50 text-rose-700">
                        <span>APIT Progressive Tax</span>
                        <span className="font-mono font-bold">-Rs. {selectedPayslip.apitTax.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#FAF8FF] border border-purple-200 flex justify-between items-center mt-4">
                      <div>
                        <span className="text-xs font-mono font-bold text-purple-700 uppercase">
                          Net Pay Disbursed
                        </span>
                        <div className="text-2xl font-black text-slate-900 font-mono mt-0.5">
                          Rs. {selectedPayslip.netPay.toLocaleString()}
                        </div>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold font-mono">
                        PAID
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 5: BRANCHES */}
        {activeTab === 'branches' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {branches.map((b) => (
              <div key={b.id} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                    {b.code}
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-600">
                    {b.activeEmployeeCount} Employees
                  </span>
                </div>
                <h4 className="text-base font-extrabold text-slate-900 mb-1">{b.branchName}</h4>
                <p className="text-xs text-slate-500 mb-4">{b.address}</p>

                <div className="space-y-1.5 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-100 font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Coordinates:</span>
                    <span className="text-slate-900">{b.latitude}° N, {b.longitude}° E</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Radius:</span>
                    <span className="text-purple-700 font-bold">{b.geofenceRadiusMeters}m</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 6: AUDIT TRAIL */}
        {activeTab === 'audit' && role === 'Admin' && (
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs">
            <h3 className="text-base font-bold text-slate-900 mb-4">Cryptographic Audit Stream</h3>
            <div className="space-y-3 font-mono text-xs">
              {INITIAL_AUDIT_LOGS.map((log) => (
                <div key={log.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                  <div>
                    <span className="text-purple-700 font-bold">[{log.action}]</span>
                    <span className="ml-2 text-slate-700">{log.details}</span>
                  </div>
                  <span className="text-slate-400 text-[11px]">{log.timestamp} • {log.ipAddress}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: NOTICES */}
        {activeTab === 'notices' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs">
              <h3 className="text-base font-bold text-slate-900 mb-4">Official Announcements</h3>
              <div className="space-y-3">
                {INITIAL_NOTICES.map((n) => (
                  <div key={n.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="font-bold text-slate-900 text-sm mb-1">{n.title}</div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-2">{n.content}</p>
                    <div className="text-[10px] text-slate-400 font-mono">By {n.author} • {n.publishedDate}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs">
              <h3 className="text-base font-bold text-slate-900 mb-4">Upcoming Company Holidays</h3>
              <div className="space-y-3">
                {UPCOMING_HOLIDAYS.map((h) => (
                  <div key={h.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex justify-between items-center text-xs">
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{h.title}</div>
                      <div className="text-slate-500">{h.dayOfWeek} • {h.type} Holiday</div>
                    </div>
                    <span className="font-mono font-bold text-purple-700">{h.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Leave Application Modal */}
      {showLeaveModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h4 className="text-sm font-bold text-slate-900">Submit Leave Application</h4>
              <button onClick={() => setShowLeaveModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleApplyLeave} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Leave Category</label>
                <select
                  value={leaveTypeInput}
                  onChange={(e) => setLeaveTypeInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-purple-600"
                >
                  <option value="Annual Leave">Annual Leave (9 days remaining)</option>
                  <option value="Casual Leave">Casual Leave (5 days remaining)</option>
                  <option value="Medical Leave">Medical Leave (13 days remaining)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Total Absence Days</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={leaveDaysInput}
                  onChange={(e) => setLeaveDaysInput(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-purple-600"
                />
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Reason for Absence</label>
                <textarea
                  rows={3}
                  placeholder="Provide context for manager approval..."
                  value={leaveReasonInput}
                  onChange={(e) => setLeaveReasonInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 resize-none focus:outline-none focus:border-purple-600"
                  required
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowLeaveModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold shadow-xs"
                >
                  Confirm & Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
