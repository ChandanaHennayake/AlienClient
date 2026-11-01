import React, { useState } from 'react';
import {
  Smartphone,
  MapPin,
  Clock,
  Calendar,
  FileText,
  Bell,
  CheckCircle,
  Home,
  Check,
  ChevronRight,
  TrendingUp,
  RefreshCw,
  X,
  Plus
} from 'lucide-react';
import {
  DEMO_USERS,
  INITIAL_LEAVE_BALANCES,
  INITIAL_ATTENDANCE,
  INITIAL_LEAVE_REQUESTS,
  INITIAL_PAYSLIPS,
  UPCOMING_HOLIDAYS
} from '../data/mockData';
import { UserRole } from '../types/hrms';
import { fireSuccessConfetti } from '../utils/confetti';

export const MobileAppSimulator: React.FC = () => {
  const [activeRole, setActiveRole] = useState<UserRole>('Employee');
  const [currentTab, setCurrentTab] = useState<'home' | 'attendance' | 'leave' | 'payslips'>('home');

  // Interactive states inside the phone
  const [isClockedIn, setIsClockedIn] = useState<boolean>(true);
  const [clockInTime, setClockInTime] = useState<string>('08:42 AM');
  const [clockOutTime, setClockOutTime] = useState<string>('--:--');
  const [leaveRequests, setLeaveRequests] = useState(INITIAL_LEAVE_REQUESTS);
  const [selectedBranch] = useState<string>('Colombo Tech Hub (HQ)');
  const [showApplyModal, setShowApplyModal] = useState<boolean>(false);
  const [newLeaveType, setNewLeaveType] = useState<string>('Casual Leave');
  const [newLeaveDays, setNewLeaveDays] = useState<number>(1);
  const [newLeaveReason, setNewLeaveReason] = useState<string>('');

  const currentUser =
    activeRole === 'Employee'
      ? DEMO_USERS.employee
      : activeRole === 'Manager'
      ? DEMO_USERS.manager
      : DEMO_USERS.admin;

  const handlePunchToggle = () => {
    if (!isClockedIn) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
      setClockInTime(timeStr);
      setClockOutTime('--:--');
      setIsClockedIn(true);
      fireSuccessConfetti();
    } else {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
      setClockOutTime(timeStr);
      setIsClockedIn(false);
      fireSuccessConfetti();
    }
  };

  const handleApproveLeave = (id: number) => {
    setLeaveRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'Approved', reviewRemarks: 'Approved by Manager' } : r))
    );
    fireSuccessConfetti();
  };

  const handleRejectLeave = (id: number) => {
    setLeaveRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'Rejected', reviewRemarks: 'Rejected due to shift limits' } : r))
    );
  };

  const handleApplyLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeaveReason.trim()) return;

    const newReq = {
      id: Date.now(),
      employeeId: currentUser.employeeId,
      employeeName: currentUser.fullName,
      leaveTypeId: newLeaveType === 'Annual Leave' ? 1 : 2,
      leaveTypeName: newLeaveType,
      startDate: '2026-11-12',
      endDate: '2026-11-13',
      totalDays: newLeaveDays,
      reason: newLeaveReason,
      status: 'Pending' as const,
      appliedDate: '2026-10-30'
    };

    setLeaveRequests([newReq, ...leaveRequests]);
    setShowApplyModal(false);
    setNewLeaveReason('');
    fireSuccessConfetti();
  };

  return (
    <section id="mobile-experience" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-mono font-semibold tracking-wider mb-4">
            <span>[ 04. FLUTTER MOBILE DEMO ]</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Test the Native Mobile Experience.
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Powered by the Flutter repository (`alionhr mobile`). Switch roles, toggle GPS geofenced attendance, and inspect corporate payslips below.
          </p>

          {/* Role Switcher Pill */}
          <div className="mt-8 inline-flex items-center p-1 rounded-2xl bg-slate-100 border border-slate-200">
            {(['Employee', 'Manager', 'Admin'] as const).map((r) => (
              <button
                key={r}
                onClick={() => {
                  setActiveRole(r);
                  setCurrentTab('home');
                }}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeRole === r
                    ? 'bg-purple-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {r} Mode
              </button>
            ))}
          </div>
        </div>

        {/* iPhone 16 Pro Frame */}
        <div className="flex justify-center items-center">
          <div className="relative w-full max-w-[380px] h-[750px] bg-slate-900 rounded-[50px] p-3 border-4 border-slate-800 shadow-2xl ring-1 ring-slate-300">
            
            {/* Dynamic Island Notch */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-between px-3">
              <div className="w-2 h-2 rounded-full bg-slate-800" />
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            {/* Inner Phone Screen */}
            <div className="w-full h-full bg-[#FAF9FD] rounded-[42px] overflow-hidden flex flex-col relative text-slate-900 select-none">
              
              {/* Phone Status Bar */}
              <div className="pt-3 px-6 pb-2 flex items-center justify-between text-[11px] font-semibold text-slate-500 z-20">
                <span>08:42</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono">5G</span>
                  <div className="w-4 h-2 rounded-2xs border border-slate-400 p-0.5 flex items-center">
                    <div className="h-full w-full bg-emerald-500 rounded-3xs" />
                  </div>
                </div>
              </div>

              {/* Mobile Header Bar */}
              <div className="px-5 pt-3 pb-3 bg-white border-b border-slate-200/80">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={currentUser.avatarUrl}
                      alt={currentUser.fullName}
                      className="w-9 h-9 rounded-full border border-purple-200 object-cover"
                    />
                    <div>
                      <div className="text-[11px] text-slate-400 font-medium">Hello,</div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                        <span>{currentUser.fullName}</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-purple-50 text-purple-700 border border-purple-200 font-mono">
                          {activeRole}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="relative p-2 rounded-full bg-slate-100 text-slate-600">
                    <Bell className="w-4 h-4" />
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                </div>

                <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-600 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/60">
                  <div className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                    <span className="truncate">{selectedBranch}</span>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-bold shrink-0">In Bounds</span>
                </div>
              </div>

              {/* Scrollable Screen Content */}
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3.5 text-left custom-scrollbar">

                {/* EMPLOYEE HOME */}
                {activeRole === 'Employee' && currentTab === 'home' && (
                  <>
                    {/* Punch In Card */}
                    <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs text-center">
                      <div className="text-[11px] uppercase font-mono tracking-wider text-purple-700 font-bold mb-1">
                        GPS Attendance Radar
                      </div>
                      <div className="text-xs text-slate-500 mb-3">
                        Today: <span className="text-slate-800 font-semibold">Friday, Oct 30, 2026</span>
                      </div>

                      {/* Punch Circle */}
                      <button
                        onClick={handlePunchToggle}
                        className={`w-24 h-24 mx-auto rounded-full font-bold text-xs tracking-wider transition-all flex flex-col items-center justify-center gap-1 shadow-md ${
                          isClockedIn
                            ? 'bg-emerald-600 text-white shadow-emerald-700/20'
                            : 'bg-purple-700 text-white shadow-purple-700/20 animate-pulse'
                        }`}
                      >
                        <Clock className="w-5 h-5" />
                        <span>{isClockedIn ? 'CLOCK OUT' : 'CLOCK IN'}</span>
                        <span className="text-[8px] font-mono opacity-80">GPS Validated</span>
                      </button>

                      <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100 text-xs">
                        <div className="bg-slate-50 p-2 rounded-xl">
                          <span className="text-[10px] text-slate-400">Check-In</span>
                          <div className="font-bold text-slate-800 font-mono">{clockInTime}</div>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-xl">
                          <span className="text-[10px] text-slate-400">Check-Out</span>
                          <div className="font-bold text-slate-800 font-mono">{clockOutTime}</div>
                        </div>
                      </div>
                    </div>

                    {/* Leave Balances Carousel */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-800">Leave Quotas</span>
                        <button
                          onClick={() => setShowApplyModal(true)}
                          className="text-[11px] text-purple-700 hover:text-purple-800 font-bold"
                        >
                          + Apply Leave
                        </button>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        {INITIAL_LEAVE_BALANCES.slice(0, 3).map((b) => (
                          <div key={b.leaveTypeId} className="p-2.5 rounded-xl bg-white border border-slate-200 text-center">
                            <div className="text-sm font-black font-mono text-slate-900">{b.availableDays}</div>
                            <div className="text-[9px] text-slate-500 truncate font-medium">{b.leaveTypeName}</div>
                            <div className="text-[8px] text-slate-400 font-mono">of {b.allocatedDays}d</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Upcoming Holiday */}
                    <div className="p-3 rounded-2xl bg-white border border-slate-200 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[9px] font-mono uppercase font-bold text-purple-700">Upcoming Holiday</div>
                        <div className="text-xs font-bold text-slate-900 truncate">Deepavali Festival Day</div>
                        <div className="text-[10px] text-slate-500">Sunday, Nov 08 • Mercantile</div>
                      </div>
                    </div>
                  </>
                )}

                {/* MANAGER HOME */}
                {activeRole === 'Manager' && currentTab === 'home' && (
                  <>
                    <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-xs">
                      <div className="font-bold text-slate-900 mb-2">Team Attendance Today</div>
                      <div className="grid grid-cols-4 gap-1 text-center">
                        <div className="bg-slate-50 p-1.5 rounded-lg">
                          <div className="font-mono font-bold text-slate-800">42</div>
                          <div className="text-[8px] text-slate-400">Total</div>
                        </div>
                        <div className="bg-emerald-50 p-1.5 rounded-lg border border-emerald-100">
                          <div className="font-mono font-bold text-emerald-700">38</div>
                          <div className="text-[8px] text-emerald-600">Present</div>
                        </div>
                        <div className="bg-amber-50 p-1.5 rounded-lg border border-amber-100">
                          <div className="font-mono font-bold text-amber-700">3</div>
                          <div className="text-[8px] text-amber-600">Late</div>
                        </div>
                        <div className="bg-purple-50 p-1.5 rounded-lg border border-purple-100">
                          <div className="font-mono font-bold text-purple-700">1</div>
                          <div className="text-[8px] text-purple-600">Leave</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-800">Pending Approvals</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">
                          {leaveRequests.filter((r) => r.status === 'Pending').length} Pending
                        </span>
                      </div>

                      <div className="space-y-2">
                        {leaveRequests
                          .filter((r) => r.status === 'Pending')
                          .map((req) => (
                            <div key={req.id} className="p-3 rounded-2xl bg-white border border-slate-200 space-y-1.5 text-xs">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-slate-900">{req.employeeName}</span>
                                <span className="text-[10px] text-purple-700 font-mono">{req.leaveTypeName}</span>
                              </div>
                              <p className="text-[11px] text-slate-600 italic">"{req.reason}"</p>
                              <div className="flex items-center gap-2 pt-1">
                                <button
                                  onClick={() => handleApproveLeave(req.id)}
                                  className="flex-1 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] flex items-center justify-center gap-1"
                                >
                                  <Check className="w-3 h-3" />
                                  <span>Approve</span>
                                </button>
                                <button
                                  onClick={() => handleRejectLeave(req.id)}
                                  className="flex-1 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10px]"
                                >
                                  Reject
                                </button>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </>
                )}

                {/* ADMIN HOME */}
                {activeRole === 'Admin' && currentTab === 'home' && (
                  <div className="space-y-3">
                    <div className="p-4 rounded-2xl bg-white border border-slate-200">
                      <div className="text-[10px] font-mono uppercase font-bold text-purple-700">
                        Admin Executive Hub
                      </div>
                      <div className="text-sm font-bold text-slate-900 mt-1 mb-3">
                        216 Active Employees Across 3 Branches
                      </div>

                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between p-2 rounded-lg bg-slate-50">
                          <span className="text-slate-500">Monthly Payroll Run</span>
                          <span className="font-mono font-bold text-slate-800">Rs. 68.45M</span>
                        </div>
                        <div className="flex justify-between p-2 rounded-lg bg-slate-50">
                          <span className="text-slate-500">EPF 12% + ETF 3%</span>
                          <span className="font-mono font-bold text-emerald-700">Rs. 10.26M</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* PAYSLIPS TAB */}
                {currentTab === 'payslips' && (
                  <div className="space-y-2.5">
                    <div className="text-xs font-bold text-slate-900">Itemized Payslips</div>
                    {INITIAL_PAYSLIPS.map((slip) => (
                      <div key={slip.id} className="p-3 rounded-2xl bg-white border border-slate-200 space-y-1.5 text-xs">
                        <div className="flex justify-between font-bold text-slate-900">
                          <span>{slip.periodName}</span>
                          <span className="text-emerald-700 text-[10px] font-mono">{slip.status}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>Basic Salary:</span>
                          <span className="font-mono">Rs. {slip.basicSalary.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>EPF Employee (8%):</span>
                          <span className="font-mono text-rose-600">-Rs. {slip.epfEmployee.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between font-bold text-purple-700 pt-1 border-t border-slate-100">
                          <span>Net Take-Home:</span>
                          <span className="font-mono">Rs. {slip.netPay.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* ATTENDANCE TAB */}
                {currentTab === 'attendance' && (
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-900">Attendance Log</div>
                    {INITIAL_ATTENDANCE.slice(0, 5).map((att) => (
                      <div key={att.id} className="p-2.5 rounded-xl bg-white border border-slate-200 flex justify-between items-center text-xs">
                        <div>
                          <div className="font-bold text-slate-800">{att.employeeName}</div>
                          <div className="text-[10px] text-slate-400">{att.checkInTime || '--:--'}</div>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          att.status === 'Present' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                        }`}>
                          {att.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

              </div>

              {/* Bottom Phone Nav */}
              <div className="h-14 bg-white border-t border-slate-200/80 px-4 flex items-center justify-around z-20">
                <button
                  onClick={() => setCurrentTab('home')}
                  className={`flex flex-col items-center gap-0.5 ${currentTab === 'home' ? 'text-purple-700 font-bold' : 'text-slate-400'}`}
                >
                  <Home className="w-4 h-4" />
                  <span className="text-[9px]">Home</span>
                </button>

                <button
                  onClick={() => setCurrentTab('attendance')}
                  className={`flex flex-col items-center gap-0.5 ${currentTab === 'attendance' ? 'text-purple-700 font-bold' : 'text-slate-400'}`}
                >
                  <Clock className="w-4 h-4" />
                  <span className="text-[9px]">Log</span>
                </button>

                <button
                  onClick={() => setShowApplyModal(true)}
                  className="flex flex-col items-center gap-0.5 text-purple-700 -mt-3"
                >
                  <div className="w-9 h-9 rounded-full bg-purple-700 text-white flex items-center justify-center shadow-sm">
                    <Plus className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] font-bold text-purple-700">Leave</span>
                </button>

                <button
                  onClick={() => setCurrentTab('payslips')}
                  className={`flex flex-col items-center gap-0.5 ${currentTab === 'payslips' ? 'text-purple-700 font-bold' : 'text-slate-400'}`}
                >
                  <FileText className="w-4 h-4" />
                  <span className="text-[9px]">Payslips</span>
                </button>
              </div>

              {/* Leave Modal inside phone */}
              {showApplyModal && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-2xs z-30 flex items-center justify-center p-4">
                  <div className="w-full bg-white rounded-3xl p-4 border border-slate-200 shadow-xl text-left">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
                      <span className="text-xs font-bold text-slate-900">Apply for Leave</span>
                      <button onClick={() => setShowApplyModal(false)} className="text-slate-400">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <form onSubmit={handleApplyLeaveSubmit} className="space-y-3 text-xs">
                      <div>
                        <label className="text-[10px] text-slate-500 font-semibold">Type</label>
                        <select
                          value={newLeaveType}
                          onChange={(e) => setNewLeaveType(e.target.value)}
                          className="w-full mt-1 bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs"
                        >
                          <option value="Casual Leave">Casual Leave (5d avail)</option>
                          <option value="Annual Leave">Annual Leave (9d avail)</option>
                          <option value="Medical Leave">Medical Leave (13d avail)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-500 font-semibold">Days</label>
                        <input
                          type="number"
                          min="1"
                          max="5"
                          value={newLeaveDays}
                          onChange={(e) => setNewLeaveDays(Number(e.target.value))}
                          className="w-full mt-1 bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-500 font-semibold">Reason</label>
                        <textarea
                          rows={2}
                          value={newLeaveReason}
                          onChange={(e) => setNewLeaveReason(e.target.value)}
                          className="w-full mt-1 bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs resize-none"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2 rounded-xl bg-purple-700 text-white font-bold text-xs"
                      >
                        Submit Request
                      </button>
                    </form>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
