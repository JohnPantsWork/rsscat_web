import React from 'react';
import icon from '../../assets/images/icon.jpg';

const Header = () => {
  return (
    <div className="header">
      <img className="icon" src={icon} alt="The Best Information Source" />
      <h1>RSSCAT</h1>
      <nav>
        <ul>
          <li className="signin">
            <a href="/sign">登入</a>
          </li>
          <li className="signup">
            <a href="/sign">免費註冊</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
