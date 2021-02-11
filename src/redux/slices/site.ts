// Packages
import { createSlice } from "@reduxjs/toolkit";

// Definitions
import { IStateSite } from "@/def/IStateSite";

// Utilities
import getMonth from "@/util/get-month";
import getYear from "@/util/get-year";
import randomizer from "@/util/random-quotes";

// Initial state
const initialSite: IStateSite = {
  month: "",
  year: 2021,
  quotes: [],
  ui: {
    modal: false,
    modalType: "",
    buttonLoading: false,
  },
};

const siteSlice = createSlice({
  name: "site",
  initialState: initialSite,
  reducers: {
    setMonth: (state: IStateSite) => {
      state.month = getMonth();
    },
    setYear: (state: IStateSite) => {
      state.year = getYear();
    },
    setQuotes: (state: IStateSite) => {
      state.quotes = randomizer();
    },
    setModal: (state, action) => {
      state.ui.modal = action.payload;
    },
    setModalType: (state, action) => {
      state.ui.modalType = action.payload;
    },
    setButtonLoading: (state, action) => {
      state.ui.buttonLoading = action.payload;
    },
  },
});

export const { setMonth, setYear, setQuotes, setModal, setModalType, setButtonLoading } = siteSlice.actions;

export default siteSlice.reducer;
