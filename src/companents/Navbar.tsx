"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import imagelogo from "../../src/app/image/1-removebg 1.png"; // 🔹 sizdagi logoni shu joyga to‘g‘ri path bilan yozing

export default function Navbar() {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);

  return (
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
        src={imagelogo}
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
          bosh sahifa
        </li>
        <li
          style={{ cursor: "pointer" }}
          onClick={() => router.push("/Product")}
        >
          Mahsulotlar
        </li>
        <li style={{ cursor: "pointer" }} onClick={() => router.push("/Aloqa")}>
          Aloqa
        </li>
        <li
          style={{
            cursor: "pointer",
            color: "#16a34a",
            borderBottom: "2px solid #16a34a",
          }}
          onClick={() => router.push("/")}
        >
          Blog
        </li>
      </ul>

      <div
        className="nav-right"
        style={{ display: "flex", alignItems: "center", gap: "15px" }}
      >
        <input
          type="text"
          placeholder="Search for products..."
          style={{
            padding: "8px 12px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            outline: "none",
          }}
        />
        {/* <button
          className="admin-btn"
          onClick={() => setShowLogin(true)}
          style={{
            border: "none",
            background: "#16a34a",
            color: "white",
            padding: "8px 10px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          🔓
        </button> */}
        <span
          className="cart-icon"
          onClick={() => router.push("/Korzina")}
          style={{ cursor: "pointer", fontSize: "20px" }}
        >
          🛒
        </span>
      </div>
    </nav>
  );
}
