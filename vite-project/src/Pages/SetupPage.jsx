import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { db, auth, provider } from "../firebase";
import { updateProfile } from "firebase/auth";
import {
  addDoc,
  query,
  where,
  getDocs,
  collection,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { storage } from "../firebase";

const SetupPage = () => {
  const user = useAuthState(auth);
  let navigate = useNavigate();
  const [username, setusername] = useState("");
  const [nameInput, setnameInput] = useState("");
  const [nameavailable, setnameavailable] = useState(false);
  const userCollectionRef = collection(db, "users");

  const usernameQuery = async (e) => {
    const name = e.target.value;
    setnameInput(name);
    let q = query(userCollectionRef, where("name", "==", name));
    let querySnap = await getDocs(q);
    if (querySnap.size > 0) {
      setnameavailable(false);
      console.log(nameInput);
      console.log(nameavailable);
    } else {
      setnameavailable(true);
      console.log(nameInput);
      console.log(nameavailable);
    }
    if (!/^\w+$/i.test(name)) {
      setnameavailable(false);
      console.log(nameavailable);
    }
    // checks if name is shorter than 3 characters or longer than 15 characters
    if (name.length < 2 || name.length > 15) {
      setnameavailable(false);
      console.log(nameavailable);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const bio = e.target[1].value;
    const file = e.target[2].files[0];

    if (nameavailable === false) {
      toast.error("Username is not available");
      return;
    }

    const userCollectionRef = collection(db, "users");
    const userQuery = query(userCollectionRef, where("uid", "==", user[0].uid));
    const userQuerySnap = await getDocs(userQuery);

    const ImageRef = ref(storage, `ProfilePics/${file.name + user.uid}`);
    uploadBytes(ImageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        let image = url;
        updateProfile(user, {
          photoURL: url,
        });
        userQuerySnap.forEach((doc) => {
          updateDoc(doc.ref, {
            name: username.toLowerCase(),
            setupCompletedHai: true,
            bio: bio,
            ProfilePhoto: url,
          });
        });
      });
    });

    toast.success("Profile Updated");
    navigate("/");
  };

  return (
    <div className="Setup">
      <Toaster />
      <h1>Setup</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Choose A username"
          onChange={usernameQuery}
        />
        <input type="text" placeholder="Bio" />
        <input type="file" name="" id="" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SetupPage;
