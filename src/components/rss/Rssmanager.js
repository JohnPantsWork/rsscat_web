import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Domainbar from './Domainbar';

const { REACT_APP_HOST } = process.env;

const Rssmanager = () => {
  // realtime list state
  const [likedDomains, setLikedDomains] = useState([]);
  const [dislikedDomains, setDislikedDomains] = useState([]);
  // checked id from Domainbar, use for effect
  const [checkedLikedId, setCheckedLikedId] = useState(null);
  const [checkedDislikedId, setCheckedDislikedId] = useState(null);
  // unchecked id from Domainbar, use for effect
  const [uncheckedLikedId, setUncheckedLikedId] = useState(null);
  const [uncheckedDislikedId, setUncheckedDislikedId] = useState(null);
  // checked ids from Domainbar, prepare for axios
  const [checkedLikeDomains, setCheckedLikedDomains] = useState([]);
  const [checkedDislikedDomains, setCheckedDislikedDomains] = useState([]);

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

  const getDomain = async () => {
    const result = await axios({
      withCredentials: true,
      method: 'GET',
      url: `${REACT_APP_HOST}/api/1.0/rss/domain`,
    });
    const likedList = result.data.data.likedDomains;
    const dislikedList = result.data.data.dislikedDomains;
    setLikedDomains(likedList);
    setDislikedDomains(dislikedList);
  };

  // submit
  const subDomains = async () => {
    const likedDomainsIds = likedDomains.map((d) => {
      return d.id;
    });
    const likedIds = likedDomainsIds.concat(checkedDislikedDomains);
    const newLikedDomains = [...new Set(likedIds)];
    await axios({
      withCredentials: true,
      method: 'POST',
      url: `${REACT_APP_HOST}/api/1.0/rss/domain`,
      data: { newLikedDomains: newLikedDomains },
    });
    getDomain();
  };

  // cancel
  const unsubDomains = async () => {
    const likedDomainsIds = likedDomains.map((d) => {
      return d.id;
    });
    let newLikedDomains = likedDomainsIds.filter((d) => {
      return checkedLikeDomains.indexOf(d) === -1;
    });
    await axios({
      withCredentials: true,
      method: 'POST',
      url: `${REACT_APP_HOST}/api/1.0/rss/domain`,
      data: { newLikedDomains: newLikedDomains },
    });
    getDomain();
  };

  // init
  useEffect(() => {
    getDomain();
  }, []);

  useEffect(() => {
    if (checkedLikedId === null) {
      return;
    }
    let temp = checkedLikeDomains;
    temp.push(checkedLikedId);
    setCheckedLikedDomains(temp);
    setCheckedLikedId(null);
  }, [checkedLikedId]);

  useEffect(() => {
    if (checkedDislikedId === null) {
      return;
    }
    let temp = checkedDislikedDomains;
    temp.push(checkedDislikedId);
    setCheckedDislikedDomains(temp);
    setCheckedDislikedId(null);
  }, [checkedDislikedId]);

  useEffect(() => {
    if (uncheckedLikedId === null) {
      return;
    }
    let temp = checkedLikeDomains.filter((d) => {
      return d !== uncheckedLikedId;
    });
    setCheckedLikedDomains(temp);
    setUncheckedLikedId(null);
  }, [uncheckedLikedId]);

  useEffect(() => {
    if (uncheckedDislikedId === null) {
      return;
    }
    let temp = checkedDislikedDomains.filter((d) => {
      return d !== uncheckedDislikedId;
    });
    setCheckedDislikedDomains(temp);
    setUncheckedDislikedId(null);
  }, [uncheckedDislikedId]);

  return (
    <div className="rssmanager">
      <div className="top">
        <section className="head">
          <h1>RSS來源</h1>
        </section>
      </div>
      <div className="bottom">
        <section className="subList">
          {likedDomains.map((domain) => {
            if (checkedLikeDomains.includes(domain.id)) {
              return (
                <Domainbar
                  key={uuidv4()}
                  rssId={domain.id}
                  title={domain.title}
                  setChecked={setCheckedLikedId}
                  removeChecked={setUncheckedLikedId}
                  clickedBool={true}
                />
              );
            } else {
              return (
                <Domainbar
                  key={uuidv4()}
                  rssId={domain.id}
                  title={domain.title}
                  setChecked={setCheckedLikedId}
                  removeChecked={setUncheckedLikedId}
                  clickedBool={false}
                />
              );
            }
          })}
        </section>
        <div className="btnGroup">
          <button className="subBtn" onClick={subDomains}>
            &larr;訂閱
          </button>
          <button className="unsubBtn" onClick={unsubDomains}>
            取消&rarr;
          </button>
        </div>
        <section className="unsubList">
          {dislikedDomains.map((domain) => {
            if (checkedDislikedDomains.includes(domain.id)) {
              return (
                <Domainbar
                  key={uuidv4()}
                  rssId={domain.id}
                  title={domain.title}
                  setChecked={setCheckedDislikedId}
                  removeChecked={setUncheckedDislikedId}
                  clickedBool={true}
                />
              );
            } else {
              return (
                <Domainbar
                  key={uuidv4()}
                  rssId={domain.id}
                  title={domain.title}
                  setChecked={setCheckedDislikedId}
                  removeChecked={setUncheckedDislikedId}
                  clickedBool={false}
                />
              );
            }
          })}
        </section>
        <section className="rssRegister">
          <h2>提交新的RSS來源</h2>
          <input type="text" onChange={getRssDomain} />
          <button onClick={postNewRss}>申請</button>
        </section>
      </div>
    </div>
  );
};

export default Rssmanager;
