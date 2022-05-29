import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import NavBlock from '../components/NavBlock';
import ArticleBlock from '../components/ArticleBlock';
import CatBlock from '../components/CatBlock';
import { missionContext } from '../App';
import MissionBlock from '../components/MissionBlock';

const { REACT_APP_HOST, REACT_APP_DATATYPE_ID_NEWS } = process.env;

let explorepage = 0;
let currentState = 'explore';

const News = ({ getTags, tags, toastEvent, loginState }) => {
    const [newsData, setNewsData] = useState([]);
    const { missionEvent } = useContext(missionContext);

    const getExploreNews = async () => {
        let newsResult;
        newsResult = await axios({
            withCredentials: true,
            url: REACT_APP_HOST + `/api/1.0/news?paging=${explorepage}`,
            method: 'GET',
        });
        if (newsResult.data.data.length === 0) {
            explorepage = 0;
            newsResult = await axios({
                withCredentials: true,
                url: REACT_APP_HOST + `/api/1.0/news?paging=${explorepage}`,
                method: 'GET',
            });
        }

        const newsArticles = newsResult.data.data;

        setNewsData((curr) => curr.concat(newsArticles));
        explorepage += 1;
        missionEvent(6, 2);
    };

    const getFeedNews = async () => {
        let newsResult;
        newsResult = await axios({
            withCredentials: true,
            url: REACT_APP_HOST + `/api/1.0/user/news?paging=${explorepage}`,
            method: 'GET',
            data: { tags: tags },
        });
        if (newsResult.data.data.length === 0) {
            explorepage = 0;
            newsResult = await axios({
                withCredentials: true,
                url: REACT_APP_HOST + `/api/1.0/user/news?paging=${explorepage}`,
                method: 'GET',
            });
        }
        const newsArticles = newsResult.data.data;
        setNewsData((curr) => curr.concat(newsArticles));
        explorepage += 1;
    };

    const loadMoreArticle = async () => {
        if (currentState === 'explore') {
            getExploreNews();
        } else {
            getFeedNews();
        }
        missionEvent(6, 2);
    };

    const switchToExplore = async () => {
        explorepage = 0;
        currentState = 'explore';
        setNewsData([]);
        getExploreNews();
    };

    const switchToFeed = async () => {
        explorepage = 0;
        currentState = 'Feed';
        setNewsData([]);
        getFeedNews();
    };

    useEffect(() => {
        (async () => {
            await getExploreNews();
            await getTags();
        })();
    }, []);

    return (
        <div className="news rwdTwoColumn">
            <div className="leftNav">
                <NavBlock />
                <CatBlock toastEvent={toastEvent} loginState={loginState} />
                <MissionBlock toastEvent={toastEvent} loginState={loginState} />
            </div>
            <div className="mainInfo">
                <button className="button" onClick={switchToExplore}>
                    最新文章
                </button>
                {loginState ? (
                    <button className="button" onClick={switchToFeed}>
                        與你標籤相關的文章
                    </button>
                ) : null}
                <div className="newsContainer">
                    {newsData.length > 1 ? (
                        newsData.map((article) => {
                            return (
                                <ArticleBlock
                                    key={uuidv4()}
                                    article={article}
                                    type={REACT_APP_DATATYPE_ID_NEWS}
                                    loginState={loginState}
                                />
                            );
                        })
                    ) : (
                        <p className="notFoundhint">找不到與你相關的文章</p>
                    )}
                </div>
                <button className="moreBtn button" onClick={loadMoreArticle}>
                    載入更多文章
                </button>
            </div>
            <div className="RightNav"></div>
        </div>
    );
};

export default News;
