import axios from 'axios';

export const getUsers = (search, page, perPage) =>
  axios.get(`https://api.github.com/search/users?q=${search}&page=${page}&per_page=${perPage}`);
