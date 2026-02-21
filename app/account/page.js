'use client';

import { useState } from 'react';

export default function AccountPage() {
    const [profile, setProfile] = useState({
        companyName: 'Basecamp Gifting Solutions',
        ownerName: 'Rajesh Kumar',
        email: 'rajesh@basecampgifts.com',
        phone: '+91 98765 43210',
        gst: '29ABCDE1234F1ZK',
        address: '123 Business Park, Koramangala, Bangalore, Karnataka 560034',
        website: 'www.basecampgifts.com',
        bankName: 'HDFC Bank',
        accountNo: 'XXXX XXXX XXXX 4521',
        ifsc: 'HDFC0001234',
        panNo: 'ABCDE1234F',
    });

    const [editing, setEditing] = useState(false);

    const handleChange = (field, value) => {
        setProfile(prev => ({ ...prev, [field]: value }));
    };

    return (
        <>
            <div className="page-header">
                <h1>Account Details</h1>
                <button className={editing ? 'btn-secondary' : 'btn-primary'} style={{ borderRadius: '24px' }} onClick={() => setEditing(!editing)}>
                    {editing ? 'Cancel' : 'Edit Profile'}
                </button>
            </div>

            <div className="form-section">
                <h2>Business Information</h2>
                <div className="form-grid">
                    <div className="form-group">
                        <label>Company Name</label>
                        <input type="text" value={profile.companyName} onChange={e => handleChange('companyName', e.target.value)} readOnly={!editing} />
                    </div>
                    <div className="form-group">
                        <label>Owner / Contact Person</label>
                        <input type="text" value={profile.ownerName} onChange={e => handleChange('ownerName', e.target.value)} readOnly={!editing} />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" value={profile.email} onChange={e => handleChange('email', e.target.value)} readOnly={!editing} />
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input type="tel" value={profile.phone} onChange={e => handleChange('phone', e.target.value)} readOnly={!editing} />
                    </div>
                    <div className="form-group">
                        <label>GST Number</label>
                        <input type="text" value={profile.gst} onChange={e => handleChange('gst', e.target.value)} readOnly={!editing} />
                    </div>
                    <div className="form-group">
                        <label>Website</label>
                        <input type="text" value={profile.website} onChange={e => handleChange('website', e.target.value)} readOnly={!editing} />
                    </div>
                    <div className="form-group full-width">
                        <label>Address</label>
                        <textarea value={profile.address} onChange={e => handleChange('address', e.target.value)} readOnly={!editing} />
                    </div>
                </div>
            </div>

            <div className="form-section">
                <h2>Bank Details</h2>
                <div className="form-grid">
                    <div className="form-group">
                        <label>Bank Name</label>
                        <input type="text" value={profile.bankName} onChange={e => handleChange('bankName', e.target.value)} readOnly={!editing} />
                    </div>
                    <div className="form-group">
                        <label>Account Number</label>
                        <input type="text" value={profile.accountNo} onChange={e => handleChange('accountNo', e.target.value)} readOnly={!editing} />
                    </div>
                    <div className="form-group">
                        <label>IFSC Code</label>
                        <input type="text" value={profile.ifsc} onChange={e => handleChange('ifsc', e.target.value)} readOnly={!editing} />
                    </div>
                    <div className="form-group">
                        <label>PAN Number</label>
                        <input type="text" value={profile.panNo} onChange={e => handleChange('panNo', e.target.value)} readOnly={!editing} />
                    </div>
                </div>
                {editing && (
                    <div className="form-actions">
                        <button className="btn-primary" onClick={() => setEditing(false)}>Save Changes</button>
                        <button className="btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
                    </div>
                )}
            </div>

            <div className="form-section">
                <h2>Preferences</h2>
                <div className="form-grid">
                    <div className="form-group">
                        <label>Language</label>
                        <select defaultValue="en"><option value="en">English</option><option value="hi">Hindi</option></select>
                    </div>
                    <div className="form-group">
                        <label>Timezone</label>
                        <select defaultValue="ist"><option value="ist">IST (UTC+5:30)</option><option value="utc">UTC</option></select>
                    </div>
                    <div className="form-group">
                        <label>Currency</label>
                        <select defaultValue="inr"><option value="inr">INR (₹)</option><option value="usd">USD ($)</option></select>
                    </div>
                    <div className="form-group">
                        <label>Notifications</label>
                        <select defaultValue="all"><option value="all">All Notifications</option><option value="important">Important Only</option><option value="none">None</option></select>
                    </div>
                </div>
            </div>
        </>
    );
}
