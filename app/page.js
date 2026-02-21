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
    { id: '100015', type: 'Bulk', product: 'Welcome Kit', deadline: 'May 22', deadlineWarning: true, status: 'New', statusColor: 'new', client: 'Acme Corp', qty: 500, amount: '₹12,50,000' },
    { id: '100016', type: 'Sample', product: 'Welcome Kit', deadline: 'May 22', deadlineWarning: false, status: 'Inprocess', statusColor: 'inprocess', client: 'TechStart', qty: 10, amount: '₹25,000' },
    { id: '100017', type: 'Bulk', product: 'Welcome Kit', deadline: 'May 22', deadlineWarning: false, status: 'Dispatched', statusColor: 'dispatched', client: 'GlobalTech', qty: 200, amount: '₹5,00,000' },
    { id: '100018', type: 'Bulk', product: 'Welcome Kit', deadline: 'May 22', deadlineWarning: false, status: 'New', statusColor: 'new', client: 'StartupHub', qty: 100, amount: '₹2,50,000' },
    { id: '100019', type: 'Bulk', product: 'Welcome Kit', deadline: 'May 22', deadlineWarning: false, status: 'New', statusColor: 'new', client: 'MegaCorp', qty: 350, amount: '₹8,75,000' },
    { id: '100020', type: 'Bulk', product: 'Welcome Kit', deadline: 'May 22', deadlineWarning: false, status: 'New', statusColor: 'new', client: 'InfoSys', qty: 150, amount: '₹3,75,000' },
    { id: '100021', type: 'Bulk', product: 'Welcome Kit', deadline: 'May 22', deadlineWarning: false, status: 'New', statusColor: 'new', client: 'FinFirst', qty: 80, amount: '₹2,00,000' },
    { id: '100022', type: 'Bulk', product: 'Welcome Kit', deadline: 'May 22', deadlineWarning: false, status: 'New', statusColor: 'new', client: 'EduTech', qty: 400, amount: '₹10,00,000' },
];

const mockupData = [
    { id: '100015', type: 'Simple', product: 'Welcome Kit', deadline: 'May 22', status: 'New', statusColor: 'new', client: 'Acme Corp', designer: 'Ravi K.' },
    { id: '100016', type: 'Full', product: 'Welcome Kit', deadline: 'May 22', status: 'Submitted', statusColor: 'submitted', client: 'TechStart', designer: 'Priya S.' },
    { id: '100017', type: 'Simple', product: 'Welcome Kit', deadline: 'May 22', status: 'Feedback', statusColor: 'feedback', client: 'GlobalTech', designer: 'Amit P.' },
    { id: '100018', type: 'Simple', product: 'Welcome Kit', deadline: 'May 22', status: 'New', statusColor: 'new', client: 'StartupHub', designer: 'Sneha R.' },
    { id: '100019', type: 'Simple', product: 'Welcome Kit', deadline: 'May 22', status: 'New', statusColor: 'new', client: 'MegaCorp', designer: 'Vikram S.' },
    { id: '100020', type: 'Simple', product: 'Welcome Kit', deadline: 'May 22', status: 'New', statusColor: 'new', client: 'InfoSys', designer: 'Ravi K.' },
    { id: '100021', type: 'Simple', product: 'Welcome Kit', deadline: 'May 22', status: 'New', statusColor: 'new', client: 'FinFirst', designer: 'Priya S.' },
    { id: '100022', type: 'Simple', product: 'Welcome Kit', deadline: 'May 22', status: 'New', statusColor: 'new', client: 'EduTech', designer: 'Amit P.' },
];

function CloseIcon() {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>;
}

function OrderDetailModal({ order, onClose }) {
    if (!order) return null;
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Order Details — {order.id}</h2>
                    <button className="modal-close" onClick={onClose}><CloseIcon /></button>
                </div>
                <div className="modal-body">
                    <div className="detail-grid">
                        <div className="detail-item"><span className="detail-label">Order ID</span><span className="detail-value">{order.id}</span></div>
                        <div className="detail-item"><span className="detail-label">Order Type</span><span className="detail-value">{order.type}</span></div>
                        <div className="detail-item"><span className="detail-label">Product</span><span className="detail-value">{order.product}</span></div>
                        <div className="detail-item"><span className="detail-label">Client</span><span className="detail-value">{order.client}</span></div>
                        <div className="detail-item"><span className="detail-label">Quantity</span><span className="detail-value">{order.qty}</span></div>
                        <div className="detail-item"><span className="detail-label">Amount</span><span className="detail-value" style={{ fontWeight: 700, color: '#1A1A2E' }}>{order.amount}</span></div>
                        <div className="detail-item"><span className="detail-label">Deadline</span><span className="detail-value" style={order.deadlineWarning ? { color: '#EF4444', fontWeight: 700 } : {}}>{order.deadline}</span></div>
                        <div className="detail-item"><span className="detail-label">Status</span><span className="detail-value"><span className="status-badge"><span className={`status-dot ${order.statusColor}`} />{order.status}</span></span></div>
                        <div className="detail-divider" />
                        <div className="detail-item full-width">
                            <span className="detail-label">Order Timeline</span>
                            <div className="timeline">
                                <div className="timeline-item"><span className="timeline-dot gold" /><span className="timeline-text"><strong>Order Created</strong> — Order was placed by {order.client}<span className="time">May 15, 2025</span></span></div>
                                {order.status !== 'New' && <div className="timeline-item"><span className="timeline-dot blue" /><span className="timeline-text"><strong>Processing Started</strong> — Production began<span className="time">May 17, 2025</span></span></div>}
                                {order.status === 'Dispatched' && <div className="timeline-item"><span className="timeline-dot green" /><span className="timeline-text"><strong>Dispatched</strong> — Shipped via courier<span className="time">May 20, 2025</span></span></div>}
                                {order.status === 'New' && <div className="timeline-item"><span className="timeline-dot gray" /><span className="timeline-text">Awaiting processing</span></div>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn-secondary" onClick={onClose}>Close</button>
                    <button className="btn-primary">Update Status</button>
                </div>
            </div>
        </div>
    );
}

function MockupDetailModal({ mockup, onClose }) {
    if (!mockup) return null;
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Mockup Details — {mockup.id}</h2>
                    <button className="modal-close" onClick={onClose}><CloseIcon /></button>
                </div>
                <div className="modal-body">
                    <div className="detail-grid">
                        <div className="detail-item"><span className="detail-label">Mockup ID</span><span className="detail-value">{mockup.id}</span></div>
                        <div className="detail-item"><span className="detail-label">Custom Type</span><span className="detail-value">{mockup.type}</span></div>
                        <div className="detail-item"><span className="detail-label">Product</span><span className="detail-value">{mockup.product}</span></div>
                        <div className="detail-item"><span className="detail-label">Client</span><span className="detail-value">{mockup.client}</span></div>
                        <div className="detail-item"><span className="detail-label">Designer</span><span className="detail-value">{mockup.designer}</span></div>
                        <div className="detail-item"><span className="detail-label">Deadline</span><span className="detail-value">{mockup.deadline}</span></div>
                        <div className="detail-item"><span className="detail-label">Status</span><span className="detail-value"><span className="status-badge"><span className={`status-dot ${mockup.statusColor}`} />{mockup.status}</span></span></div>
                        <div className="detail-divider" />
                        <div className="detail-item full-width">
                            <span className="detail-label">Mockup Timeline</span>
                            <div className="timeline">
                                <div className="timeline-item"><span className="timeline-dot gold" /><span className="timeline-text"><strong>Request Created</strong> — Mockup requested by {mockup.client}<span className="time">May 14, 2025</span></span></div>
                                {mockup.status === 'Submitted' && <div className="timeline-item"><span className="timeline-dot blue" /><span className="timeline-text"><strong>Design Submitted</strong> — First draft uploaded by {mockup.designer}<span className="time">May 18, 2025</span></span></div>}
                                {mockup.status === 'Feedback' && <><div className="timeline-item"><span className="timeline-dot blue" /><span className="timeline-text"><strong>Design Submitted</strong><span className="time">May 18, 2025</span></span></div><div className="timeline-item"><span className="timeline-dot green" /><span className="timeline-text"><strong>Feedback Received</strong> — Client provided feedback<span className="time">May 20, 2025</span></span></div></>}
                                {mockup.status === 'New' && <div className="timeline-item"><span className="timeline-dot gray" /><span className="timeline-text">Awaiting designer assignment</span></div>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn-secondary" onClick={onClose}>Close</button>
                    <button className="btn-primary">Upload Mockup</button>
                </div>
            </div>
        </div>
    );
}

export default function Dashboard() {
    const [orderTypeFilter, setOrderTypeFilter] = useState('All');
    const [orderStatusFilter, setOrderStatusFilter] = useState('All');
    const [mockupTypeFilter, setMockupTypeFilter] = useState('All');
    const [mockupStatusFilter, setMockupStatusFilter] = useState('All');
    const [orderSearch, setOrderSearch] = useState('');
    const [mockupSearch, setMockupSearch] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedMockup, setSelectedMockup] = useState(null);

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
                                    <td><button className={`view-btn ${order.deadlineWarning ? 'gold' : order.statusColor === 'new' ? 'red' : 'gold'}`} onClick={() => setSelectedOrder(order)}>View</button></td>
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
                                    <td><button className="view-btn gold" onClick={() => setSelectedMockup(mockup)}>View</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination"><button className="page-btn">&lt;</button><button className="page-btn active">1</button><button className="page-btn">&gt;</button><span className="page-info">of 25</span></div>
                </div>
            </div>

            {/* Modals */}
            {selectedOrder && <OrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />}
            {selectedMockup && <MockupDetailModal mockup={selectedMockup} onClose={() => setSelectedMockup(null)} />}
        </>
    );
}
