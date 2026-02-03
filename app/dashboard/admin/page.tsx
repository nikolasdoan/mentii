'use client';

import {
    LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { DollarSign, Users, TrendingUp, Activity, UserPlus } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const DATA_USER_GROWTH = [
    { name: 'Jan', active: 400, new: 240 },
    { name: 'Feb', active: 300, new: 139 },
    { name: 'Mar', active: 200, new: 980 },
    { name: 'Apr', active: 278, new: 390 },
    { name: 'May', active: 189, new: 480 },
    { name: 'Jun', active: 239, new: 380 },
    { name: 'Jul', active: 349, new: 430 },
];

const DATA_REVENUE = [
    { name: 'Jan', revenue: 4000, profit: 2400 },
    { name: 'Feb', revenue: 3000, profit: 1398 },
    { name: 'Mar', revenue: 2000, profit: 9800 },
    { name: 'Apr', revenue: 2780, profit: 3908 },
    { name: 'May', revenue: 1890, profit: 4800 },
    { name: 'Jun', revenue: 2390, profit: 3800 },
    { name: 'Jul', revenue: 3490, profit: 4300 },
];

const DATA_DISTRIBUTION = [
    { name: 'Mentors', value: 400 },
    { name: 'Mentees', value: 3000 },
];

export default function AdminDashboard() {
    return (
        <main className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">System Overview</h1>
                        <p className="text-gray-500 mt-1">Welcome back, Administrator. Here's what's happening today.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">Last updated: Just now</span>
                        <Button>
                            <Activity className="h-4 w-4 mr-2" />
                            Generate Report
                        </Button>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                <Users className="h-6 w-6" />
                            </div>
                            <Badge variant="secondary" className="bg-green-100 text-green-700">+12.5%</Badge>
                        </div>
                        <div className="text-3xl font-bold text-gray-900">3,400</div>
                        <div className="text-sm text-gray-500 font-medium">Total Users</div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                                <DollarSign className="h-6 w-6" />
                            </div>
                            <Badge variant="secondary" className="bg-green-100 text-green-700">+8.2%</Badge>
                        </div>
                        <div className="text-3xl font-bold text-gray-900">$124,500</div>
                        <div className="text-sm text-gray-500 font-medium">Total Revenue (GMV)</div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                                <TrendingUp className="h-6 w-6" />
                            </div>
                            <Badge variant="secondary" className="bg-green-100 text-green-700">+24%</Badge>
                        </div>
                        <div className="text-3xl font-bold text-gray-900">$18,675</div>
                        <div className="text-sm text-gray-500 font-medium">Net Profit (15%)</div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                                <UserPlus className="h-6 w-6" />
                            </div>
                            <Badge variant="secondary" className="bg-red-100 text-red-700">-2.1%</Badge>
                        </div>
                        <div className="text-3xl font-bold text-gray-900">89</div>
                        <div className="text-sm text-gray-500 font-medium">New Mentors (This Week)</div>
                    </div>
                </div>

                {/* Charts Row 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">User Growth & Activity</h3>
                        <div className="h-80 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={DATA_USER_GROWTH}>
                                    <defs>
                                        <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                                    <RechartsTooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Area type="monotone" dataKey="new" stroke="#8884d8" fillOpacity={1} fill="url(#colorNew)" name="New Users" strokeWidth={3} />
                                    <Area type="monotone" dataKey="active" stroke="#82ca9d" fillOpacity={0} fill="#82ca9d" name="Active Sessions" strokeWidth={3} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Revenue & Profit Taking</h3>
                        <div className="h-80 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={DATA_REVENUE}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                                    <RechartsTooltip
                                        cursor={{ fill: '#F3F4F6' }}
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Bar dataKey="revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Total Revenue" />
                                    <Bar dataKey="profit" fill="#10B981" radius={[4, 4, 0, 0]} name="Platform Profit" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Charts Row 2 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">User Distribution</h3>
                        <p className="text-sm text-gray-500 mb-6">Ratio of Mentors to Mentees</p>
                        <div className="h-64 flex-1">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={DATA_DISTRIBUTION}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {DATA_DISTRIBUTION.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex justify-center gap-6 mt-4">
                            {DATA_DISTRIBUTION.map((entry, index) => (
                                <div key={entry.name} className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                                    <span className="text-sm font-medium text-gray-700">{entry.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-gray-900">Recent Transactions</h3>
                            <Button variant="outline" size="sm">View All</Button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 rounded-l-lg">Transaction ID</th>
                                        <th className="px-4 py-3">User</th>
                                        <th className="px-4 py-3">Type</th>
                                        <th className="px-4 py-3">Amount</th>
                                        <th className="px-4 py-3">Platform Fee</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3 rounded-r-lg">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3 font-mono text-gray-500">#TRX-839{i}</td>
                                            <td className="px-4 py-3 font-medium text-gray-900">Alice Wang</td>
                                            <td className="px-4 py-3">Session Booking</td>
                                            <td className="px-4 py-3 text-gray-900 font-bold">$150.00</td>
                                            <td className="px-4 py-3 text-green-600 font-bold">+$22.50</td>
                                            <td className="px-4 py-3">
                                                <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200">Completed</Badge>
                                            </td>
                                            <td className="px-4 py-3 text-gray-500">Oct 2{i}, 2025</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
