import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";

export const handleUploadOfImages = async (uris) => {
    try {
      const imageUrls = await Promise.all(uris.map(async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const uploadRef = ref(storage, `path/to/images/${Date.now()}`);
        await uploadBytes(uploadRef, blob);
        blob.close(); // It's important to close the blob after using it.
        return await getDownloadURL(uploadRef);
      }));
      return imageUrls;
    } catch (error) {
      console.error("Error uploading images:", error);
      return [];
    }
  };