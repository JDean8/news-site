import axios from "axios";

const topicsAPI = axios.create({
  baseURL: "https://news-api-vzif.onrender.com/api/topics",
});

export const getTopics = () => {
  return topicsAPI.get("/").then((response) => {
    console.log(response.data.topics);
    return response.data.topics;
  });
};
