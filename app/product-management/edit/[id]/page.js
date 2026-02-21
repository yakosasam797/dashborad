'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

const productsData = {
    'PRD001': { id: 'PRD001', name: 'Welcome Kit', category: 'Corporate', price: '₹2,500', stock: 145, sku: 'WK-100', status: 'Active', created: 'Jan 15, 2025', description: 'Premium corporate welcome kit with branded notebook, pen, mug, and laptop sleeve. Customizable with company logo and colors.', material: 'Mixed — Paper, Ceramic, Nylon', weight: '1200g', color: 'Black, Blue, White', customizable: 'Yes', minOrder: 50, leadTime: '7 days' },
    'PRD002': { id: 'PRD002', name: 'Executive Diary', category: 'Stationery', price: '₹850', stock: 320, sku: 'ED-200', status: 'Active', created: 'Feb 02, 2025', description: 'Leather-bound executive diary with gold foil stamping. 200 pages, A5 size.', material: 'PU Leather', weight: '450g', color: 'Brown, Black, Navy', customizable: 'Yes', minOrder: 100, leadTime: '5 days' },
    'PRD003': { id: 'PRD003', name: 'Branded T-Shirt', category: 'Apparel', price: '₹650', stock: 0, sku: 'BT-300', status: 'Out of Stock', created: 'Mar 10, 2025', description: 'Premium cotton round-neck t-shirt with screen print. Available in M, L, XL, XXL.', material: '100% Cotton', weight: '180g', color: 'White, Black, Grey, Navy', customizable: 'Yes', minOrder: 50, leadTime: '10 days' },
    'PRD004': { id: 'PRD004', name: 'Custom Mug', category: 'Drinkware', price: '₹350', stock: 87, sku: 'CM-400', status: 'Active', created: 'Mar 22, 2025', description: 'Ceramic mug with full-color sublimation print. Dishwasher safe.', material: 'Ceramic', weight: '320g', color: 'White', customizable: 'Yes', minOrder: 25, leadTime: '3 days' },
    'PRD005': { id: 'PRD005', name: 'Laptop Sleeve', category: 'Accessories', price: '₹1,200', stock: 54, sku: 'LS-500', status: 'Active', created: 'Apr 05, 2025', description: 'Padded laptop sleeve with embossed logo. Fits up to 15.6" laptops.', material: 'Neoprene', weight: '280g', color: 'Black, Grey', customizable: 'Yes', minOrder: 30, leadTime: '5 days' },
    'PRD006': { id: 'PRD006', name: 'Desk Organizer', category: 'Office', price: '₹1,800', stock: 12, sku: 'DO-600', status: 'Low Stock', created: 'Apr 18, 2025', description: 'Multi-compartment wooden desk organizer with engraved branding.', material: 'Bamboo Wood', weight: '650g', color: 'Natural, Walnut', customizable: 'Yes', minOrder: 20, leadTime: '12 days' },
    'PRD007': { id: 'PRD007', name: 'Gift Hamper', category: 'Corporate', price: '₹4,500', stock: 200, sku: 'GH-700', status: 'Active', created: 'May 01, 2025', description: 'Curated gift hamper with premium chocolates, candle, notebook, and mug in a branded box.', material: 'Mixed', weight: '2000g', color: 'Premium Box', customizable: 'Yes', minOrder: 10, leadTime: '7 days' },
    'PRD008': { id: 'PRD008', name: 'Water Bottle', category: 'Drinkware', price: '₹550', stock: 0, sku: 'WB-800', status: 'Draft', created: 'May 10, 2025', description: 'Double-wall insulated stainless steel bottle with laser engraved logo.', material: 'Stainless Steel', weight: '350g', color: 'Silver, Black, Rose Gold', customizable: 'Yes', minOrder: 50, leadTime: '5 days' },
    'PRD009': { id: 'PRD009', name: 'Badge Lanyard', category: 'Accessories', price: '₹150', stock: 500, sku: 'BL-900', status: 'Active', created: 'May 17, 2025', description: 'Custom printed polyester lanyard with safety breakaway clip.', material: 'Polyester', weight: '25g', color: 'Any (Custom Print)', customizable: 'Yes', minOrder: 100, leadTime: '3 days' },
    'PRD010': { id: 'PRD010', name: 'Notebook Set', category: 'Stationery', price: '₹490', stock: 230, sku: 'NS-1000', status: 'Active', created: 'May 15, 2025', description: 'Set of 3 notebooks (A5) with soft-touch cover and foil stamped logo.', material: 'Paper, PU Cover', weight: '380g', color: 'Black, Blue, Red', customizable: 'Yes', minOrder: 50, leadTime: '5 days' },
};

export default function ProductEditPage() {
    const params = useParams();
    const router = useRouter();
    const product = productsData[params.id];

    const [form, setForm] = useState(product ? {
        name: product.name, category: product.category, price: product.price.replace('₹', ''), sku: product.sku,
        stock: product.stock, description: product.description, material: product.material, weight: product.weight.replace('g', ''),
        color: product.color, customizable: product.customizable, minOrder: product.minOrder, leadTime: product.leadTime.replace(' days', ''),
    } : {});

    if (!product) {
        return (
            <div className="empty-state">
                <h3>Product not found</h3>
                <p>Product ID "{params.id}" does not exist.</p>
                <Link href="/product-management" className="btn-primary" style={{ marginTop: 16, borderRadius: '100px' }}>← Back to Products</Link>
            </div>
        );
    }

    const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

    return (
        <>
            <div className="page-header">
                <h1>Edit Product — {product.id}</h1>
                <button className="btn-secondary" onClick={() => router.back()} style={{ borderRadius: '100px' }}>← Back</button>
            </div>

            <form onSubmit={e => { e.preventDefault(); router.push('/product-management'); }}>
                <div className="form-section">
                    <h2>Basic Information</h2>
                    <div className="form-grid">
                        <div className="form-group"><label>Product Name *</label><input type="text" value={form.name} onChange={e => handleChange('name', e.target.value)} /></div>
                        <div className="form-group"><label>Category</label>
                            <select value={form.category} onChange={e => handleChange('category', e.target.value)}>
                                <option>Corporate</option><option>Stationery</option><option>Apparel</option><option>Drinkware</option><option>Accessories</option><option>Office</option>
                            </select>
                        </div>
                        <div className="form-group"><label>SKU</label><input type="text" value={form.sku} onChange={e => handleChange('sku', e.target.value)} /></div>
                        <div className="form-group"><label>Price (₹)</label><input type="text" value={form.price} onChange={e => handleChange('price', e.target.value)} /></div>
                        <div className="form-group full-width"><label>Description</label><textarea value={form.description} onChange={e => handleChange('description', e.target.value)} /></div>
                    </div>
                </div>

                <div className="form-section">
                    <h2>Specifications</h2>
                    <div className="form-grid">
                        <div className="form-group"><label>Stock</label><input type="number" value={form.stock} onChange={e => handleChange('stock', e.target.value)} /></div>
                        <div className="form-group"><label>Material</label><input type="text" value={form.material} onChange={e => handleChange('material', e.target.value)} /></div>
                        <div className="form-group"><label>Weight (g)</label><input type="text" value={form.weight} onChange={e => handleChange('weight', e.target.value)} /></div>
                        <div className="form-group"><label>Colors</label><input type="text" value={form.color} onChange={e => handleChange('color', e.target.value)} /></div>
                        <div className="form-group"><label>Customizable</label>
                            <select value={form.customizable} onChange={e => handleChange('customizable', e.target.value)}><option>Yes</option><option>No</option></select>
                        </div>
                        <div className="form-group"><label>Min Order Qty</label><input type="number" value={form.minOrder} onChange={e => handleChange('minOrder', e.target.value)} /></div>
                        <div className="form-group"><label>Lead Time (days)</label><input type="text" value={form.leadTime} onChange={e => handleChange('leadTime', e.target.value)} /></div>
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
