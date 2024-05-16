
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDFQqabvtSuX7E6-jgeOScRlKy-1VgI3nI",
  authDomain: "bladel-ffacf.firebaseapp.com",
  projectId: "bladel-ffacf",
  storageBucket: "bladel-ffacf.appspot.com",
  messagingSenderId: "550516376240",
  appId: "1:550516376240:web:863f08e5173d5b64623175"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);