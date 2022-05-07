import React, { useState } from 'react';

import Cat from './Cat';

const CatBlock = () => {
  const [hiddenStyle, setHiddenStyle] = useState({ display: 'none' });
  const hiddenCatToggle = (e) => {
    if (e.target.checked === true) {
      setHiddenStyle({ display: 'block' });
    } else {
      setHiddenStyle({ display: 'none' });
    }
  };
  return (
    <div className="catBlock block">
      <div className="catBlockController">
        <p>伴讀喵喵</p>
        <label className="switch">
          <input type="checkbox" onChange={hiddenCatToggle} />
          <span className="slider round"></span>
        </label>
      </div>

      <div className="catHouse_s" style={hiddenStyle}>
        <Cat />
      </div>
    </div>
  );
};

export default CatBlock;
