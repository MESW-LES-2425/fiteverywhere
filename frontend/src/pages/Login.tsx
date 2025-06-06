import React from "react";
import logo from "/logo.svg";
import { SiGoogle } from "react-icons/si";

const Login: React.FC = () => {
  const handleLogin = () => {
    window.location.href =
      import.meta.env.VITE_API_BASE_URL + "/oauth2/authorization/google";
  };
  console.log("hostname=" + import.meta.env.VITE_API_BASE_URL);
  return (
    <div className="flex items-center justify-center min-h-screen w-[100vw]">
      <div className="card bg-base-200 shadow-xl max-w-md w-full">
        <div className="card-body items-center text-center">
          <figure className="flex justify-center my-6">
            <img
              src={logo}
              alt="FitEverywhere Logo"
              id="logo"
              className="h-52"
            />
          </figure>
          <p>
            With FitEverywhere, maintaining a fitness routine becomes a
            rewarding part of the travel experience, making it easy to stay
            active and healthy—anytime, anywhere.
          </p>

          {/* Login Button with Google Icon */}
          <div className="card-actions">
            <button
              data-testid="login-button"
              onClick={handleLogin}
              className="flex btn"
            >
              <SiGoogle className="text-red-500 w-5 h-5 mr-2" />{" "}
              {/* Google Icon in Red */}
              Login with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
