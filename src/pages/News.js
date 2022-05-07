import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import NavBlock from '../components/NavBlock';
import ArticleBlock from '../components/ArticleBlock';
import CatBlock from '../components/CatBlock';

const { REACT_APP_HOST } = process.env;
let explorepage = 0;

const News = () => {
  const [newsCards, setNewsCard] = useState([]);
  const [newsData, setNewsData] = useState([]);

  const getExploreNews = async () => {
    setNewsCard([]);
    let result;
    result = await axios({
      withCredentials: true,
      url: REACT_APP_HOST + `/api/1.0/news?paging=${explorepage}`,
      method: 'GET',
    });
    if (result.data.data.length === 0) {
      explorepage = 0;
      result = await axios({
        withCredentials: true,
        url: REACT_APP_HOST + `/api/1.0/news?paging=${explorepage}`,
        method: 'GET',
      });
    }
    setNewsData(result.data.data);
    console.log(`#result.data.data#`, result.data.data);
    explorepage += 1;
    // missionEvent(6, 2);
  };

  useEffect(() => {
    getExploreNews();
  }, []);

  return (
    <div className="news rwd">
      <div className="leftNav">
        <NavBlock />
        <CatBlock />
      </div>
      <div className="mainInfo">
        {newsData.map((article) => {
          return (
            <ArticleBlock
              key={uuidv4()}
              picture={article.picture}
              url={article.url}
              title={article.title}
              auther={article.auther}
              source={article.source}
              desc={article.des}
              tag1={article.tag1}
              tag2={article.tag2}
              tag3={article.tag3}
            />
          );
        })}
      </div>
      <div className="RightNav"></div>
    </div>
  );
};

export default News;
