import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBvserAho_wFt7dxyavoh2A5qPhfUisIG8",
  authDomain: "chefmate-79815.firebaseapp.com",
  projectId: "chefmate-79815",
  storageBucket: "chefmate-79815.firebasestorage.app",
  messagingSenderId: "902942493664",
  appId: "1:902942493664:web:0933a74938a57061aeb985"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
