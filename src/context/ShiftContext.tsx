import React, {createContext, useContext, useReducer, ReactNode} from 'react';

export interface Shift {
    id: string;
    logo: string;
    address: string;
    companyName: string;
    dateStartByCity: string;
    timeStartByCity: string;
    timeEndByCity: string;
    currentWorkers: number;
    planWorkers: number;
    workTypes: string;
    priceWorker: number;
    customerFeedbacksCount: number;
    customerRating: number;
}

interface ShiftState {
    shifts: Shift[];
    loading: boolean;
    error: string | null;
}

type ShiftAction = 
 | {type: 'SET_LOADING'; payload: boolean}
 | {type: 'SET_SHIFTS'; payload: Shift[]}
 | {type: 'SET_ERROR'; payload: string};

const initialState: ShiftState = {
  shifts: [],
  loading: false,
  error: null,
};

const shiftReducer = (state: ShiftState, action: ShiftAction): ShiftState => {
  switch (action.type) {
    case 'SET_LOADING':
      return {...state, loading: action.payload};
    case 'SET_SHIFTS':
      return {...state, shifts: action.payload, loading: false, error: null};
    case 'SET_ERROR':
      return {...state, error: action.payload, loading: false};
    default:
      return state;
  }
};

const ShiftContext = createContext<{
  state: ShiftState;
  dispatch: React.Dispatch<ShiftAction>;
} | null>(null);

export const ShiftProvider = ({children}: {children: ReactNode}) => {
  const [state, dispatch] = useReducer(shiftReducer, initialState);

  return (
    <ShiftContext.Provider value={{state, dispatch}}>
      {children}
    </ShiftContext.Provider>
  );
};

export const useShift = () => {
  const context = useContext(ShiftContext);
  if (!context) {
    throw new Error('useShift must be used within ShiftProvider');
  }
  return context;
};