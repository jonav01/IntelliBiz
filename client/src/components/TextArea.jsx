import React from "react";

function TextArea() {
  return (
    <>
      <label className="text-xl block mb-4">Write your post:</label>
      <textarea name="postContent" className="w-full" />
      <button
        type="button"
        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm
         font-semibold text-white shadow-sm hover:bg-indigo-500
          focus-visible:outline focus-visible:outline-2 mt-4
         focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Submit
      </button>
    </>
  );
}

export default TextArea;
