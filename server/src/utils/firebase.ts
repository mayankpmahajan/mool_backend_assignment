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

export const signInWithGoogle = async () => {
  try {
    const googleProvider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, googleProvider);
    // This gives you a Google Access Token
    const credential:any = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info
    const user = result.user;
    return {
      success: true,
      user,
      token
    };
  } catch (error:any) {
    return {
      success: false,
      error: {
        code: error.code,
        message: error.message,
        email: error.customData?.email,
        credential: GoogleAuthProvider.credentialFromError(error)
      }
    };
  }
};