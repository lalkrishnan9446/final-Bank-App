import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { DataProvider } from "../components/context-api";
import MainScreen from "../screens/main-screen";

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MainScreen">
          <Stack.Screen name="MainScreen" component={MainScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
};

export default Router;
