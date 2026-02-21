'use client';

import { useState } from 'react';
import Link from 'next/link';

const proposals = [
    { id: 'PRP-001', title: 'Corporate Gift Set 2025', client: 'Acme Corp', value: '₹15,00,000', status: 'Sent', date: 'May 10, 2025', validTill: 'Jun 10, 2025' },
    { id: 'PRP-002', title: 'Employee Onboarding Kit', client: 'TechStart Inc', value: '₹8,50,000', status: 'Accepted', date: 'May 05, 2025', validTill: 'Jun 05, 2025' },
    { id: 'PRP-003', title: 'Conference Merchandise', client: 'EventPro', value: '₹3,20,000', status: 'Draft', date: 'May 14, 2025', validTill: 'Jun 14, 2025' },
    { id: 'PRP-004', title: 'Premium Client Hamper', client: 'FinanceFirst', value: '₹12,00,000', status: 'Rejected', date: 'Apr 28, 2025', validTill: 'May 28, 2025' },
    { id: 'PRP-005', title: 'Team Building Kits', client: 'GlobalTech', value: '₹5,75,000', status: 'Sent', date: 'May 12, 2025', validTill: 'Jun 12, 2025' },
    { id: 'PRP-006', title: 'Festival Gift Collection', client: 'MegaCorp', value: '₹20,00,000', status: 'Draft', date: 'May 15, 2025', validTill: 'Jun 15, 2025' },
];

export default function ProposalsPage() {
    const [statusFilter, setStatusFilter] = useState('All');
    const [search, setSearch] = useState('');

    const filtered = proposals.filter(p => {
        if (statusFilter !== 'All' && p.status !== statusFilter) return false;
        if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.client.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
    });

    const dot = (s) => ({ 'Draft': 'inprocess', 'Sent': 'submitted', 'Accepted': 'dispatched', 'Rejected': 'new' }[s] || 'new');
    const badgeColor = (s) => ({ 'Draft': '#EFF6FF', 'Sent': '#FFF8DC', 'Accepted': '#F0FDF4', 'Rejected': '#FEF2F2' }[s] || '#F3F4F6');
    const textColor = (s) => ({ 'Draft': '#3B82F6', 'Sent': '#F59E0B', 'Accepted': '#22C55E', 'Rejected': '#EF4444' }[s] || '#6B7280');

    return (
        <>
            <div className="page-header"><h1>Proposals</h1><Link href="/proposals/create" className="btn-primary" style={{ borderRadius: '24px' }}>+ Create Proposal</Link></div>

            <div className="stat-cards" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                <div className="stat-card"><div className="stat-card-top"><span className="stat-card-label">Total</span></div><span className="stat-card-value">{proposals.length}</span></div>
                <div className="stat-card"><div className="stat-card-top"><span className="stat-card-label">Sent</span></div><span className="stat-card-value">{proposals.filter(p => p.status === 'Sent').length}</span></div>
                <div className="stat-card"><div className="stat-card-top"><span className="stat-card-label">Accepted</span></div><span className="stat-card-value">{proposals.filter(p => p.status === 'Accepted').length}</span></div>
                <div className="stat-card"><div className="stat-card-top"><span className="stat-card-label">Value Pipeline</span></div><span className="stat-card-value">₹64.5L</span></div>
            </div>

            <div className="cards-grid">
                {filtered.map((p, i) => (
                    <div key={i} className="proposal-card">
                        <div className="card-header">
                            <span className="card-id">{p.id}</span>
                            <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '3px 10px', borderRadius: '12px', background: badgeColor(p.status), color: textColor(p.status) }}>{p.status}</span>
                        </div>
                        <div className="card-title">{p.title}</div>
                        <div className="card-meta">Client: {p.client}</div>
                        <div className="card-meta">Value: <strong>{p.value}</strong></div>
                        <div className="card-meta">Created: {p.date}</div>
                        <div className="card-meta">Valid Till: {p.validTill}</div>
                        <div className="card-actions">
                            <Link href={`/proposals/view/${p.id}`} className="view-btn gold">View</Link>
                            <Link href={`/proposals/edit/${p.id}`} className="view-btn" style={{ background: '#F3F4F6', color: '#6B7280' }}>Edit</Link>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
