"use client"

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LabelList, Legend
} from 'recharts'

export function DashboardCharts({ revenueData }: { revenueData: any[] }) {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={revenueData}
          margin={{ top: 15, right: 15, left: -10, bottom: 5 }}
          barCategoryGap="40%"
        >
          {/* Grid lines like drafting paper */}
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#E2E8F0"
          />

          {/* X Axis - Month labels */}
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 12,
              fill: '#64748B',
              fontFamily: 'Space Mono, monospace'
            }}
            dy={10}
          />

          {/* Y Axis - Value ticks */}
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 12,
              fill: '#64748B',
              fontFamily: 'Space Mono, monospace'
            }}
          />

          {/* Tooltip */}
          <Tooltip
            contentStyle={{
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              backgroundColor: '#FFFFFF',
              padding: '8px 12px'
            }}
            labelStyle={{
              fontSize: '12px',
              fontWeight: 600,
              fontFamily: 'Space Mono, monospace',
              fill:'#1E293B'
            }}
            formatter={(value) => `${value} mesaj`}
          />

          {/* Bars - Technical drawing style */}
          <Bar
            dataKey="value"
            fill="#0F172A"
            radius={[2, 2, 0, 0]}
            barSize={20}
          >
            {/* Add value labels on bars */}
            <LabelList
              dataKey="value"
              position="insideTop"
              offset={8}
              style={{
                fill: '#FFFFFF',
                fontSize: 10,
                fontWeight: 600,
                fontFamily: 'Space Mono, monospace'
              }}
            />
          </Bar>

          {/* Legend */}
          <Legend
            verticalAlign="bottom"
            align="center"
            iconType="square"
            iconSize={12}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}