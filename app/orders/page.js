'use client';

import { useState } from 'react';

const ordersData = [
    { id: 'ORD-10001', type: 'Bulk', product: 'Welcome Kit', qty: 500, deadline: 'May 22, 2025', status: 'New', client: 'Acme Corp', amount: '₹12,50,000' },
    { id: 'ORD-10002', type: 'Sample', product: 'Executive Diary', qty: 10, deadline: 'May 18, 2025', status: 'Inprocess', client: 'TechStart Inc', amount: '₹8,500' },
    { id: 'ORD-10003', type: 'Bulk', product: 'Branded T-Shirt', qty: 1000, deadline: 'May 25, 2025', status: 'Dispatched', client: 'GlobalTech', amount: '₹6,50,000' },
    { id: 'ORD-10004', type: 'Bulk', product: 'Custom Mug', qty: 250, deadline: 'May 20, 2025', status: 'New', client: 'StartupHub', amount: '₹87,500' },
    { id: 'ORD-10005', type: 'Sample', product: 'Laptop Sleeve', qty: 5, deadline: 'May 19, 2025', status: 'Delivered', client: 'InfoSys Ltd', amount: '₹6,000' },
    { id: 'ORD-10006', type: 'Bulk', product: 'Gift Hamper', qty: 100, deadline: 'Jun 01, 2025', status: 'New', client: 'MegaCorp', amount: '₹4,50,000' },
    { id: 'ORD-10007', type: 'Bulk', product: 'Desk Organizer', qty: 75, deadline: 'Jun 05, 2025', status: 'Inprocess', client: 'FinanceFirst', amount: '₹1,35,000' },
    { id: 'ORD-10008', type: 'Sample', product: 'Water Bottle', qty: 3, deadline: 'May 16, 2025', status: 'Cancelled', client: 'HealthPlus', amount: '₹1,650' },
    { id: 'ORD-10009', type: 'Bulk', product: 'Badge Lanyard', qty: 2000, deadline: 'Jun 10, 2025', status: 'New', client: 'EventPro', amount: '₹3,00,000' },
    { id: 'ORD-10010', type: 'Bulk', product: 'Notebook Set', qty: 300, deadline: 'May 28, 2025', status: 'Dispatched', client: 'EduTech', amount: '₹1,44,000' },
];

const sampleRequests = [
    { id: 'SR-5001', product: 'Welcome Kit', requestedBy: 'Rajesh Kumar', date: 'May 10, 2025', qty: 2, status: 'Pending' },
    { id: 'SR-5002', product: 'Executive Diary', requestedBy: 'Priya Sharma', date: 'May 11, 2025', qty: 5, status: 'Approved' },
    { id: 'SR-5003', product: 'Custom Mug', requestedBy: 'Amit Patel', date: 'May 12, 2025', qty: 3, status: 'Shipped' },
    { id: 'SR-5004', product: 'Laptop Sleeve', requestedBy: 'Sneha Reddy', date: 'May 13, 2025', qty: 1, status: 'Pending' },
    { id: 'SR-5005', product: 'Gift Hamper', requestedBy: 'Vikram Singh', date: 'May 14, 2025', qty: 2, status: 'Rejected' },
];

export default function OrdersPage() {
    const [activeTab, setActiveTab] = useState('orders');
    const [typeFilter, setTypeFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [search, setSearch] = useState('');

    const filteredOrders = ordersData.filter(o => {
        if (typeFilter !== 'All' && o.type !== typeFilter) return false;
        if (statusFilter !== 'All' && o.status !== statusFilter) return false;
        if (search && !o.id.toLowerCase().includes(search.toLowerCase()) && !o.client.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
    });

    const filteredSamples = sampleRequests.filter(s => {
        if (search && !s.id.toLowerCase().includes(search.toLowerCase()) && !s.requestedBy.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
    });

    const getStatusClass = (status) => {
        switch (status) {
            case 'New': case 'Pending': return 'new';
            case 'Inprocess': return 'inprocess';
            case 'Dispatched': case 'Shipped': case 'Approved': return 'dispatched';
            case 'Delivered': return 'feedback';
            case 'Cancelled': case 'Rejected': return 'submitted';
            default: return 'new';
        }
    };

    return (
        <>
            <div className="page-header">
                <h1>Orders & Sample Requests</h1>
            </div>

            {/* Tabs */}
            <div className="page-tabs">
                <button className={`page-tab ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
                    All Orders ({ordersData.length})
                </button>
                <button className={`page-tab ${activeTab === 'samples' ? 'active' : ''}`} onClick={() => setActiveTab('samples')}>
                    Sample Requests ({sampleRequests.length})
                </button>
            </div>

            {/* Stats */}
            <div className="stat-cards" style={{ gridTemplateColumns: 'repeat(5, 1fr)', marginBottom: '24px' }}>
                {activeTab === 'orders' ? (
                    <>
                        <div className="stat-card"><div className="stat-card-top"><span className="stat-card-label">Total Orders</span></div><span className="stat-card-value">{ordersData.length}</span></div>
                        <div className="stat-card"><div className="stat-card-top"><span className="stat-card-label">New</span></div><span className="stat-card-value">{ordersData.filter(o => o.status === 'New').length}</span></div>
                        <div className="stat-card"><div className="stat-card-top"><span className="stat-card-label">In Process</span></div><span className="stat-card-value">{ordersData.filter(o => o.status === 'Inprocess').length}</span></div>
                        <div className="stat-card"><div className="stat-card-top"><span className="stat-card-label">Dispatched</span></div><span className="stat-card-value">{ordersData.filter(o => o.status === 'Dispatched').length}</span></div>
                        <div className="stat-card"><div className="stat-card-top"><span className="stat-card-label">Delivered</span></div><span className="stat-card-value">{ordersData.filter(o => o.status === 'Delivered').length}</span></div>
                    </>
                ) : (
                    <>
                        <div className="stat-card"><div className="stat-card-top"><span className="stat-card-label">Total Requests</span></div><span className="stat-card-value">{sampleRequests.length}</span></div>
                        <div className="stat-card"><div className="stat-card-top"><span className="stat-card-label">Pending</span></div><span className="stat-card-value">{sampleRequests.filter(s => s.status === 'Pending').length}</span></div>
                        <div className="stat-card"><div className="stat-card-top"><span className="stat-card-label">Approved</span></div><span className="stat-card-value">{sampleRequests.filter(s => s.status === 'Approved').length}</span></div>
                        <div className="stat-card"><div className="stat-card-top"><span className="stat-card-label">Shipped</span></div><span className="stat-card-value">{sampleRequests.filter(s => s.status === 'Shipped').length}</span></div>
                        <div className="stat-card"><div className="stat-card-top"><span className="stat-card-label">Rejected</span></div><span className="stat-card-value">{sampleRequests.filter(s => s.status === 'Rejected').length}</span></div>
                    </>
                )}
            </div>

            {/* Data Table */}
            <div className="table-section full-width">
                <div className="table-header">
                    <h2>{activeTab === 'orders' ? 'Orders' : 'Sample Requests'}</h2>
                    <div className="table-filters">
                        <div className="table-search">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                            <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: '120px' }} />
                        </div>
                        {activeTab === 'orders' && (
                            <>
                                <select className="filter-select" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
                                    <option value="All">Order Type</option>
                                    <option value="Bulk">Bulk</option>
                                    <option value="Sample">Sample</option>
                                </select>
                                <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                                    <option value="All">Status</option>
                                    <option value="New">New</option>
                                    <option value="Inprocess">Inprocess</option>
                                    <option value="Dispatched">Dispatched</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </>
                        )}
                    </div>
                </div>

                {activeTab === 'orders' ? (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Type</th>
                                <th>Product</th>
                                <th>Qty</th>
                                <th>Client</th>
                                <th>Deadline</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order, i) => (
                                <tr key={i}>
                                    <td style={{ fontWeight: 600 }}>{order.id}</td>
                                    <td>{order.type}</td>
                                    <td>{order.product}</td>
                                    <td>{order.qty}</td>
                                    <td>{order.client}</td>
                                    <td>{order.deadline}</td>
                                    <td style={{ fontWeight: 600 }}>{order.amount}</td>
                                    <td><span className="status-badge"><span className={`status-dot ${getStatusClass(order.status)}`} />{order.status}</span></td>
                                    <td><button className="view-btn gold">View</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Request ID</th>
                                <th>Product</th>
                                <th>Requested By</th>
                                <th>Date</th>
                                <th>Qty</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSamples.map((sample, i) => (
                                <tr key={i}>
                                    <td style={{ fontWeight: 600 }}>{sample.id}</td>
                                    <td>{sample.product}</td>
                                    <td>{sample.requestedBy}</td>
                                    <td>{sample.date}</td>
                                    <td>{sample.qty}</td>
                                    <td><span className="status-badge"><span className={`status-dot ${getStatusClass(sample.status)}`} />{sample.status}</span></td>
                                    <td><div className="action-btns"><button className="view-btn gold">View</button></div></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <div className="pagination">
                    <button className="page-btn">&lt;</button>
                    <button className="page-btn active">1</button>
                    <button className="page-btn">2</button>
                    <button className="page-btn">3</button>
                    <button className="page-btn">&gt;</button>
                    <span className="page-info">of 25</span>
                </div>
            </div>
        </>
    );
}
