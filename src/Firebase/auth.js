import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./Firebase";
import { updateProfile } from "firebase/auth";

export const doCreateUserWithEmailandPassword = async(email,password,displayName) =>{
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      await updateProfile(userCredential.user, { displayName });
    }
    return userCredential;
};
 
export const doSignwithEmailandPassword = (email,password) => {
    return signInWithEmailAndPassword(auth,email,password);
}

export const doSignout = () => {
    return auth.signOut();
}
