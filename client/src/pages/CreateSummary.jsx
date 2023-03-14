import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TextArea from "../components/TextArea";
function CreateSummary() {
  const [summary, setSummary] = useState("");
  const [allSummaries, setallSummaries] = useState([]);
  const sendPrompt = async () => {
    const accessToken = sessionStorage.getItem("userToken");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authentication: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(summary),
    };
    const response = await fetch(
      "https://business-app.onrender.com/api/service/Summary",
      options
    );
    if (response.ok) {
      console.log(await response.json());
    }
  };
  const handleAdvOnChange = (e) => {
    setAdv(e.target.value);
  };
  const handlePromptSubmit = (e) => {
    e.preventDefault();
    sendPrompt();
  };

  useEffect(() => {
    const fetchAds = async () => {
      const response = await fetch(
        "https://business-app.onrender.com/api/service/Summary",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
          },
        }
      );
      if (response.ok) {
        const allSummaries = await response.json();
        setallSummaries(allSummaries);
      }
    };
    fetchAds();
  }, [allSummaries, sessionStorage.getItem("userToken")]);
  return (
    <div>
      <Navbar />
      <div className="bg-slate-200 p-2 xl:p-10 lg:p-10 md:p-4 sm:p-2">
        <TextArea
          value={summary}
          onChange={handleAdvOnChange}
          onClick={handlePromptSubmit}
        />
        {allSummaries.map((data, key) => {
          return (
            <div className="bg-white p-2 mb-10 xl:p-10 lg:p-10 md:p-4 sm:p-2">
              <div key={key} className="p-2 text-lg">
                {data.data}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CreateSummary;
