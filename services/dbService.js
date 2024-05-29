import { db } from "../config/firebase";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  getDoc,
  doc,
} from "firebase/firestore";

const challengesCollectionRef = collection(db, "Challenges");
const entriesCollectionRef = collection(db, "Entries");
const categoryCollectionRef = collection(db, "Category");

export const getChallenges = async () => {
  try {
    const querySnapshot = await getDocs(challengesCollectionRef);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching challenges:", error);
    return [];
  }
};

export const enterChallenge = async (
  challengeId,
  userId,
  description,
  image
) => {
  try {
    const entryData = {
      challengeId: challengeId,
      userId: userId,
      date: new Date(),
      description: description,
      image: image,
    };
    const docRef = await addDoc(entriesCollectionRef, entryData);
    return docRef.id;
  } catch (error) {
    console.error("Error entering challenge:", error);
    return null;
  }
};

export const getCategories = async () => {
  try {
    const querySnapshot = await getDocs(categoryCollectionRef);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const addChallenge = async (title, description, category) => {
  try {
    const docRef = await addDoc(collection(db, "Challenges"), {
      title: title,
      description: description,
      category: category,
      startDate: new Date(),
      endDate: new Date(),
      authorId: "yourUserId",
    });
    return true;
  } catch (error) {
    console.error("Error adding challenge:", error);
    return false;
  }
};

export const getEntriesByChallengeId = async (challengeId) => {
  const entriesRef = collection(db, "Entries");
  const q = query(entriesRef, where("challengeId", "==", challengeId));
  try {
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching entries:", error);
    return [];
  }
};
