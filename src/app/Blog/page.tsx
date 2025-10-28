"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import tentImage from "../image/image (5).png";
import logo from "../image/1-removebg 1.png";
import rasm from "../image/pick.jpg";

export default function BlogPage() {
  const blogs = Array(6).fill({
    title:
      "Tabiatning Qiziqarli Jihatlari: Sarg‘aygan Amazon O‘rmonlari Haqida Qiziqarli Faktlar",
    date: "Payshanba, 2024-yil 8-yanvar",
    image: rasm,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Escape bosilganda modalni yopish
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      {/* Header */}
      <header className="navbar">
        <div className="navbar-left">
          <Image src={logo} alt="Logo" width={60} height={60} />
        </div>

        <nav className="nav-links">
          <Link href="/" className="nav-link">Bosh sahifa</Link>
          <Link href="/About" className="nav-link">Mahsulotlar</Link>
          <Link href="/Aloqa" className="nav-link">Aloqa</Link>
          <Link href="/Blog" className="nav-link active">Blog</Link>
        </nav>

        <div className="nav-icons">
          <input
            type="text"
            placeholder="Search for products..."
            className="search-input"
          />
          <span className="cart-icon">🛒</span>
        </div>
      </header>

      {/* Blog grid */}
      <div className="blog-container">
        <h1 className="blog-title">Sayohat va Lager Blogi</h1>
        <p className="blog-subtitle">
          Sayohatni sevuvchilar uchun qiziqarli hikoyalar, foydali maslahatlar va
          lager hayoti haqida ko‘rsatmalar.
        </p>

        <div className="blog-grid">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="blog-card cursor-pointer transition-transform hover:scale-105"
              onClick={() => setIsModalOpen(true)}
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

      {/* --- MODAL (PASTDAN CO-TAJRIBA) --- */}
      {isModalOpen && (
        <div
          className="modal-overlay"
          onClick={() => setIsModalOpen(false)}
        >
          {/* modal-box — translateY(100%) dan 0 ga animatsiya qiladi */}
          <div
            className="modal-box"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              className="modal-close"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close modal"
            >
              &times;
            </button>

            <div className="modal-content">
              <Image
                src={rasm}
                alt="Blog image"
                className="modal-image"
                width={1200}
                height={600}
              />
              <h2 className="modal-title">Amazon o‘rmonlari sirlari</h2>
              <p className="modal-date">Payshanba, 2024-yil 8-yanvar</p>
              <p className="modal-text">
                Bu blogda siz tabiat, sayohat va ekologiya haqidagi qiziqarli
                ma’lumotlarni o‘qishingiz mumkin. Tabiatni asrash, sayohat
                madaniyatini rivojlantirish va yangi joylarni kashf etish ilhomi
                sizni kutmoqda!
              </p>

              <div className="modal-actions">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="modal-btn"
                >
                  Yopish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
