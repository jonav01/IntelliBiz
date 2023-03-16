import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  accessToken: {},
  error: null,
};

export const userLogin = createAsyncThunk(
  "login/userLogin",
  async ({ email, password }) => {
    const userData = { email, password };
    const response = await fetch(
      "https://business-app.onrender.com/api/user/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Email or password wrong !");
    }
  }
);

export const userRegister = createAsyncThunk(
  "register/userRegister",
  async ({ name, phone, email, password }) => {
    const userData = { name, phone, email, password };

    const response = await fetch(
      "https://business-app.onrender.com/api/user/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    if (response.ok) {
      return await response.json();
    } else if (response.status === 403) {
      throw new Error("Email already registered");
    } else {
      throw new Error("Did not respond !");
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = "";
        state.accessToken = action.payload;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(userRegister.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = "";
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
