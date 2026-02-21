'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

const inventoryData = {
    'INV-001': { id: 'INV-001', product: 'Welcome Kit', sku: 'WK-100', category: 'Corporate', stock: 145, maxStock: 300, status: 'In Stock', updated: 'May 15, 2025', warehouse: 'Warehouse A — Koramangala', reorderLevel: 50, supplier: 'Supreme Gifts Pvt Ltd', lastReceived: 'May 10, 2025', unitCost: '₹1,800' },
    'INV-002': { id: 'INV-002', product: 'Executive Diary', sku: 'ED-200', category: 'Stationery', stock: 320, maxStock: 500, status: 'In Stock', updated: 'May 14, 2025', warehouse: 'Warehouse B — Whitefield', reorderLevel: 100, supplier: 'PrintPro India', lastReceived: 'May 08, 2025', unitCost: '₹500' },
    'INV-003': { id: 'INV-003', product: 'Branded T-Shirt', sku: 'BT-300', category: 'Apparel', stock: 0, maxStock: 200, status: 'Out of Stock', updated: 'May 12, 2025', warehouse: 'Warehouse A — Koramangala', reorderLevel: 30, supplier: 'FashionFirst Co', lastReceived: 'Apr 20, 2025', unitCost: '₹380' },
    'INV-004': { id: 'INV-004', product: 'Custom Mug', sku: 'CM-400', category: 'Drinkware', stock: 87, maxStock: 200, status: 'In Stock', updated: 'May 13, 2025', warehouse: 'Warehouse A — Koramangala', reorderLevel: 40, supplier: 'CeramicWorks', lastReceived: 'May 05, 2025', unitCost: '₹180' },
    'INV-005': { id: 'INV-005', product: 'Laptop Sleeve', sku: 'LS-500', category: 'Accessories', stock: 54, maxStock: 150, status: 'In Stock', updated: 'May 11, 2025', warehouse: 'Warehouse B — Whitefield', reorderLevel: 25, supplier: 'BagCraft India', lastReceived: 'May 01, 2025', unitCost: '₹750' },
    'INV-006': { id: 'INV-006', product: 'Desk Organizer', sku: 'DO-600', category: 'Office', stock: 12, maxStock: 100, status: 'Low Stock', updated: 'May 10, 2025', warehouse: 'Warehouse A — Koramangala', reorderLevel: 20, supplier: 'WoodWorks Studio', lastReceived: 'Apr 25, 2025', unitCost: '₹1,100' },
    'INV-007': { id: 'INV-007', product: 'Gift Hamper', sku: 'GH-700', category: 'Corporate', stock: 200, maxStock: 300, status: 'In Stock', updated: 'May 08, 2025', warehouse: 'Warehouse A — Koramangala', reorderLevel: 30, supplier: 'GourmetBox India', lastReceived: 'May 03, 2025', unitCost: '₹2,800' },
    'INV-008': { id: 'INV-008', product: 'Water Bottle', sku: 'WB-800', category: 'Drinkware', stock: 8, maxStock: 200, status: 'Low Stock', updated: 'May 08, 2025', warehouse: 'Warehouse B — Whitefield', reorderLevel: 40, supplier: 'SteelCraft Ltd', lastReceived: 'Apr 28, 2025', unitCost: '₹320' },
    'INV-009': { id: 'INV-009', product: 'Badge Lanyard', sku: 'BL-900', category: 'Accessories', stock: 500, maxStock: 1000, status: 'In Stock', updated: 'May 07, 2025', warehouse: 'Warehouse A — Koramangala', reorderLevel: 200, supplier: 'PrintPro India', lastReceived: 'May 02, 2025', unitCost: '₹60' },
    'INV-010': { id: 'INV-010', product: 'Notebook Set', sku: 'NS-1000', category: 'Stationery', stock: 230, maxStock: 400, status: 'In Stock', updated: 'May 06, 2025', warehouse: 'Warehouse B — Whitefield', reorderLevel: 80, supplier: 'PrintPro India', lastReceived: 'May 01, 2025', unitCost: '₹280' },
};

export default function InventoryUpdatePage() {
    const params = useParams();
    const router = useRouter();
    const item = inventoryData[params.id];

    const [addQty, setAddQty] = useState('');
    const [notes, setNotes] = useState('');

    if (!item) {
        return (
            <div className="empty-state">
                <h3>Inventory item not found</h3>
                <p>ID "{params.id}" does not exist.</p>
                <Link href="/inventory" className="btn-primary" style={{ marginTop: 16, borderRadius: '100px' }}>← Back to Inventory</Link>
            </div>
        );
    }

    const pct = Math.round((item.stock / item.maxStock) * 100);
    const level = pct < 15 ? 'low' : pct < 50 ? 'medium' : 'high';

    return (
        <>
            <div className="page-header">
                <h1>Update Stock — {item.id}</h1>
                <button className="btn-secondary" onClick={() => router.back()} style={{ borderRadius: '100px' }}>← Back</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                <div className="form-section" style={{ marginBottom: 0 }}>
                    <h2>Product Info</h2>
                    <div className="detail-grid">
                        <div className="detail-item"><span className="detail-label">Product</span><span className="detail-value" style={{ fontWeight: 700 }}>{item.product}</span></div>
                        <div className="detail-item"><span className="detail-label">SKU</span><span className="detail-value">{item.sku}</span></div>
                        <div className="detail-item"><span className="detail-label">Category</span><span className="detail-value">{item.category}</span></div>
                        <div className="detail-item"><span className="detail-label">Warehouse</span><span className="detail-value">{item.warehouse}</span></div>
                        <div className="detail-item"><span className="detail-label">Supplier</span><span className="detail-value">{item.supplier}</span></div>
                        <div className="detail-item"><span className="detail-label">Unit Cost</span><span className="detail-value">{item.unitCost}</span></div>
                    </div>
                </div>

                <div className="form-section" style={{ marginBottom: 0 }}>
                    <h2>Current Stock Level</h2>
                    <div style={{ textAlign: 'center', padding: '20px 0' }}>
                        <div style={{ fontSize: '3rem', fontWeight: 800, color: '#111827', letterSpacing: '-0.03em' }}>{item.stock}</div>
                        <div style={{ fontSize: '0.85rem', color: '#6B7280', marginBottom: 16 }}>of {item.maxStock} max capacity</div>
                        <div className="stock-bar" style={{ width: '100%', height: 10, borderRadius: 100 }}>
                            <div className={`stock-bar-fill ${level}`} style={{ width: `${pct}%` }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: '0.78rem', color: '#9CA3AF' }}>
                            <span>0</span><span>{pct}% filled</span><span>{item.maxStock}</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
                        <div className="detail-item"><span className="detail-label">Status</span><span className="detail-value"><span className="status-badge"><span className={`status-dot ${item.status === 'In Stock' ? 'dispatched' : item.status === 'Low Stock' ? 'submitted' : 'new'}`} />{item.status}</span></span></div>
                        <div className="detail-item"><span className="detail-label">Reorder Level</span><span className="detail-value">{item.reorderLevel} units</span></div>
                        <div className="detail-item"><span className="detail-label">Last Received</span><span className="detail-value">{item.lastReceived}</span></div>
                    </div>
                </div>
            </div>

            <div className="form-section" style={{ marginTop: 24 }}>
                <h2>Update Stock</h2>
                <div className="form-grid">
                    <div className="form-group"><label>Add Quantity</label><input type="number" placeholder="Enter quantity to add" value={addQty} onChange={e => setAddQty(e.target.value)} /></div>
                    <div className="form-group"><label>Received From</label><input type="text" defaultValue={item.supplier} /></div>
                    <div className="form-group full-width"><label>Notes</label><textarea placeholder="Add any notes about this stock update..." value={notes} onChange={e => setNotes(e.target.value)} /></div>
                </div>
                <div className="form-actions">
                    <button className="btn-primary" onClick={() => router.push('/inventory')} style={{ borderRadius: '100px', padding: '12px 32px' }}>Update Stock</button>
                    <button className="btn-secondary" onClick={() => router.back()} style={{ borderRadius: '100px' }}>Cancel</button>
                </div>
            </div>
        </>
    );
}
