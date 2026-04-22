import { TrendingUp, TrendingDown, Wallet, FileText, ChevronRight, Circle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts';

// Mock data for The Pulse
const pulseData = [
  { month: 'Oct', income: 8200 },
  { month: 'Nov', income: 12400 },
  { month: 'Dec', income: 9800 },
  { month: 'Jan', income: 15600 },
  { month: 'Feb', income: 11200 },
  { month: 'Mar', income: 13800 },
  { month: 'Apr', income: 14200 },
];

// Mock data for Tax Nest donut
const taxData = [
  { name: 'Stashed', value: 18500 },
  { name: 'Remaining', value: 11500 },
];

// Mock invoice data
const invoices = [
  { id: 1, client: 'Acme Studios', amount: 4500, status: 'Sent', dueDate: 'Apr 30' },
  { id: 2, client: 'Baseline Design Co.', amount: 7200, status: 'Settled', dueDate: 'Apr 15' },
  { id: 3, client: 'Craft & Co.', amount: 3800, status: 'Sent', dueDate: 'May 5' },
  { id: 4, client: 'Division Partners', amount: 5600, status: 'Overdue', dueDate: 'Apr 10' },
  { id: 5, client: 'Elevate Agency', amount: 2900, status: 'Sent', dueDate: 'May 12' },
];

const GREEN_PRIMARY = '#16a34a';
const GREEN_LIGHT = '#dcfce7';
const COLORS = [GREEN_PRIMARY, GREEN_LIGHT];

export default function App() {
  const currentMonth = 'April 2026';
  const monthlyRunway = 14200;
  const previousMonth = 13800;
  const runwayChange = ((monthlyRunway - previousMonth) / previousMonth * 100).toFixed(1);
  const taxStashed = 18500;
  const taxTarget = 30000;
  const taxPercent = ((taxStashed / taxTarget) * 100).toFixed(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 px-8 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-16">
          <div className="flex items-baseline justify-between">
            <div>
              <h1 className="text-[2.5rem] tracking-[-0.04em] font-light text-green-900 mb-2">Finance</h1>
              <p className="text-sm text-green-700 tracking-[-0.01em]">{currentMonth}</p>
            </div>
            <button className="px-5 py-2.5 text-sm border border-green-300 text-green-800 bg-green-50 hover:bg-green-100 transition-colors tracking-[-0.01em] rounded-md shadow-sm">
              New Invoice
            </button>
          </div>
        </header>

        {/* Monthly Runway Card */}
        <div className="bg-white rounded-xl shadow-[0_4px_24px_rgba(22,163,74,0.1)] p-10 mb-8 border border-green-100">
          <div className="flex items-start justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.08em] text-green-600 mb-3">Monthly Runway</p>
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-light tracking-[-0.03em] tabular-nums text-green-900">
                  ${monthlyRunway.toLocaleString()}
                </span>
                <div className="flex items-center gap-1.5 text-sm text-green-700">
                  {Number(runwayChange) > 0 ? (
                    <TrendingUp className="w-4 h-4" strokeWidth={1.5} />
                  ) : (
                    <TrendingDown className="w-4 h-4" strokeWidth={1.5} />
                  )}
                  <span className="tabular-nums">{runwayChange}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* The Pulse */}
          <div className="border-t border-green-100 pt-8">
            <p className="text-xs uppercase tracking-[0.08em] text-green-600 mb-6">The Pulse</p>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={pulseData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={GREEN_PRIMARY} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={GREEN_PRIMARY} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#dcfce7" vertical={false} />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#166534', fontSize: 11 }}
                  dy={8}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#166534', fontSize: 11 }}
                  tickFormatter={(value) => `$${value / 1000}k`}
                  dx={-8}
                />
                <Tooltip
                  contentStyle={{
                    background: 'white',
                    border: '1px solid #bbf7d0',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    fontSize: '12px'
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Income']}
                />
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke={GREEN_PRIMARY}
                  strokeWidth={2}
                  fill="url(#incomeGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* The Tax Nest */}
          <div className="bg-white rounded-xl shadow-[0_4px_24px_rgba(22,163,74,0.1)] p-8 border border-green-100">
            <div className="flex items-center gap-2 mb-6">
              <Wallet className="w-4 h-4 text-green-600" strokeWidth={1.5} />
              <p className="text-xs uppercase tracking-[0.08em] text-green-600">The Tax Nest</p>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-light tracking-[-0.02em] tabular-nums text-green-900">
                  ${taxStashed.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-green-700">
                <span className="tabular-nums">{taxPercent}%</span> of ${taxTarget.toLocaleString()} target
              </p>
            </div>

            <div className="flex justify-center mb-4">
              <ResponsiveContainer width={140} height={140}>
                <PieChart>
                  <Pie
                    data={taxData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={60}
                    paddingAngle={0}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {taxData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} stroke="none" />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Circle className="w-2 h-2 fill-[#16a34a] text-[#16a34a]" />
                <span className="text-green-700">Stashed</span>
              </div>
              <div className="flex items-center gap-2">
                <Circle className="w-2 h-2 fill-[#dcfce7] text-[#dcfce7]" />
                <span className="text-green-700">To Go</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-[0_4px_24px_rgba(22,163,74,0.1)] p-8 lg:col-span-2 border border-green-100">
            <p className="text-xs uppercase tracking-[0.08em] text-green-600 mb-6">Overview</p>

            <div className="grid grid-cols-3 gap-8">
              <div>
                <p className="text-xs text-green-700 mb-2">Active Projects</p>
                <p className="text-3xl font-light tracking-[-0.02em] tabular-nums text-green-900">5</p>
              </div>
              <div>
                <p className="text-xs text-green-700 mb-2">Outstanding</p>
                <p className="text-3xl font-light tracking-[-0.02em] tabular-nums text-green-900">$16,100</p>
              </div>
              <div>
                <p className="text-xs text-green-700 mb-2">Avg. Invoice</p>
                <p className="text-3xl font-light tracking-[-0.02em] tabular-nums text-green-900">$4,800</p>
              </div>
            </div>

            <div className="border-t border-green-100 mt-8 pt-6">
              <button className="text-xs text-green-700 hover:text-green-900 transition-colors flex items-center gap-1">
                View All Reports
                <ChevronRight className="w-3 h-3" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        {/* Project Cards */}
        <div className="bg-white rounded-xl shadow-[0_4px_24px_rgba(22,163,74,0.1)] p-8 border border-green-100">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-green-600" strokeWidth={1.5} />
              <p className="text-xs uppercase tracking-[0.08em] text-green-600">Active Invoices</p>
            </div>
            <button className="text-xs text-green-700 hover:text-green-900 transition-colors">
              See All
            </button>
          </div>

          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between py-5 border-b border-green-100 last:border-0 hover:bg-green-50 -mx-4 px-4 transition-colors cursor-pointer rounded-lg"
              >
                <div className="flex-1">
                  <p className="text-sm text-green-900 mb-1 tracking-[-0.01em]">{invoice.client}</p>
                  <p className="text-xs text-green-700">Due {invoice.dueDate}</p>
                </div>

                <div className="flex items-center gap-6">
                  <span
                    className={`
                      text-xs px-3 py-1 tracking-[0.03em] rounded-full
                      ${invoice.status === 'Settled' ? 'bg-green-100 text-green-800' : ''}
                      ${invoice.status === 'Sent' ? 'bg-green-100 text-green-700' : ''}
                      ${invoice.status === 'Overdue' ? 'bg-red-100 text-red-600' : ''}
                    `}
                  >
                    {invoice.status}
                  </span>

                  <span className="text-base font-['JetBrains_Mono'] tabular-nums text-green-900 min-w-[100px] text-right">
                    ${invoice.amount.toLocaleString()}
                  </span>

                  <ChevronRight className="w-4 h-4 text-green-300" strokeWidth={1.5} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
