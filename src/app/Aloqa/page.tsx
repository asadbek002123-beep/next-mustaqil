"use client";
import Image from "next/image";
import Link from "next/link"; 
import { useState } from "react";
import Image21 from "../image/image (2).png";
import Image22 from "../image/1-removebg 1.png";

export default function AloqaPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const oldMessages = JSON.parse(localStorage.getItem("messages") || "[]");
    const newMessage = {
      id: Date.now(),
      ...form,
      date: new Date().toLocaleString(),
    };

    const updatedMessages = [newMessage, ...oldMessages];
    localStorage.setItem("messages", JSON.stringify(updatedMessages));

    alert("Xabaringiz yuborildi ✅");

    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <main className="contact-page">
      <nav className="contact-navbar">
        <div className="logo-section">
          <Image src={Image22} alt="PIKNIC logo" width={40} height={40} />
          <span className="logo-text">PIKNIC</span>
        </div>

        <ul className="nav-links">
          <li>
            <Link href="/">Bosh sahifa</Link> 
          </li>
          <li>
            <Link href="/About">Mahsulotlar</Link>{" "}
          </li>
          <li className="active">
            <Link href="/Aloqa">Aloqa</Link>
          </li>
          <li>
            <Link href="/Blog">Blog</Link> 
          </li>
        </ul>

        <div className="nav-right">
          <input type="text" placeholder="Search for products..." />
          <button className="cart-btn">🛒</button>
        </div>
      </nav>

      <section className="contact-hero">
        <Image src={Image21} alt="Camping tents" fill className="hero-bg" />
        <div className="hero-text">
          <h1>Biz bilan bog‘laning</h1>
        </div>
      </section>

      <section className="contact-content">
        <div className="contact-left">
          <h2>Keling, biz bilan gaplashaylik</h2>
          <p>
            Savollar, sharhlar yoki takliflar? Shaklni to‘ldiring va biz tez
            orada bog‘lanamiz.
          </p>

          <ul>
            <li>
              📍 <strong>1055 Arthur ave Elk Groot, 67,</strong> <br /> New
              Palmas South Carolina.
            </li>
            <li>📞 +1 234 678 9108 99</li>
            <li>✉️ Contact@moralizer.com</li>
          </ul>
        </div>

        <div className="contact-right">
          <form onSubmit={handleSubmit}>
            <div className="input-row">
              <input
                type="text"
                placeholder="First Name*"
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Last Name*"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                required
              />
            </div>
            <input
              type="email"
              placeholder="Email*"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              type="tel"
              placeholder="Phone Number*"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
            <textarea
              placeholder="Your message..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={4}
            ></textarea>
            <button type="submit" className="send-btn">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
