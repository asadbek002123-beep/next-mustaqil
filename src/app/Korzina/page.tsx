"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import logo from "../image/1-removebg 1.png";

export default function Korzina() {
  const [cart, setCart] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    ism: "",
    familya: "",
    tel: "",
    manzil: "",
    xabar: "",
  });

  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const fixedCart = parsed.map((item: any) => ({
          ...item,
          image:
            typeof item.image === "string" ? item.image : item.image?.src || "",
          quantity: item.quantity || 1,
        }));
        setCart(fixedCart);
      } catch {
        setCart([]);
      }
    }
  }, []);

  const updateQuantity = (id: number, change: number) => {
    const updated = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max((item.quantity || 1) + change, 1) }
        : item
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (id: number) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  const discount = subtotal * 0.2;
  const total = subtotal - discount;

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Savat bo‘sh!");
      return;
    }

    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");

    const newOrder = {
      id: Date.now(),
      customer: form,
      products: cart,
      total,
      date: new Date().toLocaleString(),
      status: "Yangi",
    };

    const updatedOrders = [...existingOrders, newOrder];
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    localStorage.removeItem("cart");
    setCart([]);
    setShowModal(false);
    alert("Buyurtmangiz yuborildi ✅");

    router.push("/Admin");
  };

  return (
    <main className="cart-wrapper">
      <nav className="navbar">
        <div className="nav-left" onClick={() => router.push("/")}>
          <Image src={logo} alt="logo" width={60} height={60} />
        </div>
        <ul className="nav-links">
          <li onClick={() => router.push("/")}>Bosh sahifa</li>
          <li onClick={() => router.push("/About")}>Mahsulotlar</li>
          <li>Biz haqimizda</li>
          <li>Bog‘lanish</li>
        </ul>
        <div className="nav-right">
          <button className="cart-icon">
            🛒 <span className="cart-count">{cart.length}</span>
          </button>
        </div>
      </nav>

      <div className="cart-header">
        <h1>Sizning savatingiz</h1>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.length === 0 ? (
            <p className="empty-cart">Savatcha bo‘sh 😔</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-left">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={110}
                      height={90}
                      className="cart-image"
                      unoptimized
                    />
                  ) : (
                    <div
                      style={{
                        width: 110,
                        height: 90,
                        background: "#eee",
                        borderRadius: "8px",
                      }}
                    />
                  )}
                  <div className="item-info">
                    <h3>{item.name}</h3>
                    <p>${item.price}</p>
                  </div>
                </div>

                <div className="cart-item-right">
                  <button
                    className="delete-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    🗑️
                  </button>
                  <div className="quantity-box">
                    <button onClick={() => updateQuantity(item.id, -1)}>
                      −
                    </button>
                    <span>{item.quantity || 1}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}>
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-summary">
          <h3>Buyurtma xulosasi</h3>
          <div className="summary-line">
            <span>Oraliq jami</span>
            <span>${subtotal.toFixed(0)}</span>
          </div>
          <div className="summary-line discount">
            <span>Chegirma (-20%)</span>
            <span>-${discount.toFixed(0)}</span>
          </div>
          <div className="summary-line total">
            <span>Umumiy</span>
            <span>${total.toFixed(0)}</span>
          </div>

          <div className="promo-section">
            <input type="text" placeholder="Promo code qo‘shing" />
            <button>Tekshirish</button>
          </div>

          <button className="checkout-btn" onClick={() => setShowModal(true)}>
            Buyurtma berish →
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "10px",
              width: "400px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            }}
          >
            <button
              onClick={() => setShowModal(false)}
              style={{
                float: "right",
                background: "none",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              ✖
            </button>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
              Buyurtma ma’lumotlari
            </h2>
            <form onSubmit={handleSubmit} className="modal-form">
              <input
                type="text"
                placeholder="Ism"
                value={form.ism}
                onChange={(e) => setForm({ ...form, ism: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Familya"
                value={form.familya}
                onChange={(e) => setForm({ ...form, familya: e.target.value })}
                required
              />
              <input
                type="tel"
                placeholder="Telefon raqam"
                value={form.tel}
                onChange={(e) => setForm({ ...form, tel: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Manzil"
                value={form.manzil}
                onChange={(e) => setForm({ ...form, manzil: e.target.value })}
                required
              />
              <textarea
                placeholder="Xabar"
                value={form.xabar}
                onChange={(e) => setForm({ ...form, xabar: e.target.value })}
                rows={3}
              ></textarea>
              <button
                type="submit"
                style={{
                  background: "#16a34a",
                  color: "white",
                  padding: "10px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  marginTop: "10px",
                  width: "100%",
                }}
              >
                Yuborish
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
