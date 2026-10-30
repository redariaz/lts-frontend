import React, { useState } from 'react';
import { Menu, MenuItem } from 'react-pro-sidebar';
import '../styles/header.css';
import '../styles/sidebar.css';
import { Link } from 'react-router-dom';
import { Dashboard, AccountCircle, Settings, Schedule, HomeWork, CalendarMonth, Flight } from '@mui/icons-material';
import CommonSidebar from './Sidebar';

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
            <div className='sidebarWrapper'>
                <CommonSidebar collapsed={collapsed ? true : false}>
                    <Menu>
                        <MenuItem component={<Link to="/home"/>} icon={<Dashboard />}>Dashboard</MenuItem>
                        <MenuItem icon={<Schedule />}>Leave Requests</MenuItem>
                        <MenuItem icon={<HomeWork />}>Work From Home Requests</MenuItem>
                        <MenuItem icon={<CalendarMonth />}>Work From Office Requests</MenuItem>
                        <MenuItem icon={<Flight />}>Travel Requests</MenuItem>
                        <MenuItem component={<Link to="/user-profile"/>} icon={<AccountCircle />}>Profile</MenuItem>
                        <MenuItem icon={<Settings />}>Settings</MenuItem>
                    </Menu>
                </CommonSidebar>
            </div>
        </div>
    )
}

export default Header