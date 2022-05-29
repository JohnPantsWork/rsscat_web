import React, { useState, useEffect } from 'react';

import rssIcon from '../assets/images/rss.png';
import domainIcon from '../assets/images/www.png';
import newsIcon from '../assets/images/news.png';
import tagsIcon from '../assets/images/tags.png';
import catIcon from '../assets/images/cat.png';

const list = [
    { src: rssIcon, href: '/rss', title: 'RSS文章', alt: 'article' },
    { src: domainIcon, href: '/manager', title: 'RSS來源', alt: 'domain' },
    { src: newsIcon, href: '/news', title: '最近新聞', alt: 'news' },
    { src: tagsIcon, href: '/tags', title: '標籤管理', alt: 'tags' },
    { src: catIcon, href: '/cat', title: '貓咪商店', alt: 'cat' },
];

const NavBlock = () => {
    const [currentLocation, setCurrentLocation] = useState('/');

    useEffect(() => {
        setCurrentLocation(window.location.pathname);
    }, []);
    useEffect(() => {}, [currentLocation]);
    return (
        <div className="navigationBlock">
            <nav>
                <ul>
                    {list.map((li) => {
                        if (currentLocation === li.href) {
                            return (
                                <li className={'selected'}>
                                    <img src={li.src} alt={li.alt} />
                                    <a href={li.href}>{li.title}</a>
                                </li>
                            );
                        }
                        return (
                            <li>
                                <img src={li.src} alt={li.alt} />
                                <a href={li.href}>{li.title}</a>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
};

export default NavBlock;
