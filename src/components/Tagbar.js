import React from 'react';

const Tagbar = ({ tagId, tagName, counts, clickEvent, liked }) => {
  return (
    <div className="tagbar">
      <div className="tagInfo">
        {/* <p className="tagnName"></p> */}

        <button
          onClick={() => {
            clickEvent(tagId);
          }}
        >
          {tagName}
        </button>
        <p className="tagCounts">
          <span>LV.</span>
          {counts}
        </p>
      </div>
    </div>
  );
};

export default Tagbar;
