import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import StoreItem from '../../components/rsscat/StoreItem';
import StoreMission from '../../components/rsscat/StoreMission';

const { REACT_APP_HOST } = process.env;

const Store = ({ missions }) => {
  const [items, setItems] = useState([]);
  const [purchased, setPurchased] = useState([]);
  const [coins, setCoins] = useState(0);

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
  }, []);

  return (
    <div className="store">
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
