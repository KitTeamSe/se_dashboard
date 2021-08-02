import React from 'react';
import { useSelector } from 'react-redux';

import AccountPagination from '../../components/Account/AccountPagination';

const AccountPaginationContainer = () => {
  const link = 'account';
  const { search, data } = useSelector(({ account }) => ({
    search: account.account.searchForm,
    data: account.loadAccountList.data
  }));

  const isProperty = key => Object.prototype.hasOwnProperty.call(search, key);

  return (
    <>
      <AccountPagination
        totalPage={data && data.data.totalPages ? data.data.totalPages : 1}
        page={data ? data.data.pageable.pageNumber + 1 : 1}
        email={isProperty('email') && search.email}
        name={isProperty('name') && search.name}
        nickname={isProperty('nickname') && search.nickname}
        phoneNumber={isProperty('phoneNumber') && search.phoneNumber}
        studentId={isProperty('studentId') && search.studentId}
        type={isProperty('type') && search.type}
        link={link}
      />
    </>
  );
};

export default AccountPaginationContainer;
