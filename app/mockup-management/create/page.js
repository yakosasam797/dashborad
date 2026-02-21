'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewMockupPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        type: 'Simple',
        product: '',
        client: '',
        designer: '',
        deadline: '',
        format: '',
        items: '',
        brief: '',
    });

    const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Mockup request created successfully!');
        router.push('/mockup-management');
    };

    return (
        <>
            <div className="page-header">
                <h1>New Mockup Request</h1>
                <button className="btn-secondary" onClick={() => router.back()} style={{ borderRadius: '100px' }}>← Back</button>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-section">
                    <h2>Mockup Details</h2>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Custom Type *</label>
                            <select value={form.type} onChange={e => handleChange('type', e.target.value)}>
                                <option value="Simple">Simple</option>
                                <option value="Full">Full</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Product *</label>
                            <input
                                type="text"
                                placeholder="e.g. Welcome Kit"
                                value={form.product}
                                onChange={e => handleChange('product', e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Client *</label>
                            <input
                                type="text"
                                placeholder="e.g. Acme Corp"
                                value={form.client}
                                onChange={e => handleChange('client', e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Assigned Designer</label>
                            <input
                                type="text"
                                placeholder="e.g. Ravi K."
                                value={form.designer}
                                onChange={e => handleChange('designer', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Deadline</label>
                            <input
                                type="date"
                                value={form.deadline}
                                onChange={e => handleChange('deadline', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>File Formats Required</label>
                            <input
                                type="text"
                                placeholder="e.g. AI, PSD, PNG"
                                value={form.format}
                                onChange={e => handleChange('format', e.target.value)}
                            />
                        </div>
                        <div className="form-group full-width">
                            <label>Items to Design</label>
                            <input
                                type="text"
                                placeholder="e.g. Notebook, Pen, Mug, Laptop Sleeve"
                                value={form.items}
                                onChange={e => handleChange('items', e.target.value)}
                            />
                        </div>
                        <div className="form-group full-width">
                            <label>Design Brief *</label>
                            <textarea
                                placeholder="Describe the design requirements, color palette, logo placement, style preferences..."
                                value={form.brief}
                                onChange={e => handleChange('brief', e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h2>Upload Reference Files</h2>
                    <div style={{
                        border: '2px dashed var(--border)',
                        borderRadius: 12,
                        padding: '40px 24px',
                        textAlign: 'center',
                        background: '#FAFAFA',
                        cursor: 'pointer',
                    }}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5" style={{ margin: '0 auto 12px' }}>
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                        <p style={{ color: '#6B7280', fontSize: '0.9rem', margin: 0 }}>
                            Drag & drop logo files, reference images here
                        </p>
                        <p style={{ color: '#9CA3AF', fontSize: '0.8rem', marginTop: 6 }}>Supports AI, PSD, PNG, JPG, PDF</p>
                        <input type="file" multiple style={{ display: 'none' }} />
                    </div>
                </div>

                <div className="form-actions" style={{ marginBottom: 32 }}>
                    <button type="submit" className="btn-primary" style={{ borderRadius: '100px', padding: '12px 32px' }}>
                        Create Mockup Request
                    </button>
                    <button type="button" className="btn-secondary" onClick={() => router.back()} style={{ borderRadius: '100px' }}>
                        Cancel
                    </button>
                </div>
            </form>
        </>
    );
}
