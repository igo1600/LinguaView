// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOhKPYALh0QlNP-DOa80HEE7Qjx60hgZ0",
  authDomain: "ubidots-7011e.firebaseapp.com",
  projectId: "ubidots-7011e",
  storageBucket: "ubidots-7011e.appspot.com",
  messagingSenderId: "101045719528",
  appId: "1:101045719528:web:93ee04da7adf967a63545d",
  measurementId: "G-L0DEEHME4Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;