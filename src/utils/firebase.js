import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBJyKSTeb2d2_FL2USyGP7fXUP7dNmX1so",
  authDomain: "monitoring-43c1d.firebaseapp.com",
  databaseURL: "https://monitoring-43c1d-default-rtdb.firebaseio.com",
  projectId: "monitoring-43c1d",
  storageBucket: "monitoring-43c1d.appspot.com",
  messagingSenderId: "687469630863",
  appId: "1:687469630863:web:f6c2597228eee9916fe7fa",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const database = getDatabase(app);
export const auth = getAuth(app);
