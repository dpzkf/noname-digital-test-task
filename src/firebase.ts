import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQoXX8ksMmZeaWwcGynCua8t6xJ14gNqA",
  authDomain: "noname-digital-test-task-ed80e.firebaseapp.com",
  projectId: "noname-digital-test-task-ed80e",
  storageBucket: "noname-digital-test-task-ed80e.appspot.com",
  messagingSenderId: "448170223026",
  appId: "1:448170223026:web:386846c3ce0de4652cb0ab",
  measurementId: "G-CBTT5MSSSN",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
