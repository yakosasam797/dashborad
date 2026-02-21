'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

const mockupsData = {
    'MK-001': { id: 'MK-001', type: 'Simple', product: 'Welcome Kit', client: 'Acme Corp', designer: 'Ravi K.', deadline: 'May 22, 2025', status: 'New', statusColor: 'new', created: 'May 14, 2025', brief: 'Corporate welcome kit with Acme Corp branding - logo on all items, red & black color scheme.', items: 'Notebook, Pen, Mug, Laptop Sleeve', format: 'AI, PSD, PNG' },
    'MK-002': { id: 'MK-002', type: 'Full', product: 'Executive Diary', client: 'TechStart', designer: 'Priya S.', deadline: 'May 20, 2025', status: 'Submitted', statusColor: 'submitted', created: 'May 13, 2025', brief: 'Minimal tech-forward design with gradient logo treatment. Blue + White palette.', items: 'Diary, Pen Set, Card Holder, Bookmark', format: 'AI, PSD, PDF' },
    'MK-003': { id: 'MK-003', type: 'Simple', product: 'Custom Mug', client: 'GlobalTech', designer: 'Amit P.', deadline: 'May 25, 2025', status: 'Feedback', statusColor: 'feedback', created: 'May 12, 2025', brief: 'Classic corporate style. Green palette, embossed logo on ceramic mug.', items: 'Ceramic Mug (Set of 2)', format: 'AI, PNG' },
    'MK-004': { id: 'MK-004', type: 'Full', product: 'Branded T-Shirt', client: 'StartupHub', designer: 'Sneha R.', deadline: 'May 18, 2025', status: 'Approved', statusColor: 'dispatched', created: 'May 11, 2025', brief: 'Fun, youthful branding for startup employees. Bright colors, playful fonts.', items: 'T-Shirt (Front + Back), Collar Label', format: 'PSD, PNG, PDF' },
    'MK-005': { id: 'MK-005', type: 'Simple', product: 'Laptop Sleeve', client: 'InfoSys', designer: 'Vikram S.', deadline: 'May 28, 2025', status: 'New', statusColor: 'new', created: 'May 10, 2025', brief: 'Clean minimalist design for 15-inch laptop sleeve. Navy blue base.', items: 'Laptop Sleeve (15"), Zipper Pull Tag', format: 'AI, PSD' },
    'MK-006': { id: 'MK-006', type: 'Full', product: 'Gift Hamper', client: 'MegaCorp', designer: 'Ravi K.', deadline: 'Jun 01, 2025', status: 'In Progress', statusColor: 'inprocess', created: 'May 09, 2025', brief: 'Premium executive gift hamper. Gold foil accents on dark navy packaging.', items: 'Hamper Box, Tissue, Ribbon, Item Labels', format: 'AI, PSD, PDF' },
    'MK-007': { id: 'MK-007', type: 'Simple', product: 'Desk Organizer', client: 'FinFirst', designer: 'Priya S.', deadline: 'Jun 05, 2025', status: 'New', statusColor: 'new', created: 'May 08, 2025', brief: 'Minimalist wooden desk organizer with subtle logo engraving.', items: 'Desk Organizer (Top + Side branding)', format: 'AI, PNG' },
    'MK-008': { id: 'MK-008', type: 'Simple', product: 'Water Bottle', client: 'HealthPlus', designer: 'Amit P.', deadline: 'May 30, 2025', status: 'Rejected', statusColor: 'new', created: 'May 07, 2025', brief: 'Health-focused branding. Green and white palette. Rejected - needs full redesign.', items: 'Stainless Steel Bottle (360° wrap)', format: 'AI, PSD' },
    'MK-009': { id: 'MK-009', type: 'Full', product: 'Badge Lanyard', client: 'EventPro', designer: 'Sneha R.', deadline: 'Jun 10, 2025', status: 'Submitted', statusColor: 'submitted', created: 'May 06, 2025', brief: 'Event branding for annual tech conference. Bold colors with sponsor logos.', items: 'Lanyard, Badge Card, Clip', format: 'AI, PSD, PDF' },
    'MK-010': { id: 'MK-010', type: 'Simple', product: 'Notebook Set', client: 'EduTech', designer: 'Vikram S.', deadline: 'May 26, 2025', status: 'New', statusColor: 'new', created: 'May 05, 2025', brief: 'Academic theme for student notebooks. Bright, fun cover designs.', items: 'A5 Notebook (Cover + Spine), Inner Pages Header', format: 'PSD, PNG' },
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
        ...(mockup.status === 'Submitted' || mockup.status === 'Feedback' || mockup.status === 'Approved' ? [{ dot: 'blue', text: 'Design Submitted', desc: `First draft uploaded by ${mockup.designer}`, time: 'May 18, 2025' }] : []),
        ...(mockup.status === 'In Progress' ? [{ dot: 'blue', text: 'Design In Progress', desc: `${mockup.designer} is working on the design`, time: 'May 17, 2025' }] : []),
        ...(mockup.status === 'Feedback' ? [{ dot: 'green', text: 'Feedback Received', desc: 'Client provided revision notes', time: 'May 20, 2025' }] : []),
        ...(mockup.status === 'Approved' ? [{ dot: 'green', text: 'Design Approved', desc: 'Client approved the final design', time: 'May 21, 2025' }] : []),
        ...(mockup.status === 'Rejected' ? [{ dot: 'red', text: 'Design Rejected', desc: 'Client requested a full redesign', time: 'May 21, 2025' }] : []),
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
                                <span className="timeline-text"><strong>{t.text}</strong> — {t.desc}{t.time && <span className="time"> {t.time}</span>}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="form-actions" style={{ marginTop: 24 }}>
                <button className="btn-primary" style={{ borderRadius: '100px' }}>Upload Mockup</button>
                <button className="btn-secondary" style={{ borderRadius: '100px' }}>Send Feedback</button>
                <button className="btn-secondary" onClick={() => router.back()} style={{ borderRadius: '100px' }}>← Back to Mockups</button>
            </div>
        </>
    );
}
