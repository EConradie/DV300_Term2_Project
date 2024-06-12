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
import { handleUploadOfOneImage } from "./bucketService";

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

export const addChallenge = async (title, description, category, userId, username, imageUri, endDate) => {
  try {
      const imageUrl = await handleUploadOfOneImage(imageUri); // Use the bucketService to handle image upload
      if (!imageUrl) {
          throw new Error('Failed to upload image');
      }

      const challengeData = {
          title,
          description,
          category,
          startDate: new Date(),
          endDate,
          authorId: userId,
          authorName: username,
          imageUrl // Include the image URL from the upload
      };
      await addDoc(collection(db, "challenges"), challengeData);
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
    const entries = [];
    for (const doc of querySnapshot.docs) {
      const entryData = doc.data();
      const votesCollectionRef = collection(doc.ref, "votes");
      const votesSnapshot = await getDocs(votesCollectionRef);
      const votesCount = votesSnapshot.size; // Count of votes
      entries.push({ id: doc.id, ...entryData, votesCount, images: entryData.images || [] });
    }

    // Sort entries by votesCount in descending order
    entries.sort((a, b) => b.votesCount - a.votesCount);

    return entries;
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

export const checkUserHasVoted = async (userId, challengeId, entryId) => {
  const voteRef = doc(db, "challenges", challengeId, "entries", entryId, "votes", userId);
  const docSnap = await getDoc(voteRef);
  return docSnap.exists();  // Returns true if the vote exists, false otherwise
};



