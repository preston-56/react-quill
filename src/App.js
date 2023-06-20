import React, { useState, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import ReactDOM from "react-dom";
import "react-quill/dist/quill.snow.css";
import { Picker } from "emoji-mart";
import "./App.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    [{ align: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ color: [] }, { background: [] }],
    ["clean"],
    ["emoji"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

// Custom emoji module for Quill
const EmojiModule = () => {
  const emojiButton = document.querySelector(".ql-emoji");
  if (!emojiButton) return;

  emojiButton.addEventListener("click", () => {
    const picker = document.createElement("div");
    picker.style.position = "absolute";
    picker.style.zIndex = "10000";
    document.body.appendChild(picker);

    const onEmojiSelect = (emoji) => {
      const range = this.quill.getSelection();
      this.quill.insertText(range.index, emoji.native);
      this.quill.setSelection(range.index + emoji.native.length);
      picker.remove();
    };

    ReactDOM.render(<Picker onSelect={onEmojiSelect} />, picker);
  });
};

Quill.register("modules/emoji", EmojiModule);

function App() {
  const [value, setValue] = useState("");

  useEffect(() => {
    const quill = quillRef.current.getEditor();

    // Add the custom emoji module to the toolbar
    const toolbar = quill.getModule("toolbar");
    toolbar.addHandler("emoji", () => {
      quill.focus();
      quill.blur(); // Fixes an issue where the emoji picker doesn't appear on the first click
      quill.focus();
    });
  }, []);

  const handleChange = (content) => {
    setValue(content);
  };

  const quillRef = React.useRef(null);

  return (
    <div className="container">
      <div className="row">
        <div className="editor">
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={value}
            onChange={handleChange}
            className="editor-input"
            modules={modules}
          />
        </div>
        <div className="preview">
          {value.length === 0 ? "Preview" : null}
          <div dangerouslySetInnerHTML={{ __html: value }}></div>
        </div>
      </div>
    </div>
  );
}

export default App;
