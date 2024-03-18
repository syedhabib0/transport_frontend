import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB1gnYnCmglwsq8OEAY9tSPqcNk-ksHjVg",
  authDomain: "iwstms-9af53-57d25.firebaseapp.com",
  projectId: "iwstms-9af53",
  storageBucket: "iwstms-9af53.appspot.com",
  messagingSenderId: "465487574692",
  appId: "1:465487574692:web:0f14164ec75e3264b39831",
  measurementId: "G-KWB74DDH9P"
};

const app = initializeApp(firebaseConfig);
export const db =  getFirestore()
export default app