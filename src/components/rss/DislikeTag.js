import axios from 'axios';
const { REACT_APP_HOST } = process.env;

const DislikeTag = ({ tagId, tagName, setDislikedTags }) => {
  const deleteTag = async () => {
    const result = await axios({
      withCredentials: true,
      method: 'DELETE',
      url: REACT_APP_HOST + `/api/1.0/user/tag`,
      data: { dislikedTags: [tagId] },
    });
    let tags = result.data.data.dislikeTags;
    if (tags === undefined) {
      tags = [];
    }
    setDislikedTags(tags);
  };
  return (
    <div className="tag">
      <p>
        {tagName}
        <span onClick={deleteTag}>x</span>
      </p>
    </div>
  );
};

export default DislikeTag;