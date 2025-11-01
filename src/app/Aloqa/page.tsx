"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import logo from "../image/1-removebg 1.png";
import Image21 from "../image/image (2).png";

export default function AloqaPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const oldMessages = JSON.parse(localStorage.getItem("messages") || "[]");
    const newMessage = {
      id: Date.now(),
      ...form,
      date: new Date().toLocaleString(),
    };

    // 🔹 LocalStorage ga saqlash
    const updatedMessages = [newMessage, ...oldMessages];
    localStorage.setItem("messages", JSON.stringify(updatedMessages));

    // 🔹 Firebase'ga yozish
    try {
      await addDoc(collection(db, "Aloqa"), newMessage);
      console.log("✅ Xabar Firebase'ga yuborildi!");
    } catch (error) {
      console.error("❌ Firebasega yozishda xato:", error);
    }

    alert("Xabaringiz yuborildi ✅");

    // 🔹 Forma tozalash
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <>
      {/* 🔹 Yangi navbar */}
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
            style={{
              cursor: "pointer",
              color: "#16a34a",
              borderBottom: "2px solid #16a34a",
            }}
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

      {/* 🔹 Qolgan sahifa qismi */}
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
