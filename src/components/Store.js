import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import StoreItem from './StoreItem';
import StoreMission from './StoreMission';

const { REACT_APP_HOST } = process.env;

const Store = () => {
  const [items, setItems] = useState([]);
  const [purchased, setPurchased] = useState([]);
  const [coins, setCoins] = useState(0);
  const [missions, setMissions] = useState([]);

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

  const getStoreInfo = async () => {
    const result = await axios({
      withCredentials: true,
      method: 'GET',
      url: REACT_APP_HOST + `/api/1.0/cat/store`,
    });
    setPurchased(result.data.data.purchased);
    setItems(result.data.data.store);
    setCoins(result.data.data.coins);
  };

  useEffect(() => {
    getStoreInfo();
    getMission();
  }, []);

  return (
    <div className="catPage block">
      <div className="top">
        <section className="head">
          <h1>貓咪商店</h1>
        </section>
      </div>
      <div className="bottom">
        <div className="storeBottomLeft">
          <section className="storeList">
            {items.map((item) => {
              if (item.title === 'ghost') {
                return;
              }
              return (
                <StoreItem
                  key={uuidv4()}
                  itemId={item.id}
                  style={item.css_setting}
                  title={item.title}
                  price={item.price}
                  purchased={purchased}
                  setPurchased={setPurchased}
                />
              );
            })}
          </section>
        </div>
        <div className="storeBottomRight">
          <section className="missionInfo">
            {missions.map((mission) => {
              if (mission.completed === true) {
                mission.prograss = mission.volume;
              }
              return (
                <StoreMission
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
          <section className="storeInfo">
            <p>擁有金額：{coins}</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Store;
