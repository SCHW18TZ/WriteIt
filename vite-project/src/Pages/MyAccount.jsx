import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { db, auth, provider } from "../firebase";
import { addDoc, query, where, getDocs, collection } from "firebase/firestore";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import verifiedIcon from "../assets/verifiedIcon.png";
import { Link } from "react-router-dom";
const MyAccount = ({ user }) => {
  let navigate = useNavigate();
  const [Following, setFollowing] = useState();
  const [numberOfFollowers, setNumberOfFollowers] = useState();
  const [numberOfFollowing, setNumberOfFollowing] = useState();
  const [Completed, setCompleted] = useState();
  const CheckIfUserFollows = async () => {
    const userCollectionRef = collection(db, "users");

    const q = query(userCollectionRef, where("name", "==", user?.name));
    const querySnap = await getDocs(q);
    const docId = querySnap.docs[0].id;
    const docRef = doc(userCollectionRef, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setFollowing(true);
    } else {
      setFollowing(false);
    }
  };
  CheckIfUserFollows();

  const followUser = async () => {
    if (user.uid === auth.currentUser.uid) {
      return;
      console.log("You can't follow yourself");
    }
    const userCollectionRef = collection(db, "users");
    const q = query(userCollectionRef, where("name", "==", user?.name));
    const querySnap = await getDocs(q);
    const docId = querySnap.docs[0].id;
    const docRef = doc(userCollectionRef, docId);
    await updateDoc(docRef, {
      followers: [...user?.followers, auth.currentUser.uid],
    });
  };

  const unfollowUser = async () => {
    if (user.uid === auth.currentUser.uid) {
      console.log("You can't unfollow yourself");
      return;
    }
    const userCollectionRef = collection(db, "users");
    const q = query(userCollectionRef, where("name", "==", user?.name));
    const querySnap = await getDocs(q);
    const docId = querySnap.docs[0].id;
    const docRef = doc(userCollectionRef, docId);
    await updateDoc(docRef, {
      followers: user?.followers.filter(
        (follower) => follower !== auth.currentUser.uid
      ),
    });
  };

  const getNumberOfFollowers = async () => {
    const userCollectionRef = collection(db, "users");
    const q = query(userCollectionRef, where("name", "==", user?.name));
    const querySnap = await getDocs(q);
    const docId = querySnap.docs[0].id;
    const docRef = doc(userCollectionRef, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setNumberOfFollowers(docSnap.data().followers.length);
    } else {
      setNumberOfFollowers(0);
    }
  };

  const getNumberOfFollowing = async () => {
    const userCollectionRef = collection(db, "users");

    const q = query(userCollectionRef, where("name", "==", user?.name));
    const querySnap = await getDocs(q);

    const docId = querySnap.docs[0].id;

    const docRef = doc(userCollectionRef, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setNumberOfFollowing(docSnap.data().following.length);
    } else {
      setNumberOfFollowing(0);
    }
  };

  useEffect(() => {
    getNumberOfFollowers();
    getNumberOfFollowing();
  }, [user]);
  console.log(user.name, user.setupCompletedHai, user);
  return (
    <>
      {user.setupCompletedHai ? (
        <>
          <div className="UserPage">
            <Toaster />

            <div className="user">
              <img src={user?.ProfilePhoto} alt="" />
              <h1>
                {user?.name}
                <p>{numberOfFollowers}</p>
                <p>{numberOfFollowing}</p>
                {user?.uid === auth.currentUser.uid ? (
                  <button onClick={() => navigate("/edit")}>Edit</button>
                ) : null}

                {user?.uid === auth.currentUser.uid ? null : (
                  <>
                    {Following ? (
                      <button onClick={unfollowUser}>Unfollow</button>
                    ) : (
                      <button onClick={followUser}>Follow</button>
                    )}
                  </>
                )}

                {user?.verified ?? <img src={verifiedIcon} alt="verified" />}
              </h1>
              <p>{user?.email}</p>

              <div className="bio">
                <p>{user?.bio}</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <p>
            Please complete your setup first by clicking on this{" "}
            <Link to="/setup">Link </Link>
          </p>
        </>
      )}
    </>
  );
};

export default MyAccount;
