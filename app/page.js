'use client';

import { useState } from 'react';
import Link from 'next/link';

const statCards = [
    {
        label: 'New Orders', value: '05', color: 'gold', link: '/orders',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" /></svg>
    },
    {
        label: 'Live Products', value: '128', color: 'blue', link: '/product-management',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>
    },
    {
        label: 'Mockup Requests', value: '28', color: 'green', link: '/mockup-management',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
    },
    {
        label: 'Pending Payouts', value: '12', color: 'purple', link: '/payments',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>
    },
    {
        label: 'Orders / Fulfillment', value: '50', color: 'dark', link: '/orders',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
    },
];

const ordersData = [
    { id: '100015', type: 'Bulk', product: 'Welcome Kit', deadline: 'May 22', deadlineWarning: true, status: 'New', statusColor: 'new' },
    { id: '100016', type: 'Sample', product: 'Welcome Kit', deadline: 'May 22', deadlineWarning: false, status: 'Inprocess', statusColor: 'inprocess' },
    { id: '100017', type: 'Bulk', product: 'Welcome Kit', deadline: 'May 22', deadlineWarning: false, status: 'Dispatched', statusColor: 'dispatched' },
    { id: '100018', type: 'Bulk', product: 'Welcome Kit', deadline: 'May 22', deadlineWarning: false, status: 'New', statusColor: 'new' },
    { id: '100019', type: 'Bulk', product: 'Welcome Kit', deadline: 'May 22', deadlineWarning: false, status: 'New', statusColor: 'new' },
    { id: '100020', type: 'Bulk', product: 'Welcome Kit', deadline: 'May 22', deadlineWarning: false, status: 'New', statusColor: 'new' },
    { id: '100021', type: 'Bulk', product: 'Welcome Kit', deadline: 'May 22', deadlineWarning: false, status: 'New', statusColor: 'new' },
    { id: '100022', type: 'Bulk', product: 'Welcome Kit', deadline: 'May 22', deadlineWarning: false, status: 'New', statusColor: 'new' },
];

const mockupData = [
    { id: '100015', type: 'Simple', product: 'Welcome Kit', deadline: 'May 22', status: 'New', statusColor: 'new' },
    { id: '100016', type: 'Full', product: 'Welcome Kit', deadline: 'May 22', status: 'Submitted', statusColor: 'submitted' },
    { id: '100017', type: 'Simple', product: 'Welcome Kit', deadline: 'May 22', status: 'Feedback', statusColor: 'feedback' },
    { id: '100018', type: 'Simple', product: 'Welcome Kit', deadline: 'May 22', status: 'New', statusColor: 'new' },
    { id: '100019', type: 'Simple', product: 'Welcome Kit', deadline: 'May 22', status: 'New', statusColor: 'new' },
    { id: '100020', type: 'Simple', product: 'Welcome Kit', deadline: 'May 22', status: 'New', statusColor: 'new' },
    { id: '100021', type: 'Simple', product: 'Welcome Kit', deadline: 'May 22', status: 'New', statusColor: 'new' },
    { id: '100022', type: 'Simple', product: 'Welcome Kit', deadline: 'May 22', status: 'New', statusColor: 'new' },
];

export default function Dashboard() {
    const [orderTypeFilter, setOrderTypeFilter] = useState('All');
    const [orderStatusFilter, setOrderStatusFilter] = useState('All');
    const [mockupTypeFilter, setMockupTypeFilter] = useState('All');
    const [mockupStatusFilter, setMockupStatusFilter] = useState('All');
    const [orderSearch, setOrderSearch] = useState('');
    const [mockupSearch, setMockupSearch] = useState('');

    const filteredOrders = ordersData.filter(o => {
        if (orderTypeFilter !== 'All' && o.type !== orderTypeFilter) return false;
        if (orderStatusFilter !== 'All' && o.status !== orderStatusFilter) return false;
        if (orderSearch && !o.id.includes(orderSearch)) return false;
        return true;
    });

    const filteredMockups = mockupData.filter(m => {
        if (mockupTypeFilter !== 'All' && m.type !== mockupTypeFilter) return false;
        if (mockupStatusFilter !== 'All' && m.status !== mockupStatusFilter) return false;
        if (mockupSearch && !m.id.includes(mockupSearch)) return false;
        return true;
    });

    return (
        <>
            <div className="page-header">
                <h1>Dashboard</h1>
                <div className="date-picker">
                    Wednesday, 15 May 2025
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </div>
            </div>

            <div className="stat-cards">
                {statCards.map((card, i) => (
                    <div key={i} className="stat-card">
                        <div className="stat-card-top">
                            <span className="stat-card-label">{card.label}</span>
                            <span className={`stat-card-icon ${card.color}`}>{card.icon}</span>
                        </div>
                        <span className="stat-card-value">{card.value}</span>
                        <Link href={card.link} className="stat-card-link">View Details &gt;</Link>
                    </div>
                ))}
            </div>

            <div className="tables-row">
                {/* Orders Table */}
                <div className="table-section">
                    <div className="table-header">
                        <h2>Orders</h2>
                        <div className="table-filters">
                            <div className="table-search">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                                <input type="text" placeholder="Search..." value={orderSearch} onChange={e => setOrderSearch(e.target.value)} />
                            </div>
                            <select className="filter-select" value={orderTypeFilter} onChange={e => setOrderTypeFilter(e.target.value)}>
                                <option value="All">Order Type</option><option value="Bulk">Bulk</option><option value="Sample">Sample</option>
                            </select>
                            <select className="filter-select" value={orderStatusFilter} onChange={e => setOrderStatusFilter(e.target.value)}>
                                <option value="All">Status</option><option value="New">New</option><option value="Inprocess">Inprocess</option><option value="Dispatched">Dispatched</option>
                            </select>
                        </div>
                    </div>
                    <table className="data-table">
                        <thead><tr><th>Order ID</th><th>Order Type</th><th>Product(s)</th><th>Deadline</th><th>Status</th><th>Action</th></tr></thead>
                        <tbody>
                            {filteredOrders.map((order, i) => (
                                <tr key={i}>
                                    <td>{order.id}</td><td>{order.type}</td><td>{order.product}</td>
                                    <td className={order.deadlineWarning ? 'deadline-warning' : ''}>{order.deadline}</td>
                                    <td><span className="status-badge"><span className={`status-dot ${order.statusColor}`} />{order.status}</span></td>
                                    <td><Link href={`/orders/view/${order.id}`} className={`view-btn ${order.deadlineWarning ? 'gold' : order.statusColor === 'new' ? 'red' : 'gold'}`}>View</Link></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination"><button className="page-btn">&lt;</button><button className="page-btn active">1</button><button className="page-btn">&gt;</button><span className="page-info">of 25</span></div>
                </div>

                {/* Mockup Requests Table */}
                <div className="table-section">
                    <div className="table-header">
                        <h2>Mockup Requests</h2>
                        <div className="table-filters">
                            <div className="table-search">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                                <input type="text" placeholder="Search..." value={mockupSearch} onChange={e => setMockupSearch(e.target.value)} />
                            </div>
                            <select className="filter-select" value={mockupTypeFilter} onChange={e => setMockupTypeFilter(e.target.value)}>
                                <option value="All">Custom Type</option><option value="Simple">Simple</option><option value="Full">Full</option>
                            </select>
                            <select className="filter-select" value={mockupStatusFilter} onChange={e => setMockupStatusFilter(e.target.value)}>
                                <option value="All">Status</option><option value="New">New</option><option value="Submitted">Submitted</option><option value="Feedback">Feedback</option>
                            </select>
                        </div>
                    </div>
                    <table className="data-table">
                        <thead><tr><th>Mockup ID</th><th>Custom Type</th><th>Product(s)</th><th>Deadline</th><th>Status</th><th>Action</th></tr></thead>
                        <tbody>
                            {filteredMockups.map((mockup, i) => (
                                <tr key={i}>
                                    <td>{mockup.id}</td><td>{mockup.type}</td><td>{mockup.product}</td><td>{mockup.deadline}</td>
                                    <td><span className="status-badge"><span className={`status-dot ${mockup.statusColor}`} />{mockup.status}</span></td>
                                    <td><Link href={`/mockup-management/view/${mockup.id}`} className="view-btn gold">View</Link></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination"><button className="page-btn">&lt;</button><button className="page-btn active">1</button><button className="page-btn">&gt;</button><span className="page-info">of 25</span></div>
                </div>
            </div>
        </>
    );
}
