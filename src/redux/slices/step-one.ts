// Packages
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Definitions
import { IStateStepOne } from "@/def/IStateStepOne";
import { config } from "@/util/config";

// Initial state
const initialStepOne: IStateStepOne = {
  data: {
    makes: [],
    models: [],
    selectedMake: {},
    selectedModel: {},
    zipcode: {},
  },
  ui: {
    button: "Check Local Prices",
    imageLoading: false,
    loading: "idle"
  },
};

// Set Models
export const setModels = createAsyncThunk("get/models", async (make: string) => {
  if (make !== "") {
    return new Promise((resolve, reject) => {
      fetch(`${window.location.origin}/api/models/${make}`)
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
        .catch((error) => {
          reject(error);
        });
    });
  } else {
    return [];
  }
});

// Set ZipCode
export const setZipCode = createAsyncThunk("get/zipcode", async (zip: string) => {
  if (zip !== "" && zip !== "99999") {
    return new Promise((resolve, reject) => {
      fetch(`https://us-zipcode.api.smartystreets.com/lookup?auth-id=${config.ssAuthToken}&zipcode=${zip}`)
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
        .catch((error) => {
          reject(error);
        });
    });
  } else if (zip === "99999") {
    return [
      {
        zipcodes: [{ default_city: "City", state_abbreviation: "ST", zipcode: zip }],
      },
    ];
  } else {
    return [];
  }
});

const stepOneSlice = createSlice({
  name: "step-one",
  initialState: initialStepOne,
  reducers: {
    setMakes: (state, action) => {
      state.data.makes = action.payload;
    },
    setSelectedMake: (state, action) => {
      const make = state.data.makes.filter((make) => make.value === action.payload);

      state.data.selectedModel = {};
      state.data.selectedMake = make.length !== 0 ? make[0] : {};
      state.data.models = action.payload === "" ? [] : state.data.models;
      state.ui.imageLoading = true;
    },
    setSelectedModel: (state, action) => {
      const model = state.data.models.filter((model) => model.value === action.payload);

      state.data.selectedModel = model.length !== 0 ? model[0] : {};
      state.ui.imageLoading = state.data.selectedMake.image !== state.data.selectedModel.image ? true : false;
    },
    saveModels: (state, action) => {
      state.data.models = action.payload;
    },
    saveZipCode: (state, action) => {
      state.data.zipcode = action.payload;
    },
    isLoading: (state, action) => {
      state.ui.imageLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Models
    builder.addCase(setModels.pending, (state) => {
      state.data.models = [];
    });
    builder.addCase(setModels.fulfilled, (state, action) => {
      state.data.models = action.payload;
    });
    // Zip Code
    builder.addCase(setZipCode.pending, (state) => {
      state.data.zipcode = { loading: true };
      state.ui.loading = "pending";
    });
    builder.addCase(setZipCode.fulfilled, (state, action) => {
      const pl = action.payload;

      if (pl.length !== 0) {
        if (pl[0]["status"] === undefined) {
          const zc = pl[0].zipcodes[0];
          const city = zc.default_city;
          const st = zc.state_abbreviation;
          const zip = zc.zipcode;

          state.data.zipcode = { city, state: st, zip };
          state.data.zipcode = { city, state: st, zip };
        } else {
          state.data.zipcode = {};
        }
      } else {
        state.data.zipcode = {};
      }

      state.ui.loading = "completed";
    });
  },
});

export const { setMakes, setSelectedMake, saveModels, setSelectedModel, saveZipCode, isLoading } = stepOneSlice.actions;

export default stepOneSlice.reducer;
