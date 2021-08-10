import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import { withRouter } from 'react-router-dom';

import AccountSearch from '../../components/Account/AccountSearch';
import { changeField, initializeField } from '../../modules/account';

const AccountSearchContainer = props => {
  const { history } = props;
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const { search } = useSelector(({ account }) => ({
    search: account.account.searchForm
  }));

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onChange = e => {
    const { name, value } = e.target;
    dispatch(
      changeField({
        form: 'searchForm',
        key: name,
        value
      })
    );
  };

  const handleLink = () => {
    const items = {};
    const { name, studentId, nickname, email, phoneNumber, type } = search;

    if (name) items.name = name;
    if (studentId) items.studentId = studentId;
    if (nickname) items.nickname = nickname;
    if (email) items.email = email;
    if (phoneNumber) items.phoneNumber = phoneNumber;
    if (type) items.type = type;

    if (!items) return `account`;
    return `/account?${qs.stringify(items)}`;
  };

  const handleHistory = () => {
    history.push(handleLink());
  };

  const onReset = () => {
    dispatch(initializeField());
  };

  const onSubmit = e => {
    e.preventDefault();
    handleHistory();
    handleClose();
  };

  // const isProperty = key => Object.prototype.hasOwnProperty.call(search, key);

  return (
    <AccountSearch
      search={search}
      open={open}
      onChange={onChange}
      onSubmit={onSubmit}
      onReset={onReset}
      handleOpen={handleOpen}
      handleClose={handleClose}
    />
  );
};

export default withRouter(AccountSearchContainer);
