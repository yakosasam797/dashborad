'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

const mockupsData = {
    '100015': { id: '100015', type: 'Simple', product: 'Welcome Kit', client: 'Acme Corp', designer: 'Ravi K.', deadline: 'May 22, 2025', status: 'New', statusColor: 'new', created: 'May 14, 2025', brief: 'Corporate welcome kit with Acme Corp branding - logo on all items, red & black color scheme.', items: 'Notebook, Pen, Mug, Laptop Sleeve', format: 'AI, PSD, PNG' },
    '100016': { id: '100016', type: 'Full', product: 'Welcome Kit', client: 'TechStart Inc', designer: 'Priya S.', deadline: 'May 22, 2025', status: 'Submitted', statusColor: 'submitted', created: 'May 13, 2025', brief: 'Minimal tech-forward design with gradient logo treatment. Blue + White palette.', items: 'Notebook, Pen, Mug, T-Shirt, Bag', format: 'AI, PSD, PDF' },
    '100017': { id: '100017', type: 'Simple', product: 'Welcome Kit', client: 'GlobalTech', designer: 'Amit P.', deadline: 'May 22, 2025', status: 'Feedback', statusColor: 'feedback', created: 'May 12, 2025', brief: 'Classic corporate style. Green palette, embossed logo on leather items.', items: 'Diary, Pen, Card Holder', format: 'AI, PNG' },
    '100018': { id: '100018', type: 'Simple', product: 'Welcome Kit', client: 'StartupHub', designer: 'Sneha R.', deadline: 'May 22, 2025', status: 'New', statusColor: 'new', created: 'May 11, 2025', brief: 'Fun, youthful branding for startup employees. Bright colors, playful fonts.', items: 'T-Shirt, Mug, Sticker Set', format: 'PSD, PNG' },
    '100019': { id: '100019', type: 'Simple', product: 'Welcome Kit', client: 'MegaCorp', designer: 'Vikram S.', deadline: 'May 22, 2025', status: 'New', statusColor: 'new', created: 'May 10, 2025', brief: 'Premium executive kit. Gold foil accents on dark navy items.', items: 'Hamper Box, Diary, Pen, Bottle', format: 'AI, PSD, PDF' },
};

export default function MockupViewPage() {
    const params = useParams();
    const router = useRouter();
    const mockup = mockupsData[params.id];

    if (!mockup) {
        return (
            <div className="empty-state">
                <h3>Mockup not found</h3>
                <p>Mockup ID "{params.id}" does not exist.</p>
                <Link href="/mockup-management" className="btn-primary" style={{ marginTop: 16, borderRadius: '100px' }}>← Back to Mockups</Link>
            </div>
        );
    }

    const timeline = [
        { dot: 'gold', text: 'Request Created', desc: `Mockup requested by ${mockup.client}`, time: mockup.created },
        ...(mockup.status === 'Submitted' || mockup.status === 'Feedback' ? [{ dot: 'blue', text: 'Design Submitted', desc: `First draft uploaded by ${mockup.designer}`, time: 'May 18, 2025' }] : []),
        ...(mockup.status === 'Feedback' ? [{ dot: 'green', text: 'Feedback Received', desc: 'Client provided revision notes', time: 'May 20, 2025' }] : []),
        ...(mockup.status === 'New' ? [{ dot: 'gray', text: 'Awaiting Design', desc: `Assigned to ${mockup.designer}`, time: '' }] : []),
    ];

    return (
        <>
            <div className="page-header">
                <h1>Mockup — {mockup.id}</h1>
                <button className="btn-secondary" onClick={() => router.back()} style={{ borderRadius: '100px' }}>← Back</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
                <div className="form-section">
                    <h2>Mockup Details</h2>
                    <div className="detail-grid">
                        <div className="detail-item"><span className="detail-label">Mockup ID</span><span className="detail-value">{mockup.id}</span></div>
                        <div className="detail-item"><span className="detail-label">Custom Type</span><span className="detail-value">{mockup.type}</span></div>
                        <div className="detail-item"><span className="detail-label">Product</span><span className="detail-value">{mockup.product}</span></div>
                        <div className="detail-item"><span className="detail-label">Client</span><span className="detail-value">{mockup.client}</span></div>
                        <div className="detail-item"><span className="detail-label">Designer</span><span className="detail-value">{mockup.designer}</span></div>
                        <div className="detail-item"><span className="detail-label">Deadline</span><span className="detail-value">{mockup.deadline}</span></div>
                        <div className="detail-item"><span className="detail-label">Status</span><span className="detail-value"><span className="status-badge"><span className={`status-dot ${mockup.statusColor}`} />{mockup.status}</span></span></div>
                        <div className="detail-item"><span className="detail-label">File Formats</span><span className="detail-value">{mockup.format}</span></div>
                        <div className="detail-item full-width"><span className="detail-label">Items to Design</span><span className="detail-value">{mockup.items}</span></div>
                        <div className="detail-divider" />
                        <div className="detail-item full-width"><span className="detail-label">Design Brief</span><span className="detail-value">{mockup.brief}</span></div>
                    </div>
                </div>

                <div className="form-section" style={{ marginBottom: 0 }}>
                    <h2>Timeline</h2>
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

            <div className="form-actions" style={{ marginTop: 24 }}>
                <button className="btn-primary" style={{ borderRadius: '100px' }}>Upload Mockup</button>
                <button className="btn-secondary" style={{ borderRadius: '100px' }}>Send Feedback</button>
            </div>
        </>
    );
}
