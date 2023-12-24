import React, { useState } from "react";

function SideBar() {
  const [style, setStyle] = useState(
    "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
  );

  const changeStyle = () => {
    if (
      style === "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    ) {
      setStyle(
        "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
      );
    } else {
      setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
    }
  };

  return (
    <div>
      {/* Sidebar */}
      <ul className={style} id="accordionSidebar">
        {/* Sidebar - Brand */}
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="/"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="bi bi-house"></i>
          </div>
          <div className="sidebar-brand-text mx-2">DashBoard</div>
        </a>

        {/* Divider */}
        <hr className="sidebar-divider my-0" />

        {/* Nav Item - Manage Users*/}
        <li className="nav-item">
          <a className="nav-link" href="/users">
            <i className="bi bi-people"></i>
            <span>Users</span>
          </a>
        </li>

        {/* Divider */}
        <hr className="sidebar-divider my-0" />

        {/* Nav Item - Manage Products*/}
        <li className="nav-item">
          <a className="nav-link" href="/products">
            <i className="bi bi-card-list"></i>
            <span>Products</span>
          </a>
        </li>

        {/* Divider */}
        <hr className="sidebar-divider my-0" />

        {/* Nav Item - Manage Carts*/}
        <li className="nav-item">
          <a className="nav-link" href="/orders">
            <i className="bi bi-cart3"></i>
            <span>Orders</span>
          </a>
        </li>

        {/* Divider */}
        <hr className="sidebar-divider my-0" />

        {/* Nav Item - Manage Deliveries*/}
        <li className="nav-item">
          <a className="nav-link" href="/deliverys">
            <i className="bi bi-box-seam"></i>
            <span>Deliveries</span>
          </a>
        </li>

        {/* Divider */}
        <hr className="sidebar-divider my-0" />

        {/* Nav Item - Manage Statistic */}
        <li className="nav-item">
          <a className="nav-link" href="/statistics">
            <i className="fas fa-fw fa-chart-area"></i>
            <span>Statistic</span>
          </a>
        </li>

        {/* Divider */}
        <hr className="sidebar-divider d-none d-md-block" />

        {/* Sidebar Toggler (Sidebar) */}
        <div className="text-center d-none d-md-inline">
          <button
            className="rounded-circle border-0"
            id="sidebarToggle"
            onClick={changeStyle}
          ></button>
        </div>
      </ul>
      {/* End of Sidebar */}
    </div>
  );
}

export default SideBar;
