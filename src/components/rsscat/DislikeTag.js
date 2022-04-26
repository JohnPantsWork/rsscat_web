import axios from 'axios';
import { API_HOST } from '../../assets/constants';

const DislikeTag = ({ tagId, tagName, setDislikedTags }) => {
  const deleteTag = async () => {
    const result = await axios({
      withCredentials: true,
      method: 'POST',
      url: API_HOST + `/api/1.0/tag`,
      data: { method: 'remove', likeTags: [], dislikeTags: [tagId] },
    });
    let tags = result.data.data.dislikeTags;
    if (tags === undefined) {
      tags = [];
    }
    console.log(`#--------------------[tags]#\n`, tags);
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
