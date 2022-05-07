import React, { useState, useEffect } from 'react';
import axios from 'axios';

import NavBlock from '../components/NavBlock';
import TagManager from '../components/TagManager';
import CatBlock from '../components/CatBlock';

const TagPage = () => {
  return (
    <div className="tagPage rwd">
      <div className="leftNav">
        <NavBlock />
        <CatBlock />
      </div>
      <div className="mainInfo">
        <TagManager />
      </div>
      <div className="RightNav"></div>
    </div>
  );
};

export default TagPage;
