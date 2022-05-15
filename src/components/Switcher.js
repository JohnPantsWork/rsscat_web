import React from 'react';

const Switcher = ({ onEvent, offevent, defaultValue }) => {
    const toggleSwitch = (e) => {
        const state = e.target.checked;
        console.log(`#state#`, state);
        if (state === true) {
            onEvent();
        } else {
            offevent();
        }
    };

    return (
        <div className="switcher">
            <label className="switch">
                <input type="checkbox" onChange={toggleSwitch} defaultChecked={defaultValue} />
                <span className="slider round"></span>
            </label>
        </div>
    );
};

export default Switcher;
