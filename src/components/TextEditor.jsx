import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const TextEditor = ({input,setInput}) => {
  const handleChnage=(content)=>
  {
setInput({...input,description:content})
  }
  return <ReactQuill theme="snow" value={input.description} onChange={handleChnage} />;
};

export default TextEditor;
