'use client';

import { useState } from 'react';

const products = [
    { id: 'PRD001', name: 'Welcome Kit', category: 'Corporate', price: '₹2,500', stock: 145, status: 'Active', created: 'Jan 15, 2025' },
    { id: 'PRD002', name: 'Executive Diary', category: 'Stationery', price: '₹850', stock: 320, status: 'Active', created: 'Feb 02, 2025' },
    { id: 'PRD003', name: 'Branded T-Shirt', category: 'Apparel', price: '₹650', stock: 0, status: 'Out of Stock', created: 'Mar 10, 2025' },
    { id: 'PRD004', name: 'Custom Mug', category: 'Drinkware', price: '₹350', stock: 87, status: 'Active', created: 'Mar 22, 2025' },
    { id: 'PRD005', name: 'Laptop Sleeve', category: 'Accessories', price: '₹1,200', stock: 54, status: 'Active', created: 'Apr 05, 2025' },
    { id: 'PRD006', name: 'Desk Organizer', category: 'Office', price: '₹1,800', stock: 12, status: 'Low Stock', created: 'Apr 18, 2025' },
    { id: 'PRD007', name: 'Gift Hamper', category: 'Corporate', price: '₹4,500', stock: 200, status: 'Active', created: 'May 01, 2025' },
    { id: 'PRD008', name: 'Water Bottle', category: 'Drinkware', price: '₹550', stock: 0, status: 'Draft', created: 'May 10, 2025' },
    { id: 'PRD009', name: 'Badge Lanyard', category: 'Accessories', price: '₹150', stock: 500, status: 'Active', created: 'May 12, 2025' },
    { id: 'PRD010', name: 'Notebook Set', category: 'Stationery', price: '₹480', stock: 230, status: 'Active', created: 'May 15, 2025' },
];

export default function ProductManagement() {
    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);

    const categories = ['All', ...new Set(products.map(p => p.category))];
    const statuses = ['All', 'Active', 'Out of Stock', 'Low Stock', 'Draft'];

    const filtered = products.filter(p => {
        if (categoryFilter !== 'All' && p.category !== categoryFilter) return false;
        if (statusFilter !== 'All' && p.status !== statusFilter) return false;
        if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.id.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
    });

    const getStatusClass = (status) => {
        switch (status) {
            case 'Active': return 'dispatched';
            case 'Out of Stock': return 'new';
            case 'Low Stock': return 'submitted';
            case 'Draft': return 'inprocess';
            default: return 'new';
        }
    };

    return (
        <>
            <div className="page-header">
                <h1>Product Management</h1>
                <button className="btn-primary" style={{ borderRadius: '24px', padding: '10px 24px' }}>+ Add New Product</button>
            </div>

            {/* Summary Cards */}
            <div className="stat-cards" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                <div className="stat-card">
                    <div className="stat-card-top">
                        <span className="stat-card-label">Total Products</span>
                        <span className="stat-card-icon blue">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /></svg>
                        </span>
                    </div>
                    <span className="stat-card-value">128</span>
                    <span className="stat-card-link">View all &gt;</span>
                </div>
                <div className="stat-card">
                    <div className="stat-card-top">
                        <span className="stat-card-label">Active</span>
                        <span className="stat-card-icon green">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                        </span>
                    </div>
                    <span className="stat-card-value">96</span>
                    <span className="stat-card-link">View &gt;</span>
                </div>
                <div className="stat-card">
                    <div className="stat-card-top">
                        <span className="stat-card-label">Out of Stock</span>
                        <span className="stat-card-icon" style={{ background: '#FEF2F2', color: '#EF4444' }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
                        </span>
                    </div>
                    <span className="stat-card-value">18</span>
                    <span className="stat-card-link">View &gt;</span>
                </div>
                <div className="stat-card">
                    <div className="stat-card-top">
                        <span className="stat-card-label">Drafts</span>
                        <span className="stat-card-icon gold">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                        </span>
                    </div>
                    <span className="stat-card-value">14</span>
                    <span className="stat-card-link">View &gt;</span>
                </div>
            </div>

            {/* Products Table */}
            <div className="table-section full-width">
                <div className="table-header">
                    <h2>All Products</h2>
                    <div className="table-filters">
                        <div className="table-search">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: '140px' }} />
                        </div>
                        <select className="filter-select" value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
                            {categories.map(c => <option key={c} value={c}>{c === 'All' ? 'Category' : c}</option>)}
                        </select>
                        <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                            {statuses.map(s => <option key={s} value={s}>{s === 'All' ? 'Status' : s}</option>)}
                        </select>
                    </div>
                </div>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Status</th>
                            <th>Created</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((product, i) => (
                            <tr key={i}>
                                <td>{product.id}</td>
                                <td style={{ fontWeight: 600 }}>{product.name}</td>
                                <td>{product.category}</td>
                                <td>{product.price}</td>
                                <td>{product.stock}</td>
                                <td>
                                    <span className="status-badge">
                                        <span className={`status-dot ${getStatusClass(product.status)}`} />
                                        {product.status}
                                    </span>
                                </td>
                                <td>{product.created}</td>
                                <td>
                                    <div className="action-btns">
                                        <button className="view-btn gold">Edit</button>
                                        <button className="view-btn red">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination">
                    <button className="page-btn">&lt;</button>
                    <button className="page-btn active">1</button>
                    <button className="page-btn">2</button>
                    <button className="page-btn">3</button>
                    <button className="page-btn">&gt;</button>
                    <span className="page-info">of 13</span>
                </div>
            </div>
        </>
    );
}
