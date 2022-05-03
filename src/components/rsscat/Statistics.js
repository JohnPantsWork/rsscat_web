import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LikedTag from './LikedTag';
import { v4 as uuidv4 } from 'uuid';

import { API_HOST } from '../../assets/constants';

const Statistics = ({ tags }) => {
  const [catClicked, setCatClicked] = useState(0);
  const [likedCounts, setLikedCounts] = useState(0);
  const [linkCounts, setLinkCounts] = useState(0);
  const [missionCompleted, setMissionCompleted] = useState(0);
  const [signupDate, setSignupDate] = useState('');
  const [username, setusername] = useState('');
  const [tagRecord, setTagRecord] = useState([]);

  const getStatisics = async () => {
    const statisicsResult = await axios({
      withCredentials: true,
      method: 'GET',
      url: API_HOST + `/api/1.0/user`,
    });
    const stat = statisicsResult.data.data;
    setCatClicked(stat.cat_clicked);
    setLikedCounts(stat.liked_counts);
    setLinkCounts(stat.link_counts);
    setMissionCompleted(stat.mission_completed);
    setSignupDate(stat.signup_date);
    setusername(stat.username);
  };

  const getTagRecord = async () => {
    const tagsResult = await axios({
      withCredentials: true,
      method: 'GET',
      url: API_HOST + `/api/1.0/tag/record`,
    });
    const tags = tagsResult.data.data;
    setTagRecord(tags);
  };

  useEffect(() => {
    getStatisics();
    getTagRecord();
  }, []);

  return (
    <div className="statistics">
      <div className="top">
        <section className="head">
          <h1>統計</h1>
        </section>
      </div>
      <div className="bottom">
        <div className="statisticsBottomLeft">
          <p>使用者名稱：{username}</p>
          <p>註冊日期：{signupDate}</p>
          <p>喜歡次數：{likedCounts}</p>
          <p>文章點擊數：{linkCounts}</p>
          <p>點貓咪次數：{catClicked}</p>
          <p>任務完成數：{missionCompleted}</p>
        </div>
        <div className="statisticsBottomRight">
          <h2>標籤統計</h2>
          <section className="tagController">
            {tagRecord.map((tag) => {
              if (!tags.includes(tag.tag_name)) {
                return;
              }
              return <LikedTag key={uuidv4()} tagId={tag.tag_id} tagName={tag.tag_name} />;
            })}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
