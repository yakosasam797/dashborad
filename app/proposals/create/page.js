'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const emptyItem = { name: '', qty: '', price: '' };

export default function CreateProposalPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        title: '',
        client: '',
        contact: '',
        contactEmail: '',
        value: '',
        status: 'Draft',
        validTill: '',
        notes: '',
    });
    const [items, setItems] = useState([{ ...emptyItem }]);

    const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

    const handleItemChange = (index, field, value) => {
        setItems(prev => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));
    };

    const addItem = () => setItems(prev => [...prev, { ...emptyItem }]);
    const removeItem = (index) => setItems(prev => prev.filter((_, i) => i !== index));

    const total = items.reduce((sum, item) => {
        const qty = parseInt(item.qty) || 0;
        const price = parseInt(item.price.replace(/[,]/g, '')) || 0;
        return sum + qty * price;
    }, 0);

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app this would POST to an API
        alert('Proposal created successfully!');
        router.push('/proposals');
    };

    return (
        <>
            <div className="page-header">
                <h1>Create New Proposal</h1>
                <button className="btn-secondary" onClick={() => router.back()} style={{ borderRadius: '100px' }}>← Back</button>
            </div>

            <form onSubmit={handleSubmit}>
                {/* Basic Info */}
                <div className="form-section">
                    <h2>Proposal Information</h2>
                    <div className="form-grid">
                        <div className="form-group full-width">
                            <label>Proposal Title *</label>
                            <input
                                type="text"
                                placeholder="e.g. Corporate Gift Set 2025"
                                value={form.title}
                                onChange={e => handleChange('title', e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Client / Company *</label>
                            <input
                                type="text"
                                placeholder="e.g. Acme Corp"
                                value={form.client}
                                onChange={e => handleChange('client', e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Contact Person</label>
                            <input
                                type="text"
                                placeholder="e.g. Ramesh Gupta"
                                value={form.contact}
                                onChange={e => handleChange('contact', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Contact Email</label>
                            <input
                                type="email"
                                placeholder="e.g. ramesh@acmecorp.com"
                                value={form.contactEmail}
                                onChange={e => handleChange('contactEmail', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Status</label>
                            <select value={form.status} onChange={e => handleChange('status', e.target.value)}>
                                <option>Draft</option>
                                <option>Sent</option>
                                <option>Accepted</option>
                                <option>Rejected</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Valid Till</label>
                            <input
                                type="date"
                                value={form.validTill}
                                onChange={e => handleChange('validTill', e.target.value)}
                            />
                        </div>
                        <div className="form-group full-width">
                            <label>Notes</label>
                            <textarea
                                placeholder="Any additional notes or requirements..."
                                value={form.notes}
                                onChange={e => handleChange('notes', e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Line Items */}
                <div className="form-section">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                        <h2 style={{ margin: 0 }}>Line Items</h2>
                        <button type="button" className="btn-secondary" onClick={addItem} style={{ borderRadius: '24px', padding: '8px 20px', fontSize: '0.85rem' }}>
                            + Add Item
                        </button>
                    </div>

                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Product / Service</th>
                                <th>Quantity</th>
                                <th>Unit Price (₹)</th>
                                <th>Total</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, i) => (
                                <tr key={i}>
                                    <td>
                                        <input
                                            type="text"
                                            placeholder="e.g. Welcome Kit"
                                            value={item.name}
                                            onChange={e => handleItemChange(i, 'name', e.target.value)}
                                            style={{ width: '100%', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 12px', fontSize: '0.875rem' }}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            placeholder="100"
                                            value={item.qty}
                                            onChange={e => handleItemChange(i, 'qty', e.target.value)}
                                            style={{ width: '90px', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 12px', fontSize: '0.875rem' }}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            placeholder="2,500"
                                            value={item.price}
                                            onChange={e => handleItemChange(i, 'price', e.target.value)}
                                            style={{ width: '110px', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 12px', fontSize: '0.875rem' }}
                                        />
                                    </td>
                                    <td style={{ fontWeight: 700 }}>
                                        ₹{((parseInt(item.qty) || 0) * (parseInt(item.price.replace(/[,]/g, '')) || 0)).toLocaleString('en-IN')}
                                    </td>
                                    <td>
                                        {items.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeItem(i)}
                                                style={{ background: '#FEF2F2', color: '#EF4444', border: 'none', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div style={{ padding: '16px 18px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: 16, alignItems: 'center' }}>
                        <span style={{ fontSize: '0.85rem', color: '#6B7280' }}>Total Value:</span>
                        <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827' }}>₹{total.toLocaleString('en-IN')}</span>
                    </div>
                </div>

                <div className="form-actions" style={{ marginBottom: 32 }}>
                    <button type="submit" className="btn-primary" style={{ borderRadius: '100px', padding: '12px 32px' }}>
                        Create Proposal
                    </button>
                    <button type="button" className="btn-secondary" onClick={() => router.back()} style={{ borderRadius: '100px' }}>
                        Cancel
                    </button>
                </div>
            </form>
        </>
    );
}
