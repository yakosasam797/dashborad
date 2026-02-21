'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

const requestsData = {
    'CR-001': { id: 'CR-001', client: 'Acme Corp', type: 'Product Inquiry', subject: 'Custom Welcome Kit Pricing', message: 'We need pricing for 1000 custom welcome kits with premium packaging. Please include options for leather accessories and metal pens. Budget is approximately ₹25-30 lakh.', rating: 5, status: 'Open', priority: 'High', created: 'May 15, 2025', contact: 'Ramesh Gupta', email: 'ramesh@acmecorp.com' },
    'CR-002': { id: 'CR-002', client: 'TechStart Inc', type: 'Feedback', subject: 'Great quality on sample kits', message: 'The sample kits we received were excellent quality. The branding was spot on and the packaging was premium. We would like to proceed with a bulk order.', rating: 5, status: 'Resolved', priority: 'Low', created: 'May 14, 2025', contact: 'Sneha Iyer', email: 'sneha@techstart.in' },
    'CR-003': { id: 'CR-003', client: 'GlobalTech', type: 'Complaint', subject: 'Delivery delay on order 100017', message: 'Our order was supposed to be delivered by May 20 but it hasnt arrived yet. Please provide tracking information and an updated delivery date.', rating: 2, status: 'In Progress', priority: 'High', created: 'May 13, 2025', contact: 'Vikram Shah', email: 'vikram@globaltech.com' },
    'CR-004': { id: 'CR-004', client: 'StartupHub', type: 'Product Inquiry', subject: 'Eco-friendly product options', message: 'Do you have eco-friendly alternatives for corporate gifting? We are looking for sustainable materials and plastic-free packaging.', rating: 4, status: 'Open', priority: 'Medium', created: 'May 12, 2025', contact: 'Priya Das', email: 'priya@startuphub.co' },
    'CR-005': { id: 'CR-005', client: 'MegaCorp', type: 'Feedback', subject: 'Packaging could be improved', message: 'The products themselves are great but the outer packaging was slightly damaged on arrival. Would recommend using more protective packaging for fragile items.', rating: 3, status: 'Resolved', priority: 'Medium', created: 'May 11, 2025', contact: 'Kavitha Rao', email: 'kavitha@megacorp.in' },
};

const statusColors = { 'Open': 'new', 'In Progress': 'inprocess', 'Resolved': 'dispatched' };
const priorityStyles = { 'High': { background: '#FEF2F2', color: '#DC2626' }, 'Medium': { background: '#FFF7ED', color: '#EA580C' }, 'Low': { background: '#F0FDF4', color: '#16A34A' } };

export default function ClientRequestViewPage() {
    const params = useParams();
    const router = useRouter();
    const r = requestsData[params.id];
    const [response, setResponse] = useState('');

    if (!r) {
        return (
            <div className="empty-state">
                <h3>Request not found</h3>
                <Link href="/client-requests" className="btn-primary" style={{ marginTop: 16, borderRadius: '100px' }}>← Back</Link>
            </div>
        );
    }

    return (
        <>
            <div className="page-header">
                <h1>Request — {r.id}</h1>
                <button className="btn-secondary" onClick={() => router.back()} style={{ borderRadius: '100px' }}>← Back</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
                <div>
                    <div className="form-section">
                        <h2>{r.subject}</h2>
                        <div className="detail-grid">
                            <div className="detail-item"><span className="detail-label">Request ID</span><span className="detail-value">{r.id}</span></div>
                            <div className="detail-item"><span className="detail-label">Type</span><span className="detail-value">{r.type}</span></div>
                            <div className="detail-item"><span className="detail-label">Status</span><span className="detail-value"><span className="status-badge"><span className={`status-dot ${statusColors[r.status]}`} />{r.status}</span></span></div>
                            <div className="detail-item"><span className="detail-label">Priority</span><span className="detail-value"><span style={{ ...priorityStyles[r.priority], padding: '3px 12px', borderRadius: 100, fontSize: '0.82rem', fontWeight: 600 }}>{r.priority}</span></span></div>
                            <div className="detail-item"><span className="detail-label">Rating</span><span className="detail-value"><span className="stars">{[1, 2, 3, 4, 5].map(s => <span key={s} className={`star ${s <= r.rating ? '' : 'empty'}`}>★</span>)}</span></span></div>
                            <div className="detail-item"><span className="detail-label">Date</span><span className="detail-value">{r.created}</span></div>
                            <div className="detail-divider" />
                            <div className="detail-item full-width"><span className="detail-label">Message</span><span className="detail-value" style={{ lineHeight: 1.7 }}>{r.message}</span></div>
                        </div>
                    </div>

                    {r.status !== 'Resolved' && (
                        <div className="form-section">
                            <h2>Send Response</h2>
                            <div className="form-group"><label>Your Response</label><textarea placeholder="Type your response to the client..." value={response} onChange={e => setResponse(e.target.value)} style={{ minHeight: 120 }} /></div>
                            <div className="form-actions">
                                <button className="btn-primary" onClick={() => router.push('/client-requests')} style={{ borderRadius: '100px' }}>Send Response</button>
                                <button className="btn-secondary" style={{ borderRadius: '100px' }}>Mark as Resolved</button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="form-section" style={{ marginBottom: 0, alignSelf: 'start' }}>
                    <h2>Client Details</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        <div className="detail-item"><span className="detail-label">Company</span><span className="detail-value" style={{ fontWeight: 700 }}>{r.client}</span></div>
                        <div className="detail-item"><span className="detail-label">Contact</span><span className="detail-value">{r.contact}</span></div>
                        <div className="detail-item"><span className="detail-label">Email</span><span className="detail-value">{r.email}</span></div>
                    </div>
                </div>
            </div>
        </>
    );
}
