"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import imagefoto3 from "./image/image (8).png";
import imagefoto2 from "./image/image (6).png";
import imagefoto1 from "./image/image (7).png";
import imagefoto from "./image/image (5).png";
import imagelogo from "./image/1-removebg 1.png";
import imageTent from "./image/image (2).png";
import imageChodir from "./image/image (3).png";
import imageKreslo1 from "./image/Frame 38.png";
import imageKreslo2 from "./image/Frame 33.png";
import imageUyqu from "./image/image (4).png";

import chodirIcon from "./image/tent-removebg-preview-2 1.png";
import mebelIcon from "./image/furniture 1.png";
import oshxonaIcon from "./image/Kitchen_Appliances-removebg-preview-2 1.png";
import uyquIcon from "./image/sleeping_bags-removebg-preview-2 1.png";

export default function Home() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("Chodirlar");

  const [showLogin, setShowLogin] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const categories = [
    { name: "Chodirlar", icon: chodirIcon },
    { name: "Mebel", icon: mebelIcon },
    { name: "Oshxona jihozlari", icon: oshxonaIcon },
    { name: "Yotish uchun sumkalar", icon: uyquIcon },
  ];

  const products = [
    { id: 1, name: "Chodir", price: 120, rating: 4.5, image: imageChodir },
    {
      id: 2,
      name: "Yig‘iladigan kreslo",
      price: 240,
      rating: 3.5,
      image: imageKreslo1,
    },
    {
      id: 3,
      name: "Qulay lager kreslosi",
      price: 180,
      rating: 4.5,
      image: imageKreslo2,
    },
    {
      id: 4,
      name: "Uyqu uchun sumka",
      price: 130,
      rating: 4.5,
      image: imageUyqu,
    },
    { id: 5, name: "Chodir", price: 120, rating: 4.5, image: imagefoto },
    { id: 6, name: "Chodir", price: 120, rating: 4.5, image: imagefoto1 },
    { id: 7, name: "Chodir", price: 120, rating: 4.5, image: imagefoto2 },
    { id: 8, name: "Chodir", price: 120, rating: 4.5, image: imagefoto3 },
  ];

  // 🔑
  const handleLogin = (e: any) => {
    e.preventDefault();
    if (login === "1" && password === "1") {
      setError("");
      setShowLogin(false);
      localStorage.setItem("isAdmin", "true");
      router.push("/Admin");
    } else {
      setError("Login yoki parol noto‘g‘ri!");
    }
  };

  return (
    <main className="home">
      <header>
        <div className="navbar">
          <div className="nav-left">
            <Image src={imagelogo} alt="logo" width={60} height={60} />
            <ul
              className="nav-links"
              style={{
                display: "flex",
                gap: "40px",
                listStyle: "none",
                fontSize: "18px",
                fontWeight: "500",
              }}
            >
              <li onClick={() => router.push("/")}>Bosh sahifa</li>
              <li
                style={{ cursor: "pointer" }}
                onClick={() => router.push("/About")}
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
          </div>

          <div className="nav-right">
            <input type="text" placeholder="Search for products..." />
            <button className="admin-btn" onClick={() => setShowLogin(true)}>
              🔓
            </button>
            <span
              className="cart-icon"
              onClick={() => router.push("/Korzina")}
              style={{ cursor: "pointer" }}
            >
              🛒
            </span>
          </div>
        </div>
      </header>

      {showLogin && (
        <div className="login-overlay" onClick={() => setShowLogin(false)}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Admin kirish</h2>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
              <input
                type="password"
                placeholder="Parol"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className="error">{error}</p>}
              <button type="submit">Kirish</button>
            </form>
            <span className="close" onClick={() => setShowLogin(false)}>
              ✖
            </span>
          </div>
        </div>
      )}

      <section className="hero">
        <div className="hero-text">
          <h1>Zo‘r jihozlar bilan sarguzashtlarni kashf eting</h1>
          <p>
            Ochiq havoda sarguzasht qilishni yoqtiradiganlar uchun eng yaxshi
            chodirlar, kreslolar va jihozlar.
          </p>
          <button onClick={() => router.push("/About")}>Xarid qiling</button>
        </div>

        <Image
          src={imageTent}
          alt="tent"
          width={420}
          height={280}
          className="hero-img"
          priority
        />
      </section>

      <h2 className="section-title">Kategoriyalar</h2>
      <div className="categories">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setActiveCategory(cat.name)}
            className={`category-btn ${
              activeCategory === cat.name ? "active" : ""
            }`}
          >
            <Image src={cat.icon} alt={cat.name} width={40} height={40} />
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      <h2 className="section-title">Eng mashhur mahsulotlar</h2>
      <div className="products">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <Image src={p.image} alt={p.name} width={250} height={180} />
            <h3>{p.name}</h3>
            <div className="rating">
              {"⭐".repeat(Math.round(p.rating))} <span>{p.rating}/5</span>
            </div>
            <p className="price">${p.price}</p>
            <button className="add-btn" onClick={() => router.push("/About")}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="view-all-container">
        <button className="view-all-btn" onClick={() => router.push("/About")}>
          Hammasini ko‘rish →
        </button>
      </div>

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
    </main>
  );
}
