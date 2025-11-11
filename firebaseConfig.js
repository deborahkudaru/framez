// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBt0HfXVckk3M4wQoMvBuFkey-MO33_OvI",
  authDomain: "framez-app-hng.firebaseapp.com",
  projectId: "framez-app-hng",
  storageBucket: "framez-app-hng.firebasestorage.app",
  messagingSenderId: "1072241643197",
  appId: "1:1072241643197:web:e74bc87f1eb2e69a6531d4",
};

const app = initializeApp(firebaseConfig);

// ✅ Correct auth initialization for React Native
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
export const storage = getStorage(app);
export { serverTimestamp };
