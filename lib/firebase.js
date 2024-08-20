import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAuxom4Ah0IK8AV5r5rNHAK7KtnzugCIdg",
  authDomain: "form-influencers-7781c.firebaseapp.com",
  projectId: "form-influencers-7781c",
  storageBucket: "form-influencers-7781c.appspot.com",
  messagingSenderId: "504301630862",
  appId: "1:504301630862:web:e4530e7d55ad2ca088a0df"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);

export async function uploadFile(file) {
  const storageRef = ref(storage, file.name);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}