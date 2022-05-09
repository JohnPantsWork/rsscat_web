import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Domainbar from './Domainbar';

const { REACT_APP_HOST } = process.env;

const Rssmanager = ({ toastEvent }) => {
  // realtime list state
  const [likedDomains, setLikedDomains] = useState([]);
  const [allDomainObjs, setAllDomainObjs] = useState([]);

  const getLikedRssDomain = async () => {
    const result = await axios({
      withCredentials: true,
      method: 'GET',
      url: `${REACT_APP_HOST}/api/1.0/user/domain`,
    });
    setLikedDomains(result.data.data);
  };

  // get user domains
  const getDomain = async () => {
    const result = await axios({
      withCredentials: true,
      method: 'GET',
      url: `${REACT_APP_HOST}/api/1.0/rss/domain`,
    });
    setAllDomainObjs(result.data.data);
  };

  const submitDomain = async (sumbitAll) => {
    const result = await axios({
      withCredentials: true,
      method: 'PATCH',
      url: `${REACT_APP_HOST}/api/1.0/user/domain`,
      data: { sumbitAll: sumbitAll },
    });
    setLikedDomains(result.data.data);
  };

  // init
  useEffect(() => {
    (async () => {
      await getLikedRssDomain();
      await getDomain();
    })();
  }, []);

  return (
    <div className="domainManager block">
      <h1>RSS來源</h1>
      <button
        onClick={() => {
          submitDomain(true);
          toastEvent.t02();
        }}
      >
        訂閱全部
      </button>
      <button
        onClick={() => {
          submitDomain(false);
          toastEvent.t03();
        }}
      >
        取消所有訂閱
      </button>
      <section className="subList">
        {allDomainObjs.map((domain) => {
          return (
            <Domainbar
              key={uuidv4()}
              rssId={domain.id}
              title={domain.title}
              setLikedDomains={setLikedDomains}
              defaultValue={likedDomains.includes(domain.id) ? true : false}
            />
          );
        })}
      </section>
    </div>
  );
};

export default Rssmanager;
