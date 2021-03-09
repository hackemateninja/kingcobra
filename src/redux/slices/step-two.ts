// Packages
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SeverityLevel } from "@microsoft/applicationinsights-web";

// Definitions
import { IStateStepTwo } from "@/def/IStateStepTwo";
import { IDealer, IDealersParams } from "@/def/IDealers";
import { IMldDealersResponse, IMldLeadResponse } from "@/def/IMldResponse";
import { IPostLeadParams } from "@/def/IPostLeadParams";

// Utilities
import { config } from "@/util/config";
import { appInsights } from "@/util/app-insights";

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
    transactionId: "",
    sendInfo: true,
  },
  ui: {
    button: "Get Pricing",
    boxActive: "dealers",
    loading: "idle",
    firstSuggested: true,
    showSuggested: false,
  },
};

export const setDealers = createAsyncThunk(
  "get/dealers",
  async ({ sourceId, make, model, year, zip, trim, trackingId, sessionId }: IDealersParams) => {
    return new Promise<IMldDealersResponse>((resolve, reject) => {
      const url = `${config.apiBaseUrl}/api/dealers`;

      fetch(
        `${url}?sourceId=${sourceId}&make=${encodeURIComponent(make)}&model=${encodeURIComponent(
          model
        )}&year=${year}&zip=${zip}&trim=${trim}&trackingId=${trackingId}&sessionId=${sessionId}`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            appInsights.trackTrace({
              message: `${response.statusText} - Something went wrong getting dealers: ${make}-${model}-${zip}`,
              properties: {
                make: make,
                model: model,
                zip: zip,
              },
              severityLevel: SeverityLevel.Error,
            });

            throw new Error(`Something went wrong getting dealers: ${make}-${model}-${zip}`);
          }
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          appInsights.trackException({ exception: error, properties: { make: make, model: model, zip: zip } });
          reject(error);
        });
    });
  }
);

export const postLeads = createAsyncThunk("post/leads", async (lead: IPostLeadParams) => {
  return new Promise<IMldLeadResponse>((resolve, reject) => {
    const url = `${config.apiBaseUrl}/api/lead`;
    const { make, model } = lead.vehicle;
    const { zip } = lead.customer;

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          appInsights.trackTrace({
            message: `${response.statusText} - Something went wrong posting lead: ${make}-${model}-${zip}`,
            properties: {
              make: make,
              model: model,
              zip: zip,
            },
            severityLevel: SeverityLevel.Error,
          });

          throw new Error(`Something went wrong posting lead: ${make}-${model}-${zip}`);
        }
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        appInsights.trackException({ exception: error, properties: { make: make, model: model, zip: zip } });
        reject(error);
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
    saveDealers: (state, action) => {
      const { dealers, coverage, transactionID } = action.payload;
      state.data.dealers = dealers.map((dealer) => ({
        ...dealer,
        id: dealer.dealerID,
        programId: dealer.programID,
        isChecked: dealer.programID === 1 || dealer.programID === 127,
      }));

      state.data.selectedDealers = state.data.dealers.filter((d: IDealer) => d.isChecked);
      state.data.coverage = coverage;
      state.data.transactionId = transactionID;
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
    saveTransactionId: (state, action) => {
      state.data.transactionId = action.payload;
    },
    saveSendInfo: (state, action) => {
      state.data.sendInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setDealers.pending, (state) => {
      state.data.dealers = [];
      state.ui.loading = "pending";
    });

    builder.addCase(setDealers.fulfilled, (state, { payload }) => {
      state.data.coverage = payload.coverage;
      state.data.transactionId = payload.transactionID;

      if (payload.coverage) {
        const { dealers } = payload;
        state.data.dealers = dealers.map((dealer) => ({
          ...dealer,
          id: dealer.dealerID,
          programId: dealer.programID,
          isChecked: dealer.programID === 1 || dealer.programID === 127,
        }));

        state.data.selectedDealers = state.data.dealers.filter((d: IDealer) => d.isChecked);
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
  saveDealers,
  saveSourceId,
  saveDeviceType,
  saveFirstSuggested,
  saveShowSuggested,
  saveTransactionId,
  saveSendInfo,
} = stepTwoSlice.actions;

export default stepTwoSlice.reducer;
