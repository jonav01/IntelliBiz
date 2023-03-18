import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
// import ProfileCard from '../components/ProfileCard'
import ServiceCard from "../components/ServiceCard";
import { services } from "../constants/serrvices";
function HomePage() {
  const navigate = useNavigate();
  const accessToken = sessionStorage.getItem("userToken");
  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    }
  }, [accessToken]);

  return (
    <div>
      <Navbar />
      <div className="bg-slate-200 p-20">
        {/* <ProfileCard /> */}
        <h1 className="flex-1 text-6xl py-10 font-bold text-center">Services Offered</h1>
        <div className="flex py-10 items-center justify-center ">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((data, _id) => {
              return (
                <ServiceCard
                  heading={data.heading}
                  descp={data.description}
                  link={data.link}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
