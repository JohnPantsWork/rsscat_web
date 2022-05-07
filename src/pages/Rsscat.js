import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';

import Nav from '../components/rsscat/Nav';
import Feedmeow from '../components/rsscat/Feedmeow';
import Rssmanager from '../components/rsscat/Rssmanager';
import News from '../components/rsscat/News';
import Store from '../components/rsscat/Store';
import Statistics from '../components/rsscat/Statistics';
import Settings from '../components/rsscat/Settings';
import Cat from '../components/rsscat/Cat';
import '../styles/rsscat/rsscat.css';

const { REACT_APP_HOST } = process.env;
export const missionContext = createContext(null);

const Rsscat = () => {
  const [content, setContent] = useState('Feedmeow');
  const [renderContent, setRenderContent] = useState(<Feedmeow />);
  const [missions, setMissions] = useState([]);
  const [tags, setTags] = useState([]);

  const getMission = async () => {
    try {
      const missionResult = await axios({
        withCredentials: true,
        url: REACT_APP_HOST + `/api/1.0/cat/mission`,
      });
      let missions = missionResult.data.data.missions;
      missions = missions.map((mission) => {
        mission['prograss'] = 0;
        return mission;
      });
      setMissions(missions);
    } catch (err) {
      window.location.href = '/sign';
    }
  };

  const missionEvent = async (target, behavior) => {
    const m = missions;
    for (let i = 0; i < m.length; i += 1) {
      if (m[i].mission_target_id === target && m[i].mission_behavior_id === behavior) {
        if (m[i].prograss <= m[i].volume) {
          m[i].prograss += 1;
        }

        if (m[i].prograss > m[i].volume) {
          break;
        } else if (m[i].prograss === m[i].volume) {
          await axios({
            withCredentials: true,
            method: 'PATCH',
            url: REACT_APP_HOST + `/api/1.0/cat/mission`,
            data: { completed: m[i].id },
          });
          break;
        }
      }
    }
  };

  const getTags = async () => {
    const result = await axios({
      withCredentials: true,
      method: 'GET',
      url: REACT_APP_HOST + `/api/1.0/tag`,
    });
    const realTags = result.data.data.likeTags;
    const tagNames = realTags.map((e) => {
      return e.tag_name;
    });
    console.log(`#tags#`, tags);
    setTags(tagNames);
    console.log(`#tags2#`, tags);
  };

  useEffect(() => {
    getTags();
    getMission();
  }, []);

  useEffect(() => {
    console.log(`#tags3#`, tags);
  }, [tags]);

  useEffect(() => {
    switch (content) {
      case 'feedmeow':
        setRenderContent(<Feedmeow /*clickMission={clickMission} triggerMission={triggerMission} */ />);
        break;
      case 'rssmanager':
        setRenderContent(<Rssmanager />);
        break;
      case 'news':
        setRenderContent(<News />);
        break;
      case 'statistics':
        setRenderContent(<Statistics tags={tags} getTags={getTags} />);
        break;
      case 'store':
        setRenderContent(<Store missions={missions} />);
        break;
      case 'settings':
        setRenderContent(<Settings />);
        break;
      default:
        setRenderContent(<Feedmeow />);
        break;
    }
  }, [content]);

  return (
    <div className="rsscat">
      <missionContext.Provider value={{ missionEvent }}>
        <Cat />
        <Nav setContent={setContent} />
        {renderContent}
      </missionContext.Provider>
    </div>
  );
};

export default Rsscat;
