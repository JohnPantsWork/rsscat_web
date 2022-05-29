import React from 'react';
import axios from 'axios';

import catExcited from '../assets/images/cat05-brown.png';
const { REACT_APP_HOST } = process.env;

const StoreItem = ({ style, title, price, purchased, toastEvent }) => {
    const buyItem = async () => {
        try {
            await axios({
                withCredentials: true,
                method: 'POST',
                url: REACT_APP_HOST + `/api/1.0/cat/store`,
                data: { purchased: title },
            });
            switchStyle();
        } catch (err) {
            toastEvent.t10();
        }
    };
    const switchStyle = async () => {
        try {
            await axios({
                withCredentials: true,
                method: 'PATCH',
                url: REACT_APP_HOST + `/api/1.0/cat`,
                data: { catStyle: title },
            });
            window.location.href = '/cat';
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className="storeItem">
            {/* <h3>{title}</h3> */}
            <img src={catExcited} alt="cat" style={{ filter: style }} />
            <div>
                {purchased.includes(title) ? null : <p>價格:{price}</p>}
                {purchased.includes(title) ? (
                    <button className="buttonInside" onClick={switchStyle}>
                        替換造型
                    </button>
                ) : (
                    <button className="buttonInside" onClick={buyItem}>
                        購買
                    </button>
                )}
            </div>
        </div>
    );
};

export default StoreItem;
