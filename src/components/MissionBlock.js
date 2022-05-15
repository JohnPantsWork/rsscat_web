import { useState, useEffect } from 'react';

import { v4 as uuidv4 } from 'uuid';
import Missionbar from './Missionbar';
import MissionTimer from './MissionTimer';

const MissionBlock = ({ loginState }) => {
    const [missions, setMissions] = useState([]);

    useEffect(() => {
        setInterval(() => {
            const missionData = JSON.parse(localStorage.getItem('missionData'));
            setMissions(missionData.missions);
        }, []);
    }, []);

    return (
        <div className="missionBlock block">
            <h3>限時任務</h3>
            <hr />
            {loginState ? <MissionTimer loginState={loginState} /> : null}
            <hr />
            <section className="missionInfo">
                {loginState ? (
                    missions.map((mission) => {
                        if (mission.completed === true) {
                            mission.prograss = mission.volume;
                        }
                        return (
                            <Missionbar
                                key={uuidv4()}
                                missionId={mission.id}
                                title={mission.title}
                                reward={mission.reward}
                                prograss={mission.prograss}
                                volume={mission.volume}
                                loginState={loginState}
                            />
                        );
                    })
                ) : (
                    <p>尚未登入</p>
                )}
            </section>
        </div>
    );
};

export default MissionBlock;
