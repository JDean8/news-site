import axios from "axios";

const topicsAPI = axios.create({
  baseURL: "https://news-api-vzif.onrender.com/api/topics",
});

export const getTopics = () => {
  return topicsAPI.get("/").then((response) => {
    return response.data.topics;
  });
};
