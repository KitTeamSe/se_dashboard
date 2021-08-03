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

const TableRowStyled = styled(TableRow)`
  cursor: pointer;
  text-decoration: none;
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
  const { data, loading, handleSelect, handleUpdateId, isSelected } = props;

  const handleType = type => {
    return typeEnum[type];
  };
  const handleInformationOpenAgree = informationOpenAgree => {
    return informationOpenAgreeEnum[informationOpenAgree];
  };
  const handleCellText = (element, key) => {
    if (key === 'type') return handleType(element[key]);
    if (key === 'informationOpenAgree')
      return handleInformationOpenAgree(element[key]);
    return element[key];
  };

  return (
    <TableBody>
      {!loading && data
        ? data.map(e => {
            const selected = isSelected(e.idString);
            return (
              <TableRowStyled key={`account-${e.accountId}`}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selected}
                    id={e.idString}
                    onClick={handleSelect}
                  />
                </TableCell>
                {accountData.map(account => (
                  <TableCell id={e.idString} onClick={handleUpdateId}>
                    {handleCellText(e, account.key)}
                  </TableCell>
                ))}
              </TableRowStyled>
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
    handleSelectAll,
    handleUpdateId,
    isSelected,
    select
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
          handleUpdateId={handleUpdateId}
          isSelected={isSelected}
        />
      </Table>
      <ErrorMessage loading={loading} error={error} />
      <LoadingProgress loading={loading} />
    </TableContainer>
  );
};

export default AccountTable;
