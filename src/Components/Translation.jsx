import React, { useState, useRef } from "react";
import Prism from "prismjs";
import "../material-dark-prism.css";
import postcss from "postcss";
import postcssJs from "postcss-js";

export function Translation() {
  const [js, setJs] = useState("");
  const [copySuccess, setCopySuccess] = useState("");
  const textAreaRef = useRef(null);

  const handleChange = (e) => {
    const css = e.target.value;
    let highlight;

    try {
      const a = postcss.parse(css);
      const b = postcssJs.objectify(a);
      const code = JSON.stringify(b, null, "\t");
      highlight = Prism.highlight(
        code,
        Prism.languages.javascript,
        "javascript"
      );
    } catch (e) {
      console.log(
        "Oof, something went wrong. Please specify correct css style."
      );
    }

    setJs(highlight);
  };

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    setCopySuccess("Copied!");
  }

  return (
    <div className="container">
      <div className="item">
        <textarea onChange={handleChange}></textarea>
      </div>

      <pre contenteditable className="item">
        <button onClick={copyToClipboard}>Copy</button>
        {copySuccess}
        <code className="language-javascript">
          <div
            ref={textAreaRef}
            className="code-preview"
            dangerouslySetInnerHTML={{ __html: js }}
          ></div>
        </code>
      </pre>
    </div>
  );
}
