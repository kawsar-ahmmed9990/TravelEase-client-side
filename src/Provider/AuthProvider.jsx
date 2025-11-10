import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";

const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authProviderLoading, setAuthProviderLoading] = useState(true);

  //   Signup with email,  password
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // sign in with email password
  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   signin with google
  const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };

  //   signOut
  const signOutUser = () => {
    return signOut(auth);
  };

  //   auth state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthProviderLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const authInfo = {
    createUser,
    signInUser,
    googleSignIn,
    signOutUser,
    user,
    setUser,
    authProviderLoading,
    setAuthProviderLoading,
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
