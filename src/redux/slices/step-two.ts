// Packages
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Definitions
import { IStateStepTwo } from "@/def/IStateStepTwo";
import { IDealersParams } from "@/def/IDealers";

// Initial state
const initialStepTwo: IStateStepTwo = {
  data: {
    dealers: [],
    selectedDealers: [],
    first: "",
    last: "",
    phone: "",
    address: "",
    email: "",
  },
  ui: {
    button: "Get Pricing",
    boxActive: "dealers",
  },
};

export const setDealers = createAsyncThunk(
  "get/dealers",
  async ({ sourceId, make, model, year, zip, trim, sessionId }: IDealersParams) => {
    return new Promise((resolve, reject) => {
      const url = "https://func-kingcobra-dev-centralus-01.azurewebsites.net/api/dealers";
      fetch(
        `${url}?sourceId=${sourceId}&make=${make}&model=${model}&year=${year}&zip=${zip}&trim=${trim}&sessionId=${sessionId}`,
        {}
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Something went wrong");
          }
        })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
);

const stepTwoSlice = createSlice({
  name: "step-two",
  initialState: initialStepTwo,
  reducers: {
    setBoxActive: (state, action) => {
      state.ui.boxActive = action.payload;
    },
    setSelectedDealers: (state, action) => {
      state.data.selectedDealers = action.payload;
    },
    saveFirstName: (state, action) => {
      state.data.first = action.payload;
    },
    saveLastName: (state, action) => {
      state.data.last = action.payload;
    },
    savePhoneNumber: (state, action) => {
      state.data.phone = action.payload;
    },
    saveAddress: (state, action) => {
      state.data.address = action.payload;
    },
    saveEmail: (state, action) => {
      state.data.email = action.payload;
    },
    setDealers: (state, action) => {
      state.data.dealers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setDealers.pending, (state) => {
      state.data.dealers = [];
    });

    builder.addCase(setDealers.fulfilled, (state, action: any) => {
      const pl = action.payload;
      if (pl.coverage) {
        const { dealers } = pl;
        state.data.dealers = dealers.map((dealer) => ({ ...dealer, id: dealer.dealerID }));
      } else {
        state.data.dealers = [];
      }
    });

    builder.addCase(setDealers.rejected, (state) => {
      state.data.dealers = [];
    });
  },
});

export const {
  setBoxActive,
  setSelectedDealers,
  saveFirstName,
  saveLastName,
  savePhoneNumber,
  saveAddress,
  saveEmail,
} = stepTwoSlice.actions;

export default stepTwoSlice.reducer;
