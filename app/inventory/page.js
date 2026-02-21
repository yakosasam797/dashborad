'use client';

import { useState } from 'react';

const inventoryData = [
    { id: 'INV-001', product: 'Welcome Kit', sku: 'WK-100', category: 'Corporate', stock: 145, maxStock: 500, status: 'In Stock', lastUpdated: 'May 15, 2025' },
    { id: 'INV-002', product: 'Executive Diary', sku: 'ED-200', category: 'Stationery', stock: 320, maxStock: 600, status: 'In Stock', lastUpdated: 'May 14, 2025' },
    { id: 'INV-003', product: 'Branded T-Shirt', sku: 'BT-300', category: 'Apparel', stock: 0, maxStock: 400, status: 'Out of Stock', lastUpdated: 'May 12, 2025' },
    { id: 'INV-004', product: 'Custom Mug', sku: 'CM-400', category: 'Drinkware', stock: 87, maxStock: 300, status: 'In Stock', lastUpdated: 'May 13, 2025' },
    { id: 'INV-005', product: 'Laptop Sleeve', sku: 'LS-500', category: 'Accessories', stock: 54, maxStock: 200, status: 'In Stock', lastUpdated: 'May 11, 2025' },
    { id: 'INV-006', product: 'Desk Organizer', sku: 'DO-600', category: 'Office', stock: 12, maxStock: 150, status: 'Low Stock', lastUpdated: 'May 10, 2025' },
    { id: 'INV-007', product: 'Gift Hamper', sku: 'GH-700', category: 'Corporate', stock: 200, maxStock: 400, status: 'In Stock', lastUpdated: 'May 09, 2025' },
    { id: 'INV-008', product: 'Water Bottle', sku: 'WB-800', category: 'Drinkware', stock: 8, maxStock: 250, status: 'Low Stock', lastUpdated: 'May 08, 2025' },
    { id: 'INV-009', product: 'Badge Lanyard', sku: 'BL-900', category: 'Accessories', stock: 500, maxStock: 1000, status: 'In Stock', lastUpdated: 'May 07, 2025' },
    { id: 'INV-010', product: 'Notebook Set', sku: 'NS-1000', category: 'Stationery', stock: 230, maxStock: 500, status: 'In Stock', lastUpdated: 'May 06, 2025' },
];

export default function InventoryPage() {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const filtered = inventoryData.filter(item => {
        if (statusFilter !== 'All' && item.status !== statusFilter) return false;
        if (search && !item.product.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
    });

    const getStockLevel = (item) => {
        const pct = (item.stock / item.maxStock) * 100;
        if (pct < 15) return 'low';
        if (pct < 50) return 'medium';
        return 'high';
    };

    const getStatusDot = (s) => s === 'In Stock' ? 'dispatched' : s === 'Low Stock' ? 'submitted' : 'new';
    const totalStock = inventoryData.reduce((sum, i) => sum + i.stock, 0);

    return (
        <>
            <div className="page-header">
                <h1>Inventory Management</h1>
                <button className="btn-primary" style={{ borderRadius: '24px' }}>+ Stock Entry</button>
            </div>

            <div className="stat-cards" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                <div className="stat-card"><div className="stat-card-top"><span className="stat-card-label">Total Products</span></div><span className="stat-card-value">{inventoryData.length}</span></div>
                <div className="stat-card"><div className="stat-card-top"><span className="stat-card-label">Total Stock</span></div><span className="stat-card-value">{totalStock.toLocaleString()}</span></div>
                <div className="stat-card"><div className="stat-card-top"><span className="stat-card-label">Low Stock</span></div><span className="stat-card-value">{inventoryData.filter(i => i.status === 'Low Stock').length}</span></div>
                <div className="stat-card"><div className="stat-card-top"><span className="stat-card-label">Out of Stock</span></div><span className="stat-card-value">{inventoryData.filter(i => i.status === 'Out of Stock').length}</span></div>
            </div>

            <div className="table-section full-width">
                <div className="table-header">
                    <h2>Stock Levels</h2>
                    <div className="table-filters">
                        <div className="table-search">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                            <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: '120px' }} />
                        </div>
                        <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                            <option value="All">Status</option>
                            <option value="In Stock">In Stock</option>
                            <option value="Low Stock">Low Stock</option>
                            <option value="Out of Stock">Out of Stock</option>
                        </select>
                    </div>
                </div>
                <table className="data-table">
                    <thead><tr><th>ID</th><th>Product</th><th>SKU</th><th>Category</th><th>Stock</th><th>Level</th><th>Status</th><th>Updated</th><th>Actions</th></tr></thead>
                    <tbody>
                        {filtered.map((item, i) => (
                            <tr key={i}>
                                <td>{item.id}</td>
                                <td style={{ fontWeight: 600 }}>{item.product}</td>
                                <td>{item.sku}</td>
                                <td>{item.category}</td>
                                <td>{item.stock}</td>
                                <td><div className="stock-indicator"><div className="stock-bar"><div className={`stock-bar-fill ${getStockLevel(item)}`} style={{ width: `${Math.min((item.stock / item.maxStock) * 100, 100)}%` }} /></div></div></td>
                                <td><span className="status-badge"><span className={`status-dot ${getStatusDot(item.status)}`} />{item.status}</span></td>
                                <td>{item.lastUpdated}</td>
                                <td><button className="view-btn gold">Update</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination">
                    <button className="page-btn">&lt;</button>
                    <button className="page-btn active">1</button>
                    <button className="page-btn">&gt;</button>
                    <span className="page-info">of 10</span>
                </div>
            </div>
        </>
    );
}
