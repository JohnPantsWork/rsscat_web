import axios from 'axios';
import { API_HOST } from '../../assets/constants';

const LikedTags = ({ tagId, tagName }) => {
  const deleteTag = async () => {
    const result = await axios({
      withCredentials: true,
      method: 'POST',
      url: API_HOST + `/api/1.0/tag`,
      data: { method: 'remove', likeTags: [tagId] },
    });
    let tags = result.data.data.likeTags;
    if (tags === undefined) {
      tags = [];
    }
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

export default LikedTags;
