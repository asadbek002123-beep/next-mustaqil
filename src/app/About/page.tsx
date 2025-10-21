"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import logo from "../image/1-removebg 1.png";
import imageChodir from "../image/image (3).png";
import imageKreslo1 from "../image/Frame 38.png";
import imageKreslo2 from "../image/Frame 33.png";
import imageUyqu from "../image/image (4).png";
import imagefoto from "../image/image (5).png";
import imagefoto1 from "../image/image (7).png";
import imagefoto2 from "../image/image (6).png";
import imagefoto3 from "../image/image (8).png";

export default function About() {
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  const defaultProducts = [
    { id: 1, name: "Chodir", price: 120, rating: 4.5, image: imageChodir.src },
    {
      id: 2,
      name: "Yig‘iladigan kreslo",
      price: 240,
      rating: 3.5,
      image: imageKreslo1.src,
    },
    {
      id: 3,
      name: "Qulay lager kreslosi",
      price: 180,
      rating: 4.5,
      image: imageKreslo2.src,
    },
    {
      id: 4,
      name: "Uyqu uchun sumka",
      price: 130,
      rating: 4.5,
      image: imageUyqu.src,
    },
    { id: 5, name: "Chodir", price: 120, rating: 4.5, image: imagefoto.src },
    { id: 6, name: "Chodir", price: 120, rating: 4.5, image: imagefoto1.src },
    { id: 7, name: "Chodir", price: 120, rating: 4.5, image: imagefoto2.src },
    { id: 8, name: "Chodir", price: 120, rating: 4.5, image: imagefoto3.src },
  ];

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

      setProducts([...defaultProducts, ...fixedAdmin]);
    } else {
      setProducts(defaultProducts);
    }
  }, []);

  const addToCart = (product: any) => {
    const updated = [...cart, product];
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  return (
    <main style={{ background: "#f9fafb", minHeight: "100vh" }}>
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

        <button
          onClick={() => router.push("/Korzina")}
          style={{
            background: "#16a34a",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          🛒 Korzina ({cart.length})
        </button>
      </nav>

      <section style={{ padding: "60px" }}>
        <h1
          style={{ fontSize: "32px", fontWeight: "600", marginBottom: "30px" }}
        >
          Mahsulotlar
        </h1>

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
                transition: "transform 0.2s ease",
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
              <h3 style={{ fontSize: "18px", marginTop: "10px" }}>{p.name}</h3>
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
      </section>

      <footer
        style={{
          background: "#1a1a1a",
          color: "white",
          textAlign: "center",
          padding: "25px 10px",
          marginTop: "40px",
        }}
      >
        <p>
          © {new Date().getFullYear()} Tabiat Do‘koni. Barcha huquqlar
          himoyalangan.
        </p>
      </footer>
    </main>
  );
}
