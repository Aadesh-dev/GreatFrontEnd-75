import { useState } from "react";

export default function Accordion({ sections }) {
  const [expandedIds, setExpandedIds] = useState([]);

  const handleClick = (id) => {
    setExpandedIds(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  return (
    <>
      {sections.map((section, index) => (
        <div key={section.id}>
          <h4>
            <p role="button" id={`accordion-title-${section.id}`} className="accordion-title" onClick={() => handleClick(section.id)} aria-expanded={expandedIds.includes(section.id)} aria-controls={`accordion-panel-${section.id}`}>
              {section.title}
              <span
                aria-hidden="true"
                className={`accordion-icon ${expandedIds.includes(section.id) ? "accordion-icon--rotated" : ""}`}
              />
            </p>
          </h4>
          <div hidden={!expandedIds.includes(section.id)} role="region" id={`accordion-panel-${section.id}`} aria-labelledby={`accordion-title-${section.id}`}>
            {section.content}
          </div>
          {index < sections.length - 1 && <hr />}
        </div>
      ))}
    </>
  );
}
