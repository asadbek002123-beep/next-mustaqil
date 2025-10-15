"use client";
import Image from "next/image";
import { useState } from "react";
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
  const [activeCategory, setActiveCategory] = useState("Chodirlar");
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

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
      oldPrice: 260,
      discount: 20,
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
      oldPrice: 160,
      discount: 15,
      rating: 4.5,
      image: imageUyqu,
    },
    { id: 5, name: "Chodir", price: 120, rating: 4.5, image: imagefoto },
    { id: 6, name: "Chodir", price: 120, rating: 4.5, image: imagefoto1 },
    { id: 7, name: "Chodir", price: 120, rating: 4.5, image: imagefoto2 },
    { id: 8, name: "Chodir", price: 120, rating: 4.5, image: imagefoto3 },
    { id: 9, name: "Chodir", price: 120, rating: 4.5, image: imageChodir },
    { id: 10, name: "Chodir", price: 120, rating: 4.5, image: imageKreslo1 },
    { id: 11, name: "Chodir", price: 120, rating: 4.5, image: imageKreslo2 },
    { id: 12, name: "Chodir", price: 120, rating: 4.5, image: imageUyqu },
  ];

  const faqs = [
    {
      q: "Mahsulotlarni qanday buyurtma qilsa bo‘ladi?",
      a: "Siz tanlagan mahsulotlarni savatga qo‘shib, to‘lov jarayonini davom ettirish orqali buyurtma qilishingiz mumkin. Jarayon juda oson va qulay.",
    },
    {
      q: "To‘lov usullari qanday?",
      a: "Biz to‘lov uchun naqd pul, karta va onlayn to‘lov tizimlarini qabul qilamiz.",
    },
    {
      q: "Yetkazib berish qancha vaqt oladi?",
      a: "Odatda 2-5 ish kuni ichida yetkazib beramiz.",
    },
    {
      q: "Mahsulotlarni almashtirish mumkinmi?",
      a: "Ha, 14 kun ichida almashtirish yoki qaytarish mumkin.",
    },
    {
      q: "Sayohat mahsulotlari tanlashda yordam bera olasizmi?",
      a: "Albatta, bizning mutaxassislarimiz sizga mos mahsulotni tanlashda yordam beradi.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      text: "Shopda olgan jihozlarim sifatli va uzoq muddat ishlayapti. Kundalik foydali maslahatlar uchun rahmat!",
    },
    {
      name: "Alex K.",
      text: "Sifatli mahsulotlar, yaxshi narx va tez yetkazib berish — aynan shu yerda topdim. Tavsiya qilaman!",
    },
    {
      name: "James L.",
      text: "Ularning xizmatidan juda mamnunman. Lager anjomlari juda qulay va sifatli!",
    },
  ];

  return (
    <main>
      <header>
        <div className="top-banner">
          Sign up and get 20% off to your first order.{" "}
          <a href="#">Sign Up Now</a>
        </div>

        <div className="navbar">
          <div className="nav-left">
            <Image src={imagelogo} alt="logo" width={80} height={80} />
            <ul className="nav-links">
              <li>
                <a href="#">Bosh sahifa</a>
              </li>
              <li>
                <a href="#">Mahsulotlar</a>
              </li>
              <li>
                <a href="#">Aloqa</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
            </ul>
          </div>

          <div className="nav-right">
            <input type="text" placeholder="Search for products..." />
            <span className="cart-icon">🛒</span>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="hero-text">
          <h1>Zo‘r jihozlar bilan sarguzashtlarni kashf eting</h1>
          <p>
            Sarguzasht ishqibozlari uchun mo‘ljallangan ochiq havoda kerakli
            jihozlaringizni kashf eting. Yuqori sifatli chodirlardan qulay lager
            anjomlargacha — hammasi sizning tajribangizni yuksaltirish uchun.
          </p>
          <button>Xarid qiling</button>

          <div className="hero-stats">
            <div>
              <h3>200+</h3>
              <p>Xalqaro brendlar</p>
            </div>
            <div>
              <h3>2,000+</h3>
              <p>Yuqori Sifatli Mahsulotlar</p>
            </div>
            <div>
              <h3>30,000+</h3>
              <p>Baxtli mijozlar</p>
            </div>
          </div>
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

      <h2 className="section-title">Kategoriya va Mahsulotlar</h2>
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

      <div className="products">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <Image src={p.image} alt={p.name} width={250} height={180} />
            <h3>{p.name}</h3>
            <div className="rating">
              {"⭐".repeat(Math.round(p.rating))} <span>{p.rating}/5</span>
            </div>
            <p className="price">
              ${p.price}
              {p.oldPrice && <span className="old-price">${p.oldPrice}</span>}
              {p.discount && <span className="discount">-{p.discount}%</span>}
            </p>
          </div>
        ))}
      </div>

      <div className="view-all-container">
        <button className="view-all-btn">Hammasini ko‘rish</button>
      </div>

      <section className="faq-section">
        <h2>Tez-tez beriladigan savollar</h2>
        <div className="faq-list">
          {faqs.map((f, i) => (
            <div key={i} className={`faq-item ${openFAQ === i ? "open" : ""}`}>
              <div
                className="faq-question"
                onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
              >
                <span>{f.q}</span>
                <button>{openFAQ === i ? "×" : "+"}</button>
              </div>
              {openFAQ === i && <p className="faq-answer">{f.a}</p>}
            </div>
          ))}
        </div>
      </section>

            <section className="testimonials">
        <h2>Bizning mamnun mijozlarimiz</h2>
        <div className="testimonial-list">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              <div className="stars">{"⭐".repeat(5)}</div>
              <p>{t.text}</p>
              <strong>{t.name}</strong>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
