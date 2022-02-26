import React, { useState, useEffect } from "react";
import "./LoginCMS.scss";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setUserSignedIn } from "../../../Actions/index";

const { REACT_APP_Pass } = process.env;

function LoginCMS() {
  const dispatch = useDispatch();
  const [passInput, setpassInput] = useState("");

  useEffect(() => {}, [passInput]);

  const signIn = () => {
    if (passInput === REACT_APP_Pass) {
      dispatch(setUserSignedIn(true));
    } else {
      window.alert("Wrong Pass!! Please Try Again");
    }
  };

  return (
    <div className="login">
      <div className="loginContainer">
        <h1>Enter Password for KRaCR CMS</h1>
        <div>
          <input
            value={passInput}
            onChange={(e) => setpassInput(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <span className="border"></span>
        </div>

        <Button onClick={signIn}>Sign In</Button>
      </div>
    </div>
  );
}

export default LoginCMS;
