import { useState, useEffect } from 'react';
import axios from 'axios';

const { REACT_APP_HOST } = process.env;

const Statistics = () => {
  const [likedCounts, setLikedCounts] = useState(0);
  const [missionCompleted, setMissionCompleted] = useState(0);
  const [signupDate, setSignupDate] = useState('');
  const [username, setusername] = useState('');

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

  useEffect(() => {
    getStatisics();
  }, []);

  return (
    <div className="statistics block">
      <div>
        <p>使用者名稱：</p>
        <p>{username}</p>
      </div>
      <div>
        <p>註冊日期：</p>
        <p>{signupDate}</p>
      </div>
      <div>
        <p>喜歡文章次數：</p>
        <p>{likedCounts}</p>
      </div>
      <div>
        <p>任務完成數：</p>
        <p>{missionCompleted}</p>
      </div>

      {/* <p>文章點擊數：<br/>{linkCounts}</p> */}
      {/* <p>點貓咪次數：<br/>{catClicked}</p> */}
    </div>
  );
};

export default Statistics;
