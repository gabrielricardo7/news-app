import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const { Navigator, Screen } = createStackNavigator();

export default function Navigation(props) {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      {props}
    </Navigator>
  );
}
