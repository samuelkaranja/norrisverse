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

// interface SearchResponse {
//   total: number;
//   result: Joke[];
// }

interface JokeState {
  randomJoke: Joke | null;
  categoryJoke: Joke | null;
  categories: string[];
  searchResults: Joke[];
  loading: boolean;
  error: string | null;
}

const initialState: JokeState = {
  randomJoke: null,
  categoryJoke: null,
  categories: [],
  searchResults: [],
  loading: false,
  error: null,
};

// Fetch Random Jokes

export const fetchRandomJoke = createAsyncThunk<
  Joke,
  void,
  { rejectValue: string }
>("jokes/fetchRandomJoke", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("https://api.chucknorris.io/jokes/random");
    if (!response.ok) throw new Error("Failed to fetch random joke");
    const result = await response.json();
    return result;
  } catch (error) {
    return rejectWithValue("Failed to fetch random joke");
  }
});

const jokeSlice = createSlice({
  name: "joke",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomJoke.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchRandomJoke.fulfilled,
        (state, action: PayloadAction<Joke>) => {
          state.loading = false;
          state.randomJoke = action.payload;
        }
      )
      .addCase(fetchRandomJoke.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch random joke";
      });
  },
});

export default jokeSlice.reducer;
