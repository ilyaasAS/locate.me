import { Pacifico_400Regular, useFonts } from "@expo-google-fonts/pacifico";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { addNickname } from "../reducers/user";

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState("");

  const [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  // handlers
  function handlePress() {
    //if (!nickname || !nickname.trim()) return;
    dispatch(addNickname(nickname)); // action.payload = nickname = "Hedi"
    navigation.navigate("TabNavigator");
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Image
        style={styles.image}
        source={require("../assets/home-image.png")}
      />

      <Text style={styles.title}>Welcome to Locate Me</Text>

      <TextInput
        style={styles.input}
        placeholder="Nickname"
        onChangeText={(value) => setNickname(value)}
        value={nickname}
      />

      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Go to Map</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 25,
    fontFamily: "Pacifico_400Regular",
  },
  image: {
    width: "100%",
    height: "60%",
  },
  input: {
    width: "80%",
    borderBottomWidth: 1,
    borderBottomColor: "#B733D0",
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 12,
    width: "80%",
    backgroundColor: "#B733D0",
    borderRadius: 12,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
});
