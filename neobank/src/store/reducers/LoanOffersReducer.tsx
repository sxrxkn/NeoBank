import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Offer } from "../../models";

const initialState: { offers: Offer[] | null; status: string | null } = {
  offers: null,
  status: null,
};

export const updateInfoReducer = createSlice({
  name: "updateInformation",
  initialState,
  reducers: {
    updateInfo: (state, action: PayloadAction<Offer[] | null>) =>
      void (state.offers = action.payload),
    updateStatus: (state, action: PayloadAction<string | null>) =>
      void (state.status = action.payload),
  },
});

export const { updateInfo, updateStatus } = updateInfoReducer.actions;
export default updateInfoReducer.reducer;
