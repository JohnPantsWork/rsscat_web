import React from 'react';

import NavBlock from '../components/NavBlock';
import CatBlock from '../components/CatBlock';
import Store from '../components/Store';
import MissionBlock from '../components/MissionBlock';

const Cat = ({ toastEvent, loginState }) => {
    return (
        <div className="cat rwdTwoColumn">
            <div className="leftNav">
                <NavBlock />
                <CatBlock toastEvent={toastEvent} loginState={loginState} />
                <MissionBlock toastEvent={toastEvent} loginState={loginState} />
            </div>
            <div className="mainInfo">
                <Store toastEvent={toastEvent} loginState={loginState} />
            </div>
            <div className="RightNav"></div>
        </div>
    );
};

export default Cat;
