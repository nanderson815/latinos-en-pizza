import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { firebaseConfig } from "./firebase.config";

const app: any =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth: any = getAuth(app);
const db: any = getFirestore(app);
const storage: any = getStorage(app);

export {
  app,
  auth,
  db,
  collection,
  getDocs,
  getDoc,
  doc,
  storage,
  ref,
  getDownloadURL,
};
