import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tagbar from './Tagbar';
import { v4 as uuidv4 } from 'uuid';

const { REACT_APP_HOST } = process.env;

const TagManager = ({ toastEvent }) => {
  const [tagCounts, setTagCounts] = useState(0);
  const [likedTags, setLikedTags] = useState([]);
  const [dislikedTags, setDislikedTags] = useState([]);

  const [record, setRecord] = useState([]);
  const [recordDict, setRecordDict] = useState({});

  const getTags = async () => {
    const result = await axios({
      withCredentials: true,
      method: 'GET',
      url: REACT_APP_HOST + `/api/1.0/user/tag`,
    });

    setLikedTags(result.data.data.likeTags);
    setTagCounts(result.data.data.likeTags.length);
    setDislikedTags(result.data.data.dislikeTags);
  };

  const getRecord = async () => {
    const tagsResult = await axios({
      withCredentials: true,
      method: 'GET',
      url: REACT_APP_HOST + `/api/1.0/record`,
    });
    let tags = tagsResult.data.data;
    setRecord(tags);
    let recordDict = tags.reduce((acc, curr) => {
      acc[curr.tag_id] = { counts: curr.counts, tag_name: curr.tag_name };
      return acc;
    }, {});
    setRecordDict(recordDict);
  };

  const tagEvent = {
    addTag: async (id) => {
      const result = await axios({
        withCredentials: true,
        method: 'PATCH',
        url: REACT_APP_HOST + `/api/1.0/user/tag`,
        data: { likedTags: [id] },
      });
      renderTags(result.data.data.likeTags);
    },
    removeTag: async (id) => {
      const result = await axios({
        withCredentials: true,
        method: 'DELETE',
        url: REACT_APP_HOST + `/api/1.0/user/tag`,
        data: { dislikedTags: [id] },
      });
      renderTags(result.data.data.likeTags);
    },
    removeNoneAssociate: async () => {
      const result = await axios({
        withCredentials: true,
        method: 'DELETE',
        url: REACT_APP_HOST + `/api/1.0/user/tag?associate=0`,
      });

      renderTags(result.data.data.likeTags);
      toastEvent.t01();
    },
    // set state for re-render
  };

  const renderTags = (likedTags) => {
    likedTags = likedTags.map((tag) => {
      console.log(`#tag#`, tag);
      tag['tag_id'] = tag.id;
      tag['counts'] = recordDict[tag.id] !== undefined ? recordDict[tag.id].counts : 0;
      return tag;
    });
    console.log(`#likedTags#`, likedTags);
    setLikedTags(likedTags);

    const likedArray = arrayObjValue(likedTags);
    const dislikedTags = record.filter((tag) => {
      console.log(`#filter tag#`, tag);
      tag['id'] = tag.tag_id;
      return likedArray.indexOf(tag.tag_id) === -1;
    });
    console.log(`#dislikedTags#`, dislikedTags);
    setDislikedTags(dislikedTags);
  };

  useEffect(() => {
    getTags();
    getRecord();
  }, []);

  return (
    <div className="tagManager block">
      <h2>標籤統計</h2>
      <button className="buttonInside" onClick={tagEvent.removeNoneAssociate}>
        移除無關聯度的內容
      </button>
      <p>啟用中的Tags : {tagCounts}/100</p>
      <hr />
      {/* <div className="tagbarTitle">
        <p>名稱</p>
        <p>關聯度</p>
        <p>調整</p>
      </div> */}

      <section className="tagController">
        <h4>你喜歡的標籤</h4>
        <div className="tagControllerLikedTags">
          {likedTags
            .map((tag) => {
              return (
                <Tagbar
                  key={uuidv4()}
                  tagId={tag.id}
                  tagName={tag.tag_name}
                  counts={recordDict[tag.id] ? recordDict[tag.id].counts : 0}
                  clickEvent={tagEvent.removeTag}
                  liked={true}
                />
              );
            })
            .sort(compare)}
        </div>

        <br />
        <h4>可能喜歡的標籤</h4>
        <div className="tagControllerDisikedTags">
          {dislikedTags.map((tag) => {
            return (
              <Tagbar
                key={uuidv4()}
                tagId={tag.id}
                tagName={tag.tag_name}
                counts={recordDict[tag.id] ? recordDict[tag.id].counts : 0}
                clickEvent={tagEvent.addTag}
                liked={false}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
};

const arrayObjValue = (array) => {
  const result = array.map((e) => {
    const value = Object.values(e)[0];
    return value;
  });
  return result;
};

function compare(a, b) {
  console.log(`#a#`, a);
  if (a.props.counts < b.props.counts) {
    return 1;
  }
  if (a.props.counts > b.props.counts) {
    return -1;
  }
  return 0;
}

export default TagManager;
