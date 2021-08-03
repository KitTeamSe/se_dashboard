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
const INITIALIZE_UPDATE = 'account/INITIALIZE_UPDATE';
const CHANGE_FIELD = 'account/CHANGE_FIELD';
const CHANGE_SEARCH = 'account/CHANGE_SEARCH';
const CHANGE_SELECT = 'account/CHANGE_SELECT';
const CHANGE_UPDATE = 'account/CHANGE_UPDATE';
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
] = createRequestActionTypes('account/SEARCH_ACCOUNT_LIST');

// Action Creators
export const initialize = createAction(INITIALIZE);
export const initializeField = createAction(INITIALIZE_FIELD);
export const initializeUpdate = createAction(INITIALIZE_UPDATE);
export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form,
    key,
    value
  })
);
export const changeSearch = createAction(
  CHANGE_SEARCH,
  ({ name, nickname, email, studentId, phoneNumber, type }) => ({
    name,
    nickname,
    email,
    studentId,
    phoneNumber,
    type
  })
);
export const changeUpdate = createAction(
  CHANGE_UPDATE,
  ({ id, name, nickname, studentId, informationOpenAgree, type }) => ({
    id,
    name,
    nickname,
    studentId,
    informationOpenAgree,
    type
  })
);
export const changeSelect = createAction(CHANGE_SELECT, ({ select }) => ({
  select
}));
export const loadAccount = createAction(LOAD_ACCOUNT, ({ id }) => ({
  id
}));
export const loadAccountList = createAction(
  LOAD_ACCOUNT_LIST,
  ({ direction, page, size }) => ({ direction, page, size })
);
export const updateAccount = createAction(
  UPDATE_ACCOUNT,
  ({
    id,
    name,
    nickname,
    studentId,
    password,
    informationOpenAgree,
    type
  }) => ({
    id,
    name,
    nickname,
    studentId,
    password,
    informationOpenAgree,
    type
  })
);
export const removeAccount = createAction(REMOVE_ACCOUNT, ({ id }) => ({
  id
}));
export const searchAccountList = createAction(
  SEARCH_ACCOUNT_LIST,
  ({ name, nickname, email, studentId, phoneNumber, type, pageRequest }) => ({
    name,
    nickname,
    email,
    studentId,
    phoneNumber,
    type,
    pageRequest
  })
);

// Sagas
const loadAccountSaga = createRequestSaga(LOAD_ACCOUNT, api.getAccount);
const loadAccountListSaga = createRequestSaga(
  LOAD_ACCOUNT_LIST,
  api.getAccountList
);
const updateAccountSaga = createRequestSaga(UPDATE_ACCOUNT, api.updateAccount);
const removeAccountSaga = createRequestSaga(REMOVE_ACCOUNT, api.removeAccount);
const searchAccountListSaga = createRequestSaga(
  SEARCH_ACCOUNT_LIST,
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
    updateForm: {
      id: '',
      informationOpenAgree: '',
      name: '',
      nickname: '',
      password: '',
      studentId: ''
    },
    searchForm: {
      name: '',
      nickname: '',
      email: '',
      studentId: '',
      phoneNumber: '',
      type: null
    }
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
        updateForm: {
          id: '',
          informationOpenAgree: '',
          name: '',
          nickname: '',
          password: '',
          studentId: ''
        },
        searchForm: {
          name: '',
          nickname: '',
          email: '',
          studentId: '',
          phoneNumber: '',
          type: null
        }
      }
    }),
    [INITIALIZE_UPDATE]: state => ({
      ...state,
      account: {
        updateForm: {
          id: '',
          informationOpenAgree: '',
          name: '',
          nickname: '',
          password: '',
          studentId: ''
        },
        searchForm: {
          ...state.account.searchForm
        }
      }
    }),
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, draft => {
        draft.account[form][key] = value;
      }),
    [CHANGE_SEARCH]: (
      state,
      { payload: { name, nickname, email, studentId, phoneNumber, type } }
    ) => ({
      ...state,
      account: {
        updateForm: state.account.updateForm,
        searchForm: {
          ...state.account.searchForm,
          name,
          nickname,
          email,
          studentId,
          phoneNumber,
          type
        }
      }
    }),
    [CHANGE_UPDATE]: (
      state,
      { payload: { id, name, nickname, studentId, informationOpenAgree, type } }
    ) => ({
      ...state,
      account: {
        updateForm: {
          id,
          name,
          nickname,
          studentId,
          informationOpenAgree,
          type
        },
        searchForm: state.account.searchForm
      }
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
      updateAccount: reducerUtils.loading(state.updateAccount.data)
    }),
    [UPDATE_ACCOUNT_SUCCESS]: (state, { payload: update }) => ({
      ...state,
      updateAccount: reducerUtils.success(update)
    }),
    [UPDATE_ACCOUNT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      updateAccount: reducerUtils.error(error)
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
