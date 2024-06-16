import { getDownloadURL, ref, uploadBytes} from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { storage, db, auth } from "../config/firebase";
import * as ImagePicker from 'expo-image-picker';

export const handleUploadOfImages = async (uris) => {
  try {
    const imageUrls = await Promise.all(
      uris.map(async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const uploadRef = ref(storage, `entries/${Date.now()}`);
        await uploadBytes(uploadRef, blob);
        blob.close();
        return await getDownloadURL(uploadRef);
      })
    );
    return imageUrls;
  } catch (error) {
    console.error("Error uploading images:", error);
    return [];
  }
};

export const handleUploadProfileImage = async (imageUri, userId) => {
  try {
    const imageRef = ref(storage, `profileImages/${userId}`);
    const response = await fetch(imageUri);
    const blob = await response.blob();
    await uploadBytes(imageRef, blob);
    const imageUrl = await getDownloadURL(imageRef);

    const userDocRef = doc(db, "users", userId);
    await setDoc(userDocRef, { imageUrl: imageUrl }, { merge: true });

    return imageUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};

export const handleUploadOfOneImage = async (imageUri) => {
  try {
    const imageRef = ref(storage, `challenges/${new Date().getTime()}`);
    const response = await fetch(imageUri);
    const blob = await response.blob();
    await uploadBytes(imageRef, blob);
    const imageUrl = await getDownloadURL(imageRef);
    return imageUrl; 
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};



