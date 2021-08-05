import qs from 'qs';
import client, { tokenHeader } from '../client';

const URL = `account`;

export const getAccountList = ({ direction, page, size }) => {
  const queryString = qs.stringify({ direction, page, size });
  const token = localStorage.getItem('token');

  return client
    .get(`${URL}?${queryString}`, tokenHeader(token))
    .catch(error => {
      if (error.response.data.code === 'GE05') {
        localStorage.clear();
        window.location.reload(true);
      }
      throw error.response.data;
    });
};

export const getAccount = ({ id, token }) =>
  client.get(`${URL}/${id}`, tokenHeader(token)).catch(error => {
    throw error;
  });

export const updateAccount = ({ id, name, nickname, password, studentId }) => {
  const token = localStorage.getItem('token');
  const parameter = {
    id,
    name,
    nickname,
    password,
    studentId
  };

  return client.put(`${URL}`, parameter, tokenHeader(token)).catch(error => {
    throw error;
  });
};

export const removeAccount = ({ id }) => {
  const token = localStorage.getItem('token');

  return client.delete(`${URL}/${id}`, tokenHeader(token)).catch(error => {
    if (error.response.data.code === 'GE05') {
      localStorage.clear();
      window.location.reload(true);
    }
    throw error.response.data;
  });
};

export const searchAccountList = ({
  name,
  nickname,
  email,
  studentId,
  phoneNumber,
  type,
  pageRequest
}) => {
  const token = localStorage.getItem('token');
  const parameter = {
    name,
    nickname,
    email,
    studentId,
    phoneNumber,
    type,
    pageRequest
  };

  return client
    .post(`${URL}/search`, parameter, tokenHeader(token))
    .catch(error => {
      if (error.response.data.code === 'GE05') {
        localStorage.clear();
        window.location.reload(true);
      }
      throw error.response.data;
    });
};
