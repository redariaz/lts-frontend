import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import '../styles/header.css';

const Header = () => {

    const [collapsed, setCollapsed] = useState(true);

    return (
        <div className="mainContainer">
            <div className="headerContainer">
                <div className="toggleContainer">
                    <button onClick={() => setCollapsed(!collapsed)} className="toggleButton">
                        <i className={`fa-solid ${collapsed ? 'fa-bars' : 'fa-xmark'}`} />
                    </button>
                </div>
                <div className="titleContainer">
                    <h2>Leave Tracking System</h2>
                </div>
            </div>
            <div className={`sidebarWrapper ${collapsed ? 'collapsed' : ''}`}>
                <Sidebar collapsed={collapsed} className="sidebar">
                    <Menu>
                        <MenuItem>Dashboard</MenuItem>
                        <MenuItem>Leave Requests</MenuItem>
                        <MenuItem>Profile</MenuItem>
                        <MenuItem>Settings</MenuItem>
                    </Menu>
                </Sidebar>
            </div>
        </div>
    )
}

export default Header