"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import BlogCard from "../../companents/blogcart";

interface Blog {
  id: string;
  sarlavxa: string;
  Muallif: string;
  kontent: string;
  rasm: string;
}

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDocs(collection(db, "blogs"));
      const data = snap.docs.map((doc) => {
        const d = doc.data();
        return {
          id: doc.id,
          sarlavxa: d.title || "",
          Muallif: d.Muallif || "",
          kontent: d.content || "",
          rasm: d.image || "",
        };
      }) as Blog[];
      setBlogs(data);
    };
    fetchData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        padding: "20px",
      }}
    >
      {blogs.map((b) => (
        <BlogCard key={b.id} {...b} />
      ))}
    </div>
  );
}
