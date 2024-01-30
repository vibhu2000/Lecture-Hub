import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCfD0jbs6Nrkbezy5qqR1A-zkfMa1ExPiQ",
    authDomain: "lecturehub-a5acd.firebaseapp.com",
    projectId: "lecturehub-a5acd",
    storageBucket: "lecturehub-a5acd.appspot.com",
    messagingSenderId: "411970366798",
    appId: "1:411970366798:web:1b9f26dd50c5b362da421f",
    measurementId: "G-S3K02STVSE"
  };

  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  export default storage;