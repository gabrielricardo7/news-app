import React, { useMemo, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { navigationRef } from "./src/configs/RootNavigation";
import { LoginContext } from "./src/context";
import Home from "./src/pages/Home";
import Login from "./src/pages/Login";
import SignUp from "./src/pages/SignUp";

const { Navigator, Screen } = createStackNavigator();

export default function App() {
  const [isLogged, setIsLogged] = useState(false);

  const logged = useMemo(
    () => ({
      toggleStatus: () => {
        setIsLogged((status) => (status === false ? true : false));
      },
    }),
    []
  );

  return (
    <LoginContext.Provider value={logged}>
      <NavigationContainer ref={navigationRef}>
        <Navigator screenOptions={{ headerShown: false }}>
          {isLogged ? (
            <>
              <Screen name="Home" component={Home} />
            </>
          ) : (
            <>
              <Screen name="Login" component={Login} />
              <Screen name="SignUp" component={SignUp} />
            </>
          )}
        </Navigator>
      </NavigationContainer>
    </LoginContext.Provider>
  );
}
