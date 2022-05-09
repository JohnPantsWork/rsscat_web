import React from 'react';

import NavBlock from '../components/NavBlock';
import CatBlock from '../components/CatBlock';
import Store from '../components/Store';
import MissionBlock from '../components/MissionBlock';
import { missionContext } from '../App';

const Cat = ({ missions }) => {
  return (
    <div className="cat rwd">
      <div className="leftNav">
        <NavBlock />
        <CatBlock />
      </div>
      <div className="mainInfo">
        <Store />
      </div>
      <div className="RightNav">
        <MissionBlock missions={missions} />
      </div>
    </div>
  );
};

export default Cat;
