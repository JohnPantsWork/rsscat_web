import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import LikedTag from './LikedTag';
import { v4 as uuidv4 } from 'uuid';

const { REACT_APP_HOST } = process.env;

const TagManager = () => {
  // const [catClicked, setCatClicked] = useState(0);
  const [likedCounts, setLikedCounts] = useState(0);
  // const [linkCounts, setLinkCounts] = useState(0);
  const [missionCompleted, setMissionCompleted] = useState(0);
  const [signupDate, setSignupDate] = useState('');
  const [username, setusername] = useState('');
  const [tagRecord, setTagRecord] = useState([]);
  const [tagCount, setTagCount] = useState(0);
  const [tags, setTags] = useState([]);

  const getTags = async () => {
    const result = await axios({
      withCredentials: true,
      method: 'GET',
      url: REACT_APP_HOST + `/api/1.0/tag`,
    });
    const realTags = result.data.data.likeTags;
    const tagNames = realTags.map((e) => {
      return e.tag_name;
    });
    console.log(`#tags#`, tags);
    setTags(tagNames);
    console.log(`#tags2#`, tags);
  };

  const getStatisics = async () => {
    const statisicsResult = await axios({
      withCredentials: true,
      method: 'GET',
      url: REACT_APP_HOST + `/api/1.0/user`,
    });
    const stat = statisicsResult.data.data;
    const date = new Date(stat.signup_date);

    // setCatClicked(stat.cat_clicked);
    setLikedCounts(stat.liked_counts);
    // setLinkCounts(stat.link_counts);
    setMissionCompleted(stat.mission_completed);
    setSignupDate(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
    setusername(stat.username);
  };

  const getTagRecord = async () => {
    getTags();
    const tagsResult = await axios({
      withCredentials: true,
      method: 'GET',
      url: REACT_APP_HOST + `/api/1.0/tag/record`,
    });
    const tags = tagsResult.data.data;

    setTagRecord(tags);
    setTagCount(tags.length);
    console.log(`#tags.length#`, tags.length);
  };

  useEffect(() => {
    getStatisics();
    getTagRecord();
  }, [tagCount]);

  useEffect(() => {
    getTags();
  }, []);

  return (
    <div className="tagManager block">
      <div className="top">
        <section className="head">
          <h1>統計</h1>
        </section>
        <div className="statisticsTopRight">
          <p>
            使用者名稱：
            <br />
            {username}
          </p>
          <p>
            註冊日期：
            <br />
            {signupDate}
          </p>
          <p>
            喜歡文章次數：
            <br />
            {likedCounts}
          </p>
          {/* <p>文章點擊數：<br/>{linkCounts}</p> */}
          {/* <p>點貓咪次數：<br/>{catClicked}</p> */}
          <p>
            任務完成數：
            <br />
            {missionCompleted}
          </p>
        </div>
      </div>
      <div className="bottom">
        <div className="statisticsBottomLeft">
          <h2>標籤統計</h2>
          <section className="tagController">
            {tagRecord.map((tag) => {
              if (!tags.includes(tag.tag_name)) {
                return;
              }
              return (
                <LikedTag
                  key={uuidv4()}
                  type="remove"
                  tagId={tag.tag_id}
                  tagName={tag.tag_name}
                  counts={tag['COUNT(*)']}
                  tagCount={tagCount}
                  setTagCount={setTagCount}
                />
              );
            })}
          </section>
        </div>
        <div className="statisticsBottomRight">
          <h2>取消追蹤的標籤</h2>
          <section className="tagController">
            {tagRecord.map((tag) => {
              if (tags.includes(tag.tag_name)) {
                return;
              }
              return (
                <LikedTag
                  key={uuidv4()}
                  type="add"
                  tagId={tag.tag_id}
                  tagName={tag.tag_name}
                  counts={tag['COUNT(*)']}
                  tagCount={tagCount}
                  setTagCount={setTagCount}
                />
              );
            })}
          </section>
        </div>
      </div>
    </div>
  );
};

export default TagManager;
