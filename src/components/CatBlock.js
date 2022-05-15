import React, { useState } from 'react';

import Cat from './Cat';
import Switcher from './Switcher';

const CatBlock = ({ toastEvent, loginState }) => {
    const [hiddenStyle, setHiddenStyle] = useState({ display: 'none' });

    const hidden = () => {
        setHiddenStyle({ display: 'none' });
    };

    const show = () => {
        setHiddenStyle({ display: 'initial' });
    };

    return (
        <div className="catBlock block">
            <div className="catBlockController">
                <p>伴讀喵喵</p>
                <Switcher onEvent={show} offevent={hidden} defaultValue={false} />
            </div>

            <div className="catHouse_s" style={hiddenStyle}>
                <Cat toastEvent={toastEvent} loginState={loginState} />
            </div>
        </div>
    );
};

export default CatBlock;
