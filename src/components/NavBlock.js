import React from 'react';

import rssIcon from '../assets/images/rss.png';
import domainIcon from '../assets/images/www.png';
import newsIcon from '../assets/images/news.png';
import tagsIcon from '../assets/images/tags.png';
import catIcon from '../assets/images/cat.png';

const NavBlock = () => {
  return (
    <div className="navigationBlock">
      <nav>
        <ul>
          <li>
            <img src={rssIcon} alt="article" />
            <a href="/rss">RSS文章</a>
          </li>
          <li>
            <img src={domainIcon} alt="domain" />
            <a href="/manager">RSS來源</a>
          </li>
          <li>
            <img src={newsIcon} alt="news" />
            <a href="news">最近新聞</a>
          </li>
          <li>
            <img src={tagsIcon} alt="tags" />
            <a href="tags">標籤管理</a>
          </li>
          <li>
            <img src={catIcon} alt="cat" />
            <a href="cat">貓咪商店</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBlock;
