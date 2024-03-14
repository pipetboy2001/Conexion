import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importa tus componentes de pantalla aquí
import HomeScreen from './Views/HomeScreen';
//import QuestionScreen from './Views/QuestionScreen';

// Crea una instancia de Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio', headerShown: false  }} />
        {/* <Stack.Screen name="Question" component={QuestionScreen} options={{ title: 'Pregunta', headerShown: false  }} /> */} 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
