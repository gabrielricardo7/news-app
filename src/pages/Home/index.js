import { Button, Image, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Header, SafeAreaView, Text, View } from "./styles";
import { LoginContext } from "../../context";
import { news } from "../../utils/data";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useMemo, useState } from "react";
import avatar from "../../../assets/avatar.png";
import NewsCard from "../../components/NewsCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  const isLogged = useContext(LoginContext);

  const initialState = "{nome}";

  const [isUser, setIsUser] = useState(false);
  const [username, setUsername] = useState(initialState);

  const getItemStorage = async () => {
    try {
      const value = await AsyncStorage.getItem("username");
      if (value !== null) {
        setUsername(value);
      }
    } catch (error) {
      console.log(`Error retrieving data: ${error}`);
    }
  };

  const logged = useMemo(
    () => ({
      toggleStatus: () => {
        setIsUser((status) => (status === false ? true : false));
      },
    }),
    []
  );

  useEffect(() => {
    getItemStorage();
  }, [isUser]);

  return (
    <LoginContext.Provider value={logged}>
      <SafeAreaView>
        <ScrollView stickyHeaderIndices={[0]}>
          <Header>
            <Image
              source={avatar}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
              }}
            />
            <Text>Olá {username}</Text>
          </Header>
          <View>
            <Feather name="star" size={24} color="#006FFD" />
            <Text>Notícias em Destaque para você</Text>
          </View>
          {news.map((n) => (
            <NewsCard
              key={n.title}
              tag={n.tag}
              title={n.title}
              description={n.description}
            />
          ))}
          <Button
            color="#f00"
            onPress={() => {
              isLogged.toggleStatus();
            }}
            title="Sair"
          />
        </ScrollView>
        <StatusBar style="auto" />
      </SafeAreaView>
    </LoginContext.Provider>
  );
}
