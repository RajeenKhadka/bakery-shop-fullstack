import "./authpage.css";
import { useState } from "react";
import LoginForm from "../../components/AuthForms/LoginForm";
import SignUpForm from "../../components/AuthForms/SignUpForm";

function AuthPage({ setUser }) {
  const [signUp, setSignUp] = useState(false);

  function togglePage() {
    setSignUp(!signUp);
  }

  return (
    <div>
      {signUp ? (
        <SignUpForm setUser={setUser} />
      ) : (
        <LoginForm setUser={setUser} />
      )}
      <div className="auth-toggle">
        <h2>{signUp ? "Or go here to login" : "Or go to signup"}</h2>
        <button onClick={togglePage}>{signUp ? "Log In" : "Register"}</button>
      </div>
    </div>
  );
}

export default AuthPage;
