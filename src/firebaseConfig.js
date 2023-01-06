import { initializeApp } from "firebase/app";

const firebaseConfig = {
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_AUTHDOMAIN,
  // databaseURL:process.env.REACT_APP_DATABASEURL,
  // projectId: process.env.REACT_APP_PROJECTID,
  // storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  // messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  // appId: process.env.REACT_APP_APPID,
  // measurementId: process.env.REACT_APP_MEASUREMENTID,
  apiKey: "AIzaSyCP19GoE3UH5msCYfWhdcnw21DjjNuropI",
  authDomain: "spacestream-97545.firebaseapp.com",
  databaseURL: "https://spacestream-97545-default-rtdb.firebaseio.com",
  projectId: "spacestream-97545",
  storageBucket: "spacestream-97545.appspot.com",
  messagingSenderId: "990824215037",
  appId: "1:990824215037:web:fe0197f3d413d4d0c12994",
  measurementId: "G-L86T81R0WK"
};

// Initialize Firebase
export const firebaseapp = initializeApp(firebaseConfig);


