"use client";
import Image from "next/image";
import Link from "next/link";
import tentImage from "../image/image (5).png";
import logo from "../image/1-removebg 1.png";
import rasm from "../image/pick.jpg"
export default function BlogPage() {
  const blogs = Array(6).fill({
    title:
      "Tabiatning Qiziqarli Jihatlari: Sarg‘aygan Amazon O‘rmonlari Haqida Qiziqarli Faktlar",
    date: "Payshanba, 2024-yil 8-yanvar",
    image: tentImage,
  });

  return (
    <>
      <header className="navbar">
        <div className="navbar-left">
          <Image src={logo} alt="Logo" width={60} height={60} />
        </div>

        <nav className="nav-links">
          <Link
            href="/"
            className="nav-link"
            style={{
              display: "flex",
              gap: "40px",
              listStyle: "none",
              fontSize: "18px",
              fontWeight: "500",
            }}
          >
            Bosh sahifa
          </Link>
          <Link
            href="/Mahsulotlar"
            className="nav-link"
            style={{
              display: "flex",
              gap: "40px",
              listStyle: "none",
              fontSize: "18px",
              fontWeight: "500",
            }}
          >
            Mahsulotlar
          </Link>
          <Link
            href="/Aloqa"
            className="nav-link"
            style={{
              display: "flex",
              gap: "40px",
              listStyle: "none",
              fontSize: "18px",
              fontWeight: "500",
            }}
          >
            Aloqa
          </Link>
          <Link
            href="/Blog"
            className="nav-link active"
            style={{
              display: "flex",
              gap: "40px",
              listStyle: "none",
              fontSize: "18px",
              fontWeight: "500",
            }}
          >
            Blog
          </Link>
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

      {/* === Blog Section === */}
      <div className="blog-container">
        <h1 className="blog-title">Sayohat va Lager Blogi</h1>
        <p className="blog-subtitle">
          Sayohatni seuvchilar uchun qiziqarli hikoyalar, foydali maslahatlar va
          lager hayoti haqida ko‘rsatmalar. Tabiatga yaqin bo‘lish va
          sayohatlaringizni unutilmas qilish uchun o‘z bilimlaringizni boyiting!
        </p>

        <div className="blog-grid">
          {blogs.map((blog, index) => (
            <div key={index} className="blog-card">
              <div className="blog-image-container">
                <Image
                  src={rasm}
                  alt={blog.title}
                  className="blog-image"
                  width={400}
                  height={260}
                />
                <div className="play-button">▶</div>
              </div>
              <div className="blog-info">
                <h3 className="blog-card-title">{blog.title}</h3>
                <p className="blog-date">{blog.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
