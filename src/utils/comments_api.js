import axios from "axios";

const commentsAPI = axios.create({
  baseURL: "https://news-api-vzif.onrender.com/api/comments",
});

export const deleteComment = (comment_id) => {
  return commentsAPI.delete(`/${comment_id}`).then((res) => {
    return res;
  });
};
