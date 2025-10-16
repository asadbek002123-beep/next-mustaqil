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

export default function Home() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("Chodirlar");

  const categories = [
    { name: "Chodirlar", icon: "⛺" },
    { name: "Mebel", icon: "🪑" },
    { name: "Oshxona jihozlari", icon: "🍳" },
    { name: "Yotish uchun sumkalar", icon: "🛏️" },
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

  return (
    <main className="home">
      <header>
        <div className="top-banner">
          Sign up and get 20% off your first order. <a href="#">Sign Up Now</a>
        </div>

        <div className="navbar">
          <div className="nav-left">
            <Image src={imagelogo} alt="logo" width={90} height={90} />
            <ul className="nav-links">
              <li>
                <button onClick={() => router.push("/")}>Bosh sahifa</button>
              </li>
              <li>
                <button onClick={() => router.push("/About")}>
                  Mahsulotlar
                </button>
              </li>
              <li>
                <button onClick={() => router.push("/Aloqa")}>Aloqa</button>
              </li>
              <li>
                <button onClick={() => router.push("/Blog")}>Blog</button>
              </li>
            </ul>
          </div>

          <div className="nav-right">
            <input type="text" placeholder="Search for products..." />
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
            <span>{cat.icon}</span> {cat.name}
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
