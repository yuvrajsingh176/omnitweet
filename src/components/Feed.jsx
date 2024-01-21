import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../utils/postSlice";
import Feeds from "./Feeds";

const TextEditor = () => {
  const [text, setText] = useState("");
    const userInfo = useSelector(store => store.user.currentUser);
  const handleButtonClick = () => {
    setIsTextEditorOpen(true);
  };
    const dispatch = useDispatch();
  const handleSaveText = () => {
      const payload = {
          userId: userInfo.uid,
          userName: userInfo.displayName,
          content: text,
          timestamp: Date.now(), // Timestamp of when the post was created
      }
    dispatch(addPost(payload));
    setText("")
  };

  return (
    <div className="w-full">
          <div>
          <button
        className="rounded-lg text-white bg-orange-500 p-3"
        onClick={handleButtonClick}
      >
        <h1 className="text-white">Write</h1>
      </button>

   
        <div
     className="border  flex flex-col"
        >
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            cols={50}
            placeholder="Write something..."
              />
              <div className="flex justify-center">
              <button
            className="rounded-lg text-white bg-green-500 w-1/2  mb-2 p-2"
            onClick={handleSaveText}
          >
            Save
          </button>
              </div>
       
        </div>
          </div>
          <div className="mt-4  h-screen ">
          <Feeds/>
          </div>
    </div>
  );
};

export default TextEditor;
