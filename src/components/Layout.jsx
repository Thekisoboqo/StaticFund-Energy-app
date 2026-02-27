import React from 'react';
import { LayoutDashboard, Target, PieChart, Settings, ListPlus, MessageCircle } from 'lucide-react';

const Layout = ({ children, activeScreen, onScreenChange }) => {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'inventory', label: 'Inventory', icon: ListPlus },
        { id: 'chat', label: 'Chat', icon: MessageCircle },
        { id: 'audit', label: 'Audit', icon: Target },
        { id: 'insights', label: 'Insights', icon: PieChart },
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
