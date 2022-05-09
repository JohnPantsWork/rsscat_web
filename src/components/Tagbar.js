import React from 'react';

const Tagbar = ({ tagId, tagName, counts, clickEvent, liked }) => {
  return (
    <div className="tagbar">
      <div className="tagInfo">
        <p className="tagnName">{tagName}</p>
        <p className="tagCounts">{counts}</p>
        <button
          onClick={() => {
            clickEvent(tagId);
          }}
        >
          {liked ? '取消追蹤' : '追蹤'}
        </button>
      </div>
    </div>
  );
};

export default Tagbar;
