'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { week: 'W1', applications: 2, interviews: 0 },
  { week: 'W2', applications: 5, interviews: 1 },
  { week: 'W3', applications: 8, interviews: 2 },
  { week: 'W4', applications: 12, interviews: 3 },
  { week: 'W5', applications: 15, interviews: 4 },
  { week: 'W6', applications: 19, interviews: 6 },
  { week: 'W7', applications: 23, interviews: 8 },
  { week: 'W8', applications: 29, interviews: 10 },
];

const BLUE = '#3b82f6';
const AMBER = '#f59e0b';

export function ActivityChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
        <defs>
          <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={BLUE} stopOpacity={0.15} />
            <stop offset="95%" stopColor={BLUE} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorInterviews" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={AMBER} stopOpacity={0.15} />
            <stop offset="95%" stopColor={AMBER} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis dataKey="week" tick={{ fontSize: 11 }} className="text-muted-foreground" />
        <YAxis tick={{ fontSize: 11 }} className="text-muted-foreground" />
        <Tooltip
          contentStyle={{
            background: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '12px',
          }}
        />
        <Area
          type="monotone"
          dataKey="applications"
          name="Applications"
          stroke={BLUE}
          strokeWidth={2}
          fill="url(#colorApps)"
        />
        <Area
          type="monotone"
          dataKey="interviews"
          name="Interviews"
          stroke={AMBER}
          strokeWidth={2}
          fill="url(#colorInterviews)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
