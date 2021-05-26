import React, { useState } from "react";
import "./Login.css";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState();
  const dispatch = useDispatch();

  const LoginToApp = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.id,
            displayName: userAuth.user.displayName,
            profileUrl: userAuth.user.profileURL,
          })
        );
      })
      .catch((error) => alert(error));
  };

  const register = () => {
    if (!name) {
      return alert("Please enter a full name!");
    }
    //firebase authentication with createUserWithEmailAndPassword() method
    //this function pushes the user data into the data layer & DB which makes the user no longer null.
    //user now becomes filled with  the data inputed into the form
    //so when the register now is clicked it dispatches an action into the data layer which is the data from the form
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        userAuth.user
          .updateProfile({
            displayName: name,
            photoURL: profilePic,
          })
          .then(() => {
            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: name,
                photoUrl: profilePic,
              })
            );
          });
      })
      .catch((error) => alert(error));
  };

  return (
    <div className="login">
      <img
        alt=""
        src="https://download.logo.wine/logo/LinkedIn/LinkedIn-Logo.wine.png"
      />
      <div className="login__container">
        <form>
          <input
            placeholder="Full name (required if registering)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          />
          <input
            placeholder="Profile pic URL (Optional)"
            type="text"
            value={profilePic}
            onChange={(e) => setProfilePic(e.target.value)}
          />
          <input
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={LoginToApp}>
            {" "}
            Sign In
          </button>
        </form>
        <p>
          Not a member?{" "}
          <span className="login__register" onClick={register}>
            Register Now
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
