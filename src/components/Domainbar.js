import React from 'react';

const Domainbar = ({ rssId, title, setChecked, removeChecked, clickedBool }) => {
  const checked = (e) => {
    const id = Number(e.target.id.split('rss').pop());
    if (e.target.checked) {
      setChecked(id);
    } else {
      removeChecked(id);
    }
  };

  return (
    <div className="domainbar">
      <input type="checkbox" id={'rss' + rssId} onChange={checked} checked={clickedBool} />
      <label for={'rss' + rssId}>{title}</label>
    </div>
  );
};

export default Domainbar;
