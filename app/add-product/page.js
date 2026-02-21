'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddProductPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        name: '', category: 'Corporate', description: '', price: '', sku: '',
        stock: '', minStock: '', weight: '', material: '', color: '',
        customizable: 'Yes', minOrder: '', leadTime: '', tags: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => router.push('/product-management'), 1500);
    };

    if (submitted) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: '16px' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1A1A2E' }}>Product Added Successfully!</h2>
                <p style={{ color: '#6B7280', fontSize: '0.9rem' }}>Redirecting to Product Management...</p>
            </div>
        );
    }

    return (
        <>
            <div className="page-header">
                <h1>Add New Product</h1>
                <button className="btn-secondary" onClick={() => router.back()} style={{ borderRadius: '24px' }}>← Back</button>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-section">
                    <h2>Basic Information</h2>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Product Name *</label>
                            <input type="text" placeholder="Enter product name" value={form.name} onChange={e => handleChange('name', e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Category *</label>
                            <select value={form.category} onChange={e => handleChange('category', e.target.value)}>
                                <option>Corporate</option><option>Stationery</option><option>Apparel</option><option>Drinkware</option><option>Accessories</option><option>Office</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>SKU Code *</label>
                            <input type="text" placeholder="e.g. WK-100" value={form.sku} onChange={e => handleChange('sku', e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Price (₹) *</label>
                            <input type="number" placeholder="0.00" value={form.price} onChange={e => handleChange('price', e.target.value)} required />
                        </div>
                        <div className="form-group full-width">
                            <label>Description</label>
                            <textarea placeholder="Describe the product, its features, materials, etc." value={form.description} onChange={e => handleChange('description', e.target.value)} />
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h2>Inventory & Specifications</h2>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Initial Stock *</label>
                            <input type="number" placeholder="0" value={form.stock} onChange={e => handleChange('stock', e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Minimum Stock Level</label>
                            <input type="number" placeholder="Low stock alert threshold" value={form.minStock} onChange={e => handleChange('minStock', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Weight (grams)</label>
                            <input type="number" placeholder="0" value={form.weight} onChange={e => handleChange('weight', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Material</label>
                            <input type="text" placeholder="e.g. Cotton, Ceramic" value={form.material} onChange={e => handleChange('material', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Available Colors</label>
                            <input type="text" placeholder="e.g. Red, Blue, Black" value={form.color} onChange={e => handleChange('color', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Customizable</label>
                            <select value={form.customizable} onChange={e => handleChange('customizable', e.target.value)}>
                                <option>Yes</option><option>No</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h2>Order Settings</h2>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Minimum Order Quantity</label>
                            <input type="number" placeholder="1" value={form.minOrder} onChange={e => handleChange('minOrder', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Lead Time (days)</label>
                            <input type="number" placeholder="e.g. 7" value={form.leadTime} onChange={e => handleChange('leadTime', e.target.value)} />
                        </div>
                        <div className="form-group full-width">
                            <label>Tags</label>
                            <input type="text" placeholder="Comma-separated tags e.g. corporate, gift, premium" value={form.tags} onChange={e => handleChange('tags', e.target.value)} />
                        </div>
                    </div>
                </div>

                <div className="form-actions" style={{ marginBottom: '24px' }}>
                    <button type="submit" className="btn-primary" style={{ padding: '12px 32px', borderRadius: '24px', fontSize: '0.95rem' }}>Save Product</button>
                    <button type="button" className="btn-secondary" onClick={() => router.back()} style={{ borderRadius: '24px' }}>Cancel</button>
                </div>
            </form>
        </>
    );
}
