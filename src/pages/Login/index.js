import * as yup from "yup";
import api from "../../services/api";
import image from "../../../assets/image.png";
import React, { useContext, useEffect, useState } from "react";
import { Box, Form, Image, SafeAreaView, Text } from "./styles";
import { LoginContext } from "../../context";
import { MaskedTextInput } from "react-native-mask-text";
import { StatusBar } from "expo-status-bar";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Button,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import {
  storeObjectData,
  storeStringData,
} from "../../services/storage";

export default function Login() {
  const logged = useContext(LoginContext);

  const schema = yup.object().shape({
    cpf: yup
      .string()
      .required("CPF obrigatório!")
      .matches(/^(\d{11}|\d{3}\.\d{3}\.\d{3}\-\d{2})$/),
    password: yup
      .string()
      .required("Senha obrigatória!")
      .min(8, "Mínimo de 8 dígitos!"),
  });

  const { register, setValue, handleSubmit, formState, reset } =
    useForm({
      resolver: yupResolver(schema),
    });

  const { navigate } = useNavigation();

  const { errors } = formState;

  function redirectToSignUp() {
    navigate("SignUp");
  }

  const handleSubmitLogin = (data) => {
    api
      .post("user/login/", { ...data })
      .then((res) => {
        storeStringData("authToken", res.data.token);
        storeObjectData("userData", JSON.stringify(res.data.user));
        // setUser(res.data.user);
        logged.toggleStatus;
        reset();
        Alert.alert("Sucesso", "Usuário logado!");
      })
      .catch((err) => {
        Alert.alert("Erro", "Combinação incorreta");
      });
  };

  const [maskedValue, setMaskedValue] = useState("");
  const [unMaskedValue, setUnmaskedValue] = useState("");

  useEffect(() => {
    register("cpf");
    register("password");
  }, [register]);

  // const onSubmit = (data) => Alert.alert(data.cpf, data.password);

  const gotoSignup = () => redirectToSignUp();

  return (
    <SafeAreaView>
      <ScrollView>
        <Box>
          <Image source={image} />
        </Box>
        <KeyboardAvoidingView behavior="position" enabled>
          <Form>
            <Text>Faça seu login</Text>
            <MaskedTextInput
              keyboardType="numeric"
              mask="999.999.999-99"
              onChangeText={(text, rawText) => {
                setValue("cpf", text);
                setMaskedValue(text);
                setUnmaskedValue(rawText);
              }}
              placeholder="Digite o seu cpf"
              style={styles.input}
            />
            <TextInput
              keyboardType="visible-password"
              maxLength={50}
              onChangeText={(text) => setValue("password", text)}
              placeholder="Digite a sua senha"
              secureTextEntry={true}
              style={styles.input}
              textContentType={"password"}
            />
            <Button
              color="#006FFD"
              onPress={() =>
                Alert.alert("Aviso", "Favor contatar administrador")
              }
              title="Esqueceu sua senha? Clique aqui"
            />
            <Button
              color="#006FFD"
              onPress={handleSubmit(handleSubmitLogin)}
              title="Login"
            />
            <Button
              color="#71727A"
              onPress={gotoSignup}
              title="Ainda não tenho senha, iniciar meu primeiro acesso"
            />
          </Form>
        </KeyboardAvoidingView>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  input: {
    borderColor: "#C5C6CC",
    borderRadius: 12,
    borderStyle: "solid",
    borderWidth: 1,
    fontSize: 16,
    gap: 8,
    height: 40,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
  },
});
