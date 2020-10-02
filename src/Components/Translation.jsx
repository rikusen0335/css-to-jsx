import React, { useState, useRef } from "react";
import Prism from "prismjs";
import "../material-dark-prism.css";
import postcss from "postcss";
import postcssJs from "postcss-js";

export function Translation() {
  const [js, setJs] = useState("");

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

  return (
    <div className="container">
      <div className="item">
        <textarea onChange={handleChange}></textarea>
      </div>

      <pre contenteditable className="item">
        <code className="language-javascript">
          <div
            className="code-preview"
            dangerouslySetInnerHTML={{ __html: js }}
          ></div>
        </code>
      </pre>
    </div>
  );
}
