'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

const proposalsData = {
    'PRP-001': { id: 'PRP-001', title: 'Corporate Gift Set 2025', client: 'Acme Corp', value: '₹15,00,000', status: 'Sent', created: 'May 10, 2025', validTill: 'Jun 10, 2025', items: [{ name: 'Welcome Kit', qty: 500, price: '₹2,500' }, { name: 'Executive Diary', qty: 500, price: '₹850' }], notes: 'Proposal for annual employee onboarding kits. Includes custom branding on all items.', contact: 'Ramesh Gupta', contactEmail: 'ramesh@acmecorp.com' },
    'PRP-002': { id: 'PRP-002', title: 'Employee Onboarding Kit', client: 'TechStart Inc', value: '₹8,50,000', status: 'Accepted', created: 'May 05, 2025', validTill: 'Jun 05, 2025', items: [{ name: 'Welcome Kit', qty: 200, price: '₹2,500' }, { name: 'Branded T-Shirt', qty: 200, price: '₹650' }, { name: 'Water Bottle', qty: 200, price: '₹550' }], notes: 'Tech startup onboarding package. Minimalist design requested.', contact: 'Sneha Iyer', contactEmail: 'sneha@techstart.in' },
    'PRP-003': { id: 'PRP-003', title: 'Conference Merchandise', client: 'EventPro', value: '₹3,20,000', status: 'Draft', created: 'May 14, 2025', validTill: 'Jun 14, 2025', items: [{ name: 'Badge Lanyard', qty: 1000, price: '₹150' }, { name: 'Notebook Set', qty: 500, price: '₹490' }], notes: 'For annual tech conference. Need branded lanyards and notebooks.', contact: 'Vikram Shah', contactEmail: 'vikram@eventpro.in' },
    'PRP-004': { id: 'PRP-004', title: 'Premium Client Hamper', client: 'FinanceFirst', value: '₹12,00,000', status: 'Rejected', created: 'Apr 25, 2025', validTill: 'May 25, 2025', items: [{ name: 'Gift Hamper', qty: 300, price: '₹4,500' }], notes: 'High-value client appreciation gift hampers. Premium packaging required.', contact: 'Priya Mehta', contactEmail: 'priya@financefirst.com' },
    'PRP-005': { id: 'PRP-005', title: 'Team Building Kits', client: 'GroupTech', value: '₹5,75,000', status: 'Sent', created: 'May 12, 2025', validTill: 'Jun 17, 2025', items: [{ name: 'Custom Mug', qty: 500, price: '₹350' }, { name: 'Branded T-Shirt', qty: 500, price: '₹650' }, { name: 'Badge Lanyard', qty: 500, price: '₹150' }], notes: 'Team building event merchandise. Bright, fun colors.', contact: 'Amit Das', contactEmail: 'amit@grouptech.com' },
    'PRP-006': { id: 'PRP-006', title: 'Festival Gift Collection', client: 'MegaCorp', value: '₹20,00,000', status: 'Draft', created: 'May 13, 2025', validTill: 'Jun 15, 2025', items: [{ name: 'Gift Hamper', qty: 400, price: '₹4,500' }, { name: 'Desk Organizer', qty: 200, price: '₹1,800' }], notes: 'Diwali corporate gifting for top clients and employees.', contact: 'Kavitha Rao', contactEmail: 'kavitha@megacorp.in' },
};

const statusColors = { 'Sent': 'submitted', 'Accepted': 'dispatched', 'Draft': 'inprocess', 'Rejected': 'new' };

export default function ProposalViewPage() {
    const params = useParams();
    const router = useRouter();
    const p = proposalsData[params.id];

    if (!p) {
        return (
            <div className="empty-state">
                <h3>Proposal not found</h3>
                <Link href="/proposals" className="btn-primary" style={{ marginTop: 16, borderRadius: '100px' }}>← Back to Proposals</Link>
            </div>
        );
    }

    const total = p.items.reduce((sum, item) => sum + (item.qty * parseInt(item.price.replace(/[₹,]/g, ''))), 0);

    return (
        <>
            <div className="page-header">
                <h1>Proposal — {p.id}</h1>
                <button className="btn-secondary" onClick={() => router.back()} style={{ borderRadius: '100px' }}>← Back</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
                <div>
                    <div className="form-section">
                        <h2>Proposal Details</h2>
                        <div className="detail-grid">
                            <div className="detail-item"><span className="detail-label">Proposal ID</span><span className="detail-value">{p.id}</span></div>
                            <div className="detail-item"><span className="detail-label">Status</span><span className="detail-value"><span className="status-badge"><span className={`status-dot ${statusColors[p.status]}`} />{p.status}</span></span></div>
                            <div className="detail-item full-width"><span className="detail-label">Title</span><span className="detail-value" style={{ fontSize: '1.1rem', fontWeight: 700 }}>{p.title}</span></div>
                            <div className="detail-item"><span className="detail-label">Created</span><span className="detail-value">{p.created}</span></div>
                            <div className="detail-item"><span className="detail-label">Valid Till</span><span className="detail-value">{p.validTill}</span></div>
                            <div className="detail-divider" />
                            <div className="detail-item full-width"><span className="detail-label">Notes</span><span className="detail-value">{p.notes}</span></div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h2>Line Items</h2>
                        <table className="data-table">
                            <thead><tr><th>Product</th><th>Quantity</th><th>Unit Price</th><th>Total</th></tr></thead>
                            <tbody>
                                {p.items.map((item, i) => (
                                    <tr key={i}>
                                        <td style={{ fontWeight: 600 }}>{item.name}</td>
                                        <td>{item.qty}</td>
                                        <td>{item.price}</td>
                                        <td style={{ fontWeight: 700 }}>₹{(item.qty * parseInt(item.price.replace(/[₹,]/g, ''))).toLocaleString('en-IN')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div style={{ padding: '16px 18px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: 16 }}>
                            <span style={{ fontSize: '0.85rem', color: '#6B7280' }}>Total Value:</span>
                            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#111827' }}>₹{total.toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                </div>

                <div className="form-section" style={{ marginBottom: 0, alignSelf: 'start' }}>
                    <h2>Client Info</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        <div className="detail-item"><span className="detail-label">Company</span><span className="detail-value" style={{ fontWeight: 700 }}>{p.client}</span></div>
                        <div className="detail-item"><span className="detail-label">Contact Person</span><span className="detail-value">{p.contact}</span></div>
                        <div className="detail-item"><span className="detail-label">Email</span><span className="detail-value">{p.contactEmail}</span></div>
                        <div className="detail-item"><span className="detail-label">Proposal Value</span><span className="detail-value" style={{ fontSize: '1.3rem', fontWeight: 800 }}>{p.value}</span></div>
                    </div>
                </div>
            </div>

            <div className="form-actions" style={{ marginTop: 24 }}>
                <Link href={`/proposals/edit/${p.id}`} className="btn-primary" style={{ borderRadius: '100px' }}>Edit Proposal</Link>
                <button className="btn-secondary" style={{ borderRadius: '100px' }}>Download PDF</button>
                <button className="btn-secondary" style={{ borderRadius: '100px' }}>Send to Client</button>
            </div>
        </>
    );
}
