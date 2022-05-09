import { useState, useEffect } from 'react';

import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Missionbar from './Missionbar';
import MissionTimer from './MissionTimer';

const { REACT_APP_HOST } = process.env;

const MissionBlock = () => {
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    const missionData = JSON.parse(localStorage.getItem('missionData'));
    setMissions(missionData.missions);
  }, []);

  return (
    <div className="block">
      <MissionTimer />
      <section className="missionInfo">
        {missions.map((mission) => {
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
            />
          );
        })}
      </section>
    </div>
  );
};

export default MissionBlock;
