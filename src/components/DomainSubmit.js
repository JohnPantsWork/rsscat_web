import React, { useState } from 'react';
import axios from 'axios';

const { REACT_APP_HOST } = process.env;

const DomainSubmit = () => {
    const [rssRegisterDomain, setRssRegisterDomain] = useState([]);

    const getRssDomain = (e) => {
        const registerDomain = e.target.value;
        setRssRegisterDomain(registerDomain);
    };

    const postNewRss = async () => {
        await axios({
            withCredentials: true,
            method: 'POST',
            url: `${REACT_APP_HOST}/api/1.0/rss/domain`,
            data: {
                url: rssRegisterDomain,
            },
        });
    };

    return (
        <div className="domainSubmit block">
            <div className="top">
                <section className="head">
                    <h3>找不到想要的RSS？</h3>
                    <h3>把連結交給我們！</h3>
                </section>
            </div>
            <div className="bottom">
                <section className="rssRegister">
                    <input
                        className="inputFilter"
                        type="text"
                        onChange={getRssDomain}
                        placeholder="輸入RSS網址..."
                    />
                    <button className="buttonInside" onClick={postNewRss}>
                        發送申請
                    </button>
                </section>
            </div>
        </div>
    );
};

export default DomainSubmit;
