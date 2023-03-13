import React from "react";
import Navbar from "../components/Navbar";
// import ProfileCard from '../components/ProfileCard'
import ServiceCard from "../components/ServiceCard";
import { services } from "../constants/serrvices";
function HomePage() {
  return (
    <div>
      <Navbar />
      <div className="bg-slate-200 p-20">
        {/* <ProfileCard /> */}
        <div className="flex min-h-screen items-center justify-center bg-gray-800">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((data, _id) => {
              return (
                <ServiceCard heading={data.heading} descp={data.description} link={data.link}/>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
