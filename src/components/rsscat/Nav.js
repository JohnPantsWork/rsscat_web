import React from 'react';

import icon from '../../assets/images/icon.jpg';

const Nav = ({ setContent }) => {
  const signout = (name) => {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location.href = '/sign';
  };
  return (
    <nav className="nav">
      <section className="iconArea">
        <img src={icon} alt={'icon'} />
        <h2>RSSCAT</h2>
      </section>
      <section className="navArea">
        <ul>
          <li>
            <button
              onClick={() => {
                setContent('feedmeow');
              }}
            >
              餵喵
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setContent('rssmanager');
              }}
            >
              來源
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setContent('news');
              }}
            >
              新聞
            </button>
          </li>
          {/* <li>
            <button
              onClick={() => {
                setContent('hots');
              }}
            >
              熱門
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setContent('statistics');
              }}
            >
              統計
            </button>
          </li> */}
        </ul>
      </section>
      <section className="userArea">
        {/* <button
          className="settingBtn"
          onClick={() => {
            setContent('settings');
          }}
        >
          設定
        </button> */}
        <button
          className="signoutBtn"
          onClick={() => {
            signout('connect.sid');
          }}
        >
          登出
        </button>
      </section>
    </nav>
  );
};

export default Nav;
