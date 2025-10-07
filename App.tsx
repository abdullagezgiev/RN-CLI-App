import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';
import ShiftListScreen from './src/context/ShiftListScreen';
import ShiftDetailsScreen from './src/context/ShiftDetailsScreen';
import {ShiftProvider} from './src/context/ShiftContext';

enableScreens(); 

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <ShiftProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="ShiftList"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#f5f5f5',
            },
            headerTintColor: '#333',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="ShiftList" 
            component={ShiftListScreen}
            options={{title: 'Доступные смены'}}
          />
          <Stack.Screen 
            name="ShiftDetails" 
            component={ShiftDetailsScreen}
            options={{title: 'Детали смены'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ShiftProvider>
  );
}

export default App;