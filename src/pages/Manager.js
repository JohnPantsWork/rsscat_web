import React from 'react';

import DomainManager from '../components/DomainManager';
import NavBlock from '../components/NavBlock';
import CatBlock from '../components/CatBlock';

const Manager = () => {
  return (
    <div className="domainManager rwd">
      <div className="leftNav">
        <NavBlock />
        <CatBlock />
      </div>
      <div className="mainInfo">
        <DomainManager />
      </div>
      <div className="RightNav"></div>
    </div>
  );
};

export default Manager;
