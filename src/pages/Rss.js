import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import CatBlock from '../components/CatBlock';
import ArticleBlock from '../components/ArticleBlock';
import TagManager from '../components/TagManager';
import DomainManager from '../components/DomainManager';
import NavBlock from '../components/NavBlock';
import { userData } from '../App';

const { REACT_APP_HOST, REACT_APP_DATATYPE_ID_RSS, REACT_APP_DATATYPE_ID_NEWS } = process.env;

export const missionContext = createContext(null);

let explorepage = 0;

const Rss = ({ setToggleFooter }) => {
  // const [rssCards, setRssCard] = useState([]);
  const [rssData, setRssData] = useState([]);
  const [tagRecord, setTagRecord] = useState([]);
  const [tags, setTags] = useState([]);
  // const [] = setState([]);

  const getExploreRss = async () => {
    // setRssCard([]);
    let result;
    result = await axios({
      withCredentials: true,
      url: REACT_APP_HOST + `/api/1.0/rss?paging=${explorepage}`,
      method: 'GET',
    });
    if (result.data.data.length === 0) {
      explorepage = 0;
      result = await axios({
        withCredentials: true,
        url: REACT_APP_HOST + `/api/1.0/rss?paging=${explorepage}`,
        method: 'GET',
      });
    }
    setRssData(result.data.data);
    explorepage += 1;
    // missionEvent(5, 2);
  };

  // const getTags = async () => {
  //   const result = await axios({
  //     withCredentials: true,
  //     method: 'GET',
  //     url: REACT_APP_HOST + `/api/1.0/tag`,
  //   });
  //   const realTags = result.data.data.likeTags;
  //   const tagNames = realTags.map((e) => {
  //     return e.tag_name;
  //   });
  //   setTags(tagNames);
  // };

  const getTagRecord = async () => {
    // await getTags();
    setTags(userData.tags);
    const tagsResult = await axios({
      withCredentials: true,
      method: 'GET',
      url: REACT_APP_HOST + `/api/1.0/tag/record`,
    });
    const tags = tagsResult.data.data;

    await setTagRecord(tags);
  };

  useEffect(() => {
    (async () => {
      await setToggleFooter(false);
      await getExploreRss();
      await getTagRecord();
    })();
  }, []);

  return (
    <div className="rwd rssPage">
      <div className="leftNav">
        <NavBlock />
        <CatBlock />
      </div>
      <div className="mainInfo">
        {rssData.map((article) => {
          return <ArticleBlock key={uuidv4()} article={article} type={REACT_APP_DATATYPE_ID_RSS} />;
        })}
      </div>
      <div className="RightNav"></div>
    </div>
  );
};

export default Rss;
