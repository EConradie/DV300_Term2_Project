import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { db } from "../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const handleLogin = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Logged in user: " + user.email);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error: " + errorMessage);
    });
};

export const handleRegister = (username, email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("New user: " + user.email);

      updateProfile(user, {
        displayName: username,
      })
        .then(async () => {
          console.log("Username set: " + username);

          // Save user data to Firestore
          await setDoc(doc(db, "users", user.uid), {
            username: username,
            email: email,
            judge: false,
            imageUrl:
              "https://firebasestorage.googleapis.com/v0/b/bladel-ffacf.appspot.com/o/profileImages%2Fdefault.png?alt=media&token=69b1b833-b1f4-4c1b-8043-32ddcfdd5a19",
          });
          console.log("User data saved to Firestore");
        })
        .catch((error) => {
          console.log("Error setting username: ", error.message);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error: " + errorMessage);
    });
};

export const getCurrentUserInfo = async () => {
  const user = auth.currentUser;

  if (user) {
    const userDoc = doc(db, "users", user.uid);
    const userSnapshot = await getDoc(userDoc);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      return { uid: userSnapshot.id, ...userData };
    } else {
      return null;
    }
  } else {
    return null;
  }
};
