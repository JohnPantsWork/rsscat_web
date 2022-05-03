import React, { useContext } from 'react';
import axios from 'axios';
import noPic from '../../assets/images/noPic.png';
import { API_HOST } from '../../assets/constants';
import { missionContext } from '../../pages/Rsscat';

const DATATYPE_ID_RSS = 1;

const Rsscard = ({ card, setLikedTags, setDislikedTags }) => {
  const { missionEvent } = useContext(missionContext);

  const like = async () => {
    const cardTags = [card.tag_id_1, card.tag_id_2, card.tag_id_3];
    const result = await axios({
      withCredentials: true,
      method: 'POST',
      url: API_HOST + `/api/1.0/tag`,
      data: { method: 'add', likeTags: cardTags, dislikeTags: [] },
    });
    setLikedTags(result.data.data.likeTags);
    await axios({
      withCredentials: true,
      method: 'POST',
      url: API_HOST + `/api/1.0/tag/record`,
      data: { tag_id_arr: [card.tag_id_1, card.tag_id_2, card.tag_id_3], data_id: card.id, datatype_id: DATATYPE_ID_RSS },
    });
  };

  // const dislike = async () => {
  //   const cardTags = [card.tag_id_1, card.tag_id_2, card.tag_id_3];
  //   const result = await axios({
  //     withCredentials: true,
  //     method: 'POST',
  //     url: API_HOST + `/api/1.0/tag`,
  //     data: { method: 'add', likeTags: [], dislikeTags: cardTags },
  //   });
  //   setDislikedTags(result.data.data.dislikeTags);
  // };

  const linkToRss = () => {
    window.open(card.url, '_blank');
  };
  return (
    <div className="rsscard">
      <div className="operator">
        <img
          className="picture"
          src={card.picture ? card.picture : noPic}
          alt="empty"
          onClick={() => {
            linkToRss();
            missionEvent(1, 1);
          }}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = noPic;
          }}
        />
        <button
          onClick={() => {
            like();
            missionEvent(3, 1);
          }}
        >
          喜歡
        </button>
        {/* <button onClick={dislike}>不喜歡</button> */}
      </div>
      <div className="details">
        <h4
          className="title"
          onClick={() => {
            linkToRss();
            missionEvent(1, 1);
          }}
        >
          {card.title}
        </h4>
        <p className="auther">{card.auther}</p>
        <p
          className="des"
          onClick={() => {
            linkToRss();
            missionEvent(1, 1);
          }}
        >
          {card.des}
        </p>
      </div>
    </div>
  );
};

export default Rsscard;
