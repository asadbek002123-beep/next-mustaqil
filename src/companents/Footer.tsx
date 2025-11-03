"use client";
import "./footer.css"; // CSS fayl qo‘shamiz

export default function Footer() {
  return (
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
  );
}
