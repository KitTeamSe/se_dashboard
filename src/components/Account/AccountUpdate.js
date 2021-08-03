import React from 'react';
import styled from 'styled-components';

import {
  // CircularProgress,
  DialogActions,
  DialogContent,
  // DialogContentText,
  Button,
  Dialog,
  DialogTitle,
  Typography,
  TextField
} from '@material-ui/core';

import { informationOpenAgreeEnum, typeEnum } from './AccountData';

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
  & .MuiTextField-root {
    width: 240px;
  }
`;

const UpdateInput = props => {
  const { id, name, value, onChange, type, readOnly, disabled, children } =
    props;
  const handleProps = () => {
    if (type === 'select')
      return { select: true, SelectProps: { native: true } };
    if (type === 'number') return null;
    return null;
  };

  return (
    <div>
      <Typography>{name}</Typography>
      <TextField
        id={id}
        fullwidth
        name={id}
        placeholder={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        type="search"
        InputProps={
          readOnly && {
            readOnly: true
          }
        }
        {...handleProps()}
      >
        {type === 'select' ? children : null}
      </TextField>
    </div>
  );
};

const UpdateContent = props => {
  const {
    id,
    name,
    nickname,
    email,
    studentId,
    phoneNumber,
    type,
    informationOpenAgree,
    onChange
  } = props;
  return (
    <DialogContentStyled>
      <UpdateInput id="id" name="id" value={id} onChange={onChange} readOnly />
      <UpdateInput id="name" name="*이름" value={name} onChange={onChange} />
      <UpdateInput
        id="nickname"
        name="*닉네임"
        value={nickname}
        onChange={onChange}
      />
      <UpdateInput
        id="email"
        name="이메일"
        value={email}
        onChange={onChange}
        readOnly
      />
      <UpdateInput
        id="studentId"
        name="*학번"
        value={studentId}
        onChange={onChange}
      />
      <UpdateInput
        id="phoneNumber"
        name="전화번호"
        value={phoneNumber}
        onChange={onChange}
        readOnly
      />
      <UpdateInput
        id="type"
        name="*타입"
        value={type}
        onChange={onChange}
        type="select"
      >
        {Object.entries(typeEnum).map(e => {
          const key = e[0];
          const label = e[1];
          return (
            <option key={key} value={key}>
              {label}
            </option>
          );
        })}
      </UpdateInput>
      <UpdateInput
        id="informationOpenAgree"
        name="*정보공유동의"
        value={informationOpenAgree}
        onChange={onChange}
        type="select"
      >
        {Object.entries(informationOpenAgreeEnum).map(e => {
          const key = e[0];
          const label = e[1];
          return (
            <option key={key} value={key}>
              {label}
            </option>
          );
        })}
      </UpdateInput>
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

const UpdateAction = props => {
  const { onCancel } = props;
  return (
    <DialogActions>
      <Button variant="outlined" color="secondary" onClick={onCancel}>
        취소
      </Button>
      <Button variant="contained" color="secondary" type="submit">
        수정
      </Button>
    </DialogActions>
  );
};

const AccountUpdate = props => {
  const { id, name, nickname, studentId, type, loading, error } = props;
  const { email, phoneNumber, informationOpenAgree } = props;
  const { onChange, onCancel, onSubmit } = props;

  return (
    <>
      <Dialog
        open={id}
        onClose={onCancel}
        fullwidth
        minWidth="xs"
        scroll="paper"
      >
        <DialogTitle>회원정보 수정</DialogTitle>
        <form onSubmit={onSubmit}>
          <UpdateContent
            id={id}
            name={name}
            nickname={nickname}
            email={email}
            studentId={studentId}
            phoneNumber={phoneNumber}
            type={type}
            informationOpenAgree={informationOpenAgree}
            loading={loading}
            onChange={onChange}
          />
          <UpdateAction onCancel={onCancel} />
        </form>
        <ErrorMessage loading={loading} error={error} />
      </Dialog>
    </>
  );
};

export default AccountUpdate;
