import React from 'react';
import axios from 'axios';

import heart from '../assets/images/heart_n.png';
const { REACT_APP_HOST } = process.env;

const ArticleBlock = ({ article, type }) => {
  const like = async () => {
    const cardTags = [article.tag_id_1, article.tag_id_2, article.tag_id_3];

    const result = await axios({
      withCredentials: true,
      method: 'POST',
      url: REACT_APP_HOST + `/api/1.0/tag`,
      data: { method: 'add', likeTags: cardTags, dislikeTags: [] },
    });

    // setLikedTags(result.data.data.likeTags);

    await axios({
      withCredentials: true,
      method: 'POST',
      url: REACT_APP_HOST + `/api/1.0/tag/record`,
      data: { tag_id_arr: [article.tag_id_1, article.tag_id_2, article.tag_id_3], data_id: article.id, datatype_id: type },
    });
  };

  const openNewTab = () => {
    window.open(article.url, '_blank');
  };

  return (
    <div className="articleBlock block">
      {article.picture ? (
        <div className="articleImage">
          <img
            src={article.picture}
            alt="empty"
            onClick={() => {
              openNewTab();
            }}
          />
        </div>
      ) : null}

      <div className="articleMain">
        <div className="articleProv">
          <p className="articleAuther">作者：{article.auther}</p>
          <p className="articleSource">來源：{article.source}</p>
        </div>
        <h4>{article.title}</h4>
        <div className="articleTags">
          <p className="articleTag">#{article.tag1}</p>
          <p className="articleTag">#{article.tag2}</p>
          <p className="articleTag">#{article.tag3}</p>
        </div>

        <p className="articleDesc">{article.des}</p>
        <div className="articleController">
          <button className="articleLikeBtn">
            <img src={heart} alt="heart_n" onClick={like} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleBlock;
