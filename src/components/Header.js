import { useState } from 'react';
import icon from '../assets/images/icon.jpg';
import magnifier from '../assets/images/magnifier.png';

const Header = ({ loginState }) => {
  const searchText = (e) => {
    const input = e.target.value;
    console.log(`#input#`, input);
  };

  const search = () => {};

  const backhome = () => {
    window.location.href = '/';
  };
  return (
    <div className="header">
      <div className="headerBox">
        <div>
          <img className="icon" src={icon} alt="rsscat" onClick={backhome} />
          <h1 onClick={backhome}>RSSCAT</h1>
          {/* <div className="searchBar">
            <input type="text" placeholder="search..." onChange={searchText} />
            <img src={magnifier} alt="magnifier" onClick={search} />
          </div> */}
        </div>
        <nav>
          <ul>
            {loginState ? (
              <li>
                <a href="/sign">登出</a>
              </li>
            ) : (
              <li>
                <a href="/sign">登入</a>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
