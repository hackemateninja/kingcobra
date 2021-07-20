// Packages
import { createContext, useContext, useMemo, useReducer } from 'react';

// Definitions
import { IPlainObject } from '@/def/IPlainObject';

const AppContext = createContext(undefined);

const initialState = {
  selectedMake: {},
  selectedModel: {},
  zipCodeInfo: {},
  customer: {},
  selectedDealers: [],
  sourceIds: {},
};

const UPDATE_SELECTED_MAKE = 'UPDATE_SELECTED_MAKE';
const UPDATE_SELECTED_MODEL = 'UPDATE_SELECTED_MODEL';
const UPDATE_ZIPCODE_INFO = 'UPDATE_ZIPCODE_INFO';
const UPDATE_CUSTOMER = 'UPDATE_CUSTOMER';
const UPDATE_SELECTED_DEALERS = 'UPDATE_SELECTED_DEALERS';
const UPDATE_SOURCE_IDS = 'UPDATE_SOURCE_IDS';

const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_SELECTED_MAKE:
      console.log('update selected make:', action.payload);
      return {
        ...state,
        selectedMake: action.payload,
      };
    case UPDATE_SELECTED_MODEL:
      console.log('update selected model:', action.payload);
      return {
        ...state,
        selectedModel: action.payload,
      };
    case UPDATE_ZIPCODE_INFO:
      return {
        ...state,
        zipCodeInfo: action.payload,
      };
    case UPDATE_CUSTOMER:
      return {
        ...state,
        customer: action.payload,
      };
    case UPDATE_SELECTED_DEALERS:
      return {
        ...state,
        selectedDealers: action.payload,
      };
    case UPDATE_SOURCE_IDS:
      return {
        ...state,
        sourceIds: action.payload,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const AppContextProvider: React.FC<IPlainObject> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => [state, dispatch], [state]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
  const context = useContext(AppContext);
  const [state, dispatch] = context;

  const setSelectedMake = (make) => dispatch({ type: UPDATE_SELECTED_MAKE, payload: make });
  const setSelectedModel = (model) => dispatch({ type: UPDATE_SELECTED_MODEL, payload: model });
  const setZipCodeInfo = (zipCodeInfo) => dispatch({ type: UPDATE_ZIPCODE_INFO, payload: zipCodeInfo });
  const setCustomer = (customer) => dispatch({ type: UPDATE_CUSTOMER, payload: customer });
  const setSelectedDealers = (selectedDealers) => dispatch({ type: UPDATE_SELECTED_DEALERS, payload: selectedDealers });
  const setSourceIds = (sourceIds) => dispatch({ type: UPDATE_SOURCE_IDS, payload: sourceIds });

  return {
    state,
    dispatch,
    setSelectedMake,
    setSelectedModel,
    setZipCodeInfo,
    setCustomer,
    setSelectedDealers,
    setSourceIds,
  };
};

export { AppContextProvider, useAppContext };
