"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import BlogCard from "../../companents/blogcart";

interface Blog {
  id: string;
  sarlavxa: string;
  muallif: string;
  kontent: string;
  rasm: string;
}

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDocs(collection(db, "blog"));
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Blog[];
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
