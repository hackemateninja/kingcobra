// Packages
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Definitions
import { IStateStepTwo } from "@/def/IStateStepTwo";
import { IDealersParams } from "@/def/IDealers";
import { IMldDealersResponse, IMldLeadResponse } from "@/def/IMldResponse";
import { config } from "@/util/config";
import { IPostLeadParams } from "@/def/IPostLeadParams";

// Initial state
const initialStepTwo: IStateStepTwo = {
  data: {
    dealers: [],
    selectedDealers: [],
    leadDealers: [],
    first: "",
    last: "",
    phone: "",
    address: "",
    email: "",
    coverage: false,
    sourceId: "",
    device: "Unknown",
  },
  ui: {
    button: "Get Pricing",
    boxActive: "dealers",
    loading: "idle",
    firstSuggested: true,
		showSuggested: false
  },
};

export const setDealers = createAsyncThunk(
  "get/dealers",
  async ({ sourceId, make, model, year, zip, trim, sessionId }: IDealersParams) => {
    return new Promise<IMldDealersResponse>((resolve, reject) => {
      const url = `${config.apiBaseUrl}/api/dealers`;

      fetch(
        `${url}?sourceId=${sourceId}&make=${make}&model=${model}&year=${year}&zip=${zip}&trim=${trim}&sessionId=${sessionId}`
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

export const postLeads = createAsyncThunk("post/leads", async (lead: IPostLeadParams) => {
  return new Promise<IMldLeadResponse>((resolve, reject) => {
    const url = `${config.apiBaseUrl}/api/lead`;
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    })
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
});

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
    saveSourceId: (state, action) => {
      state.data.sourceId = action.payload;
    },
    setDealers: (state, action) => {
      state.data.dealers = action.payload;
    },
    postLeads: (state, action) => {
      state.data.leadDealers = action.payload;
    },
    saveDeviceType: (state, action) => {
      state.data.device = action.payload;
    },
    saveFirstSuggested: (state, action) => {
      state.ui.firstSuggested = action.payload;
    },
    saveShowSuggested: (state, action) => {
      state.ui.showSuggested = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setDealers.pending, (state) => {
      state.data.dealers = [];
      state.ui.loading = "pending";
    });

    builder.addCase(setDealers.fulfilled, (state, { payload }) => {
      state.data.coverage = payload.coverage;
      if (payload.coverage) {
        const { dealers } = payload;
        state.data.dealers = dealers.map((dealer) => ({ ...dealer, id: dealer.dealerID, programId: dealer.programID }));
      } else {
        state.data.dealers = [];
      }

      state.ui.loading = "succeeded";
    });

    builder.addCase(setDealers.rejected, (state) => {
      state.data.dealers = [];
      state.ui.loading = "failed";
    });

    builder.addCase(postLeads.pending, (state) => {
      state.data.leadDealers = [];
    });

    builder.addCase(postLeads.fulfilled, (state, { payload }) => {
      if (payload.accepted) {
        const { dealers } = payload;
        state.data.leadDealers = dealers.map((dealer) => ({
          ...dealer,
          id: dealer.dealerID,
          programId: dealer.programID,
        }));
      } else {
        state.data.leadDealers = [];
      }
    });

    builder.addCase(postLeads.rejected, (state) => {
      state.data.leadDealers = [];
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
  saveSourceId,
  saveDeviceType,
  saveFirstSuggested,
  saveShowSuggested,
} = stepTwoSlice.actions;

export default stepTwoSlice.reducer;
