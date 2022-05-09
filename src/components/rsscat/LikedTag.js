import axios from 'axios';
const { REACT_APP_HOST } = process.env;

const LikedTags = ({ type, tagId, tagName, counts, tagCount, setTagCount }) => {
  const onClick = async () => {
    if (type === 'remove') {
      await deleteTag();
      setTagCount(tagCount - 1);
    } else {
      await addTag();
      setTagCount(tagCount + 1);
    }
  };
  const deleteTag = async () => {
    const result = await axios({
      withCredentials: true,
      method: 'DELETE',
      url: REACT_APP_HOST + `/api/1.0/user/tag`,
      data: { likedTags: [tagId] },
    });
    let tags = result.data.data.likeTags;
    if (tags === undefined) {
      tags = [];
    }
  };
  const addTag = async () => {
    const result = await axios({
      withCredentials: true,
      method: 'PATCH',
      url: REACT_APP_HOST + `/api/1.0/user/tag`,
      data: { likedTags: [tagId] },
    });
    let tags = result.data.data.likeTags;
    if (tags === undefined) {
      tags = [];
    }
  };
  return (
    <div className="tag">
      <p>{tagName}</p>
      <p>等級{counts}</p>
      <button onClick={onClick}> 移動 </button>
    </div>
  );
};

export default LikedTags;
