"use client";
import { useState } from "react";

export default function AdminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("products");

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">
            {sidebarOpen ? "Admin Panel" : "⚙️"}
          </h2>
          <button
            className="toggle-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? "«" : "»"}
          </button>
        </div>

        <div className="sidebar-buttons">
          {["products", "buyurtmalar", "yetkazilganlar", "postlar"].map(
            (item) => (
              <button
                key={item}
                onClick={() => setActiveTab(item)}
                className={`sidebar-btn ${activeTab === item ? "active" : ""}`}
              >
                {sidebarOpen ? item : item[0].toUpperCase()}
              </button>
            )
          )}
        </div>
      </aside>

      {/* Main Section */}
      <div className="main-section">
        {/* Topbar */}
        <header className="topbar">
          <input type="text" placeholder="search..." className="search-input" />
          <button className="add-product-btn">add product</button>
        </header>

        {/* Main Content */}
        <main className="main-content">
          <div className="content-header">
            <h3 className="content-title">{activeTab}</h3>
            {activeTab === "postlar" && (
              <button className="add-post-btn">add post</button>
            )}
          </div>

          <div className="card-container">
            <div className="card">Card 1</div>
            <div className="card">Card 2</div>
          </div>
        </main>
      </div>
    </div>
  );
}
