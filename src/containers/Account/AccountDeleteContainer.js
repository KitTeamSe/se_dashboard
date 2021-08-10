import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import { initialize, removeAccount, changeSelect } from '../../modules/account';

import AccountDelete from '../../components/Account/AccountDelete';

const AccountDeleteContainer = () => {
  const [open, setOpen] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const dispatch = useDispatch();
  const { data, loading, error, select } = useSelector(({ account }) => ({
    data: account.removeAccount.data,
    loading: account.removeAccount.loading,
    error: account.removeAccount.error,
    select: account.select
  }));

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleMessageOpen = () => setMessageOpen(true);
  const handleMessageClose = () => setMessageOpen(false);

  const onDelete = () => {
    for (let i = 0; i < select.length; i += 1) {
      dispatch(removeAccount({ id: select[i] }));
    }
  };

  useEffect(() => {
    if (data) {
      dispatch(changeSelect({ select: [] }));
      handleMessageOpen();
      handleClose();
    }
    if (error) {
      console.log(error);
    }
  }, [data, error, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(initialize());
    };
  }, []);
  const snackbarProps = {
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'right'
    },
    open: messageOpen,
    onClose: handleMessageClose,
    message: data ? data.message : null
  };

  return (
    <>
      <AccountDelete
        data={data}
        loading={loading}
        error={error}
        select={select}
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        onDelete={onDelete}
      />
      <Snackbar {...snackbarProps} />
    </>
  );
};

export default AccountDeleteContainer;
