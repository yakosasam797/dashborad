'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

const proposalsData = {
    'PRP-001': { id: 'PRP-001', title: 'Corporate Gift Set 2025', client: 'Acme Corp', value: '15,00,000', status: 'Sent', validTill: '2025-06-10', notes: 'Proposal for annual employee onboarding kits.' },
    'PRP-002': { id: 'PRP-002', title: 'Employee Onboarding Kit', client: 'TechStart Inc', value: '8,50,000', status: 'Accepted', validTill: '2025-06-05', notes: 'Tech startup onboarding package.' },
    'PRP-003': { id: 'PRP-003', title: 'Conference Merchandise', client: 'EventPro', value: '3,20,000', status: 'Draft', validTill: '2025-06-14', notes: 'For annual tech conference.' },
    'PRP-004': { id: 'PRP-004', title: 'Premium Client Hamper', client: 'FinanceFirst', value: '12,00,000', status: 'Rejected', validTill: '2025-05-25', notes: 'High-value client appreciation gift hampers.' },
    'PRP-005': { id: 'PRP-005', title: 'Team Building Kits', client: 'GroupTech', value: '5,75,000', status: 'Sent', validTill: '2025-06-17', notes: 'Team building event merchandise.' },
    'PRP-006': { id: 'PRP-006', title: 'Festival Gift Collection', client: 'MegaCorp', value: '20,00,000', status: 'Draft', validTill: '2025-06-15', notes: 'Diwali corporate gifting.' },
};

export default function ProposalEditPage() {
    const params = useParams();
    const router = useRouter();
    const p = proposalsData[params.id];

    const [form, setForm] = useState(p ? { title: p.title, client: p.client, value: p.value, status: p.status, validTill: p.validTill, notes: p.notes } : {});

    if (!p) {
        return (
            <div className="empty-state">
                <h3>Proposal not found</h3>
                <Link href="/proposals" className="btn-primary" style={{ marginTop: 16, borderRadius: '100px' }}>← Back</Link>
            </div>
        );
    }

    const handleChange = (f, v) => setForm(prev => ({ ...prev, [f]: v }));

    return (
        <>
            <div className="page-header">
                <h1>Edit Proposal — {p.id}</h1>
                <button className="btn-secondary" onClick={() => router.back()} style={{ borderRadius: '100px' }}>← Back</button>
            </div>

            <form onSubmit={e => { e.preventDefault(); router.push('/proposals'); }}>
                <div className="form-section">
                    <h2>Proposal Information</h2>
                    <div className="form-grid">
                        <div className="form-group full-width"><label>Title *</label><input type="text" value={form.title} onChange={e => handleChange('title', e.target.value)} /></div>
                        <div className="form-group"><label>Client *</label><input type="text" value={form.client} onChange={e => handleChange('client', e.target.value)} /></div>
                        <div className="form-group"><label>Value (₹)</label><input type="text" value={form.value} onChange={e => handleChange('value', e.target.value)} /></div>
                        <div className="form-group"><label>Status</label>
                            <select value={form.status} onChange={e => handleChange('status', e.target.value)}>
                                <option>Draft</option><option>Sent</option><option>Accepted</option><option>Rejected</option>
                            </select>
                        </div>
                        <div className="form-group"><label>Valid Till</label><input type="date" value={form.validTill} onChange={e => handleChange('validTill', e.target.value)} /></div>
                        <div className="form-group full-width"><label>Notes</label><textarea value={form.notes} onChange={e => handleChange('notes', e.target.value)} /></div>
                    </div>
                </div>
                <div className="form-actions" style={{ marginBottom: 24 }}>
                    <button type="submit" className="btn-primary" style={{ borderRadius: '100px', padding: '12px 32px' }}>Save Changes</button>
                    <button type="button" className="btn-secondary" onClick={() => router.back()} style={{ borderRadius: '100px' }}>Cancel</button>
                </div>
            </form>
        </>
    );
}
