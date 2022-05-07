import React from 'react';
import axios from 'axios';

import catExcited from '../assets/images/cat05-brown.png';
const { REACT_APP_HOST } = process.env;

const StoreItem = ({ style, title, price, purchased, setPurchased }) => {
  const buyItem = async () => {
    await axios({
      withCredentials: true,
      method: 'POST',
      url: REACT_APP_HOST + `/api/1.0/cat/store`,
      data: { purchased: title },
    });
  };
  const switchStyle = async () => {
    await axios({
      withCredentials: true,
      method: 'PATCH',
      url: REACT_APP_HOST + `/api/1.0/cat`,
      data: { catStyle: title },
    });
  };
  return (
    <div className="storeItem">
      <img src={catExcited} alt="cat" style={{ filter: style }} />
      <div>
        <h3>{title}</h3>
        <p>價格：{price}</p>
        {purchased.includes(title) ? <button onClick={switchStyle}>替換造型</button> : <button onClick={buyItem}>購買</button>}
      </div>
    </div>
  );
};

export default StoreItem;
