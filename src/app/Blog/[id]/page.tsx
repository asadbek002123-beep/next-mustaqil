"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";

interface Blog {
  sarlavxa: string;
  muallif: string;
  kontent: string;
  rasm: string;
}

export default function BlogPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const getBlog = async () => {
      if (!id) return;
      const docRef = doc(db, "blog", id as string);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setBlog(docSnap.data() as Blog);
      }
    };
    getBlog();
  }, [id]);

  if (!blog) return <p style={{ padding: "20px" }}>Yuklanmoqda...</p>;

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto", padding: "20px" }}>
      <img
        src={blog.rasm}
        alt={blog.sarlavxa}
        style={{ width: "100%", borderRadius: "8px" }}
      />
      <h1>{blog.sarlavxa}</h1>
      <p style={{ color: "#777" }}>Muallif: {blog.muallif}</p>
      <p style={{ marginTop: "20px" }}>{blog.kontent}</p>
    </div>
  );
}
