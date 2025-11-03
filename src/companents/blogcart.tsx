"use client";

import "./blogcart.css";
import { useRouter } from "next/navigation";

interface BlogCardProps {
  id: string;
  sarlavxa: string;
  Muallif: string;
  kontent?: string; // optional qilib qo'yamiz
  rasm: string;
}

export default function BlogCard({
  id,
  sarlavxa,
  Muallif,
  kontent = "", // default qiymat
  rasm,
}: BlogCardProps) {
  const router = useRouter();

  return (
    <div className="blog-card" onClick={() => router.push(`/Blog/${id}`)}>
      <img src={rasm} alt={sarlavxa} className="blog-image" />
      <div className="blog-content">
        <h3>{sarlavxa}</h3>
        <p className="author">Muallif: {Muallif}</p>
        <p className="preview">{kontent.slice(0, 100)}...</p>
      </div>
    </div>
  );
}
