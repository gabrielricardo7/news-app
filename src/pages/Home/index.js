import { Button, Image, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { getObjectData } from "../../services/storage";
import { Header, SafeAreaView, Text, View } from "./styles";
import { LoginContext } from "../../context";
import { news } from "../../utils/data";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import avatar from "../../../assets/avatar.png";
import NewsCard from "../../components/NewsCard";

export default function Home() {
  const user =
    getObjectData("userData", JSON.stringify(res.data.user)) ||
    "{nome}";

  const logged = useContext(LoginContext);

  return (
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
          <Text>Olá {user.name}</Text>
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
          onPress={logged.toggleStatus}
          title="Sair"
        />
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
