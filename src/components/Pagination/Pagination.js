import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Pagination as Paginations, PaginationItem } from '@material-ui/lab';

const PaginationStyled = styled(Paginations)`
  & ul {
    justify-content: center;
    padding: 10px;
  }
`;

const Pagination = ({ totalPage, page, link, onChange }) => {
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
            to={`/${link}${item.page === 1 ? '' : `?page=${item.page}`}`}
            {...item}
          />
        );
      }}
      showFirstButton
      showLastButton
    />
  );
};

export default Pagination;
