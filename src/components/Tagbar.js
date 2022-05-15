import React from 'react';

const Tagbar = ({ tagId, tagName, counts, clickEvent, liked }) => {
    return (
        <div className="tagbar">
            <div className="tagInfo">
                {liked ? (
                    <button
                        onClick={() => {
                            clickEvent(tagId);
                        }}
                    >
                        {tagName}
                    </button>
                ) : (
                    <button
                        className="tagbarUnactive"
                        onClick={() => {
                            clickEvent(tagId);
                        }}
                    >
                        {tagName}
                    </button>
                )}

                {/* <p className="tagCounts">
                    <span>喜好程度.</span>
                    {counts}
                </p> */}
            </div>
        </div>
    );
};

export default Tagbar;
