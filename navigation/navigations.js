import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { DataProvider } from "../components/context-api";
import MainScreen from "../screens/main-screen";
import HomeScreen from "../screens/home-screen";
import StyleContext from "../components/style_context";
import Duedate from "../components/duedate";

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MainScreen">
        <Stack.Screen name="MainScreen" component={MainScreen}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Duedate" component={Duedate} />
      
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
};

export default Router;
