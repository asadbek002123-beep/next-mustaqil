"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import rasm from "../image/pick.jpg";
import logo from "../image/1-removebg 1.png";

export default function BlogPage() {
  const router = useRouter();

  const blogs = Array(6).fill({
    title:
      "Tabiatning Qiziqarli Jihatlari: Sarg‘aygan Amazon O‘rmonlari Haqida Qiziqarli Faktlar",
    date: "Payshanba, 2024-yil 8-yanvar",
    image: rasm,
  });

  return (
    <>
      {/* 🔹 Yangi Navbar */}
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
            style={{ cursor: "pointer" }}
            onClick={() => router.push("/Product")}
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
            style={{
              cursor: "pointer",
              color: "#16a34a",
              borderBottom: "2px solid #16a34a",
            }}
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

      {/* 🔹 Blog kontenti */}
      <div className="blog-container">
        <h1 className="blog-title">Sayohat va Lager Blogi</h1>
        <p className="blog-subtitle">
          Sayohatni sevuvchilar uchun qiziqarli hikoyalar, foydali maslahatlar
          va lager hayoti haqida ko‘rsatmalar.
        </p>

        <div className="blog-grid">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="blog-card cursor-pointer transition-transform hover:scale-105 block"
              onClick={() => router.push("/blogqismi")}
            >
              <div className="blog-image-container relative overflow-hidden rounded-xl">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  className="blog-image"
                  width={400}
                  height={260}
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 flex items-center justify-center text-white text-5xl transition">
                  ▶
                </div>
              </div>
              <div className="blog-info">
                <h3 className="blog-card-title font-semibold mt-2">
                  {blog.title}
                </h3>
                <p className="blog-date text-gray-600">{blog.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 Footer */}
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
