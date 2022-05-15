import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { missionContext } from '../App.js';

import heart_n from '../assets/images/heart_n.png';
import heart_y from '../assets/images/heart_y.png';

const { REACT_APP_HOST } = process.env;

const ArticleBlock = ({ toastEvent, article, type, loginState }) => {
    const [showImage, setShowImage] = useState(true);
    const [liked, setLiked] = useState(false);
    const { missionEvent } = useContext(missionContext);

    const like = async () => {
        setLiked(true);
        const cardTags = [article.tag_id_1, article.tag_id_2, article.tag_id_3];

        // redis database.
        const result = await axios({
            withCredentials: true,
            method: 'PATCH',
            url: REACT_APP_HOST + `/api/1.0/user/tag`,
            data: { likedTags: cardTags },
        });

        // mysql database.
        await axios({
            withCredentials: true,
            method: 'POST',
            url: REACT_APP_HOST + `/api/1.0/record`,
            data: {
                tag_id_arr: [article.tag_id_1, article.tag_id_2, article.tag_id_3],
                data_id: article.id,
                datatype_id: type,
            },
        });

        if (type === '1') {
            missionEvent(3, 1);
        } else {
            missionEvent(4, 1);
        }
    };

    const dislike = async (e) => {
        setLiked(false);

        // mysql database.
        await axios({
            withCredentials: true,
            method: 'PATCH',
            url: REACT_APP_HOST + `/api/1.0/record`,
            data: { dataId: article.id, datatypeId: type },
        });
    };

    const openNewTab = () => {
        if (type === 1 || type === '1') {
            missionEvent(1, 1);
        } else {
            missionEvent(2, 1);
        }
        window.open(article.url, '_blank');
    };

    useEffect(() => {
        setLiked(article.liked);
    }, []);

    return (
        <div className="articleBlock block">
            {showImage && article.picture ? (
                <div className="articleImage">
                    <img
                        src={article.picture}
                        alt="empty"
                        onClick={() => {
                            openNewTab();
                        }}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = null;
                            setShowImage(false);
                        }}
                    />
                </div>
            ) : null}

            <div className="articleMain">
                <div className="articleProv">
                    <p className="articleAuther">作者：{article.auther}</p>
                    <p className="articleSource">來源：{article.source}</p>
                </div>
                <h4
                    onClick={() => {
                        openNewTab();
                    }}
                >
                    {article.title}
                </h4>
                <div className="articleTags">
                    <p className="articleTag">#{article.tag1}</p>
                    <p className="articleTag">#{article.tag2}</p>
                    <p className="articleTag">#{article.tag3}</p>
                </div>

                <p
                    className="articleDesc"
                    onClick={() => {
                        openNewTab();
                    }}
                >
                    {article.des}
                </p>
                <div className="articleController">
                    <button className="articleLikeBtn">
                        {liked ? (
                            <img
                                src={heart_y}
                                alt="heart_y"
                                onClick={() => {
                                    loginState ? dislike() : toastEvent.t12();
                                }}
                            />
                        ) : (
                            <img
                                src={heart_n}
                                alt="heart_y"
                                onClick={() => {
                                    loginState ? like() : toastEvent.t12();
                                }}
                            />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ArticleBlock;
