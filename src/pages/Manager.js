import React from 'react';

import DomainManager from '../components/DomainManager';
import DomainSubmit from '../components/DomainSubmit';
import NavBlock from '../components/NavBlock';
import CatBlock from '../components/CatBlock';
import MissionBlock from '../components/MissionBlock';

const Manager = ({ toastEvent, loginState }) => {
    return (
        <div className="domainManager rwd">
            <div className="leftNav">
                <NavBlock />
                <CatBlock toastEvent={toastEvent} loginState={loginState} />
                <MissionBlock toastEvent={toastEvent} loginState={loginState} />
            </div>
            <div className="mainInfo">
                <DomainManager toastEvent={toastEvent} loginState={loginState} />
            </div>
            <div className="RightNav">
                <DomainSubmit />
            </div>
        </div>
    );
};

export default Manager;
