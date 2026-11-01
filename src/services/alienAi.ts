export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  badge?: string;
}

export function generateAiResponse(userPrompt: string): string {
  const query = userPrompt.toLowerCase();

  if (query.includes('leave') || query.includes('balance') || query.includes('vacation')) {
    return "Based on your active policy: You currently have 9 days of Annual Leave, 5 days of Casual Leave, and 13 days of Medical Leave remaining for calendar year 2026. Would you like me to draft a leave application for approval?";
  }

  if (query.includes('epf') || query.includes('etf') || query.includes('salary') || query.includes('tax') || query.includes('payroll')) {
    return "AlienHR executes deterministic statutory payroll compliant with the Department of Labour: EPF Employee contribution is 8%, EPF Employer is 12%, and ETF Employer is 3%. All APIT progressive tax tables are evaluated automatically during the monthly batch.";
  }

  if (query.includes('attendance') || query.includes('check in') || query.includes('geofence') || query.includes('gps')) {
    return "AlienHR geofenced attendance uses precision high-accuracy mobile GPS validation. Your device matches the Colombo Tech Hub geofence perimeter (150m radius). Check-in is validated cryptographically with zero hardware fingerprint spoofing.";
  }

  if (query.includes('holiday') || query.includes('poya') || query.includes('day off')) {
    return "Upcoming company holiday: Deepavali Festival Day on Sunday, Nov 08, followed by Ill Full Moon Poya Day on Monday, Nov 23, 2026 (Mercantile & Public Holiday).";
  }

  if (query.includes('admin') || query.includes('manager') || query.includes('headcount')) {
    return "Current live workforce metrics: 216 total headcount across 3 branches. Today's attendance rate is 94.2% with 186 present, 14 late, 8 on approved leave, and 8 unscheduled absent.";
  }

  return "AlienHR AI Copilot is active. I can assist you with automated leave booking, payslip breakdown queries, GPS geofence diagnostics, or Sri Lankan statutory payroll compliance. How can I help you today?";
}

