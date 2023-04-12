import React, { useState } from "react";
import {
  GoogleAuthProvider,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import app, { auth } from "../firebase";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const providerForGoogle = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, providerForGoogle);
      const email = result.user?.email;
      const signInMethods = await fetchSignInMethodsForEmail(auth, email || "");
      if (signInMethods.length === 0) {
        console.log("first time");
      } else {
        navigate("/home");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <h1> Noname Digital </h1>
      <form onSubmit={onLogin}>
        <div className="form-group row">
          <div className="col-xs-2">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-xs-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter password"
            />
          </div>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>

      <p className="mt-2">
        No account yet? <NavLink to="/signup">Sign up</NavLink>
      </p>
      <button
        onClick={(event) => {
          event.preventDefault();
          signInWithGoogle();
        }}
      >
        Sign In with Google
      </button>
    </div>
  );
};

export default Login;
