import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import MyAccount from "./Pages/MyAccount";
import { useState } from "react";
import { db, auth, provider } from "./firebase";
import { getDocs, collection } from "firebase/firestore";
import SetupPage from "./Pages/SetupPage";
import { useAuthState } from "react-firebase-hooks/auth";
import Edit from "./Pages/Edit";
import Home from "./Pages/Home";
function App() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const userCollectionRef = collection(db, "users");
    const getUser = async () => {
      const userSnap = await getDocs(userCollectionRef);
      const userDocs = userSnap.docs.map((doc) => doc.data());
      setUser(userDocs);
    };
    getUser();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {user.map((user) => {
          return (
            <>
              <Route
                path={`users/${user.name}`}
                element={<MyAccount user={user} />}
              />
              <Route path="setup" element={<SetupPage user={user} />} />
            </>
          );
        })}
        <Route path="/" element={<Home />} />

        <Route path="/edit" element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App;
