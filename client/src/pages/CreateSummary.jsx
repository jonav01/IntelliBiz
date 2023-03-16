import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import TextArea from "../components/TextArea";
import { createSummary, getSummary } from "../utilities/serviceSlice";
function CreateSummary() {
  const [summary, setSummary] = useState("");

  // redux states
  const dispatch = useDispatch();
  const summaries = useSelector((state) => state.service.summaries);
  const status = useSelector((state) => state.service.status);
  const error = useSelector((state) => state.service.error);

  const handleAdvOnChange = (e) => {
    setSummary(e.target.value);
  };
  const handlePromptSubmit = (e) => {
    e.preventDefault();
    dispatch(createSummary(summary))
  };

  useEffect(() => {
    dispatch(getSummary());
  }, [sessionStorage.getItem("userToken")]);
  return (
    <div>
      <Navbar />
      <div className="bg-slate-200 p-2 xl:p-10 lg:p-10 md:p-4 sm:p-2">
        <TextArea
          value={summary}
          onChange={handleAdvOnChange}
          onClick={handlePromptSubmit}
        />
        {summaries.length === 0 && status === "succeded" && (
          <h1 className="text-3xl bold py-4">No summary created !</h1>
        )}
        {summaries.length === 0 && status === "rejected" && (
          <h1 className="text-3xl bold py-4 text-red-600">{error}</h1>
        )}
        {status === "loading" && <p className="text-xl py-4">Loading ...</p>}
        {summaries.map((data, key) => {
          return (
            <div className="bg-white p-2 mb-10 xl:p-10 lg:p-10 md:p-4 sm:p-2">
              <div key={key} className="p-2 text-lg">
                {data.data.replaceAll("\n", "")}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CreateSummary;
