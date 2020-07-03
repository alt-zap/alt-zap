import React, { Fragment } from "react";
import { useNavigate } from "@reach/router";
import { GoogleLoginButton } from "react-social-login-buttons";

import { useAuth } from "../contexts/AuthContext";

// uid
export default () => {
  const { loginWithGoogle,  loading } = useAuth();


  return (
    <div className="flex flex-column items-center ph2">
      {loading && (
        <h3 className="grey">Estamoss verificando se você já está logado</h3>
      )}
      {!loading && (
        <Fragment>
          <h1>Login</h1>
          <GoogleLoginButton onClick={() => loginWithGoogle()} />
        </Fragment>
      )}
    </div>
  );
};
