// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBt0HfXVckk3M4wQoMvBuFkey-MO33_OvI",
//   authDomain: "framez-app-hng.firebaseapp.com",
//   projectId: "framez-app-hng",
//   storageBucket: "framez-app-hng.firebasestorage.app",
//   messagingSenderId: "1072241643197",
//   appId: "1:1072241643197:web:e74bc87f1eb2e69a6531d4"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);




// // firebaseConfig.js
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// // Your Firebase project credentials
// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_PROJECT_ID.appspot.com",
//   messagingSenderId: "YOUR_SENDER_ID",
//   appId: "YOUR_APP_ID",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app);


import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBt0HfXVckk3M4wQoMvBuFkey-MO33_OvI",
  authDomain: "framez-app-hng.firebaseapp.com",
  projectId: "framez-app-hng",
  storageBucket: "framez-app-hng.firebasestorage.app",
  messagingSenderId: "1072241643197",
  appId: "1:1072241643197:web:e74bc87f1eb2e69a6531d4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export { serverTimestamp };
