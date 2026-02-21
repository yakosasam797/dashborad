'use client';

import { useState } from 'react';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const revenueData = [45, 62, 55, 78, 90, 85, 92, 110, 95, 105, 120, 98];
const ordersMonthly = [35, 42, 38, 55, 65, 60, 70, 80, 72, 78, 88, 75];
const topProducts = [
    { name: 'Welcome Kit', orders: 245, revenue: '₹6,12,500', growth: '+12%' },
    { name: 'Executive Diary', orders: 180, revenue: '₹1,53,000', growth: '+8%' },
    { name: 'Gift Hamper', orders: 120, revenue: '₹5,40,000', growth: '+22%' },
    { name: 'Custom Mug', orders: 310, revenue: '₹1,08,500', growth: '+5%' },
    { name: 'Branded T-Shirt', orders: 195, revenue: '₹1,26,750', growth: '-3%' },
];

export default function AnalyticsPage() {
    const [period, setPeriod] = useState('monthly');
    const maxRev = Math.max(...revenueData);

    return (
        <>
            <div className="page-header">
                <h1>Performance Analytics</h1>
                <select className="filter-select" value={period} onChange={e => setPeriod(e.target.value)}>
                    <option value="weekly">Weekly</option><option value="monthly">Monthly</option><option value="yearly">Yearly</option>
                </select>
            </div>

            <div className="metrics-row">
                <div className="metric-card"><span className="metric-label">Total Revenue</span><span className="metric-value">₹48.5L</span><span className="metric-change up">↑ 12.5% vs last month</span></div>
                <div className="metric-card"><span className="metric-label">Total Orders</span><span className="metric-value">856</span><span className="metric-change up">↑ 8.2% vs last month</span></div>
                <div className="metric-card"><span className="metric-label">Avg Order Value</span><span className="metric-value">₹5,665</span><span className="metric-change up">↑ 3.1% vs last month</span></div>
                <div className="metric-card"><span className="metric-label">Customer Retention</span><span className="metric-value">78%</span><span className="metric-change down">↓ 2.0% vs last month</span></div>
            </div>

            <div className="charts-grid">
                <div className="chart-card">
                    <h3>Revenue Trend (₹ in Lakhs)</h3>
                    <div className="chart-placeholder">
                        <div className="chart-bars">
                            {revenueData.map((v, i) => (
                                <div key={i} className={`chart-bar ${i % 2 === 0 ? 'gold' : 'blue'}`} style={{ height: `${(v / maxRev) * 100}%` }} title={`₹${v}L`} />
                            ))}
                        </div>
                        <div className="chart-labels">
                            {months.map((m, i) => <span key={i}>{m}</span>)}
                        </div>
                    </div>
                </div>
                <div className="chart-card">
                    <h3>Orders Per Month</h3>
                    <div className="chart-placeholder">
                        <div className="chart-bars">
                            {ordersMonthly.map((v, i) => (
                                <div key={i} className={`chart-bar ${i % 3 === 0 ? 'green' : i % 3 === 1 ? 'purple' : 'gold'}`} style={{ height: `${(v / Math.max(...ordersMonthly)) * 100}%` }} title={`${v} orders`} />
                            ))}
                        </div>
                        <div className="chart-labels">
                            {months.map((m, i) => <span key={i}>{m}</span>)}
                        </div>
                    </div>
                </div>
            </div>

            <div className="table-section full-width">
                <div className="table-header"><h2>Top Products by Orders</h2></div>
                <table className="data-table">
                    <thead><tr><th>#</th><th>Product</th><th>Orders</th><th>Revenue</th><th>Growth</th></tr></thead>
                    <tbody>
                        {topProducts.map((p, i) => (
                            <tr key={i}>
                                <td style={{ fontWeight: 700 }}>{i + 1}</td>
                                <td style={{ fontWeight: 600 }}>{p.name}</td>
                                <td>{p.orders}</td>
                                <td style={{ fontWeight: 600 }}>{p.revenue}</td>
                                <td><span className={`metric-change ${p.growth.startsWith('+') ? 'up' : 'down'}`}>{p.growth}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
