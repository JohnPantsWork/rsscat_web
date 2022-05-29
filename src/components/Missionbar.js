import React, { useEffect, useState } from 'react';

const Missionbar = ({ title, reward, prograss, volume }) => {
    const [realTimePrograss, setRealTimePrograss] = useState(prograss);
    useEffect(() => {
        setInterval(() => {
            setRealTimePrograss(prograss);
        }, 1000);
    }, []);

    return (
        <div className="Missionbar">
            <h4 className="missionTtile">{title}</h4>

            <p className="missionReward">獎勵：{reward}</p>
            <div className="g-container">
                <div
                    className="g-progress"
                    style={{
                        width: `${(realTimePrograss / volume) * 100}%`,
                    }}
                >
                    {prograss >= volume ? (
                        <p className="missionState">完成!</p>
                    ) : (
                        <p className="missionState">進行中</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Missionbar;
