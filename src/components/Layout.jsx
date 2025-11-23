import React from 'react';
import { Briefcase, Search, BarChart3, Settings } from 'lucide-react';

const Layout = ({ children, activeScreen, onScreenChange }) => {
    const navItems = [
        { id: 'inventory', label: 'Inventory', icon: Briefcase },
        { id: 'audit', label: 'Audit', icon: Search },
        { id: 'insights', label: 'Insights', icon: BarChart3 },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div className="container">
            <div className="content">
                {children}
            </div>

            <nav className="nav-bar">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.id}
                            className={`nav-item ${activeScreen === item.id ? 'active' : ''}`}
                            onClick={() => onScreenChange(item.id)}
                        >
                            <Icon />
                            <span>{item.label}</span>
                        </button>
                    );
                })}
            </nav>
        </div>
    );
};

export default Layout;
