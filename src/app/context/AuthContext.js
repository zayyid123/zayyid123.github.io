"use client";
import { useContext, createContext, useState, useEffect } from "react";
import {
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import auth from "../config/firebaseAuth";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const router = useRouter()
  const [user, setuser] = useState(null);

  const Login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const userLoggedIn = userCredential.user;
        console.log(userLoggedIn)
        setuser(userLoggedIn);
        router.push('/admin')
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const Logout = () => {
    signOut(auth)
      .then(() => {
        setuser(null);
        router.push('/')
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setuser(currentUser);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, Login, Logout }}>{children}</AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
