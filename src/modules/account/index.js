import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import produce from 'immer';
import * as api from '../../libs/api/Manage/account';
import {
  createRequestActionTypes,
  createRequestSaga
} from '../../libs/createRequestSaga';
import reducerUtils from '../../libs/reducerUtils';

// Actions
const INITIALIZE = 'account/INITIALIZE';
const INITIALIZE_FIELD = 'account/INITIALIZE_FIELD';
const CHANGE_FIELD = 'account/CHANGE_FIELD';
const CHANGE_SELECT = 'account/CHANGE_SELECT';
const [LOAD_ACCOUNT, LOAD_ACCOUNT_SUCCESS, LOAD_ACCOUNT_FAILURE] =
  createRequestActionTypes('account/LOAD_ACCOUNT');
const [
  LOAD_ACCOUNT_LIST,
  LOAD_ACCOUNT_LIST_SUCCESS,
  LOAD_ACCOUNT_LIST_FAILURE
] = createRequestActionTypes('account/LOAD_ACCOUNT_LIST');
const [UPDATE_ACCOUNT, UPDATE_ACCOUNT_SUCCESS, UPDATE_ACCOUNT_FAILURE] =
  createRequestActionTypes('account/UPDATE_ACCOUNT');
const [REMOVE_ACCOUNT, REMOVE_ACCOUNT_SUCCESS, REMOVE_ACCOUNT_FAILURE] =
  createRequestActionTypes('account/REMOVE_ACCOUNT');
const [
  SEARCH_ACCOUNT_LIST,
  SEARCH_ACCOUNT_LIST_SUCCESS,
  SEARCH_ACCOUNT_LIST_FAILURE
] = createRequestActionTypes('account/SEARCH_ACCOUNT_LIST_LIST');

// Action Creators
export const initialize = createAction(INITIALIZE);
export const initializeField = createAction(INITIALIZE_FIELD);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value
}));
export const changeSelect = createAction(CHANGE_SELECT, ({ select }) => ({
  select
}));
export const loadAccount = createAction(LOAD_ACCOUNT, ({ id, token }) => ({
  id,
  token
}));
export const loadAccountList = createAction(
  LOAD_ACCOUNT_LIST,
  ({ direction, page, size, token }) => ({ direction, page, size, token })
);
export const updateAccount = createAction(
  UPDATE_ACCOUNT,
  ({
    id,
    informationOpenAgree,
    name,
    nickname,
    password,
    studentId,
    token
  }) => ({
    id,
    informationOpenAgree,
    name,
    nickname,
    password,
    studentId,
    token
  })
);
export const removeAccount = createAction(REMOVE_ACCOUNT, ({ id }) => ({
  id
}));
export const searchAccountList = createAction(
  SEARCH_ACCOUNT_LIST,
  ({ id }) => ({
    id
  })
);

// Sagas
const loadAccountSaga = createRequestSaga(LOAD_ACCOUNT, api.getAccount);
const loadAccountListSaga = createRequestSaga(
  LOAD_ACCOUNT_LIST,
  api.getAccountList
);
const updateAccountSaga = createRequestSaga(REMOVE_ACCOUNT, api.updateAccount);
const removeAccountSaga = createRequestSaga(REMOVE_ACCOUNT, api.removeAccount);
const searchAccountListSaga = createRequestSaga(
  REMOVE_ACCOUNT,
  api.searchAccountList
);

export function* accountSaga() {
  yield takeLatest(LOAD_ACCOUNT, loadAccountSaga);
  yield takeLatest(LOAD_ACCOUNT_LIST, loadAccountListSaga);
  yield takeLatest(UPDATE_ACCOUNT, updateAccountSaga);
  yield takeLatest(REMOVE_ACCOUNT, removeAccountSaga);
  yield takeLatest(SEARCH_ACCOUNT_LIST, searchAccountListSaga);
}

// reducer (handleActions => switch문 대체)
const initialState = {
  account: {
    multipartFile: [],
    postId: '',
    replyId: ''
  },
  select: [],
  loadAccount: reducerUtils.initial(),
  loadAccountList: reducerUtils.initial(),
  updateAccount: reducerUtils.initial(),
  removeAccount: reducerUtils.initial()
};

export default handleActions(
  {
    [INITIALIZE]: () => initialState,
    [INITIALIZE_FIELD]: state => ({
      ...state,
      account: {
        multipartFile: [],
        postId: '',
        replyId: ''
      }
    }),
    [CHANGE_FIELD]: (state, { payload: { key, value } }) =>
      produce(state, draft => {
        draft.account[key] = value;
      }),
    [CHANGE_SELECT]: (state, { payload: { select } }) => ({
      ...state,
      select
    }),
    [LOAD_ACCOUNT]: state => ({
      ...state,
      loadAccount: reducerUtils.loading(state.loadAccount.data)
    }),
    [LOAD_ACCOUNT_SUCCESS]: (state, { payload: account }) => ({
      ...state,
      loadAccount: reducerUtils.success(account)
    }),
    [LOAD_ACCOUNT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      loadAccount: reducerUtils.error(error)
    }),

    [LOAD_ACCOUNT_LIST]: state => ({
      ...state,
      loadAccountList: reducerUtils.loading(state.loadAccountList.data)
    }),
    [LOAD_ACCOUNT_LIST_SUCCESS]: (state, { payload: accountList }) => ({
      ...state,
      loadAccountList: reducerUtils.success(accountList)
    }),
    [LOAD_ACCOUNT_LIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      loadAccountList: reducerUtils.error(error)
    }),

    [REMOVE_ACCOUNT]: state => ({
      ...state,
      removeAccount: reducerUtils.loading(state.removeAccount.data)
    }),
    [REMOVE_ACCOUNT_SUCCESS]: (state, { payload: remove }) => ({
      ...state,
      removeAccount: reducerUtils.success(remove)
    }),
    [REMOVE_ACCOUNT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      removeAccount: reducerUtils.error(error)
    }),

    [UPDATE_ACCOUNT]: state => ({
      ...state,
      loadPostAccountList: reducerUtils.loading(state.updateAccount.data)
    }),
    [UPDATE_ACCOUNT_SUCCESS]: (state, { payload: update }) => ({
      ...state,
      loadPostAccountList: reducerUtils.success(update)
    }),
    [UPDATE_ACCOUNT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      loadPostAccountList: reducerUtils.error(error)
    }),

    [SEARCH_ACCOUNT_LIST]: state => ({
      ...state,
      loadAccountList: reducerUtils.loading(state.loadAccountList.data)
    }),
    [SEARCH_ACCOUNT_LIST_SUCCESS]: (state, { payload: accountList }) => ({
      ...state,
      loadAccountList: reducerUtils.success(accountList)
    }),
    [SEARCH_ACCOUNT_LIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      loadAccountList: reducerUtils.error(error)
    })
  },
  initialState
);
