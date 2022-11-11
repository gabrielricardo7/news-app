import React from "react";
import { Button, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function SignUp() {
  const { navigate } = useNavigation();

  function backToLogin() {
    navigate("Login");
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Página em desenvolvimento</Text>
      <Button color="#0f0" onPress={backToLogin} title="Voltar" />
    </View>
  );
}
