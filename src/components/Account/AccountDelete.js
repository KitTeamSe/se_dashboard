import React from 'react';
import styled from 'styled-components';

import {
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  Dialog,
  DialogTitle,
  Typography
} from '@material-ui/core';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
  color: #ff0000;
`;

const DialogContentStyled = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 300px;
  & p {
    width: 100%;
  }
`;

const DeleteContent = props => {
  const { loading, select } = props;
  return (
    <DialogContentStyled>
      <DialogContentText>회원 ID (idString)</DialogContentText>
      {loading ? (
        <CircularProgress />
      ) : (
        select.map(e => <Typography>{e}</Typography>)
      )}
    </DialogContentStyled>
  );
};

const ErrorMessage = props => {
  const { loading, error } = props;

  return (
    !loading &&
    error && (
      <Wrapper>
        <Typography>{error.message}</Typography>
      </Wrapper>
    )
  );
};

const DeleteAction = props => {
  const { handleClose, onDelete } = props;
  return (
    <DialogActions>
      <Button variant="outlined" color="secondary" onClick={handleClose}>
        취소
      </Button>
      <Button variant="contained" color="secondary" onClick={onDelete}>
        삭제
      </Button>
    </DialogActions>
  );
};

const TableDelete = props => {
  const { select, loading, error, open } = props;
  const { handleOpen, handleClose, onDelete } = props;

  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        disabled={!select.length}
        onClick={handleOpen}
      >
        삭제
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullwidth
        minWidth="xs"
        scroll="paper"
      >
        <DialogTitle>회원 삭제</DialogTitle>
        <DeleteContent select={select} loading={loading} />
        <ErrorMessage loading={loading} error={error} />
        <DeleteAction handleClose={handleClose} onDelete={onDelete} />
      </Dialog>
    </>
  );
};

export default TableDelete;
