import React, { useEffect } from 'react';

const Missionbar = ({ title, reward, prograss, volume }) => {
  return (
    <div className="Missionbar">
      <div>
        <h3>{title}</h3>
        <p>獎勵：{reward}</p>
        <div className="g-container">
          <div
            className="g-progress"
            style={{
              width: `${(prograss / volume) * 100}%`,
            }}
          ></div>
        </div>
        {prograss >= volume ? <p>完成</p> : <p></p>}
      </div>
    </div>
  );
};

export default Missionbar;
