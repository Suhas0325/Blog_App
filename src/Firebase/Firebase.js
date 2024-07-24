import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore,collection,getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCnSVw2kyaMoJkycjji3kfsGEYGsSvzocI",
  authDomain: "blogapp-1b33d.firebaseapp.com",
  projectId: "blogapp-1b33d",
  storageBucket: "blogapp-1b33d.appspot.com",
  messagingSenderId: "713014310055",
  appId: "1:713014310055:web:a03557236a92ca14cc1782",
  measurementId: "G-J6CGNJ91YD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {app,auth,db};