import React, { useState } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  // const [token, setToken] = useState("");

  function activeLoginBtn() {
    if (userId.includes("@") && userPw.length > 7) {
      return true;
    }
  }

  // const navigate = useNavigate();
  // const goToMain = () => {
  //   navigate("/main");
  // };

  const onLoginButtonClick = () => {
    const body = {
      email: userId,
      password: userPw,
    };

    fetch("http://auth.jaejun.me:10010/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json); //{ access_token: "asdfdsfsd"}

        localStorage.setItem("token", json.access_token);
      });
    fetch("http://auth.jaejun.me:10010/me", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div className="container">
      <div className="login-container">
        <div className=" logo-wrapper">
          <span className="logo-text">Justgram</span>
        </div>
        <div className="form-wrapper">
          <form id="login-form">
            <div className="login-wrapper">
              <input
                id="email-input-box"
                className="login-input"
                type="text"
                value={userId}
                placeholder="전화번호, 사용자 이름 또는 이메일"
                onChange={(event) => {
                  setUserId(event.target.value);
                }}
              />
            </div>
            <div className="login-wrapper">
              <input
                id="password-input-box"
                className="login-input"
                type="password"
                value={userPw}
                placeholder="비밀번호"
                onChange={(event) => {
                  setUserPw(event.target.value);
                }}
              />
            </div>
            <div className="button-wrapper">
              <button
                id="button-login"
                className="login-button"
                type="submit"
                disabled={!activeLoginBtn()}
                onClick={onLoginButtonClick}
              >
                로그인
              </button>
            </div>
          </form>
        </div>
        <div className="extra-wrapper">
          <Link to={"/main"} className="find-password">
            비밀번호를 잊으셨나요?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
