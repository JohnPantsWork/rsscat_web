import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import NavBlock from '../components/NavBlock';
import ArticleBlock from '../components/ArticleBlock';
import CatBlock from '../components/CatBlock';
import { missionContext } from '../App';

const { REACT_APP_HOST, REACT_APP_DATATYPE_ID_NEWS } = process.env;

let explorepage = 0;
let currentState = 'explore';

const News = ({ setToggleFooter, getTags, tags }) => {
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
    // missionEvent(6, 2);
  };

  const getFeedNews = async () => {
    let newsResult;
    newsResult = await axios({
      withCredentials: true,
      url: REACT_APP_HOST + `/api/1.0/news/user?paging=${explorepage}`,
      method: 'GET',
      data: { tags: tags },
    });
    if (newsResult.data.data.length === 0) {
      explorepage = 0;
      newsResult = await axios({
        withCredentials: true,
        url: REACT_APP_HOST + `/api/1.0/news/user?paging=${explorepage}`,
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
      // await setToggleFooter(false);
      await getExploreNews();
      await getTags();
    })();
  }, []);

  return (
    <div className="news rwd">
      <div className="leftNav">
        <NavBlock />
        <CatBlock />
      </div>
      <div className="mainInfo">
        <button onClick={switchToExplore}>探索</button>
        <button onClick={switchToFeed}>與你相關</button>
        {newsData.map((article) => {
          return <ArticleBlock key={uuidv4()} article={article} type={REACT_APP_DATATYPE_ID_NEWS} />;
        })}
        <button className="moreBtn" onClick={loadMoreArticle}>
          載入更多文章
        </button>
      </div>
      <div className="RightNav"></div>
    </div>
  );
};

export default News;
