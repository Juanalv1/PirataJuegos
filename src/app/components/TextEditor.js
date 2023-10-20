import React, { useState } from "react";
import { RichTextEditor } from "@mantine/rte";
const TextEditor = ({text, handleChange, setText}) => {

  return (
    <div>
      <RichTextEditor
        value={text}
        onChange={handleChange}
        toolbar={["bold", "italic", "underline", "strikethrough", "link", "image"]}
        setText={setText}
        id='text' name='text'
      />
    </div>
  );
};
export default TextEditor;
