"use client";
import { useState, useEffect } from "react";
import {
  FaBoxOpen,
  FaClipboardList,
  FaTruck,
  FaPenFancy,
} from "react-icons/fa";
import { db } from "../firebase/firebase.config";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

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
    const savedMessages = localStorage.getItem("messages");

    if (savedOrders) setOrders(JSON.parse(savedOrders));
    if (savedDelivered) setDelivered(JSON.parse(savedDelivered));
    if (savedMessages) setMessages(JSON.parse(savedMessages));

    const savedProducts = localStorage.getItem("adminProducts");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      loadProductsFromFirebase();
    }
  }, []);

  const loadProductsFromFirebase = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const list: any[] = [];
      querySnapshot.forEach((docu) =>
        list.push({ id: docu.id, ...docu.data() })
      );
      setProducts(list);
      localStorage.setItem("adminProducts", JSON.stringify(list));
    } catch (err) {
      console.error("Firebase dan yuklashda xato:", err);
    }
  };

  const handleSaveProduct = async () => {
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

      try {
        const docRef = doc(db, "products", editingProduct.id);
        await updateDoc(docRef, {
          ...newProduct,
          price: parseFloat(newProduct.price),
        });
        console.log("Firebase yangilandi ✅");
      } catch (err) {
        console.error("Firebase yangilashda xato:", err);
      }

      setEditingProduct(null);
    } else {
      const newItem = {
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        image: newProduct.image,
        rating: 4.5,
        createdAt: new Date().toISOString(),
      };

      try {
        const docRef = await addDoc(collection(db, "products"), newItem);
        console.log("Firebase ga yozildi ✅ ID:", docRef.id);

        const itemWithId = { id: docRef.id, ...newItem };
        const updated = [...products, itemWithId];
        setProducts(updated);
        localStorage.setItem("adminProducts", JSON.stringify(updated));

        await loadProductsFromFirebase();
      } catch (err) {
        console.error("Firebase ga yozishda xato:", err);
      }
    }

    setShowModal(false);
    setNewProduct({ name: "", price: "", image: "" });
  };

  const deleteProduct = async (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem("adminProducts", JSON.stringify(updated));

    try {
      await deleteDoc(doc(db, "products", id));
      console.log("Firebase dan o‘chirildi ✅");
    } catch (err) {
      console.error("Firebase dan o‘chirishda xato:", err);
    }
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
          {["products", "buyurtmalar", "yetkazilganlar", "postlar"].map(
            (item) => (
              <button
                key={item}
                onClick={() => setActiveTab(item)}
                className={`sidebar-btn ${activeTab === item ? "active" : ""}`}
              >
                {icons[item]}
                {sidebarOpen && (
                  <span style={{ marginLeft: "8px" }}>{item}</span>
                )}
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
                  <div className="product-list">
                    {products.length === 0 ? (
                      <p>Hozircha mahsulotlar yo‘q 📦</p>
                    ) : (
                      products.map((p) => (
                        <div key={p.id} className="product-card">
                          <img src={p.image} alt={p.name} />
                          <div className="product-info">
                            <h4>{p.name}</h4>
                            <p>${p.price}</p>
                            <div className="rating">⭐ {p.rating}</div>
                          </div>
                          <div className="product-actions">
                            <button
                              className="edit-btn"
                              onClick={() => {
                                setEditingProduct(p);
                                setNewProduct({
                                  name: p.name,
                                  price: p.price.toString(),
                                  image: p.image,
                                });
                                setShowModal(true);
                              }}
                            >
                              ✏️ Edit
                            </button>
                            <button
                              className="delete-btn"
                              onClick={() => deleteProduct(p.id)}
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === "buyurtmalar" && (
            <div className="order-card">
              <h2>🧾 Yangi Buyurtmalar</h2>
              {orders.length === 0 ? (
                <p>Hozircha buyurtma yo‘q 😔</p>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="order-card">
                    <h3>
                      👤 {order.customer.ism} {order.customer.familya}
                    </h3>
                    <p>📞 {order.customer.tel}</p>
                    <p>📍 {order.customer.manzil}</p>
                    <p>🕓 {order.date}</p>
                    <ul>
                      {order.products.map((p: any) => (
                        <li key={p.id}>
                          {p.name} — {p.quantity} dona × ${p.price}
                        </li>
                      ))}
                    </ul>
                    <p>
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
            <div className="delivered-card">
              <h2>🚚 Yetkazilgan Buyurtmalar</h2>
              {delivered.length === 0 ? (
                <p>Hozircha yetkazilgan buyurtmalar yo‘q.</p>
              ) : (
                delivered.map((order) => (
                  <div key={order.id}>
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
                      }}
                    >
                      🗑️ O‘chirish
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === "postlar" && (
            <div className="post-card">
              <h2>💬 Foydalanuvchi xabarlari</h2>
              {messages.length === 0 ? (
                <p>Hozircha hech qanday xabar yo‘q.</p>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    style={{ background: "#fff", margin: 8, padding: 10 }}
                  >
                    <p>
                      <strong>
                        {msg.firstName} {msg.lastName}
                      </strong>
                    </p>
                    <p>{msg.message}</p>
                    <p>{msg.date}</p>
                    <button
                      onClick={() => deleteMessage(msg.id)}
                      style={{
                        background: "#dc2626",
                        color: "#fff",
                        border: "none",
                        borderRadius: 5,
                        padding: "5px 10px",
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                ))
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
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              padding: 20,
              borderRadius: 10,
              width: 350,
              textAlign: "center",
            }}
          >
            <h3>
              {editingProduct
                ? "✏️ Mahsulotni tahrirlash"
                : "🛒 Yangi Mahsulot Qo‘shish"}
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
