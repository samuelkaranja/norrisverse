import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

interface Joke {
  id: string;
  value: string;
  icon_url: string;
}

interface JokeState {
  jokes: Joke[];
  loading: boolean;
  error: string | null;
}

const initialState: JokeState = {
  jokes: [],
  loading: false,
  error: null,
};

// Fetch Jokes

export const fetchJokes = createAsyncThunk<Joke, void, { rejectValue: string }>(
  "jokes/fetchJokes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://api.chucknorris.io/jokes/random");
      if (!response.ok) {
        throw new Error("Failed to fetch joke");
      }
      const result: Joke = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed to fetch joke");
    }
  }
);

const jokeSlice = createSlice({
  name: "joke",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJokes.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(fetchJokes.fulfilled, (state, action: PayloadAction<Joke>) => {
        state.loading = false;
        state.jokes = [action.payload];
      })
      .addCase(fetchJokes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      });
  },
});

export default jokeSlice.reducer;
