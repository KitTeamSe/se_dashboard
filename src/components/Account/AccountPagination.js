import React from 'react';
import styled from 'styled-components';
import qs from 'qs';
import { Link } from 'react-router-dom';
import { Pagination as Paginations, PaginationItem } from '@material-ui/lab';

const PaginationStyled = styled(Paginations)`
  & ul {
    justify-content: center;
    padding: 10px;
  }
`;

const AccountPagination = props => {
  const {
    totalPage,
    page,
    name,
    studentId,
    nickname,
    email,
    phoneNumber,
    type,
    link,
    onChange
  } = props;

  const handleLink = item => {
    const items = {};
    if (name) items.name = name;
    if (studentId) items.studentId = studentId;
    if (nickname) items.nickname = nickname;
    if (email) items.email = email;
    if (phoneNumber) items.phoneNumber = phoneNumber;
    if (type) items.type = type;
    if (item.page !== 1) items.page = item.page;
    return qs.stringify(items);
  };

  return (
    <PaginationStyled
      component="div"
      count={totalPage}
      page={parseInt(page, 10)}
      onChange={onChange}
      renderItem={item => {
        return (
          <PaginationItem
            component={Link}
            to={`/${link}?${handleLink(item)}`}
            {...item}
          />
        );
      }}
      showFirstButton
      showLastButton
    />
  );
};

export default AccountPagination;
