import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [verifyEmail, setVerifyEmail] = useState(true);
  const [verifyPassword, setVerifyPassword] = useState(true);

  // Login
  const userLogin = async () => {
    if (email && password && verifyEmail && verifyPassword) {
      const userData = { email, password };
      const response = await fetch(
        "https://business-app.onrender.com/api/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      if (response.ok) {
        response
          .json()
          .then((data) => sessionStorage.setItem("userToken", data.accessToken))
          .catch((err) => console.log(err));
        navigate("/home");
      }
    } else {
      return;
    }
  };
  const handleEmailOnChange = (e) => {
    setemail(e.target.value);
    setVerifyEmail(true);
  };

  const handlePasswordChange = (e) => {
    setpassword(e.target.value);
    setVerifyPassword(true);
  };

  const handleEmailOnBlur = () => {
    if (!email.includes("@")) setVerifyEmail(false);
  };

  const handlePasswordOnBlur = () => {
    if (!password.length > 5) setVerifyPassword(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    userLogin();
  };
  return (
    <>
      <div
        className="flex h-screen items-center
      justify-center py-32 px-4 sm:px-6 lg:px-8"
      >
        <div className="w-full max-w-md space-y-8">
          <div>
            <Link to="/">
              <img
                className="mx-auto h-12 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              />
            </Link>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Welcome Back
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  value={email}
                  onChange={handleEmailOnChange}
                  onBlur={handleEmailOnBlur}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={handlePasswordOnBlur}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-center">
              <Link to="/signup" className="text-base underline text-blue-700">
                New User ? Sign up
              </Link>
            </div>
            {!verifyEmail && (
              <p className="text-base text-red-700 mt-8">Enter a valid email</p>
            )}
            {!verifyEmail && (
              <p className="text-base text-red-700 mt-8">
                Password should be of length greater than 5
              </p>
            )}
            {!verifyEmail && !verifyPassword && (
              <p className="text-base text-red-700 mt-8">
                Cannot leave both fields empty
              </p>
            )}
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignIn;
