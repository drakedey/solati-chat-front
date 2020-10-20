import axios from 'axios';

const baseUrl = 'http://localhost:5000/api/v1/users';

export const getUserByUsername = async (username) => {
  try {
    const { data } = await axios.get(`${baseUrl}/${username}`);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const doLogin = async (username, password) => {
  try {
    const { data } = await axios.get(`${baseUrl}`, { headers: { username, password } });
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export const doRegister = async payload => {
  try {
    const { data } = await axios.post(`${baseUrl}`, payload);
    return data;
  } catch (err) {
    console.error(err)
    throw err;
  }
}
