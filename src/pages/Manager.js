import React from 'react';

import DomainManager from '../components/DomainManager';
import DomainSubmit from '../components/DomainSubmit';
import NavBlock from '../components/NavBlock';
import CatBlock from '../components/CatBlock';
import Statistics from '../components/Statistics';

const Manager = ({ toastEvent }) => {
  return (
    <div className="domainManager rwd">
      <div className="leftNav">
        <NavBlock />
        <CatBlock />
      </div>
      <div className="mainInfo">
        <DomainManager toastEvent={toastEvent} />
      </div>
      <div className="RightNav">
        <DomainSubmit />
      </div>
    </div>
  );
};

export default Manager;
