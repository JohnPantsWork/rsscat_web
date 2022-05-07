import React from 'react';

import NavBlock from '../components/NavBlock';
import CatBlock from '../components/CatBlock';
import Store from '../components/Store';

const Cat = () => {
  return (
    <div className="cat rwd">
      <div className="leftNav">
        <NavBlock />
        <CatBlock />
      </div>
      <div className="mainInfo">
        <Store />
      </div>
      <div className="RightNav"></div>
    </div>
  );
};

export default Cat;
