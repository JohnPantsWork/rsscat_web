import React, { useState } from 'react';
import axios from 'axios';

const { REACT_APP_HOST } = process.env;

const DomainSubmit = ({ toastEvent }) => {
    const [rssRegisterDomain, setRssRegisterDomain] = useState([]);

    const getRssDomain = (e) => {
        const registerDomain = e.target.value;
        setRssRegisterDomain(registerDomain);
    };

    const postNewRss = async () => {
        try {
            if (rssRegisterDomain === '') {
                toastEvent.t26();
                return;
            }
            toastEvent.t19();
            await axios({
                withCredentials: true,
                method: 'POST',
                url: `${REACT_APP_HOST}/api/1.0/rss/domain`,
                data: {
                    url: rssRegisterDomain,
                },
            });
            toastEvent.t20();
        } catch (err) {
            const response = err.response.data.error.internalStatusCode || null;
            if (response === 4201) {
                toastEvent.t12();
            } else if (response === 4501) {
                toastEvent.t25();
            } else if (response === 4502) {
                toastEvent.t21();
            } else if (response === 4503) {
                toastEvent.t24();
            } else if (response === 4504) {
                toastEvent.t22();
            } else if (response === 4505) {
                toastEvent.t22();
            }
        }
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
