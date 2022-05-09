import React, { useEffect } from 'react';

const Home = ({ setToggleFooter }) => {
  useEffect(() => {
    setToggleFooter(true);
  }, []);

  const sign = () => {
    window.location.href = '/sign';
  };

  return (
    <div className="homePage">
      <div className="showcase show1">
        <h1>RSSCAT</h1>
        <h3>
          Feed Your Information Hunger
          <br /> Within One Website
        </h3>
        <button onClick={sign}>現在免費開始</button>
      </div>
    </div>
  );
};

export default Home;
