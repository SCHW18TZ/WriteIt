import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
const Home = () => {
  const [user] = useAuthState(auth);

  return <div>Home</div>;
};

export default Home;
