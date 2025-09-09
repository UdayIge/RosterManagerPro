import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { ProviderEntity, Filters } from "@/lib/types";

type State = {
    items: ProviderEntity[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error?: string;
    filters: Filters;
    search: string;
};

const initialState: State = {
    items: [],
    status: 'idle',
    filters: {
        service: "All", type: "All", center: "All"
    },
    search: "",
};

export const fetchProviders = createAsyncThunk("provider/fetch", async () => {
    const response = await fetch("/api/roster");
    return (await response.json()) as ProviderEntity[];
});

const slice = createSlice({
    name: "provider",
    initialState,
    reducers: {
        setFilter(state, action: PayloadAction<Partial<Filters>>) {
            state.filters = { ...state.filters, ...action.payload };
        },
        setSearch(state, action: PayloadAction<string>) {
            state.search = action.payload;
        },
        resetFilters(state) {
            state.filters = initialState.filters;
            state.search = "";
        },
    },
    extraReducers: (b) => {
        b.addCase(fetchProviders.pending, (s) => { s.status = 'loading'; });
        b.addCase(fetchProviders.fulfilled, (s, a) => { s.status = 'succeeded'; s.items = a.payload; });
        b.addCase(fetchProviders.rejected, (s, a) => { s.status = 'failed'; s.error = String(a.error.message || "Failed"); });
    }
});
export const { setFilter, setSearch, resetFilters } = slice.actions;
export default slice.reducer;