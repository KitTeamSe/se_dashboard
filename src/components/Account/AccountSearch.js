import React from 'react';
import styled from 'styled-components';
import {
  Paper,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography
} from '@material-ui/core';

import { typeEnum } from './AccountData';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
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

const ChipWrapper = styled(Paper)`
  display: flex;
  align-items: center;
  list-style: none;
  min-width: 200px;
  margin: 0;
  padding: 4px 10px;
  border: 0.7px #00000030 solid;
  border-radius: 2rem;
  margin-right: 10px;
  & div {
    margin-right: 8px;
  }
  & div:last-child {
    margin-right: 0px;
  }
`;

const RoundButton = styled(Button)`
  border-radius: 2rem;
`;

const ChipList = styled.li`
  margin-right: 4px;
`;

const SearchItemChip = styled(Chip)`
  font-size: 0.75rem;
  line-height: 1.43;
`;

const SearchItem = props => {
  const { id, label, onClick } = props;

  return (
    <ChipList key={id}>
      <SearchItemChip
        size="small"
        id={id}
        label={`${id} : ${label}`}
        onClick={onClick}
        color="secondary"
      />
    </ChipList>
  );
};

const SearchInfo = props => {
  const { search, handleOpen } = props;
  const { name, studentId, nickname, email, phoneNumber, type } = search;

  return (
    <ChipWrapper onClick={handleOpen} elevation={0} component="ul">
      {name && <SearchItem id="name" label={name} onClick={handleOpen} />}
      {studentId && (
        <SearchItem id="studentId" label={studentId} onClick={handleOpen} />
      )}
      {nickname && (
        <SearchItem id="nickname" label={nickname} onClick={handleOpen} />
      )}
      {email && <SearchItem id="email" label={email} onClick={handleOpen} />}
      {phoneNumber && (
        <SearchItem id="phoneNumber" label={phoneNumber} onClick={handleOpen} />
      )}
      {type && (
        <SearchItem id="type" label={typeEnum[type]} onClick={handleOpen} />
      )}
    </ChipWrapper>
  );
};

const SearchInput = props => {
  const { id, name, value, onChange, type, children } = props;

  const handleProps = () => {
    if (type === 'select')
      return { select: true, SelectProps: { native: true } };
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
        {...handleProps()}
      >
        {type === 'select' ? children : null}
      </TextField>
    </div>
  );
};

const SearchContent = props => {
  const { search, onChange } = props;
  const { name, studentId, nickname, email, phoneNumber, type } = search;

  return (
    <DialogContentStyled>
      <SearchInput id="name" name="이름" value={name} onChange={onChange} />
      <SearchInput
        id="nickname"
        name="닉네임"
        value={nickname}
        onChange={onChange}
      />
      <SearchInput id="email" name="이메일" value={email} onChange={onChange} />
      <SearchInput
        id="studentId"
        name="학번"
        value={studentId}
        onChange={onChange}
      />
      <SearchInput
        id="phoneNumber"
        name="전화번호"
        value={phoneNumber}
        onChange={onChange}
      />
      <SearchInput
        id="type"
        name="타입"
        select
        value={type}
        onChange={onChange}
        type="select"
      >
        <option key="" value="">
          전체
        </option>
        {Object.entries(typeEnum).map(e => {
          const key = e[0];
          const label = e[1];
          return (
            <option key={key} value={key}>
              {label}
            </option>
          );
        })}
      </SearchInput>
    </DialogContentStyled>
  );
};
const SearchAction = props => {
  const { onReset } = props;

  return (
    <DialogActions>
      <Button variant="outlined" color="secondary" onClick={onReset}>
        초기화
      </Button>
      <Button variant="contained" color="secondary" type="submit">
        검색
      </Button>
    </DialogActions>
  );
};

const AccountSearch = props => {
  const { search, open, onChange, onSubmit, onReset, handleOpen } = props;

  return (
    <Wrapper>
      <SearchInfo search={search} handleOpen={handleOpen} />
      <RoundButton variant="contained" color="secondary" onClick={handleOpen}>
        검색
      </RoundButton>
      <Dialog
        open={open}
        onClose={onSubmit}
        fullwidth
        minWidth="xs"
        scroll="paper"
      >
        <DialogTitle>검색 설정</DialogTitle>
        <form onSubmit={onSubmit}>
          <SearchContent search={search} onChange={onChange} />
          <SearchAction onReset={onReset} />
        </form>
      </Dialog>
    </Wrapper>
  );
};

export default AccountSearch;
