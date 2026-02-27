import React from 'react';
import { Home, Search, ShieldCheck, BarChart2, User } from 'lucide-react';

const Layout = ({ children, activeScreen, onScreenChange }) => {
    // We update navigation items to match the screenshot bottom bar: Home, Scan, [Shield], Stats, Profile
    return (
        <div className="container">
            <div className="content" style={{ paddingBottom: '80px' }}>
                {children}
            </div>

            <nav className="nav-bar">
                <button
                    className={`nav-item ${activeScreen === 'dashboard' ? 'active' : ''}`}
                    onClick={() => onScreenChange('dashboard')}
                >
                    <Home />
                    <span>Home</span>
                </button>
                <button
                    className={`nav-item ${activeScreen === 'inventory' ? 'active' : ''}`}
                    onClick={() => onScreenChange('inventory')}
                >
                    <Search />
                    <span>Scan</span>
                </button>
                <button
                    className={`nav-item-center ${activeScreen === 'chat' ? 'active' : ''}`}
                    onClick={() => onScreenChange('chat')}
                >
                    <ShieldCheck />
                </button>
                <button
                    className={`nav-item ${activeScreen === 'insights' ? 'active' : ''}`}
                    onClick={() => onScreenChange('insights')}
                >
                    <BarChart2 />
                    <span>Stats</span>
                </button>
                <button
                    className={`nav-item ${activeScreen === 'settings' ? 'active' : ''}`}
                    onClick={() => onScreenChange('settings')}
                >
                    <User />
                    <span>Profile</span>
                </button>
            </nav>
        </div>
    );
};

export default Layout;
