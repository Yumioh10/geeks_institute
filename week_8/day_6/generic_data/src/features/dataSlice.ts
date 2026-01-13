interface GenericDataState {
  [key: string]: DataState<any>;
}

const initialState: GenericDataState = {};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    fetchStart: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      state[key] = {
        data: null,
        loading: true,
        error: null
      };
    },
    fetchSuccess: (state, action: PayloadAction<{ key: string; data: any }>) => {
      const { key, data } = action.payload;
      state[key] = {
        data,
        loading: false,
        error: null
      };
    },
    fetchFailure: (state, action: PayloadAction<{ key: string; error: string }>) => {
      const { key, error } = action.payload;
      state[key] = {
        data: null,
        loading: false,
        error
      };
    },
    clearData: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    }
  }
});

const { fetchStart, fetchSuccess, fetchFailure, clearData } = dataSlice.actions;

// Redux Store
const store = configureStore({
  reducer: {
    data: dataSlice.reducer
  }
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
