import React from 'react';
import showcase02png from '../../assets/images/showcase02.png';
import showcase03png from '../../assets/images/showcase03.png';

const Showcase = () => {
  return (
    <div className="showcase">
      <div className="showcase01">
        <h1>Feed your information hunger within one website</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi iste vel iure veritatis saepe est optio voluptates dicta laborum? Dolorum.
        </p>
        <a href="/sign">開始免費使用</a>
      </div>
      <div className="showcase02">
        <img src={showcase02png} alt="about feed moew page." />
        <ul>
          <li>
            <h3>探索百間以上RSS訂閱網站</h3>
          </li>
          <li>
            <h3>可自行管理RSS訂閱來源</h3>
          </li>
        </ul>
      </div>
      <div className="showcase03">
        <ul>
          <li>
            <h3>將閱讀力轉換為貓咪罐頭</h3>
          </li>
          <li>
            <h3>成長你的個人貓咪</h3>
          </li>
        </ul>
        <img src={showcase03png} alt="about reading can feed the cat." />
      </div>
    </div>
  );
};

export default Showcase;
