import React, {useState} from 'react';
import {View} from 'react-native';
import {ShiftProvider} from './src/context/ShiftContext';
import ShiftListScreen from './src/context/ShiftListScreen';
import ShiftDetailsScreen from './src/context/ShiftDetailsScreen';

function App(): React.JSX.Element {
  const [currentView, setCurrentView] = useState<'list' | 'details'>('list');
  const [selectedShift, setSelectedShift] = useState<any>(null);

  const showDetails = (shift: any) => {
    setSelectedShift(shift);
    setCurrentView('details');
  };

  const showList = () => {
    setCurrentView('list');
    setSelectedShift(null);
  };

  return (
    <ShiftProvider>
      <View style={{flex: 1}}>
        {currentView === 'list' ? (
          <ShiftListScreen onShiftPress={showDetails} />
        ) : (
          <ShiftDetailsScreen shift={selectedShift} onBack={showList} />
        )}
      </View>
    </ShiftProvider>
  );
}

export default App;