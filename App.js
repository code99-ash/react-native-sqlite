import { StyleSheet, View } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = new createStackNavigator()

import Home from './screens/Home'
import Message from './screens/Message'

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={Home}
          options={{
            title: 'Contacts'
          }}
        />
        <Stack.Screen 
          name="Message" 
          component={Message} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
