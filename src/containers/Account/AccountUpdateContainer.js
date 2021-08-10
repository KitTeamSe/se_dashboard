import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import {
  changeField,
  changeUpdate,
  initializeUpdate,
  updateAccount
} from '../../modules/account';

import AccountUpdate from '../../components/Account/AccountUpdate';

const AccountUpdateContainer = () => {
  const [messageOpen, setMessageOpen] = useState(false);
  const dispatch = useDispatch();
  const { data, loading, error, info, update } = useSelector(({ account }) => ({
    data: account.updateAccount.data,
    loading: account.updateAccount.loading,
    error: account.updateAccount.error,
    info: account.loadAccount.data,
    update: account.account.updateForm
  }));

  const handleMessageOpen = () => setMessageOpen(true);
  const handleMessageClose = () => setMessageOpen(false);

  const onChange = e => {
    const { name, value } = e.target;
    dispatch(
      changeField({
        form: 'updateForm',
        key: name,
        value
      })
    );
  };

  const onCancel = () => {
    dispatch(initializeUpdate());
  };

  const onSubmit = e => {
    e.preventDefault();
    const {
      id,
      name,
      nickname,
      studentId,
      password,
      informationOpenAgree,
      type
    } = update;

    dispatch(
      updateAccount({
        id,
        name,
        nickname,
        studentId,
        password,
        informationOpenAgree,
        type
      })
    );
  };

  useEffect(() => {
    if (data) {
      handleMessageOpen();
      onCancel();
    }
    if (error) {
      console.log(error);
    }
  }, [data, error, dispatch]);

  useEffect(() => {
    if (info) {
      const {
        idString,
        name,
        nickname,
        studentId,
        informationOpenAgree,
        type
      } = info.data;
      dispatch(
        changeUpdate({
          id: idString,
          name,
          nickname,
          studentId,
          informationOpenAgree,
          type
        })
      );
    }
  }, [info]);

  const snackbarProps = {
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'right'
    },
    open: messageOpen,
    onClose: handleMessageClose,
    message: data ? data.message : null
  };

  const isProperty = (obj, key) =>
    Object.prototype.hasOwnProperty.call(obj, key);

  return (
    <>
      <AccountUpdate
        id={isProperty(update, 'id') && update.id}
        name={isProperty(update, 'name') && update.name}
        nickname={isProperty(update, 'nickname') && update.nickname}
        studentId={isProperty(update, 'studentId') && update.studentId}
        password={isProperty(update, 'password') && update.password}
        informationOpenAgree={
          isProperty(update, 'informationOpenAgree') &&
          update.informationOpenAgree
        }
        type={isProperty(update, 'type') && update.type}
        phoneNumber={info && info.data.phoneNumber}
        email={info && info.data.email}
        loading={loading}
        error={error}
        onChange={onChange}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
      <Snackbar {...snackbarProps} />
    </>
  );
};

export default AccountUpdateContainer;
