import * as yup from "yup";
import api from "../../services/api";
import React, { useEffect, useState } from "react";
import { ErrorText, Form, SafeAreaView, Text } from "../Login/styles";
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

export default function SignUp() {
  const schema = yup.object().shape({
    first_name: yup.string().required("nome obrigatório!"),
    last_name: yup.string().required("sobrenome obrigatório!"),
    email: yup
      .string()
      .email("deve ser um email válido!")
      .required("e-mail obrigatório!"),
    cpf: yup
      .string()
      .required("cpf obrigatório!")
      .matches(
        /^(\d{11}|\d{3}\.\d{3}\.\d{3}\-\d{2})$/,
        "cpf tem 11 dígitos: XXX.XXX.XXX-XX"
      ),
    password: yup
      .string()
      .required("senha obrigatória!")
      .min(8, "mínimo de 8 dígitos!"),
  });

  const { register, setValue, handleSubmit, formState, reset } =
    useForm({
      resolver: yupResolver(schema),
    });

  const { errors } = formState;

  const { navigate } = useNavigation();

  function backToLogin() {
    navigate("Login");
  }

  const handleSubmitSignUp = (data) => {
    api
      .post("user/signup/", { ...data })
      .then((res) => {
        Alert.alert("Sucesso", "Usuário registrado!");
        backToLogin();
        reset();
      })
      .catch((err) => {
        Alert.alert("Erro", "Tente novamente");
        console.log(err);
      });
  };

  const [maskedValue, setMaskedValue] = useState("");
  const [unMaskedValue, setUnmaskedValue] = useState("");

  useEffect(() => {
    register("first_name");
    register("last_name");
    register("email");
    register("cpf");
    register("password");
  }, [register]);

  return (
    <SafeAreaView>
      <ScrollView>
        <KeyboardAvoidingView behavior="padding" enabled>
          <Form>
            <Text>Inscrever-se</Text>
            <TextInput
              maxLength={50}
              onChangeText={(text) => setValue("first_name", text)}
              placeholder="Digite o seu nome"
              style={styles.input}
              textContentType={"name"}
            />
            <ErrorText>{errors.first_name?.message}</ErrorText>
            <TextInput
              maxLength={50}
              onChangeText={(text) => setValue("last_name", text)}
              placeholder="Digite o seu sobrenome"
              style={styles.input}
              textContentType={"familyName"}
            />
            <ErrorText>{errors.last_name?.message}</ErrorText>
            <TextInput
              keyboardType="email-address"
              onChangeText={(text) => setValue("email", text)}
              placeholder="Digite o seu e-mail"
              style={styles.input}
              textContentType={"emailAddress"}
            />
            <ErrorText>{errors.email?.message}</ErrorText>
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
            <ErrorText>{errors.cpf?.message}</ErrorText>
            <TextInput
              keyboardType="visible-password"
              maxLength={50}
              onChangeText={(text) => setValue("password", text)}
              placeholder="Digite a sua senha"
              secureTextEntry={true}
              style={styles.input}
              textContentType={"password"}
            />
            <ErrorText>{errors.password?.message}</ErrorText>
            <Button
              color="#006FFD"
              onPress={handleSubmit(handleSubmitSignUp)}
              title="Salvar"
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
    marginVertical: 0,
    marginTop: 10,
    padding: 10,
  },
});
