"use client";
import { useState, useEffect } from "react";
import { FaBoxOpen, FaClipboardList, FaTruck, FaPenFancy } from "react-icons/fa";

export default function AdminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("buyurtmalar");
  const [orders, setOrders] = useState<any[]>([]);
  const [delivered, setDelivered] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    const savedOrders = localStorage.getItem("orders");
    const savedDelivered = localStorage.getItem("deliveredOrders");
    const savedProducts = localStorage.getItem("adminProducts");
    const savedMessages = localStorage.getItem("messages");

    if (savedOrders) setOrders(JSON.parse(savedOrders));
    if (savedDelivered) setDelivered(JSON.parse(savedDelivered));
    if (savedProducts) setProducts(JSON.parse(savedProducts));
    if (savedMessages) setMessages(JSON.parse(savedMessages));
  }, []);

  const handleSaveProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      alert("Barcha maydonlarni to‘ldiring!");
      return;
    }

    if (editingProduct) {
      const updatedProducts = products.map((p) =>
        p.id === editingProduct.id
          ? { ...p, ...newProduct, price: parseFloat(newProduct.price) }
          : p
      );
      setProducts(updatedProducts);
      localStorage.setItem("adminProducts", JSON.stringify(updatedProducts));
      setEditingProduct(null);
    } else {
      const newItem = {
        id: Date.now(),
        ...newProduct,
        price: parseFloat(newProduct.price),
        rating: 4.5,
      };
      const updated = [...products, newItem];
      setProducts(updated);
      localStorage.setItem("adminProducts", JSON.stringify(updated));
    }

    setShowModal(false);
    setNewProduct({ name: "", price: "", image: "" });
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      price: product.price.toString(),
      image: product.image,
    });
    setShowModal(true);
  };

  const deleteProduct = (id: number) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem("adminProducts", JSON.stringify(updated));
  };

  const deleteOrder = (id: number) => {
    const updated = orders.filter((o) => o.id !== id);
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
  };

  const markAsDelivered = (order: any) => {
    const updatedOrders = orders.filter((o) => o.id !== order.id);
    const newDelivered = [
      ...delivered,
      { ...order, status: "Yetkazilgan", date: new Date().toLocaleString() },
    ];
    setOrders(updatedOrders);
    setDelivered(newDelivered);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    localStorage.setItem("deliveredOrders", JSON.stringify(newDelivered));
  };

  const deleteDelivered = (id: number) => {
    const updated = delivered.filter((d) => d.id !== id);
    setDelivered(updated);
    localStorage.setItem("deliveredOrders", JSON.stringify(updated));
  };

  const deleteMessage = (id: number) => {
    const updated = messages.filter((m) => m.id !== id);
    setMessages(updated);
    localStorage.setItem("messages", JSON.stringify(updated));
  };

  const icons: Record<string, JSX.Element> = {
    products: <FaBoxOpen size={18} />,
    buyurtmalar: <FaClipboardList size={18} />,
    yetkazilganlar: <FaTruck size={18} />,
    postlar: <FaPenFancy size={18} />,
  };

  return (
    <div className="admin-container">
      <aside className={`sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
        <div className="sidebar-header">
          <h2>{sidebarOpen ? "Admin Panel" : "⚙️"}</h2>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? "«" : "»"}
          </button>
        </div>

        <div className="sidebar-buttons">
          {["products", "buyurtmalar", "yetkazilganlar", "postlar","arizalar"].map(
            (item) => (
              <button
                key={item}
                onClick={() => setActiveTab(item)}
                className={`sidebar-btn ${activeTab === item ? "active" : ""}`}
              >
                {icons[item]}
                {sidebarOpen && <span style={{ marginLeft: "8px" }}>{item}</span>}
              </button>
            )
          )}
        </div>
      </aside>

      <div className="main-section">
        <header className="topbar">
          <input type="text" placeholder="search..." className="search-input" />
          {activeTab === "products" && (
            <button
              className="add-product-btn"
              onClick={() => {
                setEditingProduct(null);
                setNewProduct({ name: "", price: "", image: "" });
                setShowModal(true);
              }}
            >
              ➕ add product
            </button>
          )}
        </header>

        <main className="main-content">
          {activeTab === "products" && (
            <div className="product-list">
              {products.length === 0 ? (
                <p>Hozircha mahsulotlar yo‘q 📦</p>
              ) : (
                products.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      background: "#fff",
                      padding: "10px",
                      margin: "10px 0",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <img src={p.image} width={60} height={60} />
                      <div>
                        <h4>{p.name}</h4>
                        <p>${p.price}</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        onClick={() => handleEditProduct(p)}
                        style={{
                          background: "#3b82f6",
                          color: "#fff",
                          border: "none",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          cursor: "pointer",
                        }}
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => deleteProduct(p.id)}
                        style={{
                          background: "#dc2626",
                          color: "#fff",
                          border: "none",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          cursor: "pointer",
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === "buyurtmalar" && (
            <div>
              <h2>🧾 Yangi Buyurtmalar</h2>
              {orders.length === 0 ? (
                <p>Hozircha buyurtma yo‘q 😔</p>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="order-card"
                    style={{
                      background: "#fff",
                      margin: "12px 0",
                      padding: "15px",
                      borderRadius: "8px",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                    }}
                  >
                    <h3>
                      👤 {order.customer.ism} {order.customer.familya}
                    </h3>
                    <p>📞 {order.customer.tel}</p>
                    <p>📍 {order.customer.manzil}</p>
                    <p>🕓 {order.date}</p>
                    <hr style={{ margin: "10px 0" }} />
                    <ul>
                      {order.products.map((p: any) => (
                        <li key={p.id}>
                          {p.name} — {p.quantity} dona × ${p.price}
                        </li>
                      ))}
                    </ul>
                    <p style={{ marginTop: "10px" }}>
                      💰 <strong>Jami:</strong> ${order.total.toFixed(0)}
                    </p>

                    <div style={{ marginTop: "10px", display: "flex", gap: 8 }}>
                      <button
                        onClick={() => markAsDelivered(order)}
                        style={{
                          background: "#16a34a",
                          color: "#fff",
                          padding: "6px 12px",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                        }}
                      >
                        ✅ Yetkazildi
                      </button>
                      <button
                        onClick={() => deleteOrder(order.id)}
                        style={{
                          background: "#dc2626",
                          color: "#fff",
                          padding: "6px 12px",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                        }}
                      >
                        🗑️ O‘chirish
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === "yetkazilganlar" && (
            <div>
              <h2>🚚 Yetkazilgan Buyurtmalar</h2>
              {delivered.length === 0 ? (
                <p>Hozircha yetkazilgan buyurtmalar yo‘q.</p>
              ) : (
                delivered.map((order) => (
                  <div
                    key={order.id}
                    style={{
                      background: "#fff",
                      margin: "12px 0",
                      padding: "15px",
                      borderRadius: "8px",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                    }}
                  >
                    <h3>
                      👤 {order.customer.ism} {order.customer.familya}
                    </h3>
                    <p>📞 {order.customer.tel}</p>
                    <p>📍 {order.customer.manzil}</p>
                    <p>🕓 {order.date}</p>
                    <p>💰 ${order.total}</p>
                    <button
                      onClick={() => deleteDelivered(order.id)}
                      style={{
                        background: "#dc2626",
                        color: "#fff",
                        padding: "6px 12px",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      🗑️ O‘chirish
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* === POSTLAR === */}
          {activeTab === "postlar" && (
            <div>
              <h2>💬 Foydalanuvchi xabarlari</h2>
              {messages.length === 0 ? (
                <p>Hozircha hech qanday xabar yo‘q.</p>
              ) : (
                <table
                  style={{
                    width: "100%",
                    marginTop: "20px",
                    borderCollapse: "collapse",
                  }}
                  border={1}
                  cellPadding={10}
                >
                  <thead style={{ background: "#f1f1f1" }}>
                    <tr>
                      <th>#</th>
                      <th>Ism</th>
                      <th>Familiya</th>
                      <th>Email</th>
                      <th>Telefon</th>
                      <th>Xabar</th>
                      <th>Sana</th>
                      <th>Amal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.map((msg, i) => (
                      <tr key={msg.id}>
                        <td>{i + 1}</td>
                        <td>{msg.firstName}</td>
                        <td>{msg.lastName}</td>
                        <td>{msg.email}</td>
                        <td>{msg.phone}</td>
                        <td>{msg.message}</td>
                        <td>{msg.date}</td>
                        <td>
                          <button
                            onClick={() => deleteMessage(msg.id)}
                            style={{
                              background: "#dc2626",
                              color: "white",
                              border: "none",
                              borderRadius: "5px",
                              padding: "5px 10px",
                              cursor: "pointer",
                            }}
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </main>
      </div>

      {showModal && (
        <div
          className="modal-backdrop"
          onClick={() => setShowModal(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "350px",
              textAlign: "center",
            }}
          >
            <h3>
              {editingProduct ? "✏️ Mahsulotni tahrirlash" : "🛒 Yangi Mahsulot Qo‘shish"}
            </h3>
            <input
              type="text"
              placeholder="Rasm URL"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
              style={{ width: "100%", margin: "8px 0", padding: "8px" }}
            />
            <input
              type="text"
              placeholder="Nomi"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              style={{ width: "100%", margin: "8px 0", padding: "8px" }}
            />
            <input
              type="number"
              placeholder="Narxi"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              style={{ width: "100%", margin: "8px 0", padding: "8px" }}
            />
            <button
              onClick={handleSaveProduct}
              style={{
                background: editingProduct ? "#3b82f6" : "#16a34a",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "8px",
                marginTop: "10px",
                cursor: "pointer",
              }}
            >
              {editingProduct ? "💾 Yangilash" : "➕ Qo‘shish"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
