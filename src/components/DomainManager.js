import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Domainbar from './Domainbar';

const { REACT_APP_HOST } = process.env;

const Rssmanager = ({ toastEvent, loginState }) => {
    // realtime list state
    const [likedDomains, setLikedDomains] = useState([]);
    const [allDomainObjs, setAllDomainObjs] = useState([]);
    const [searchFilter, setSearchFilter] = useState('');
    const [searchResult, setSearchResult] = useState([]);

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
            method: 'PUT',
            url: `${REACT_APP_HOST}/api/1.0/user/domain`,
            data: { sumbitAll },
        });
        setLikedDomains(result.data.data);
    };

    const search = (e) => {
        const search = e.target.value;
        setSearchFilter(search);
    };

    // init
    useEffect(() => {
        (async () => {
            if (loginState) {
                await getLikedRssDomain();
            }

            await getDomain();
        })();
    }, [loginState]);

    useEffect(() => {
        const result = allDomainObjs.filter((domain) => {
            return domain.title.includes(searchFilter) === true;
        });
        setSearchResult(result);
    }, [searchFilter]);

    return (
        <div className="domainManager block">
            <h3>RSS來源</h3>
            <p>您可以透過每個站點右邊的開關，來決定是否接收自該網站的RSS資料。</p>
            {loginState ? (
                <button
                    className="buttonInside"
                    onClick={() => {
                        submitDomain(true);
                        toastEvent.t02();
                    }}
                >
                    訂閱全部
                </button>
            ) : null}
            {loginState ? (
                <button
                    className="buttonInside"
                    onClick={() => {
                        submitDomain(false);
                        toastEvent.t03();
                    }}
                >
                    取消所有訂閱
                </button>
            ) : null}

            <input
                className="domainSearchBar inputFilter"
                type="text"
                onChange={search}
                placeholder={'輸入查詢...'}
            />
            <section className="subList">
                {searchResult.length === 0
                    ? allDomainObjs.map((domain) => {
                          return (
                              <Domainbar
                                  key={uuidv4()}
                                  rssId={domain.id}
                                  title={domain.title}
                                  setLikedDomains={setLikedDomains}
                                  defaultValue={likedDomains.includes(domain.id) ? true : false}
                                  loginState={loginState}
                              />
                          );
                      })
                    : searchResult.map((domain) => {
                          return (
                              <Domainbar
                                  key={uuidv4()}
                                  rssId={domain.id}
                                  title={domain.title}
                                  setLikedDomains={setLikedDomains}
                                  defaultValue={likedDomains.includes(domain.id) ? true : false}
                                  loginState={loginState}
                              />
                          );
                      })}
            </section>
        </div>
    );
};

export default Rssmanager;
