import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import TextArea from "../components/TextArea";
import { createAd, getAd } from "../utilities/serviceSlice";

function CreateAd() {
  const [adv, setAdv] = useState("");

  // redux states
  const dispatch = useDispatch();
  const advertisements = useSelector((state) => state.service.advertisements);
  const status = useSelector((state) => state.service.status);
  const error = useSelector((state) => state.service.error);

  const handleAdvOnChange = (e) => {
    setAdv(e.target.value);
  };
  const handlePromptSubmit = (e) => {
    e.preventDefault()
    dispatch(createAd(adv));
  };

  useEffect(() => {
    dispatch(getAd());
  }, [dispatch]);
  return (
    <div>
      <Navbar />
      <div className="bg-slate-200 p-2 xl:p-10 lg:p-10 md:p-4 sm:p-2">
        <TextArea
          value={adv}
          onChange={handleAdvOnChange}
          onClick={handlePromptSubmit}
        />
        {(advertisements.length === 0 && status==='succeded') && (
          <h1 className="text-3xl bold py-4">No advertisements created !</h1>
        )}
        {(advertisements.length === 0 && status==='rejected') && (
          <h1 className="text-3xl bold py-4 text-red-600">{error}</h1>
        )}
        {status === "loading" && <p className="text-xl py-4">Loading ...</p>}
        {advertisements.map((data, key) => {
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

export default CreateAd;
