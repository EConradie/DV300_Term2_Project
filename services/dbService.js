import { db } from "../config/firebase";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  setDoc
} from "firebase/firestore";

const challengesCollectionRef = collection(db, "challenges");
const entriesCollectionRef = collection(db, "entries");

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
  username,
  title,
  description,
  images
) => {
  try {
    const entryData = {
      userId: userId,
      username: username,
      title: title,
      description: description,
      images: images,
      date: new Date(),
    };
    const entriesCollectionRef = collection(db, "challenges", challengeId, "entries");
    await addDoc(entriesCollectionRef, entryData);
    return true;
  } catch (error) {
    console.error("Error entering challenge:", error);
    return false;
  }
};

export const addChallenge = async (title, description, category, userId, username) => {
  try {
    const docRef = await addDoc(challengesCollectionRef, {
      title: title,
      description: description,
      category: category,
      startDate: new Date(),
      endDate: new Date(),
      authorId: userId,
      authorName: username,
    });
    return true;
  } catch (error) {
    console.error("Error adding challenge:", error);
    return false;
  }
};

export const getEntriesByChallengeId = async (challengeId) => {
  try {
    const entriesCollectionRef = collection(db, "challenges", challengeId, "entries");
    const querySnapshot = await getDocs(entriesCollectionRef);
    return querySnapshot.docs.map((doc) => {
      const entryData = doc.data();
      return { id: doc.id, ...entryData, images: entryData.images || [] };
    });
  } catch (error) {
    console.error("Error fetching entries:", error);
    return [];
  }
};

export const addVote = async (userId, challengeId, entryId) => {
  const voteRef = doc(db, "challenges", challengeId, "entries", entryId, "votes", userId);

  try {
    const docSnap = await getDoc(voteRef);
    if (docSnap.exists()) {
      alert("You have already voted for this entry.");
      return false;
    }

    await setDoc(voteRef, { entryId: entryId });
    alert("Vote successfully recorded!");
    return true;
  } catch (error) {
    console.error("Error when adding vote:", error);
    alert("Failed to record vote.");
    return false;
  }
};



