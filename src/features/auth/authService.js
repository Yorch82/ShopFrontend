import axios from 'axios';
import env from "react-dotenv";

const register = async userData => {
  const res = await axios.post(env.REACT_APP_API_URL + '/users', userData);
  return res.data;
};

const login = async userData => {
  const res = await axios.post(env.REACT_APP_API_URL + '/users/login', userData);

  if (res.data) {
    localStorage.setItem('user', JSON.stringify(res.data));
  }

  return res.data;
};

const logout = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const res = await axios.delete(env.REACT_APP_API_URL + '/users/logout', {
    headers: {
      authorization: user?.token,
    },
  });
  if (res.data) {
    localStorage.removeItem('user');
  }
  return res.data;
};

const updateUser = async (userData) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const res = await axios.put(env.REACT_APP_API_URL + '/users/', userData, {
    headers: {
      authorization: user?.token,
      'Content-Type': 'multipart/form-data'
    },
  });
  if (res.data) {
    return res.data;
  }
  return res.data;
};

const getUserInfo = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const res = await axios.get(env.REACT_APP_API_URL + '/users/info', {
    headers: {
      authorization: user?.token,
    },
  })
  return res.data;
};

const authService = {
  register,
  login,
  logout,
  getUserInfo,
  updateUser
};

export default authService;
