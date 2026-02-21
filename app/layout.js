import './globals.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

export const metadata = {
    title: 'Basecamp Dashboard',
    description: 'Basecamp Product Management Dashboard',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <div className="app-layout">
                    <Sidebar />
                    <div className="main-area">
                        <Header />
                        <main className="page-content">
                            {children}
                        </main>
                    </div>
                </div>
            </body>
        </html>
    );
}
