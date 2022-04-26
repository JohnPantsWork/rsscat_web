import axios from 'axios';
import { API_HOST } from '../../assets/constants';

const LikedTags = ({ type, tagId, tagName, setLikedTags }) => {
  const deleteTag = async () => {
    if (type === 'rss') {
      const result = await axios({
        withCredentials: true,
        method: 'POST',
        url: API_HOST + `/api/1.0/tag`,
        data: { method: 'remove', likeTags: [tagId], dislikeTags: [] },
      });
      let tags = result.data.data.likeTags;
      if (tags === undefined) {
        tags = [];
      }
      setLikedTags(tags);
    } else if (type === 'news') {
      const result = await axios({
        withCredentials: true,
        method: 'POST',
        url: API_HOST + `/api/1.0/tag`,
        data: { method: 'remove', likeTags: [tagId], dislikeTags: [] },
      });
      let tags = result.data.data.likeTags;
      if (tags === undefined) {
        tags = [];
      }
      setLikedTags(tags);
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
