import React from 'react';
import axios from 'axios';
import noPic from '../../assets/images/noPic.png';
import { API_HOST } from '../../assets/constants';

const Rsscard = ({ card, setLikedTags, setDislikedTags }) => {
  const postTags = async () => {
    const result = await axios({
      withCredentials: true,
      method: 'POST',
      url: API_HOST + `/api/1.0/tag`,
    });
    return result.data.data;
  };

  const like = async () => {
    const cardTags = [card.tag_id_1, card.tag_id_2, card.tag_id_3];
    const result = await axios({
      withCredentials: true,
      method: 'POST',
      url: API_HOST + `/api/1.0/tag`,
      data: { method: 'add', likeTags: cardTags, dislikeTags: [] },
    });
    setLikedTags(result.data.data.likeTags);
  };

  const dislike = async () => {
    const cardTags = [card.tag_id_1, card.tag_id_2, card.tag_id_3];
    const result = await axios({
      withCredentials: true,
      method: 'POST',
      url: API_HOST + `/api/1.0/tag`,
      data: { method: 'add', likeTags: [], dislikeTags: cardTags },
    });
    setDislikedTags(result.data.data.dislikeTags);
  };

  const linkToRss = () => {
    window.open(card.url, '_blank');
  };
  return (
    <div className="rsscard">
      <div className="operator">
        <img className="picture" src={card.picture ? card.picture : noPic} alt="empty" onClick={linkToRss} />
        <button onClick={like}>喜歡</button>
        <button onClick={dislike}>不喜歡</button>
      </div>
      <div className="details">
        <h4 className="title" onClick={linkToRss}>
          {card.title}
        </h4>
        <p className="auther">{card.auther}</p>
        <p className="des" onClick={linkToRss}>
          {card.des}
        </p>
      </div>
    </div>
  );
};

export default Rsscard;
