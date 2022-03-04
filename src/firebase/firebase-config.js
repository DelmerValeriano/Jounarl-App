import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
   apiKey: "AIzaSyDmfxzyymOfy9FmClSa0B-56-ADQ34Thak",
   authDomain: "react-app-cursos-c5ff5.firebaseapp.com",
   projectId: "react-app-cursos-c5ff5",
   storageBucket: "react-app-cursos-c5ff5.appspot.com",
   messagingSenderId: "717570762939",
   appId: "1:717570762939:web:416ac7695e9d561705e19e"
 };

 // Initialize Firebase

 const firebaseApp = initializeApp(firebaseConfig);
 const googleProvider = new GoogleAuthProvider();
 const db = getFirestore();
 
 export{
   firebaseApp,
   googleProvider,
   db
 } ;
 

 


