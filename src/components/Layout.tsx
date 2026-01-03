import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Navbar from './Navbar';
import Footer from './Footer';

const Layout: React.FC = () => {
    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

            <Navbar />

            <main style={{
                paddingTop: isHome ? '0' : '80px',
                flex: 1,
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Outlet />
            </main>

            {!isHome && <Footer />}
        </div>
    );
};

export default Layout;
