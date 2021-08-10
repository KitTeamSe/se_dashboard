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

export const getAccount = ({ id }) => {
  const token = localStorage.getItem('token');

  return client.get(`${URL}/${id}`, tokenHeader(token)).catch(error => {
    if (error.response.data.code === 'GE05') {
      localStorage.clear();
      window.location.reload(true);
    }
    throw error.response.data;
  });
};

export const updateAccount = ({
  id,
  name,
  nickname,
  studentId,
  password,
  informationOpenAgree,
  type
}) => {
  const token = localStorage.getItem('token');
  const parameter = {
    id,
    name,
    nickname,
    studentId,
    password,
    informationOpenAgree,
    type
  };

  return client.put(`${URL}`, parameter, tokenHeader(token)).catch(error => {
    if (error.response.data.code === 'GE05') {
      localStorage.clear();
      window.location.reload(true);
    }
    throw error.response.data;
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
