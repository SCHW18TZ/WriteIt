import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";

const Home = () => {
  const [user] = useAuthState(auth);
  const [setupCompleted, setSetupCompleted] = useState();
  const checkUser = async () => {
    const userCollectionRef = collection(db, "users");
    const id = user.uid;

    const q = query(userCollectionRef, where("uid", "==", id));
    const querySnap = await getDocs(q);
    querySnap.forEach((doc) => {
      if (doc.data().SetupComplatedHai === true) {
        setSetupCompleted(true);
      } else {
        setSetupCompleted(false);
      }
    });
  };
  console.log(setupCompleted);

  useEffect(() => {
    checkUser();
  }, []);

  return <div>Home</div>;
};

export default Home;
