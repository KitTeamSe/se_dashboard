import React, { useEffect } from 'react';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadAccountList, changeSelect } from '../../../modules/account';

import AccountTable from '../../../components/Account/Table/AccountTable';
import Pagination from '../../../components/Pagination/Pagination';

const AccountTableContainer = ({ location }) => {
  const link = 'account';
  const dispatch = useDispatch();
  const { data, loading, error, select } = useSelector(({ account }) => ({
    data: account.loadAccountList.data,
    loading: account.loadAccountList.loading,
    error: account.loadAccountList.error,
    select: account.select
  }));

  const handleSelect = (event, id) => {
    const selectIndex = select.indexOf(id);
    let newSelect = [];

    if (selectIndex === -1) {
      newSelect = newSelect.concat(select, id);
    } else if (selectIndex === 0) {
      newSelect = newSelect.concat(select.slice(1));
    } else if (selectIndex === select.length - 1) {
      newSelect = newSelect.concat(select.slice(0, -1));
    } else if (selectIndex > 0) {
      newSelect = newSelect.concat(
        select.slice(0, selectIndex),
        select.slice(selectIndex + 1)
      );
    }

    dispatch(changeSelect({ select: newSelect }));
  };

  const handleSelectAll = event => {
    if (event.target.checked) {
      const newSelects = data.data.content.map(e => e.idString);
      dispatch(changeSelect({ select: newSelects }));
      return;
    }
    dispatch(changeSelect({ select: [] }));
  };

  const isSelected = id => select.indexOf(id) !== -1;

  useEffect(() => {
    const { direction, size } = { direction: 'ASC', size: 15 };
    const { page = 1 } = qs.parse(location.search, { ignoreQueryPrefix: true });
    dispatch(loadAccountList({ direction, size, page }));
    dispatch(changeSelect({ select: [] }));
  }, [dispatch, location.search]);

  return (
    <>
      <AccountTable
        data={data && data.data.content}
        loading={loading}
        error={error}
        select={select}
        handleSelect={handleSelect}
        handleSelectAll={handleSelectAll}
        isSelected={isSelected}
      />
      <Pagination
        totalPage={data ? data.data.totalPages : 1}
        page={data ? data.data.pageable.pageNumber + 1 : 1}
        link={link}
      />
    </>
  );
};

export default withRouter(AccountTableContainer);
