'use client';

import { useState } from 'react';
import Link from 'next/link';

const transactions = [
    { id: 'TXN-001', orderId: 'ORD-10001', client: 'Acme Corp', amount: '₹12,50,000', type: 'Invoice', method: 'Bank Transfer', date: 'May 15, 2025', status: 'Paid' },
    { id: 'TXN-002', orderId: 'ORD-10003', client: 'GlobalTech', amount: '₹6,50,000', type: 'Invoice', method: 'UPI', date: 'May 14, 2025', status: 'Paid' },
    { id: 'TXN-003', orderId: 'ORD-10006', client: 'MegaCorp', amount: '₹4,50,000', type: 'Invoice', method: 'Bank Transfer', date: 'May 13, 2025', status: 'Pending' },
    { id: 'TXN-004', orderId: 'ORD-10002', client: 'TechStart Inc', amount: '₹8,500', type: 'Sample', method: 'UPI', date: 'May 12, 2025', status: 'Paid' },
    { id: 'TXN-005', orderId: 'ORD-10009', client: 'EventPro', amount: '₹3,00,000', type: 'Invoice', method: 'Cheque', date: 'May 11, 2025', status: 'Pending' },
    { id: 'TXN-006', orderId: 'ORD-10007', client: 'FinanceFirst', amount: '₹1,35,000', type: 'Invoice', method: 'Bank Transfer', date: 'May 10, 2025', status: 'Failed' },
    { id: 'TXN-007', orderId: 'ORD-10010', client: 'EduTech', amount: '₹1,44,000', type: 'Invoice', method: 'UPI', date: 'May 09, 2025', status: 'Paid' },
    { id: 'TXN-008', orderId: 'ORD-10004', client: 'StartupHub', amount: '₹87,500', type: 'Invoice', method: 'Bank Transfer', date: 'May 08, 2025', status: 'Paid' },
];

const payouts = [
    { id: 'PAY-001', amount: '₹15,00,000', date: 'May 15, 2025', bank: 'HDFC Bank ****4521', status: 'Completed' },
    { id: 'PAY-002', amount: '₹8,75,000', date: 'May 10, 2025', bank: 'HDFC Bank ****4521', status: 'Completed' },
    { id: 'PAY-003', amount: '₹12,30,000', date: 'May 05, 2025', bank: 'HDFC Bank ****4521', status: 'Processing' },
    { id: 'PAY-004', amount: '₹6,50,000', date: 'Apr 30, 2025', bank: 'HDFC Bank ****4521', status: 'Completed' },
];

export default function PaymentsPage() {
    const [activeTab, setActiveTab] = useState('transactions');
    const [statusFilter, setStatusFilter] = useState('All');
    const [search, setSearch] = useState('');

    const filteredTxn = transactions.filter(t => {
        if (statusFilter !== 'All' && t.status !== statusFilter) return false;
        if (search && !t.id.toLowerCase().includes(search.toLowerCase()) && !t.client.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
    });

    const dot = (s) => ({ 'Paid': 'dispatched', 'Completed': 'dispatched', 'Pending': 'submitted', 'Processing': 'inprocess', 'Failed': 'new' }[s] || 'new');

    const totalPaid = '₹22,25,000';
    const totalPending = '₹7,50,000';

    return (
        <>
            <div className="page-header"><h1>Payments & Transactions</h1></div>

            <div className="stat-cards" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                <div className="stat-card"><div className="stat-card-top"><span className="stat-card-label">Total Received</span></div><span className="stat-card-value">{totalPaid}</span></div>
                <div className="stat-card"><div className="stat-card-top"><span className="stat-card-label">Pending</span></div><span className="stat-card-value">{totalPending}</span></div>
                <div className="stat-card"><div className="stat-card-top"><span className="stat-card-label">This Month</span></div><span className="stat-card-value">₹29,75,000</span></div>
                <div className="stat-card"><div className="stat-card-top"><span className="stat-card-label">Payouts</span></div><span className="stat-card-value">{payouts.length}</span></div>
            </div>

            <div className="page-tabs">
                <button className={`page-tab ${activeTab === 'transactions' ? 'active' : ''}`} onClick={() => setActiveTab('transactions')}>Transactions ({transactions.length})</button>
                <button className={`page-tab ${activeTab === 'payouts' ? 'active' : ''}`} onClick={() => setActiveTab('payouts')}>Payouts ({payouts.length})</button>
            </div>

            <div className="table-section full-width">
                <div className="table-header">
                    <h2>{activeTab === 'transactions' ? 'Transaction History' : 'Payout History'}</h2>
                    <div className="table-filters">
                        <div className="table-search">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                            <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: '120px' }} />
                        </div>
                        <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                            <option value="All">Status</option>
                            {activeTab === 'transactions' ? <><option value="Paid">Paid</option><option value="Pending">Pending</option><option value="Failed">Failed</option></> : <><option value="Completed">Completed</option><option value="Processing">Processing</option></>}
                        </select>
                    </div>
                </div>

                {activeTab === 'transactions' ? (
                    <table className="data-table">
                        <thead><tr><th>Txn ID</th><th>Order ID</th><th>Client</th><th>Amount</th><th>Type</th><th>Method</th><th>Date</th><th>Status</th><th>Action</th></tr></thead>
                        <tbody>
                            {filteredTxn.map((t, i) => (
                                <tr key={i}>
                                    <td style={{ fontWeight: 600 }}>{t.id}</td><td>{t.orderId}</td><td>{t.client}</td><td style={{ fontWeight: 600 }}>{t.amount}</td><td>{t.type}</td><td>{t.method}</td><td>{t.date}</td>
                                    <td><span className="status-badge"><span className={`status-dot ${dot(t.status)}`} />{t.status}</span></td>
                                    <td><Link href={`/payments/view/${t.id}`} className="view-btn gold">View</Link></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <table className="data-table">
                        <thead><tr><th>Payout ID</th><th>Amount</th><th>Date</th><th>Bank Account</th><th>Status</th></tr></thead>
                        <tbody>
                            {payouts.map((p, i) => (
                                <tr key={i}>
                                    <td style={{ fontWeight: 600 }}>{p.id}</td><td style={{ fontWeight: 600 }}>{p.amount}</td><td>{p.date}</td><td>{p.bank}</td>
                                    <td><span className="status-badge"><span className={`status-dot ${dot(p.status)}`} />{p.status}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <div className="pagination"><button className="page-btn">&lt;</button><button className="page-btn active">1</button><button className="page-btn">&gt;</button><span className="page-info">of {activeTab === 'transactions' ? '8' : '4'}</span></div>
            </div>
        </>
    );
}
