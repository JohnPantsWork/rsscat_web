import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import CatBlock from '../components/CatBlock';
import ArticleBlock from '../components/ArticleBlock';
import NavBlock from '../components/NavBlock';
import { missionContext } from '../App';

const { REACT_APP_HOST, REACT_APP_DATATYPE_ID_RSS } = process.env;

let explorepage = 0;
let currentState = 'explore';

const Rss = ({ setToggleFooter, getTags, tags }) => {
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
    console.log(`#rssResult#`, rssResult);
    const rssArticles = rssResult.data.data;
    console.log(`#rssArticles#`, rssArticles);
    setRssData((curr) => curr.concat(rssArticles));
    explorepage += 1;
  };

  const loadMoreArticle = async () => {
    if (currentState === 'explore') {
      getExploreRss();
    } else {
      getFeedRss();
    }
    missionEvent(5, 2);
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
      // await setToggleFooter(false);
      await getExploreRss();
      await getTags();
    })();
  }, []);

  return (
    <div className="rwd rssPage">
      <div className="leftNav">
        <NavBlock />
        <CatBlock />
      </div>
      <div className="mainInfo">
        <button onClick={switchToExplore}>探索</button>
        <button onClick={switchToFeed}>與你相關</button>
        {rssData.map((article) => {
          return <ArticleBlock key={uuidv4()} article={article} type={REACT_APP_DATATYPE_ID_RSS} />;
        })}
        <button className="moreBtn" onClick={loadMoreArticle}>
          載入更多文章
        </button>
      </div>
      <div className="RightNav"></div>
    </div>
  );
};

export default Rss;
