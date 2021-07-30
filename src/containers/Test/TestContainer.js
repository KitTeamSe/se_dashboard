import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Test from '../../components/Test/Test';
import { changeSelect, loadAccountList } from '../../modules/account';

const SideMenuContainer = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(({ account }) => ({
    data: account.loadAccountList.data,
    loading: account.loadAccountList.loading,
    error: account.loadAccountList.error
  }));

  useEffect(() => {
    const { direction, size, page } = {
      direction: 'ASC',
      size: 10,
      page: 1
    };
    dispatch(loadAccountList({ direction, size, page }));
    dispatch(changeSelect({ select: [] }));
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      console.log(error);
      console.log(error.message);
      console.log(error.response.data);
    }
  }, [error]);

  return <Test id={[data, loading, error].join()} />;
};

export default SideMenuContainer;
