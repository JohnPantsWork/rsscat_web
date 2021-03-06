import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tagbar from './Tagbar';
import { v4 as uuidv4 } from 'uuid';

const { REACT_APP_HOST } = process.env;

const TagManager = ({ toastEvent, loginState }) => {
    const [likedTags, setLikedTags] = useState([]);
    const [dislikedTags, setDislikedTags] = useState([]);

    const [record, setRecord] = useState([]);
    const [recordDict, setRecordDict] = useState({});

    const getTags = async () => {
        const result = await axios({
            withCredentials: true,
            method: 'GET',
            url: REACT_APP_HOST + `/api/1.0/user/tag`,
        });

        setLikedTags(result.data.data.likeTags);
        setDislikedTags(result.data.data.dislikeTags);
    };

    const getRecord = async () => {
        const tagsResult = await axios({
            withCredentials: true,
            method: 'GET',
            url: REACT_APP_HOST + `/api/1.0/record`,
        });
        let tags = tagsResult.data.data;
        setRecord(tags);
        let recordDict = tags.reduce((acc, curr) => {
            acc[curr.tag_id] = { counts: curr.counts, tag_name: curr.tag_name };
            return acc;
        }, {});
        setRecordDict(recordDict);
    };

    const tagEvent = {
        addTag: async (id) => {
            const result = await axios({
                withCredentials: true,
                method: 'PATCH',
                url: REACT_APP_HOST + `/api/1.0/user/tag`,
                data: { likedTags: [id] },
            });
            renderTags(result.data.data.likeTags);
        },
        removeTag: async (id) => {
            const result = await axios({
                withCredentials: true,
                method: 'PATCH',
                url: REACT_APP_HOST + `/api/1.0/user/tag`,
                data: { dislikedTags: [id] },
            });
            renderTags(result.data.data.likeTags);
        },
        removeNoneAssociate: async (associateLevel = 0) => {
            const result = await axios({
                withCredentials: true,
                method: 'PATCH',
                url: REACT_APP_HOST + `/api/1.0/user/tag?associateLevel=${associateLevel}`,
            });

            renderTags(result.data.data.likeTags);
            toastEvent.t01();
        },
    };

    const renderTags = (likedTags) => {
        likedTags = likedTags.map((tag) => {
            tag['tag_id'] = tag.id;
            tag['counts'] = recordDict[tag.id] !== undefined ? recordDict[tag.id].counts : 0;
            return tag;
        });
        setLikedTags(likedTags);

        const likedArray = arrayObjValue(likedTags);
        const dislikedTags = record.filter((tag) => {
            tag['id'] = tag.tag_id;
            return likedArray.indexOf(tag.tag_id) === -1;
        });
        setDislikedTags(dislikedTags);
    };

    const removeAllUserRecord = async () => {
        await axios({
            withCredentials: true,
            method: 'DELETE',
            url: REACT_APP_HOST + `/api/1.0/record`,
        });
        window.location.href = '/tags';
    };

    useEffect(() => {
        getTags();
        getRecord();
    }, []);

    return (
        <div className="tagManager block">
            <h2>????????????</h2>
            <button
                className="buttonInside"
                onClick={() => {
                    removeAllUserRecord();
                    toastEvent.t13();
                }}
            >
                ??????????????????
            </button>
            <hr />
            {loginState ? (
                <section className="tagController">
                    <h4>?????????????????????</h4>
                    <div className="tagControllerLikedTags">
                        {likedTags.length > 0 ? (
                            likedTags
                                .map((tag) => {
                                    return (
                                        <Tagbar
                                            key={uuidv4()}
                                            tagId={tag.id}
                                            tagName={tag.tag_name}
                                            counts={
                                                recordDict[tag.id] ? recordDict[tag.id].counts : 0
                                            }
                                            clickEvent={tagEvent.removeTag}
                                            liked={true}
                                        />
                                    );
                                })
                                .sort(compare)
                        ) : (
                            <p>???</p>
                        )}
                    </div>
                    <br />
                    <h4>????????????????????????</h4>
                    <div className="tagControllerDisikedTags">
                        {dislikedTags.length > 0 ? (
                            dislikedTags.map((tag) => {
                                return (
                                    <Tagbar
                                        key={uuidv4()}
                                        tagId={tag.id}
                                        tagName={tag.tag_name}
                                        counts={recordDict[tag.id] ? recordDict[tag.id].counts : 0}
                                        clickEvent={tagEvent.addTag}
                                        liked={false}
                                    />
                                );
                            })
                        ) : (
                            <p>???</p>
                        )}
                    </div>
                </section>
            ) : (
                <p>??????????????????????????????????????????</p>
            )}
        </div>
    );
};

const arrayObjValue = (array) => {
    const result = array.map((e) => {
        const value = Object.values(e)[0];
        return value;
    });
    return result;
};

function compare(a, b) {
    if (a.props.counts < b.props.counts) {
        return 1;
    }
    if (a.props.counts > b.props.counts) {
        return -1;
    }
    return 0;
}

export default TagManager;
