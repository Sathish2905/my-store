import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBkkFF0XhNZeWuDmOfEhsgdfX1VBG7WTas",
  authDomain: "demo-ecommerce.firebaseapp.com",
  projectId: "demo-ecommerce",
  storageBucket: "demo-ecommerce.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:123456789"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export async function uploadImage(file: File): Promise<string> {
  const storageRef = ref(storage, `products/${Date.now()}-${file.name}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}