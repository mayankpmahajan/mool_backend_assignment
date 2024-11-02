import firebase, { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  deleteUser,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { firebaseConfig } from "../config/firebase";

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

export const createFirebaseUser = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const firebaseUser = userCredential.user;
  await sendEmailVerification(firebaseUser);
  return firebaseUser;
};

export const deleteFirebaseUser = async (firebaseUser: any) => {
  await deleteUser(firebaseUser);
};

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const pollEmailVerification = async (
  firebaseUser: any,
  maxAttempts = 10,
  pollInterval = 10000
) => {
  let attempts = 0;

  while (attempts < maxAttempts) {
    await wait(pollInterval);
    await firebaseUser.reload();

    if (firebaseUser.emailVerified) {
      return true;
    }

    attempts++;
  }
  return false;
};

