import React, { useState, useEffect, useContext } from 'react';
import Rsscard from './Rsscard';
import LikedTag from './LikedTag';
// import DislikeTag from './DislikeTag';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { missionContext } from '../../pages/Rsscat';
const { REACT_APP_HOST } = process.env;

let explorepage = 0;
let feedpage = 0;

const Feedmeow = () => {
  const [rssCards, setRssCard] = useState([]);
  const [rssData, setRssData] = useState([]);
  const [likedTags, setLikedTags] = useState([]);
  // const [dislikedTags, setDislikedTags] = useState([]);
  const { missionEvent } = useContext(missionContext);

  // const getTags = async () => {
  //   const result = await axios({
  //     withCredentials: true,
  //     method: 'GET',
  //     url: REACT_APP_HOST + `/api/1.0/user/tag`,
  //   });
  //   return result.data.data;
  // };

  // const init = async () => {
  //   const tagData = await getTags();
  //   const liketags = tagData.likeTags;
  // const disliketags = tagData.dislikeTags;

  // if (liketags === null || liketags === undefined) {
  //   setLikedTags([]);
  // } else {
  //   setLikedTags(liketags);
  // }
  // if (disliketags === null || disliketags === undefined) {
  //   setDislikedTags([]);
  // } else {
  //   setDislikedTags(disliketags);
  // }
  // };

  const getExploreRss = async () => {
    setRssCard([]);
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
    missionEvent(5, 2);
  };

  const getFeedRss = async () => {
    setRssCard([]);
    let result = await axios({
      withCredentials: true,
      url: REACT_APP_HOST + `/api/1.0/rss/user?paging=${feedpage}`,
      method: 'GET',
      data: { tags: likedTags },
    });
    if (result.data.data.length === 0) {
      feedpage = 0;
      result = await axios({
        withCredentials: true,
        url: REACT_APP_HOST + `/api/1.0/rss/user?paging=${feedpage}`,
        method: 'GET',
      });
    }
    setRssData(result.data.data);
    feedpage += 1;
  };

  const resetExplore = () => {
    explorepage = 0;
    feedpage = 0;
    getExploreRss();
  };

  useEffect(() => {
    // init();
    getExploreRss();
  }, []);

  useEffect(() => {
    const cards = rssCards.concat(rssData);
    setRssCard(cards);
  }, [rssData]);

  return (
    <div className="feedmeow">
      <div className="top">
        <section className="head">
          <h1>RSS文章</h1>
        </section>
        <section className="control">
          <button onClick={getFeedRss}>你的飼料</button>
          <button onClick={getExploreRss}>探索飼料</button>
          <button className="resetExplore" onClick={resetExplore}>
            刷新
          </button>
        </section>
      </div>
      <div className="bottom">
        <section className="rsscards">
          {rssCards.map((card) => {
            return <Rsscard key={uuidv4()} card={card} /*setLikedTags={setLikedTags} setDislikedTags={setDislikedTags}*/ />;
          })}
        </section>
        <section className="rsstags">
          {/* <h4>Liked</h4> */}
          <div className="likedtags">
            {/* {likedTags.map((tag) => {
              return <LikedTag key={uuidv4()} type={'rss'} tagId={tag.id} tagName={tag.tag_name} setLikedTags={setLikedTags} />;
            })} */}
          </div>
          {/* <h4>Disliked</h4>
          <div className="dislikedtags">
            {dislikedTags.map((tag) => {
              return <DislikeTag key={uuidv4()} type={'rss'} tagId={tag.id} tagName={tag.tag_name} setDislikedTags={setDislikedTags} />;
            })}
          </div> */}
        </section>
      </div>
    </div>
  );
};

export default Feedmeow;
