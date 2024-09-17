import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCOa8_bwKSbXzJ1liuX-TmfFDUmDGiQV-8",
  authDomain: "gallery-website-34e2a.firebaseapp.com",
  projectId: "gallery-website-34e2a",
  storageBucket: "gallery-website-34e2a.appspot.com",
  messagingSenderId: "406071910343",
  appId: "1:406071910343:web:5d189723c9a335b3ba03e2",
  measurementId: "G-BQQ5H0BGJR",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
