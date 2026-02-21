'use client';

import { useState } from 'react';
import Link from 'next/link';

const feedbackData = [
    { id: 'CR-001', client: 'Acme Corp', subject: 'Welcome Kit quality feedback', type: 'Feedback', rating: 4, date: 'May 14, 2025', status: 'Open', message: 'Great quality but packaging could improve.' },
    { id: 'CR-002', client: 'TechStart Inc', subject: 'Diary color mismatch', type: 'Complaint', rating: 2, date: 'May 13, 2025', status: 'Resolved', message: 'Color didn\'t match the mockup provided.' },
    { id: 'CR-003', client: 'GlobalTech', subject: 'Request for new designs', type: 'Request', rating: 5, date: 'May 12, 2025', status: 'In Progress', message: 'Need 3 new design variants for mugs.' },
    { id: 'CR-004', client: 'StartupHub', subject: 'Delivery delay issue', type: 'Complaint', rating: 1, date: 'May 11, 2025', status: 'Open', message: 'Order was delayed by 5 days.' },
    { id: 'CR-005', client: 'MegaCorp', subject: 'Bulk pricing query', type: 'Request', rating: 4, date: 'May 10, 2025', status: 'Resolved', message: 'Need updated pricing for 5000+ units.' },
    { id: 'CR-006', client: 'EventPro', subject: 'Excellent lanyard quality', type: 'Feedback', rating: 5, date: 'May 09, 2025', status: 'Closed', message: 'Very happy with the lanyards.' },
    { id: 'CR-007', client: 'EduTech', subject: 'Custom packaging request', type: 'Request', rating: 3, date: 'May 08, 2025', status: 'Open', message: 'Need custom boxes for notebook sets.' },
    { id: 'CR-008', client: 'FinanceFirst', subject: 'Re-order process', type: 'Feedback', rating: 4, date: 'May 07, 2025', status: 'Closed', message: 'Smooth re-order experience.' },
];

export default function ClientRequestsPage() {
    const [typeFilter, setTypeFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [search, setSearch] = useState('');

    const filtered = feedbackData.filter(f => {
        if (typeFilter !== 'All' && f.type !== typeFilter) return false;
        if (statusFilter !== 'All' && f.status !== statusFilter) return false;
        if (search && !f.client.toLowerCase().includes(search.toLowerCase()) && !f.subject.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
    });

    const dot = (s) => ({ 'Open': 'new', 'In Progress': 'inprocess', 'Resolved': 'dispatched', 'Closed': 'feedback' }[s] || 'new');

    const renderStars = (rating) => Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={`star ${i < rating ? '' : 'empty'}`}>★</span>
    ));

    return (
        <>
            <div className="page-header"><h1>Client Requests & Feedback</h1></div>

            <div className="stat-cards" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                <div className="stat-card"><div className="stat-card-top"><span className="stat-card-label">Total</span></div><span className="stat-card-value">{feedbackData.length}</span></div>
                <div className="stat-card"><div className="stat-card-top"><span className="stat-card-label">Open</span></div><span className="stat-card-value">{feedbackData.filter(f => f.status === 'Open').length}</span></div>
                <div className="stat-card"><div className="stat-card-top"><span className="stat-card-label">Avg Rating</span></div><span className="stat-card-value">{(feedbackData.reduce((s, f) => s + f.rating, 0) / feedbackData.length).toFixed(1)}</span></div>
                <div className="stat-card"><div className="stat-card-top"><span className="stat-card-label">Resolved</span></div><span className="stat-card-value">{feedbackData.filter(f => f.status === 'Resolved' || f.status === 'Closed').length}</span></div>
            </div>

            <div className="table-section full-width">
                <div className="table-header">
                    <h2>All Requests</h2>
                    <div className="table-filters">
                        <div className="table-search">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                            <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: '120px' }} />
                        </div>
                        <select className="filter-select" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
                            <option value="All">Type</option><option value="Feedback">Feedback</option><option value="Complaint">Complaint</option><option value="Request">Request</option>
                        </select>
                        <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                            <option value="All">Status</option><option value="Open">Open</option><option value="In Progress">In Progress</option><option value="Resolved">Resolved</option><option value="Closed">Closed</option>
                        </select>
                    </div>
                </div>
                <table className="data-table">
                    <thead><tr><th>ID</th><th>Client</th><th>Subject</th><th>Type</th><th>Rating</th><th>Date</th><th>Status</th><th>Action</th></tr></thead>
                    <tbody>
                        {filtered.map((f, i) => (
                            <tr key={i}>
                                <td style={{ fontWeight: 600 }}>{f.id}</td>
                                <td>{f.client}</td>
                                <td>{f.subject}</td>
                                <td>{f.type}</td>
                                <td><div className="stars">{renderStars(f.rating)}</div></td>
                                <td>{f.date}</td>
                                <td><span className="status-badge"><span className={`status-dot ${dot(f.status)}`} />{f.status}</span></td>
                                <td><Link href={`/client-requests/view/${f.id}`} className="view-btn gold">Respond</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination"><button className="page-btn">&lt;</button><button className="page-btn active">1</button><button className="page-btn">&gt;</button><span className="page-info">of 8</span></div>
            </div>
        </>
    );
}
