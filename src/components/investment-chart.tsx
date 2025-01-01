"use client"

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

interface ChartData {
    year: number;
    month: number;
    total: string;
    contribution: string;
}

interface InvestmentChartProps {
    data: ChartData[];
    swpStartYear: number;
}

export function InvestmentChart({ data, swpStartYear }: InvestmentChartProps) {
    const currentYear = new Date().getFullYear();
    const formattedData = data.map((item, index) => ({
        time: '',
        total: parseFloat(item.total.replace(/[^0-9.-]+/g, "")),
        contribution: Math.max(parseFloat(item.contribution.replace(/[^0-9.-]+/g, "")), 0),
        phase: item.year < swpStartYear ? 'SIP Phase' : 'SWP Phase',
        year: item.year,
        index
    }));

    return (
        <div className="w-full h-[400px] mt-6">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={formattedData}
                    margin={{
                        top: 5,
                        right: 50,
                        left: 50,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="time"
                        hide={true}
                    />
                    <YAxis
                        domain={[0, 'auto']}
                        tickFormatter={(value) => 
                            new Intl.NumberFormat('en-US', {
                                notation: 'compact',
                                compactDisplay: 'short',
                            }).format(value)
                        }
                    />
                    <Tooltip
                        content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                                return (
                                    <div className="bg-white p-2 border rounded shadow">
                                        <p className="font-medium">Year {payload[0].payload.year}</p>
                                        {payload.map((entry: any) => (
                                            <p key={entry.name} style={{ color: entry.color }}>
                                                {entry.name}: {new Intl.NumberFormat('en-US', {
                                                    style: 'currency',
                                                    currency: 'PKR',
                                                    minimumFractionDigits: 0,
                                                    maximumFractionDigits: 0,
                                                }).format(Math.max(entry.value, 0))}
                                            </p>
                                        ))}
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="total"
                        name="Portfolio Value"
                        stroke="#8884d8"
                        dot={false}
                    />
                    <Line
                        type="monotone"
                        dataKey="contribution"
                        name="Monthly Contribution/Withdrawal"
                        stroke="#82ca9d"
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
} 