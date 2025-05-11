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

interface SearchResponse {
  total: number;
  result: Joke[];
}

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

//Fetch Category Jokes

export const fetchJokeByCategory = createAsyncThunk<
  Joke,
  string,
  { rejectValue: string }
>("jokes/fetchJokeByCategory", async (category, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `https://api.chucknorris.io/jokes/random?category=${category}`
    );
    if (!response.ok) throw new Error("Failed to fetch category joke");
    const result = await response.json();
    console.log(result);

    return result;
  } catch (error) {
    return rejectWithValue("Failed to fetch joke by category");
  }
});

export const fetchCategories = createAsyncThunk<
  string[],
  void,
  { rejectValue: string }
>("jokes/fetchCategories", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("https://api.chucknorris.io/jokes/categories");
    if (!res.ok) throw new Error("Failed to fetch categories");
    return await res.json();
  } catch {
    return rejectWithValue("Failed to fetch categories");
  }
});

export const searchJokes = createAsyncThunk<
  Joke[],
  string,
  { rejectValue: string }
>("jokes/searchJokes", async (query, { rejectWithValue }) => {
  try {
    const res = await fetch(
      `https://api.chucknorris.io/jokes/search?query=${query}`
    );
    if (!res.ok) throw new Error("Failed to search jokes");
    const data: SearchResponse = await res.json();
    return data.result;
  } catch {
    return rejectWithValue("Failed to search jokes");
  }
});

const jokeSlice = createSlice({
  name: "joke",
  initialState,
  reducers: {
    clearJokes(state) {
      state.searchResults = [];
      state.randomJoke = null;
    },
  },
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
      })

      // Fetch Joke By Category
      .addCase(fetchJokeByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJokeByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryJoke = action.payload;
      })
      .addCase(fetchJokeByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch joke by category";
      })

      // Categories
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch categories";
      })

      // Search
      .addCase(searchJokes.fulfilled, (state, action) => {
        state.searchResults = action.payload;
      })
      .addCase(searchJokes.rejected, (state, action) => {
        state.error = action.payload || "Failed to search jokes";
      });
  },
});

export const { clearJokes } = jokeSlice.actions;
export default jokeSlice.reducer;
