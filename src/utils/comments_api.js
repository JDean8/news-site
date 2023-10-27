import axios from "axios";

const commentsAPI = axios.create({
  baseURL: "https://news-api-vzif.onrender.com/api/comments",
});

export const deleteComment = (comment_id) => {
  return commentsAPI.delete(`/${comment_id}`).then((res) => {
    return res;
  });
};

export const likeComment = (comment_id, increment) => {
  return commentsAPI.patch(`/${comment_id}`, { inc_votes: increment });
};
