import React from 'react';

import NavBlock from '../components/NavBlock';
import TagManager from '../components/TagManager';
import CatBlock from '../components/CatBlock';
import DomainManager from '../components/DomainManager';
import MissionBlock from '../components/MissionBlock';

const TagPage = ({ toastEvent, loginState }) => {
    return (
        <div className="tagPage rwd">
            <div className="leftNav">
                <NavBlock />
                <CatBlock toastEvent={toastEvent} loginState={loginState} />
                <MissionBlock toastEvent={toastEvent} loginState={loginState} />
            </div>
            <div className="mainInfo">
                <TagManager toastEvent={toastEvent} loginState={loginState} />
            </div>
            <div className="RightNav">
                <DomainManager toastEvent={toastEvent} loginState={loginState} />
            </div>
        </div>
    );
};

export default TagPage;
