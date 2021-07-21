/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { Munro, Pagination } from '@/components/Munro';
import { AppThunk, AppState } from '@/store/store';
import { queryMunros } from '@/utils/api';

export interface Mountain {
  name: string;
  type: string;
}

export enum QuerySortFieldEnum {
  altitude = `altitude`,
  rating = `rating`,
  name = `name`,
}

export enum QuerySortDirectionEnum {
  asc = `asc`,
  desc = `desc`,
}

export interface MunroQueryParams {
  querySortField?: QuerySortFieldEnum;
  querySortDirection?: QuerySortDirectionEnum;
  queryName?: string;
}

export interface MunroState {
  server: {
    munro: Munro;
  };
  queryParams: MunroQueryParams;
  queryResult: Munro[];
  queryPagination: Pagination;
  value: number;
  randomMunro: string;
}

export const initialState: MunroState = {
  server: {
    munro: {},
  },
  queryParams: {
    querySortField: QuerySortFieldEnum.name,
    querySortDirection: QuerySortDirectionEnum.desc,
    queryName: ``,
  },
  value: 0,
  queryResult: [],
  queryPagination: {},
  randomMunro: ``,
};

export const munroSlice = createSlice({
  name: `munro`,
  initialState,
  reducers: {
    setMunro: (state, action: PayloadAction<Munro>) => {
      state.server.munro = action.payload;
    },
    setRandom: (state, action: PayloadAction<string>) => {
      state.randomMunro = action.payload;
    },
    setQueryResult: (state, action: PayloadAction<Munro[]>) => {
      state.queryResult = action.payload;
    },
    setQueryPagination: (state, action: PayloadAction<Pagination>) => {
      state.queryPagination = action.payload;
    },
    setQuerySortField: (state, action: PayloadAction<QuerySortFieldEnum>) => {
      state.queryParams.querySortField = action.payload;
    },
    setQuerySortDirection: (
      state,
      action: PayloadAction<QuerySortDirectionEnum>,
    ) => {
      state.queryParams.querySortDirection = action.payload;
    },
    setQueryName: (state, action: PayloadAction<string>) => {
      state.queryParams.queryName = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, { payload }) => ({
      ...state,
      server: {
        ...payload.munro.server,
      },
    }),
  },
});

export const {
  setMunro,
  setRandom,
  setQueryResult,
  setQuerySortField,
  setQuerySortDirection,
  setQueryName,
} = munroSlice.actions;

export const fetchRandomMunro = (): AppThunk => async (dispatch) => {
  const res = await fetch(`http://localhost:3000/api/munro`);
  const int = Math.floor(Math.random() * 282);
  const munros: string[] = await res.json();
  return dispatch(munroSlice.actions.setRandom(munros[int]));
};

export const fetchQueryMunros = (): AppThunk => async (dispatch, getState) => {
  const state: AppState = getState();

  const queryString: Record<string, string | QuerySortFieldEnum> = {};
  const { querySortField, querySortDirection, queryName } =
    state.munro.queryParams;

  if (querySortField) {
    queryString.sort_param = querySortField;
    if (querySortField === `name`) {
      queryString.sort_direction = `desc`;
    }
  }

  if (querySortDirection) {
    queryString.sort_direction = querySortDirection;
  }

  if (queryName) {
    queryString.filter = `id~${queryName}`;
  }

  const resp = await queryMunros(queryString as Record<string, string>);

  dispatch(munroSlice.actions.setQueryResult(resp.data));
  dispatch(munroSlice.actions.setQueryPagination(resp.pagination));
};

export const randomMunroSelector = (state: AppState): MunroState =>
  state.munro.randomMunro;

export const queryMunrosSelector = (state: AppState): Munro[] =>
  state.munro.queryResult;

export const queryParamsSelector = (state: AppState): MunroQueryParams =>
  state.munro.queryParams;
