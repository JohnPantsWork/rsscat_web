import React, { useEffect } from 'react';

const StoreMission = ({ title, reward, prograss, volume }) => {
  return (
    <div className="storeMission">
      <div>
        <h3>{title}</h3>
        <p>獎勵：{reward}</p>
        <div class="g-container">
          <div
            class="g-progress"
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

export default StoreMission;
