import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA1MBMpWtJfxLMCJJycCHeZPLVKxR_DG6U",
  authDomain: "g-74-mustaqilish.firebaseapp.com",
  projectId: "g-74-mustaqilish",
  storageBucket: "g-74-mustaqilish.firebasestorage.app",
  messagingSenderId: "461366177073",
  appId: "1:461366177073:web:1b934b4f301f782c8a1410",
};

// 🔹 Firebase va Firestore init
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
