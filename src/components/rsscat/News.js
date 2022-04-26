import React, { useState, useEffect } from 'react';
import Newscard from './Newscard';
import LikedTag from './LikedTag';
import DislikeTag from './DislikeTag';
import axios from 'axios';
import { API_HOST } from '../../assets/constants';
import { v4 as uuidv4 } from 'uuid';

import icon from '../../assets/images/PlayfulCat.gif';
let explorepage = 0;
let feedpage = 0;

const News = () => {
  const [newsCards, setNewsCard] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [likedTags, setLikedTags] = useState([]);
  const [dislikedTags, setDislikedTags] = useState([]);

  const getTags = async () => {
    const result = await axios({
      withCredentials: true,
      method: 'GET',
      url: API_HOST + `/api/1.0/tag`,
    });
    return result.data.data;
  };

  const init = async () => {
    const tagData = await getTags();
    const liketags = tagData.likeTags;
    const disliketags = tagData.dislikeTags;

    if (liketags === null || liketags === undefined) {
      setLikedTags([]);
    } else {
      setLikedTags(liketags);
    }
    if (disliketags === null || disliketags === undefined) {
      setDislikedTags([]);
    } else {
      setDislikedTags(disliketags);
    }
  };

  const getExploreNews = async () => {
    setNewsCard([]);
    let result;
    result = await axios({
      withCredentials: true,
      url: API_HOST + `/api/1.0/news?paging=${explorepage}`,
      method: 'GET',
    });
    if (result.data.data.length === 0) {
      explorepage = 0;
      result = await axios({
        withCredentials: true,
        url: API_HOST + `/api/1.0/news?paging=${explorepage}`,
        method: 'GET',
      });
    }
    setNewsData(result.data.data);
    explorepage += 1;
  };

  const getFeedNews = async () => {
    setNewsCard([]);
    let result;
    result = await axios({
      withCredentials: true,
      url: API_HOST + `/api/1.0/news/user?paging=${feedpage}`,
      method: 'GET',
      data: { tags: likedTags },
    });
    if (result.data.data.length === 0) {
      feedpage = 0;
      result = await axios({
        withCredentials: true,
        url: API_HOST + `/api/1.0/news/user?paging=${feedpage}`,
        method: 'GET',
      });
    }
    setNewsData(result.data.data);
    feedpage += 1;
  };

  const resetExplore = () => {
    explorepage = 0;
    feedpage = 0;
    getExploreNews();
  };

  useEffect(() => {
    init();
    getExploreNews();
  }, []);

  useEffect(() => {
    const cards = newsCards.concat(newsData);
    setNewsCard(cards);
  }, [newsData]);
  return (
    <div className="news">
      <div className="top">
        <section className="head">
          <h1>頭條新聞</h1>
        </section>
        <section className="control">
          <button onClick={getFeedNews}>你的新聞</button>
          <button onClick={getExploreNews}>探索新聞</button>
          <button className="resetExplore" onClick={resetExplore}>
            刷新
          </button>
        </section>
      </div>
      <div className="bottom">
        <section className="newscards">
          {newsCards.map((card) => {
            return <Newscard key={uuidv4()} card={card} setLikedTags={setLikedTags} setDislikedTags={setDislikedTags} />;
          })}
        </section>
        <section className="newstags">
          <h4>Liked</h4>
          <div className="likedtags">
            {likedTags.map((tag) => {
              return <LikedTag key={uuidv4()} type={'news'} tagId={tag.id} tagName={tag.tag_name} setLikedTags={setLikedTags} />;
            })}
          </div>
          <h4>Disliked</h4>
          <div className="dislikedtags">
            {dislikedTags.map((tag) => {
              return <DislikeTag key={uuidv4()} type={'news'} tagId={tag.id} tagName={tag.tag_name} setDislikedTags={setDislikedTags} />;
            })}
          </div>
          <img className="feedCat" src={icon} alt={'icon'} />
        </section>
      </div>
    </div>
  );
};

export default News;
