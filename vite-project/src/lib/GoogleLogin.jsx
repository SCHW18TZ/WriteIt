import React from "react";
import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { db, auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { addDoc, query, where, getDocs, collection } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const GoogleLogin = () => {
  const [user] = useAuthState(auth);
  let navigate = useNavigate();
  const userCollectionRef = collection(db, "users");

  const LoginWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    navigate(`/setup`);
    let q = query(userCollectionRef, where("uid", "==", result.user.uid));
    let querySnap = await getDocs(q);
    if (querySnap.size > 0) {
      return;
    } else {
      addDoc(userCollectionRef, {
        email: result.user.email,
        uid: result.user.uid,
        createdAt: serverTimestamp(),
        verified: false,
        roles: "Member",
        followers: [],
        setupCompletedHai: false,
        following: [],
      });
    }
  };

  return (
    <div className="LoginPage">
      <Toaster />
      <GoogleButton onClick={LoginWithGoogle} />
    </div>
  );
};

export default GoogleLogin;
