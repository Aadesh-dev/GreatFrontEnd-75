import { useState } from "react";

export default function Tabs() {
  const [selectedTab, setSelectedTab] = useState("HTML");

  handleTab = (event) => {
    setSelectedTab(event.target.innerText);
  }
  
  return (
    <div>
      <div>
        <button onClick={handleTab} className={selectedTab === "HTML" ? "selected" : ""}>HTML</button>
        <button onClick={handleTab} className={selectedTab === "CSS" ? "selected" : ""}>CSS</button>
        <button onClick={handleTab} className={selectedTab === "JavaScript" ? "selected" : ""}>JavaScript</button>
      </div>
      <div>
        {
          selectedTab === "HTML" &&
          <p>
            The HyperText Markup Language or HTML is the
            standard markup language for documents designed to
            be displayed in a web browser.
          </p>
        }
        {
          selectedTab === "CSS" &&
          <p>
            Cascading Style Sheets is a style sheet language
            used for describing the presentation of a document
            written in a markup language such as HTML or XML.
          </p>
        }
        {
          selectedTab === "JavaScript" &&
          <p>
            JavaScript, often abbreviated as JS, is a
            programming language that is one of the core
            technologies of the World Wide Web, alongside HTML
            and CSS.
          </p>
        }
      </div>
    </div>
  );
}
