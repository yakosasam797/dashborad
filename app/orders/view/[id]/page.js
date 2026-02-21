'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

const ordersData = {
    '100015': { id: '100015', type: 'Bulk', product: 'Welcome Kit', client: 'Acme Corp', qty: 500, amount: '₹12,50,000', deadline: 'May 22, 2025', status: 'New', statusColor: 'new', email: 'procurement@acmecorp.com', phone: '+91 98765 43210', address: '123 Business Park, Koramangala, Bangalore', notes: 'Priority order — deliver before event date', created: 'May 15, 2025' },
    '100016': { id: '100016', type: 'Sample', product: 'Welcome Kit', client: 'TechStart Inc', qty: 10, amount: '₹25,000', deadline: 'May 22, 2025', status: 'Inprocess', statusColor: 'inprocess', email: 'hello@techstart.in', phone: '+91 87654 32100', address: '45 Startup Lane, HSR Layout, Bangalore', notes: 'Sample before bulk approval', created: 'May 14, 2025' },
    '100017': { id: '100017', type: 'Bulk', product: 'Welcome Kit', client: 'GlobalTech', qty: 200, amount: '₹5,00,000', deadline: 'May 22, 2025', status: 'Dispatched', statusColor: 'dispatched', email: 'orders@globaltech.com', phone: '+91 76543 21000', address: '200 Tech Corridor, Whitefield, Bangalore', notes: 'Shipped via BlueDart', created: 'May 10, 2025' },
    '100018': { id: '100018', type: 'Bulk', product: 'Welcome Kit', client: 'StartupHub', qty: 100, amount: '₹2,50,000', deadline: 'May 22, 2025', status: 'New', statusColor: 'new', email: 'admin@startuphub.co', phone: '+91 65432 10000', address: '88 Co-work Tower, Indiranagar, Bangalore', notes: '', created: 'May 13, 2025' },
    '100019': { id: '100019', type: 'Bulk', product: 'Welcome Kit', client: 'MegaCorp', qty: 350, amount: '₹8,75,000', deadline: 'May 22, 2025', status: 'New', statusColor: 'new', email: 'gifts@megacorp.in', phone: '+91 54321 00000', address: '500 Corporate Park, Electronic City, Bangalore', notes: 'Need premium packaging', created: 'May 12, 2025' },
    '100020': { id: '100020', type: 'Bulk', product: 'Welcome Kit', client: 'InfoSys', qty: 150, amount: '₹3,75,000', deadline: 'May 22, 2025', status: 'New', statusColor: 'new', email: 'events@infosys.com', phone: '+91 43210 00000', address: 'Infosys Campus, Mysore Road, Bangalore', notes: '', created: 'May 11, 2025' },
    '100021': { id: '100021', type: 'Bulk', product: 'Welcome Kit', client: 'FinFirst', qty: 80, amount: '₹2,00,000', deadline: 'May 22, 2025', status: 'New', statusColor: 'new', email: 'office@finfirst.com', phone: '+91 32100 00000', address: '12 Finance St, MG Road, Bangalore', notes: '', created: 'May 10, 2025' },
    '100022': { id: '100022', type: 'Bulk', product: 'Welcome Kit', client: 'EduTech', qty: 400, amount: '₹10,00,000', deadline: 'May 22, 2025', status: 'New', statusColor: 'new', email: 'admin@edutech.in', phone: '+91 21000 00000', address: '66 Learning Hub, Marathahalli, Bangalore', notes: 'Annual onboarding batch', created: 'May 09, 2025' },
};

export default function OrderViewPage() {
    const params = useParams();
    const router = useRouter();
    const order = ordersData[params.id];

    if (!order) {
        return (
            <div className="empty-state">
                <h3>Order not found</h3>
                <p>Order ID "{params.id}" does not exist.</p>
                <Link href="/orders" className="btn-primary" style={{ marginTop: 16, borderRadius: '100px' }}>← Back to Orders</Link>
            </div>
        );
    }

    const timeline = [
        { dot: 'gold', text: 'Order Created', desc: `Order placed by ${order.client}`, time: order.created },
        ...(order.status !== 'New' ? [{ dot: 'blue', text: 'Processing Started', desc: 'Production has begun', time: 'May 17, 2025' }] : []),
        ...(order.status === 'Dispatched' ? [{ dot: 'green', text: 'Dispatched', desc: 'Shipped via courier partner', time: 'May 20, 2025' }] : []),
        ...(order.status === 'New' ? [{ dot: 'gray', text: 'Awaiting Processing', desc: 'Order is queued for production', time: '' }] : []),
    ];

    return (
        <>
            <div className="page-header">
                <h1>Order — {order.id}</h1>
                <button className="btn-secondary" onClick={() => router.back()} style={{ borderRadius: '100px' }}>← Back</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
                {/* Main Details */}
                <div className="form-section">
                    <h2>Order Information</h2>
                    <div className="detail-grid">
                        <div className="detail-item"><span className="detail-label">Order ID</span><span className="detail-value">{order.id}</span></div>
                        <div className="detail-item"><span className="detail-label">Order Type</span><span className="detail-value">{order.type}</span></div>
                        <div className="detail-item"><span className="detail-label">Product</span><span className="detail-value">{order.product}</span></div>
                        <div className="detail-item"><span className="detail-label">Quantity</span><span className="detail-value">{order.qty} units</span></div>
                        <div className="detail-item"><span className="detail-label">Amount</span><span className="detail-value" style={{ fontSize: '1.2rem', fontWeight: 800 }}>{order.amount}</span></div>
                        <div className="detail-item"><span className="detail-label">Deadline</span><span className="detail-value">{order.deadline}</span></div>
                        <div className="detail-item"><span className="detail-label">Status</span><span className="detail-value"><span className="status-badge"><span className={`status-dot ${order.statusColor}`} />{order.status}</span></span></div>
                        <div className="detail-item"><span className="detail-label">Created</span><span className="detail-value">{order.created}</span></div>
                        {order.notes && <div className="detail-item full-width"><span className="detail-label">Notes</span><span className="detail-value">{order.notes}</span></div>}
                    </div>
                </div>

                {/* Client & Timeline */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    <div className="form-section" style={{ marginBottom: 0 }}>
                        <h2>Client Details</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                            <div className="detail-item"><span className="detail-label">Company</span><span className="detail-value">{order.client}</span></div>
                            <div className="detail-item"><span className="detail-label">Email</span><span className="detail-value">{order.email}</span></div>
                            <div className="detail-item"><span className="detail-label">Phone</span><span className="detail-value">{order.phone}</span></div>
                            <div className="detail-item"><span className="detail-label">Address</span><span className="detail-value">{order.address}</span></div>
                        </div>
                    </div>

                    <div className="form-section" style={{ marginBottom: 0 }}>
                        <h2>Order Timeline</h2>
                        <div className="timeline">
                            {timeline.map((t, i) => (
                                <div key={i} className="timeline-item">
                                    <span className={`timeline-dot ${t.dot}`} />
                                    <span className="timeline-text"><strong>{t.text}</strong> — {t.desc}{t.time && <span className="time">{t.time}</span>}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="form-actions" style={{ marginTop: 24 }}>
                <button className="btn-primary" style={{ borderRadius: '100px' }}>Update Status</button>
                <button className="btn-secondary" style={{ borderRadius: '100px' }}>Download Invoice</button>
            </div>
        </>
    );
}
