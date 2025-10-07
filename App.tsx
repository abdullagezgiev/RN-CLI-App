import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import ShiftListScreen from './src/context/ShiftListScreen';
import ShiftDetailsScreen from './src/context/ShiftDetailsScreen';
import { ShiftProvider } from './src/context/ShiftContext';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <ShiftProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='ShiftList'>
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
  )
}

export default App;