import React from 'react';
import styled from 'styled-components';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Checkbox,
  CircularProgress,
  Typography
} from '@material-ui/core';

import { accountData, informationOpenAgreeEnum, typeEnum } from './AccountData';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
  color: #ff0000;
`;

const AccountTableHead = props => {
  const { dataCount, selectCount, handleSelectAll } = props;
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={selectCount > 0 && selectCount < dataCount}
            checked={dataCount > 0 && dataCount === selectCount}
            onChange={handleSelectAll}
          />
        </TableCell>
        {accountData.map(e => (
          <TableCell>{e.name}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const AccountTableBody = props => {
  const { data, loading, handleSelect, isSelected } = props;

  const handleType = type => {
    return typeEnum[type];
  };
  const handleInformationOpenAgree = informationOpenAgree => {
    return informationOpenAgreeEnum[informationOpenAgree];
  };

  return (
    <TableBody>
      {!loading && data
        ? data.map(e => {
            const selected = isSelected(e.idString);
            return (
              <TableRow key={`account-${e.accountId}`}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selected}
                    onClick={event => handleSelect(event, e.idString)}
                  />
                </TableCell>
                {accountData.map(account => {
                  if (account.key === 'type')
                    return <TableCell>{handleType(e[account.key])}</TableCell>;
                  if (account.key === 'informationOpenAgree')
                    return (
                      <TableCell>
                        {handleInformationOpenAgree(e[account.key])}
                      </TableCell>
                    );
                  return <TableCell>{e[account.key]}</TableCell>;
                })}
              </TableRow>
            );
          })
        : null}
    </TableBody>
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

const LoadingProgress = props => {
  const { loading } = props;
  return (
    loading && (
      <Wrapper>
        <CircularProgress />{' '}
      </Wrapper>
    )
  );
};

const AccountTable = props => {
  const {
    data,
    loading,
    error,
    handleSelect,
    select,
    handleSelectAll,
    isSelected
  } = props;

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <AccountTableHead
          dataCount={data ? data.length : 0}
          selectCount={select.length}
          handleSelectAll={handleSelectAll}
        />
        <AccountTableBody
          data={data}
          loading={loading}
          handleSelect={handleSelect}
          isSelected={isSelected}
        />
      </Table>
      <ErrorMessage loading={loading} error={error} />
      <LoadingProgress loading={loading} />
    </TableContainer>
  );
};

export default AccountTable;
