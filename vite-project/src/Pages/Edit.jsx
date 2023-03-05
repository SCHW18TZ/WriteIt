import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, storage } from "../firebase";
import { useState } from "react";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { updateEmail, updateProfile } from "firebase/auth";

const Edit = () => {
  const [user] = useAuthState(auth);

  return <div>Edit</div>;
};

export default Edit;
