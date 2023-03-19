import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  advertisements: [],
  summaries: [],
  error: "",
};

// creating services

export const createAd = createAsyncThunk(
  "service/createAdvertisement",
  async (adv) => {
    const accessToken = sessionStorage.getItem("userToken");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ prompt: adv }),
    };

    const response = await fetch(
      "https://business-app.onrender.com/api/service/Ad",
      options
    );
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      res.status(400);
      throw new Error("Cannot fetch");
    }
  }
);

export const createSummary = createAsyncThunk(
  "service/createSummary",
  async (summary) => {
    const accessToken = sessionStorage.getItem("userToken");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ prompt: summary }),
    };

    const response = await fetch(
      "https://business-app.onrender.com/api/service/Summary",
      options
    );
    if (response.ok) {
      console.log(await response.json());
    } else {
      res.status(400);
      throw new Error("Cannot create");
    }
  }
);

// fetching services

export const getAd = createAsyncThunk("service/fetchAds", async () => {
  const response = await fetch(
    "https://business-app.onrender.com/api/service/Ad",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    }
  );
  if (response.ok) {
    const allAdvertisements = await response.json();
    return allAdvertisements;
  }
});

export const getSummary = createAsyncThunk(
  "service/fetchSummaries",
  async () => {
    const response = await fetch(
      "https://business-app.onrender.com/api/service/Summary",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      }
    );
    if (response.ok) {
      const allSummaries = await response.json();
      return allSummaries.reverse();
    }
  }
);

export const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAd.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createAd.fulfilled, (state, action) => {
        state.status = "succeded";
        state.advertisements = [action.payload, ...state.advertisements];
      })
      .addCase(createAd.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(createSummary.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createSummary.fulfilled, (state, action) => {
        state.status = "succeded";
        state.summaries = [action.payload, ...state.summaries];
      })
      .addCase(createSummary.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(getAd.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAd.fulfilled, (state, action) => {
        state.status = "succeded";
        state.error = "";
        state.advertisements = action.payload;
      })
      .addCase(getAd.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(getSummary.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getSummary.fulfilled, (state, action) => {
        state.status = "succeded";
        state.error = "";
        state.summaries = action.payload;
      })
      .addCase(getSummary.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export default serviceSlice.reducer;
