"use client"

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ReferenceArea,
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
    currency: string;
}

export function InvestmentChart({ data, swpStartYear, currency }: InvestmentChartProps) {
    const formattedData = data.map((item, index) => ({
        time: '',
        total: parseFloat(item.total.replace(/[^0-9.-]+/g, "")),
        monthlyFlow: item.year >= swpStartYear 
            ? -Math.abs(parseFloat(item.contribution.replace(/[^0-9.-]+/g, "")))
            : parseFloat(item.contribution.replace(/[^0-9.-]+/g, "")),
        phase: item.year < swpStartYear ? 'SIP Phase' : 'SWP Phase',
        year: item.year,
        index
    }));

    const firstIndex = 0;
    const swpStartIndex = formattedData.findIndex(d => d.year === swpStartYear);
    const lastIndex = formattedData.length - 1;

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
                    {/* SIP Phase - Green tint */}
                    <ReferenceArea
                        x1={firstIndex}
                        x2={swpStartIndex}
                        fill="#4ade8025"
                        fillOpacity={0.3}
                    />
                    {/* SWP Phase - Red tint */}
                    <ReferenceArea
                        x1={swpStartIndex}
                        x2={lastIndex}
                        fill="#ef444425"
                        fillOpacity={0.3}
                    />
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
                                const { year, monthlyFlow, phase } = payload[0].payload;
                                return (
                                    <div className="bg-white p-2 border rounded shadow">
                                        <p className="font-medium">Year {year}</p>
                                        <p style={{ color: "#8884d8" }}>
                                            Portfolio Value: {new Intl.NumberFormat('en-US', {
                                                style: 'currency',
                                                currency: currency,
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 0,
                                            }).format(Number(payload[0].value))}
                                        </p>
                                        <p style={{ color: phase === 'SIP Phase' ? "#82ca9d" : "#ff7070" }}>
                                            {phase === 'SIP Phase' ? 'Monthly Contribution' : 'Monthly Withdrawal'}: {
                                                new Intl.NumberFormat('en-US', {
                                                    style: 'currency',
                                                    currency: currency,
                                                    minimumFractionDigits: 0,
                                                    maximumFractionDigits: 0,
                                                }).format(monthlyFlow)
                                            }
                                        </p>
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="total"
                        name="Portfolio Value"
                        stroke="#8884d8"
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
} 