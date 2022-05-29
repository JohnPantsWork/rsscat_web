import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import StoreItem from './StoreItem';

const { REACT_APP_HOST } = process.env;

const Store = ({ toastEvent, loginState }) => {
    const [items, setItems] = useState([]);
    const [purchased, setPurchased] = useState([]);
    const [coins, setCoins] = useState(0);

    const getStoreInfo = async () => {
        const result = await axios({
            withCredentials: true,
            method: 'GET',
            url: REACT_APP_HOST + `/api/1.0/cat/store`,
        });
        console.log(`#result#`, result.data.data);
        setPurchased(result.data.data.purchased);
        setItems(result.data.data.store);
        setCoins(result.data.data.coins);
    };

    // useEffect(() => {
    //     getStoreInfo();
    // }, [loginState]);

    useEffect(() => {
        getStoreInfo();
    }, [loginState]);

    return (
        <div className="catPage block">
            <h1>貓咪商店</h1>
            {loginState ? <p className="money">擁有金額 {coins}</p> : <p>登入才能使用貓咪商店！</p>}
            <section className="storeList">
                {items.map((item) => {
                    if (item.title === 'ghost') {
                        return null;
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
