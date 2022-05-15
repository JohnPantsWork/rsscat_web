import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import CatBlock from '../components/CatBlock';
import ArticleBlock from '../components/ArticleBlock';
import NavBlock from '../components/NavBlock';
import { missionContext } from '../App';
import DomainManager from '../components/DomainManager';
import MissionBlock from '../components/MissionBlock';

const { REACT_APP_HOST, REACT_APP_DATATYPE_ID_RSS } = process.env;

let explorepage = 0;
let currentState = 'explore';

const Rss = ({ getTags, tags, toastEvent, loginState }) => {
    const [rssData, setRssData] = useState([]);
    const { missionEvent } = useContext(missionContext);
    // const [tagRecord, setTagRecord] = useState([]);
    // const [tags, setTags] = useState([]);
    // const [] = setState([]);

    const getExploreRss = async () => {
        let rssResult = await axios({
            withCredentials: true,
            url: REACT_APP_HOST + `/api/1.0/rss?paging=${explorepage}`,
            method: 'GET',
        });
        if (rssResult.data.data.length === 0) {
            explorepage = 0;
            rssResult = await axios({
                withCredentials: true,
                url: REACT_APP_HOST + `/api/1.0/rss?paging=${explorepage}`,
                method: 'GET',
            });
        }

        const rssArticles = rssResult.data.data;

        setRssData((curr) => curr.concat(rssArticles));
        explorepage += 1;
        missionEvent(5, 2);
    };

    const getFeedRss = async () => {
        let rssResult = await axios({
            withCredentials: true,
            url: REACT_APP_HOST + `/api/1.0/rss/user?paging=${explorepage}`,
            method: 'GET',
            data: { tags: tags },
        });
        if (rssResult.data.data.length === 0) {
            explorepage = 0;
            rssResult = await axios({
                withCredentials: true,
                url: REACT_APP_HOST + `/api/1.0/rss/user?paging=${explorepage}`,
                method: 'GET',
            });
        }
        const rssArticles = rssResult.data.data;
        setRssData((curr) => curr.concat(rssArticles));
        explorepage += 1;
    };

    const loadMoreArticle = async () => {
        if (currentState === 'explore') {
            getExploreRss();
        } else {
            getFeedRss();
        }

        if (loginState) {
            missionEvent(5, 2);
        }
    };

    // const getTags = async () => {
    //   console.log(`#getTags#`);
    //   const result = await axios({
    //     withCredentials: true,
    //     method: 'GET',
    //     url: REACT_APP_HOST + `/api/1.0/user/tag`,
    //   });
    //   const realTags = result.data.data.likeTags;
    //   const tagNames = realTags.map((e) => {
    //     return e.tag_name;
    //   });
    //   setTags(tagNames);
    // };

    const switchToExplore = async () => {
        explorepage = 0;
        currentState = 'explore';
        setRssData([]);
        getExploreRss();
    };

    const switchToFeed = async () => {
        explorepage = 0;
        currentState = 'Feed';
        setRssData([]);
        getFeedRss();
    };

    // const getTagRecord = async () => {
    //   // await getTags();
    //   setTags(userData.tags);
    //   const tagsResult = await axios({
    //     withCredentials: true,
    //     method: 'GET',
    //     url: REACT_APP_HOST + `/api/1.0/record`,
    //   });
    //   const tags = tagsResult.data.data;

    //   await setTagRecord(tags);
    // };

    useEffect(() => {
        (async () => {
            await getExploreRss();
            await getTags();
        })();
    }, []);

    return (
        <div className="rwd rssPage">
            <div className="leftNav">
                <NavBlock />
                <CatBlock toastEvent={toastEvent} loginState={loginState} />
                <MissionBlock toastEvent={toastEvent} loginState={loginState} />
            </div>
            <div className="mainInfo ">
                <button className="button .selected" onClick={switchToExplore}>
                    最新文章
                </button>
                {loginState ? (
                    <button className="button" onClick={switchToFeed}>
                        與你標籤相關的文章
                    </button>
                ) : null}
                {rssData.length > 1 ? (
                    rssData.map((article) => {
                        return (
                            <ArticleBlock
                                key={uuidv4()}
                                article={article}
                                type={REACT_APP_DATATYPE_ID_RSS}
                                toastEvent={toastEvent}
                                loginState={loginState}
                            />
                        );
                    })
                ) : (
                    <p className="notFoundhint">找不到與你相關喜歡的文章</p>
                )}
                {rssData.length > 9 ? (
                    <button className="moreBtn button" onClick={loadMoreArticle}>
                        載入更多文章
                    </button>
                ) : null}
            </div>
            <div className="RightNav">
                <DomainManager toastEvent={toastEvent} loginState={loginState} />
            </div>
        </div>
    );
};

export default Rss;
