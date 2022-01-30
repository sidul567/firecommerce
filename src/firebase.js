// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARULJ7uX_VCE9yGrsUU9OD2_Gzjvk08uM",
  authDomain: "firecommerce-e5e4c.firebaseapp.com",
  projectId: "firecommerce-e5e4c",
  storageBucket: "firecommerce-e5e4c.appspot.com",
  messagingSenderId: "89953030211",
  appId: "1:89953030211:web:7606542acfddb7d54584f6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firedb = getFirestore(app);

export default firedb