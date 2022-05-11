import React, { useState, useEffect } from 'react';
import axios from 'axios';

import NavBlock from '../components/NavBlock';
import TagManager from '../components/TagManager';
import CatBlock from '../components/CatBlock';
import DomainManager from '../components/DomainManager';

const TagPage = ({ toastEvent }) => {
  return (
    <div className="tagPage rwd">
      <div className="leftNav">
        <NavBlock />
        <CatBlock />
      </div>
      <div className="mainInfo">
        <TagManager toastEvent={toastEvent} />
      </div>
      <div className="RightNav">
        <DomainManager toastEvent={toastEvent} />
      </div>
    </div>
  );
};

export default TagPage;
