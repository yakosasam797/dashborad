'use client';

import { useState } from 'react';

const mockupData = [
    { id: 'MK-001', type: 'Simple', product: 'Welcome Kit', client: 'Acme Corp', deadline: 'May 22', status: 'New', designer: 'Ravi K.' },
    { id: 'MK-002', type: 'Full', product: 'Executive Diary', client: 'TechStart', deadline: 'May 20', status: 'Submitted', designer: 'Priya S.' },
    { id: 'MK-003', type: 'Simple', product: 'Custom Mug', client: 'GlobalTech', deadline: 'May 25', status: 'Feedback', designer: 'Amit P.' },
    { id: 'MK-004', type: 'Full', product: 'Branded T-Shirt', client: 'StartupHub', deadline: 'May 18', status: 'Approved', designer: 'Sneha R.' },
    { id: 'MK-005', type: 'Simple', product: 'Laptop Sleeve', client: 'InfoSys', deadline: 'May 28', status: 'New', designer: 'Vikram S.' },
    { id: 'MK-006', type: 'Full', product: 'Gift Hamper', client: 'MegaCorp', deadline: 'Jun 01', status: 'In Progress', designer: 'Ravi K.' },
    { id: 'MK-007', type: 'Simple', product: 'Desk Organizer', client: 'FinFirst', deadline: 'Jun 05', status: 'New', designer: 'Priya S.' },
    { id: 'MK-008', type: 'Simple', product: 'Water Bottle', client: 'HealthPlus', deadline: 'May 30', status: 'Rejected', designer: 'Amit P.' },
    { id: 'MK-009', type: 'Full', product: 'Badge Lanyard', client: 'EventPro', deadline: 'Jun 10', status: 'Submitted', designer: 'Sneha R.' },
    { id: 'MK-010', type: 'Simple', product: 'Notebook Set', client: 'EduTech', deadline: 'May 26', status: 'New', designer: 'Vikram S.' },
];

export default function MockupManagement() {
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');

    const filtered = mockupData.filter(m => {
        if (typeFilter !== 'All' && m.type !== typeFilter) return false;
        if (statusFilter !== 'All' && m.status !== statusFilter) return false;
        if (search && !m.id.toLowerCase().includes(search.toLowerCase()) && !m.product.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
    });

    const dot = (s) => {
        const map = { 'New': 'new', 'Submitted': 'submitted', 'Feedback': 'feedback', 'Approved': 'dispatched', 'In Progress': 'inprocess', 'Rejected': 'new' };
        return map[s] || 'new';
    };

    return (
        <>
            <div className="page-header"><h1>Mockup Management</h1><button className="btn-primary" style={{ borderRadius: '24px' }}>+ New Mockup</button></div>

            <div className="stat-cards" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
                <div className="stat-card"><div className="stat-card-top"><span className="stat-card-label">Total</span></div><span className="stat-card-value">{mockupData.length}</span></div>
                <div className="stat-card"><div className="stat-card-top"><span className="stat-card-label">New</span></div><span className="stat-card-value">{mockupData.filter(m => m.status === 'New').length}</span></div>
                <div className="stat-card"><div className="stat-card-top"><span className="stat-card-label">In Progress</span></div><span className="stat-card-value">{mockupData.filter(m => m.status === 'In Progress' || m.status === 'Submitted').length}</span></div>
                <div className="stat-card"><div className="stat-card-top"><span className="stat-card-label">Feedback</span></div><span className="stat-card-value">{mockupData.filter(m => m.status === 'Feedback').length}</span></div>
                <div className="stat-card"><div className="stat-card-top"><span className="stat-card-label">Approved</span></div><span className="stat-card-value">{mockupData.filter(m => m.status === 'Approved').length}</span></div>
            </div>

            <div className="table-section full-width">
                <div className="table-header">
                    <h2>All Mockup Requests</h2>
                    <div className="table-filters">
                        <div className="table-search">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                            <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: '120px' }} />
                        </div>
                        <select className="filter-select" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
                            <option value="All">Type</option><option value="Simple">Simple</option><option value="Full">Full</option>
                        </select>
                        <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                            <option value="All">Status</option><option value="New">New</option><option value="Submitted">Submitted</option><option value="In Progress">In Progress</option><option value="Feedback">Feedback</option><option value="Approved">Approved</option><option value="Rejected">Rejected</option>
                        </select>
                    </div>
                </div>
                <table className="data-table">
                    <thead><tr><th>Mockup ID</th><th>Type</th><th>Product</th><th>Client</th><th>Designer</th><th>Deadline</th><th>Status</th><th>Action</th></tr></thead>
                    <tbody>
                        {filtered.map((m, i) => (
                            <tr key={i}>
                                <td style={{ fontWeight: 600 }}>{m.id}</td><td>{m.type}</td><td>{m.product}</td><td>{m.client}</td><td>{m.designer}</td><td>{m.deadline}</td>
                                <td><span className="status-badge"><span className={`status-dot ${dot(m.status)}`} />{m.status}</span></td>
                                <td><div className="action-btns"><button className="view-btn gold">View</button><button className="view-btn red">Upload</button></div></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination"><button className="page-btn">&lt;</button><button className="page-btn active">1</button><button className="page-btn">&gt;</button><span className="page-info">of 5</span></div>
            </div>
        </>
    );
}
