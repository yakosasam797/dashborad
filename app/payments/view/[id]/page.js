'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

const transactionsData = {
    'TXN-001': { id: 'TXN-001', orderId: 'ORD-10001', client: 'Acme Corp', amount: '₹12,50,000', type: 'Invoice', method: 'Bank Transfer', date: 'May 15, 2025', status: 'Paid', invoiceNo: 'INV-2025-0451', dueDate: 'May 30, 2025', paidDate: 'May 15, 2025', bankRef: 'HDFC-REF-98765', gst: '₹1,91,525', total: '₹14,41,525', items: [{ desc: 'Welcome Kit x 500', amount: '₹12,50,000' }] },
    'TXN-002': { id: 'TXN-002', orderId: 'ORD-10003', client: 'GlobalTech', amount: '₹6,50,000', type: 'Invoice', method: 'UPI', date: 'May 14, 2025', status: 'Paid', invoiceNo: 'INV-2025-0450', dueDate: 'May 28, 2025', paidDate: 'May 14, 2025', bankRef: 'UPI-REF-45678', gst: '₹99,458', total: '₹7,49,458', items: [{ desc: 'Welcome Kit x 200', amount: '₹5,00,000' }, { desc: 'Badge Lanyard x 1000', amount: '₹1,50,000' }] },
    'TXN-003': { id: 'TXN-003', orderId: 'ORD-10006', client: 'MegaCorp', amount: '₹4,50,000', type: 'Invoice', method: 'Bank Transfer', date: 'May 13, 2025', status: 'Pending', invoiceNo: 'INV-2025-0449', dueDate: 'May 27, 2025', paidDate: '-', bankRef: '-', gst: '₹68,847', total: '₹5,18,847', items: [{ desc: 'Gift Hamper x 100', amount: '₹4,50,000' }] },
    'TXN-004': { id: 'TXN-004', orderId: 'ORD-10002', client: 'TechStart Inc', amount: '₹8,500', type: 'Sample', method: 'UPI', date: 'May 12, 2025', status: 'Paid', invoiceNo: 'INV-2025-0448', dueDate: 'May 26, 2025', paidDate: 'May 12, 2025', bankRef: 'UPI-REF-12345', gst: '₹1,300', total: '₹9,800', items: [{ desc: 'Welcome Kit Sample x 2', amount: '₹5,000' }, { desc: 'Branded T-Shirt Sample x 5', amount: '₹3,500' }] },
    'TXN-005': { id: 'TXN-005', orderId: 'ORD-10009', client: 'EventPro', amount: '₹3,00,000', type: 'Invoice', method: 'Cheque', date: 'May 11, 2025', status: 'Pending', invoiceNo: 'INV-2025-0447', dueDate: 'May 25, 2025', paidDate: '-', bankRef: '-', gst: '₹45,900', total: '₹3,45,900', items: [{ desc: 'Conference Merchandise Bundle', amount: '₹3,00,000' }] },
};

const statusColors = { 'Paid': 'dispatched', 'Pending': 'submitted', 'Failed': 'new' };

export default function PaymentViewPage() {
    const params = useParams();
    const router = useRouter();
    const txn = transactionsData[params.id];

    if (!txn) {
        return (
            <div className="empty-state">
                <h3>Transaction not found</h3>
                <Link href="/payments" className="btn-primary" style={{ marginTop: 16, borderRadius: '100px' }}>← Back to Payments</Link>
            </div>
        );
    }

    return (
        <>
            <div className="page-header">
                <h1>Transaction — {txn.id}</h1>
                <button className="btn-secondary" onClick={() => router.back()} style={{ borderRadius: '100px' }}>← Back</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
                <div>
                    <div className="form-section">
                        <h2>Transaction Details</h2>
                        <div className="detail-grid">
                            <div className="detail-item"><span className="detail-label">Transaction ID</span><span className="detail-value">{txn.id}</span></div>
                            <div className="detail-item"><span className="detail-label">Invoice No</span><span className="detail-value">{txn.invoiceNo}</span></div>
                            <div className="detail-item"><span className="detail-label">Order ID</span><span className="detail-value"><Link href={`/orders/view/${txn.orderId.replace('ORD-', '')}`} style={{ color: '#3B82F6', textDecoration: 'underline' }}>{txn.orderId}</Link></span></div>
                            <div className="detail-item"><span className="detail-label">Type</span><span className="detail-value">{txn.type}</span></div>
                            <div className="detail-item"><span className="detail-label">Payment Method</span><span className="detail-value">{txn.method}</span></div>
                            <div className="detail-item"><span className="detail-label">Status</span><span className="detail-value"><span className="status-badge"><span className={`status-dot ${statusColors[txn.status]}`} />{txn.status}</span></span></div>
                            <div className="detail-item"><span className="detail-label">Invoice Date</span><span className="detail-value">{txn.date}</span></div>
                            <div className="detail-item"><span className="detail-label">Due Date</span><span className="detail-value">{txn.dueDate}</span></div>
                            <div className="detail-item"><span className="detail-label">Paid Date</span><span className="detail-value">{txn.paidDate}</span></div>
                            <div className="detail-item"><span className="detail-label">Bank Reference</span><span className="detail-value">{txn.bankRef}</span></div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h2>Line Items</h2>
                        <table className="data-table">
                            <thead><tr><th>Description</th><th style={{ textAlign: 'right' }}>Amount</th></tr></thead>
                            <tbody>
                                {txn.items.map((item, i) => (
                                    <tr key={i}><td>{item.desc}</td><td style={{ textAlign: 'right', fontWeight: 600 }}>{item.amount}</td></tr>
                                ))}
                            </tbody>
                        </table>
                        <div style={{ padding: '12px 18px', borderTop: '1px solid var(--border)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}><span style={{ color: '#6B7280', fontSize: '0.85rem' }}>Subtotal</span><span style={{ fontWeight: 600 }}>{txn.amount}</span></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}><span style={{ color: '#6B7280', fontSize: '0.85rem' }}>GST (18%)</span><span style={{ fontWeight: 600 }}>{txn.gst}</span></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 8, borderTop: '1px solid var(--border-light)' }}><span style={{ fontWeight: 700 }}>Total</span><span style={{ fontSize: '1.15rem', fontWeight: 800 }}>{txn.total}</span></div>
                        </div>
                    </div>
                </div>

                <div className="form-section" style={{ marginBottom: 0, alignSelf: 'start' }}>
                    <h2>Client</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        <div className="detail-item"><span className="detail-label">Company</span><span className="detail-value" style={{ fontWeight: 700 }}>{txn.client}</span></div>
                        <div className="detail-item"><span className="detail-label">Amount</span><span className="detail-value" style={{ fontSize: '1.4rem', fontWeight: 800 }}>{txn.total}</span></div>
                    </div>
                </div>
            </div>

            <div className="form-actions" style={{ marginTop: 24 }}>
                <button className="btn-primary" style={{ borderRadius: '100px' }}>Download Invoice</button>
                {txn.status === 'Pending' && <button className="btn-secondary" style={{ borderRadius: '100px' }}>Send Reminder</button>}
            </div>
        </>
    );
}
