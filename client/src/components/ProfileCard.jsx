import React from "react";
import { Link } from "react-router-dom";

function ProfileCard() {
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let currentDate = `${day}-${month}-${year}`;
  return (
    <div className="bg-slate-100 flex 
    xl:flex-row xl:w-7/12 xl:p-10   
    lg:flex-row lg:w-7/12 lg:p-10 
    md:flex-col md:w-full md:p-2
    sm:flex-col sm:w-full sm:p-2">
      <div className="w-48 mr-10 ">
        <img
          src="https://mdbootstrap.com//img/Photos/Square/1.jpg"
          class="h-auto max-w-full rounded-full"
          alt=""
        />
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-sans font-bold mb-4">Welcome James</h1>
        <span className="block mb-10 text-slate-400 text-lg">{currentDate}</span>

        <Link
          to="/signup"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm 
          font-semibold text-white shadow-sm hover:bg-indigo-500 mr-4
          focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
          focus-visible:outline-indigo-600"
        >
          Services
        </Link>
        <Link
          to="/signup"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm 
          font-semibold text-white shadow-sm hover:bg-indigo-500 
          focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
          focus-visible:outline-indigo-600"
        >
          Calendar
        </Link>
      </div>
    </div>
  );
}

export default ProfileCard;
