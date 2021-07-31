import React, { useEffect } from 'react';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadAccountList,
  searchAccountList,
  changeSelect
} from '../../../modules/account';

import AccountTable from '../../../components/Account/Table/AccountTable';

const AccountTableContainer = ({ location }) => {
  const dispatch = useDispatch();
  const { data, loading, error, select } = useSelector(({ account }) => ({
    search: account.account.searchForm,
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
    const {
      direction = 'ASC',
      size = 15,
      page = 1,
      email,
      name,
      nickname,
      phoneNumber,
      studentId,
      type
    } = qs.parse(location.search, { ignoreQueryPrefix: true });

    dispatch(changeSelect({ select: [] }));
    if (email || name || nickname || phoneNumber || studentId || type) {
      const pageRequest = {
        direction,
        size: parseInt(size, 10),
        page: parseInt(page, 10)
      };

      return dispatch(
        searchAccountList({
          email,
          name,
          nickname,
          phoneNumber: parseInt(phoneNumber, 10),
          studentId: parseInt(studentId, 10),
          type,
          pageRequest
        })
      );
    }
    return dispatch(
      loadAccountList({
        direction,
        size: parseInt(size, 10),
        page: parseInt(page, 10)
      })
    );
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
    </>
  );
};

export default withRouter(AccountTableContainer);
