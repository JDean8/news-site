import axios from "axios";

const usersAPI = axios.create({
  baseURL: "https://news-api-vzif.onrender.com/api/users",
});

export const getAllUsers = () => {
  return usersAPI.get("/").then((response) => {
    return response.data.users;
  });
};

export const getUser = (username) => {
  return usersAPI.get(`/${username}`).then((response) => {
    return response.data.user;
  });
};
