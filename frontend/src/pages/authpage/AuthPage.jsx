import { useState } from "react";
import LoginForm from "../../components/AuthForms/LoginForm";
import SignUpForm from "../../components/AuthForms/SignUpForm";

function AuthPage(props) {
  const [signUp, setSignUp] = useState(false);

  function togglePage() {
    setSignUp(!signUp);
  }

  return (
    <>
      <>
        {signUp ? (
          <SignUpForm setUser={props.setUser} />
        ) : (
          <LoginForm setUser={props.setUser} />
        )}
      </>
      <h2>{signUp ? "Or go here to login" : "Or go to signup"}</h2>
      <button onClick={togglePage}>{signUp ? "Log In" : "Register"}</button>
    </>
  );
}

export default AuthPage;
