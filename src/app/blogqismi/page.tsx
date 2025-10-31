import Image from "next/image";
import Link from "next/link";
import image from "../image/pick.jpg";
import logo from "../image/1-removebg 1.png";

export default function PostPage() {
  return (
    <main>
      <header className="navbar">
        <div className="navbar-left">
          <Image src={logo} alt="Logo" width={60} height={60} />
        </div>

        <nav className="nav-links">
          <Link href="/" className="nav-link">
            Bosh sahifa
          </Link>
          <Link href="/About" className="nav-link">
            Mahsulotlar
          </Link>
          <Link href="/Aloqa" className="nav-link">
            Aloqa
          </Link>
          <Link href="/Blog" className="nav-link active">
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
      <div className="post-container">
        <div className="post-image">
          <Image
            src={image}
            alt="Tabiatning Qiziqarli Jihatlari"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>

        <div className="post-content">
          <Link href="/Blog" className="post-backlink">
            ← Barcha postlarga qaytish
          </Link>

          <h1 className="post-title">Tabiatning Qiziqarli Jihatlari</h1>
          <p className="post-date">Payshanba, 2024-yil 8-yanvar</p>

          <p className="post-summary">
            Amazon o‘rmonlarining sirli hayoti va ularning ekologik ahamiyati
            haqida qiziqarli ma’lumotlar.
          </p>

          <div className="post-body">
            Amazon o‘rmonlari dunyodagi eng katta tropik o‘rmonlardan biridir.
            Ular Yerdagi kislorodning katta qismini ishlab chiqaradi va
            millionlab hayvonlar hamda o‘simlik turlariga uy bo‘ladi. Bu joy
            sayyohlar uchun sarguzasht, ekologlar uchun esa tadqiqot manbai
            hisoblanadi.
          </div>
        </div>
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
