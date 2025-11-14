import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Types
interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
}

interface CryptoState {
  coins: CryptoData[];
  selectedCoin: CryptoData | null;
  loading: boolean;
  error: string | null;
  lastUpdated: number | null;
}

// Async Thunk pour récupérer les cryptos
export const fetchCryptoData = createAsyncThunk(
  'crypto/fetchCryptoData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
      );
      if (!response.ok) {
        throw new Error('Failed to fetch crypto data');
      }
      const data = await response.json();
      return data as CryptoData[];
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Thunk pour récupérer le détail d'une crypto
export const fetchCoinDetail = createAsyncThunk(
  'crypto/fetchCoinDetail',
  async (coinId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&community_data=false&developer_data=false`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch coin detail');
      }
      const data = await response.json();
      return {
        id: data.id,
        symbol: data.symbol,
        name: data.name,
        image: data.image.large,
        current_price: data.market_data.current_price.usd,
        price_change_percentage_24h: data.market_data.price_change_percentage_24h,
        market_cap: data.market_data.market_cap.usd,
        total_volume: data.market_data.total_volume.usd,
      } as CryptoData;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const initialState: CryptoState = {
  coins: [],
  selectedCoin: null,
  loading: false,
  error: null,
  lastUpdated: null,
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    selectCoin: (state, action) => {
      state.selectedCoin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all cryptos
      .addCase(fetchCryptoData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCryptoData.fulfilled, (state, action) => {
        state.loading = false;
        state.coins = action.payload;
        state.lastUpdated = Date.now();
      })
      .addCase(fetchCryptoData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch coin detail
      .addCase(fetchCoinDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoinDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCoin = action.payload;
      })
      .addCase(fetchCoinDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, selectCoin } = cryptoSlice.actions;
export default cryptoSlice.reducer;