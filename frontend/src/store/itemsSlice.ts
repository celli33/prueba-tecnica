import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import TaxProfile from '../interfaces/TaxProfile.js';
import axiosInstance from '../axiosConfig.js';
import { AxiosError } from 'axios';
import Error422 from '../interfaces/Error422.js';

interface ItemsState {
  items: TaxProfile[];
  itemsPerPage: number;
  currentPage: number;
  lastPage: number;
  totalItems: number;
  loading: boolean;
  error: string | null;
}

const initialState: ItemsState = {
  items: [],
  itemsPerPage: 10,
  currentPage: 1,
  lastPage: 1,
  totalItems: 0,
  loading: false,
  error: null,
};

export const fetchTaxProfiles = createAsyncThunk(
  'items/fetchTaxProfiles',
  async (page: number, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`perfiles?page=${page}`);
      return data.data;
    } catch (error) {
      return rejectWithValue('Error al cargar perfiles.');
    }
  },
);

export const addProfile = createAsyncThunk('items/addTaxProfile', async (formData: TaxProfile, {rejectWithValue}) => {
  try {
    const { data } = await axiosInstance.post('perfiles', formData);
    return data.data;
  } catch (error) {
    if((error as AxiosError ).isAxiosError){
      const axError = error as AxiosError;
      const errors = axError.response?.data as {errors: Error422[]};
      return rejectWithValue(errors.errors[0].message);
    }
    return rejectWithValue('Error al cargar perfiles.');
  }
});

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTaxProfiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTaxProfiles.fulfilled, (state, action: PayloadAction<{ data: TaxProfile[] }>) => {
        state.items = action.payload.data;
      })
      .addCase(fetchTaxProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      }).addCase(addProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProfile.fulfilled, (state, action: PayloadAction<TaxProfile>) => {
        state.items.push(action.payload);
        state.totalItems += 1;
        state.loading = false; 
        state.error = null;
      })
      .addCase(addProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
});

export const { setCurrentPage } = itemsSlice.actions;
export default itemsSlice.reducer;
