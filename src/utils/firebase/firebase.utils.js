import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqbyNqWReu8oFNxhOd0NGBcaQmagqM1Fk",
  authDomain: "mac-clothing-db.firebaseapp.com",
  projectId: "mac-clothing-db",
  storageBucket: "mac-clothing-db.appspot.com",
  messagingSenderId: "1019550206825",
  appId: "1:1019550206825:web:36af5c47597f997dde8bf8",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log("userDocRef:", userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log("User Snapshop:");
  console.log(userSnapshot);
  console.log("Exists?", userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating a user", error.message);
    }
  }

  return userDocRef;
};
