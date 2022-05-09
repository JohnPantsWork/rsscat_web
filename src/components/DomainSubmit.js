import React, { useState } from 'react';
import axios from 'axios';

const { REACT_APP_HOST } = process.env;

const DomainManager = () => {
  const [rssRegisterDomain, setRssRegisterDomain] = useState([]);

  const getRssDomain = (e) => {
    const registerDomain = e.target.value;
    setRssRegisterDomain(registerDomain);
  };

  const postNewRss = async () => {
    const newRssResult = await axios({
      withCredentials: true,
      method: 'POST',
      url: `${REACT_APP_HOST}/api/1.0/rss`,
      data: {
        url: rssRegisterDomain,
      },
    });
  };

  return (
    <div className="domainManager block">
      <div className="top">
        <section className="head">
          <h3>找不到想要的RSS來源？</h3>
          <h3>把連結交給我們！</h3>
        </section>
      </div>
      <div className="bottom">
        <section className="rssRegister">
          <p>提交新的RSS來源</p>
          <input type="text" onChange={getRssDomain} />
          <button onClick={postNewRss}>發送申請</button>
          <p>我們將經過安全性檢查，並確保RSS連結有效，才會真正保留RSS來源喔！</p>
        </section>
      </div>
    </div>
  );
};

export default DomainManager;
