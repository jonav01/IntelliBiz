import React, { useState } from "react";
import { Link } from "react-router-dom";

function SignUp() {
  // Form states
  const [name, setname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  //   Verification states
  const [verifyEmail, setVerifyEmail] = useState(true);
  const [verifyPassword, setVerifyPassword] = useState(true);
  const [verifyConfirmPassword, setverifyConfirmPassword] = useState(true);

  //fetch API
  const userSignUp = async () => {
    if (
      email &&
      password &&
      phone &&
      name &&
      verifyEmail &&
      verifyPassword &&
      verifyConfirmPassword &&
      confirmPassword
    ) {
      const userData = { name, email, phone, password };
      const response = await fetch(
        "https://business-app.onrender.com/api/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      if (response.ok) {
        console.log(response);
      }
    } else {
      return;
    }
  };
  //   On-change events
  const handleEmailOnChange = (e) => {
    setemail(e.target.value);
    setVerifyEmail(true);
  };
  const handlePasswordChange = (e) => {
    setpassword(e.target.value);
    setVerifyPassword(true);
  };
  const handleNameOnChange = (e) => {
    setname(e.target.value);
  };
  const handlePhoneOnChange = (e) => {
    setPhone(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setconfirmPassword(e.target.value);
    setverifyConfirmPassword(true);
  };

  //   On-Blur events
  const handleEmailOnBlur = () => {
    if (!email.includes("@")) setVerifyEmail(false);
  };
  const handlePasswordOnBlur = () => {
    if (!password.length > 5) setVerifyPassword(false);
  };
  const handleConfirmPasswordOnBlur = () => {
    if (password !== confirmPassword) {
      setverifyConfirmPassword(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    userSignUp();
  };
  return (
    <>
      <div className="flex min-h-full items-center justify-center py-32 px-4 sm:px-6 lg:px-8">
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
              Register Here
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="full name" className="sr-only">
                  Name
                </label>
                <input
                  id="fullname"
                  value={name}
                  onChange={handleNameOnChange}
                  name="name"
                  type="text"
                  required
                  className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Full name"
                />
              </div>
              <div>
                <label htmlFor="phone number" className="sr-only">
                  Phone number
                </label>
                <input
                  id="phone"
                  value={phone}
                  onChange={handlePhoneOnChange}
                  name="phpne"
                  type="text"
                  required
                  className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Phone number"
                />
              </div>
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
              <div>
                <label htmlFor="password" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="cnfpassword"
                  name="cnfpassword"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  onBlur={handleConfirmPasswordOnBlur}
                  type="password"
                  required
                  className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Retype Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-center">
              <Link to="/login" className="text-base underline text-blue-700">
                Already a user?Login
              </Link>
            </div>
            {!verifyEmail && (
              <p className="text-base text-red-700 mt-8">Enter a valid email</p>
            )}
            {!verifyPassword && (
              <p className="text-base text-red-700 mt-8">
                Password should be of length greater than 5
              </p>
            )}
            {!verifyConfirmPassword && (
              <p className="text-base text-red-700 mt-8">
                Retype your password correctly
              </p>
            )}
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
