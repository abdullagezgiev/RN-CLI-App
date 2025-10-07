import {Shift} from '../context/ShiftContext';

export type RootStackParamList = {
  ShiftList: undefined;
  ShiftDetails: {shift: Shift};
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}