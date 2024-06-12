import { getDownloadURL, ref, uploadBytes} from "firebase/storage";
import { storage } from "../config/firebase";

export const handleUploadOfImages = async (uris) => {
  try {
    const imageUrls = await Promise.all(
      uris.map(async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const uploadRef = ref(storage, `entries/${Date.now()}`);
        await uploadBytes(uploadRef, blob);
        blob.close(); // It's important to close the blob after using it.
        return await getDownloadURL(uploadRef);
      })
    );
    return imageUrls;
  } catch (error) {
    console.error("Error uploading images:", error);
    return [];
  }
};

export const handleUploadOfOneImage = async (imageUri) => {
  try {
    const imageRef = ref(storage, `challenges/${new Date().getTime()}`);
    const response = await fetch(imageUri);
    const blob = await response.blob();
    await uploadBytes(imageRef, blob);
    const imageUrl = await getDownloadURL(imageRef);
    return imageUrl; // Return the URL of the uploaded image
  } catch (error) {
    console.error("Error uploading image:", error);
    return null; // Return null if there's an error
  }
};
