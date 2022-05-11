import React, { useState } from 'react';

import NavBlock from '../components/NavBlock';
import CatBlock from '../components/CatBlock';
import Store from '../components/Store';
import MissionBlock from '../components/MissionBlock';

const Cat = ({ missions, toastEvent }) => {
  return (
    <div className="cat rwd">
      <div className="leftNav">
        <NavBlock />
        <CatBlock />
      </div>
      <div className="mainInfo">
        <Store toastEvent={toastEvent} />
      </div>
      <div className="RightNav">
        <MissionBlock missions={missions} toastEvent={toastEvent} />
      </div>
    </div>
  );
};

export default Cat;
