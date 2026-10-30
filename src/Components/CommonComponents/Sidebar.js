
import React from "react";
import { Sidebar } from "react-pro-sidebar";
import '../styles/sidebar.css';

const CommonSidebar = ({ collapsed, children }) => {
  return (
    <div className="sidebarWrapper">
      <Sidebar
        collapsed={collapsed}
        width="250px"
        collapsedWidth="80px"
        className="sidebar"
      >
        {children}
      </Sidebar>
    </div>
  );
};

export default CommonSidebar;
