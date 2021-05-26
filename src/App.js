import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import { selectUser, logout, login } from "./features/userSlice";
import Login from "./Login";
import { useSelector } from "react-redux";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import Widgets from "./Widgets";

function App() {
  const user = useSelector(selectUser);
  //shoots data into the data layer
  const dispatch = useDispatch();

  //this is the make sure that after user is logged in , user remains logged in after refresh
  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        //user is logged in // this is the fill the empty user defined earlier as null with these details
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL,
          })
        );
      } else {
        //user is logged out
        dispatch(logout());
      }
    });
  }, []);

  return (
    <div className="app">
      {user ? <Header /> : <div> </div>}

      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Sidebar />
          <Feed />
          <Widgets />
        </div>
      )}
    </div>
  );
}

export default App;
