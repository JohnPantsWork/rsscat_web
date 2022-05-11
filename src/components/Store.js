import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import StoreItem from './StoreItem';
import StoreMission from './Missionbar';

const { REACT_APP_HOST } = process.env;

const Store = ({ toastEvent }) => {
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
    <div className="catPage block">
      <h1>貓咪商店</h1>
      <p>擁有金額：{coins}</p>
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
              toastEvent={toastEvent}
            />
          );
        })}
      </section>
    </div>
  );
};

export default Store;
