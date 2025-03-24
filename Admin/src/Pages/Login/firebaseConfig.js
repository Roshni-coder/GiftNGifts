import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBuAY4UvIFz0iV4Gj_ULlvMbUYtDFZl038",
  authDomain: "giftngift-8d31d.firebaseapp.com",
  projectId: "giftngift-8d31d",
  storageBucket: "giftngift-8d31d.firebasestorage.app",
  messagingSenderId: "721297810109",
  appId: "1:721297810109:web:485c04f41b4449af9d4dd4",
  measurementId: "G-Z9STME92K4"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
