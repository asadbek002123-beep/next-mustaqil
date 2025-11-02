"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import logo from "../image/1-removebg 1.png";
import imageChodir from "../image/image (3).png";

export default function About() {
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));

    const savedAdminProducts = localStorage.getItem("adminProducts");
    if (savedAdminProducts) {
      const adminAdded = JSON.parse(savedAdminProducts);

      const fixedAdmin = adminAdded.map((p: any, index: number) => ({
        id: p.id || 1000 + index,
        name: p.name || "Yangi mahsulot",
        price: p.price || 0,
        rating: p.rating || 4,
        image:
          typeof p.image === "string"
            ? p.image
            : p.image?.src || imageChodir.src,
      }));

      setProducts(fixedAdmin);
    } else {
      setProducts([]); // agar Admin'dan kelmagan bo‘lsa, hech narsa ko‘rsatmaydi
    }
  }, []);

  const addToCart = (product: any) => {
    const updated = [...cart, product];
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  return (
    <>
      {/* === NAVBAR === */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 60px",
          background: "white",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <Image
          src={logo}
          alt="Logo"
          width={60}
          height={60}
          style={{ cursor: "pointer" }}
          onClick={() => router.push("/")}
        />

        <ul
          style={{
            display: "flex",
            gap: "40px",
            listStyle: "none",
            fontSize: "18px",
            fontWeight: "500",
          }}
        >
          <li style={{ cursor: "pointer" }} onClick={() => router.push("/")}>
            Bosh sahifa
          </li>
          <li
            style={{
              cursor: "pointer",
              color: "#16a34a",
              borderBottom: "2px solid #16a34a",
            }}
          >
            Mahsulotlar
          </li>
          <li
            style={{ cursor: "pointer" }}
            onClick={() => router.push("/Aloqa")}
          >
            Aloqa
          </li>
          <li
            style={{ cursor: "pointer" }}
            onClick={() => router.push("/Blog")}
          >
            Blog
          </li>
        </ul>

        <div className="nav-right">
          <input type="text" placeholder="Search for products..." />
          <button
            className="cart-btn"
            onClick={() => router.push("/Korzina")}
            style={{ cursor: "pointer" }}
          >
            🛒
          </button>
        </div>
      </nav>

      {/* === PRODUCT SECTION === */}
      <section style={{ padding: "60px" }}>
        <h1
          style={{ fontSize: "32px", fontWeight: "600", marginBottom: "30px" }}
        >
          Mahsulotlar
        </h1>

        {products.length === 0 ? (
          <p style={{ fontSize: "18px", color: "#666" }}>
            Hozircha mahsulotlar mavjud emas.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "25px",
            }}
          >
            {products.map((p) => (
              <div
                key={p.id}
                style={{
                  background: "#fff",
                  borderRadius: "20px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  padding: "20px",
                  textAlign: "center",
                }}
              >
                <Image
                  src={p.image}
                  alt={p.name}
                  width={230}
                  height={170}
                  unoptimized
                  style={{
                    objectFit: "contain",
                    margin: "0 auto",
                    borderRadius: "10px",
                  }}
                />
                <h3 style={{ fontSize: "18px", marginTop: "10px" }}>
                  {p.name}
                </h3>
                <div style={{ color: "#eab308", margin: "6px 0" }}>
                  {"⭐".repeat(Math.round(p.rating || 4))}{" "}
                  <span style={{ color: "#444" }}>{p.rating || 4}/5</span>
                </div>
                <p style={{ color: "green", fontWeight: "bold" }}>${p.price}</p>
                <button
                  onClick={() => addToCart(p)}
                  style={{
                    marginTop: "10px",
                    background: "#16a34a",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: "500",
                  }}
                >
                  Savatchaga qo‘shish
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* === FOOTER === */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-col">
            <h4>KOMPANIYA</h4>
            <ul>
              <li>Biz haqimizda</li>
              <li>Xususiyatlar</li>
              <li>Ishlash jarayoni</li>
              <li>Karyera imkoniyatlari</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>YORDAM</h4>
            <ul>
              <li>Mijozlarni qo‘llab-quvvatlash</li>
              <li>Yetkazib berish tafsilotlari</li>
              <li>Shartlar va qoidalar</li>
              <li>Maxfiylik siyosati</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>SAVOLLAR</h4>
            <ul>
              <li>Hisob</li>
              <li>Buyurtmalar</li>
              <li>To‘lovlar</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>RESURSLAR</h4>
            <ul>
              <li>Bepul e-kitoblar</li>
              <li>Dasturlash qo‘llanmalari</li>
              <li>Blog</li>
              <li>YouTube playlist</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© Piknic 2025. Barcha huquqlar himoyalangan.</p>
        </div>
      </footer>
    </>
  );
}
