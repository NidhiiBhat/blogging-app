// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, updatePassword, updateProfile } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";



// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBumCvQpiRfzOGp4zyOqxc0HDABHFJO13s",
  authDomain: "medium-test-cb68b.firebaseapp.com",
  projectId: "medium-test-cb68b",
  storageBucket: "medium-test-cb68b.appspot.com",
  messagingSenderId: "64094481531",
  appId: "1:64094481531:web:a69570efa46e5932bc46de",
  measurementId: "G-MEZ9GTMW0S",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);

export const storage = getStorage(app);
export const user = auth.currentUser;
