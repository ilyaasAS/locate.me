import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { addCity, removeCity } from "../reducers/user";

export default function PlacesScreen() {
  const dispatch = useDispatch();
  const [city, setCity] = useState("");
  const user = useSelector((state) => state.user.value);
  //console.log(user); //{ nickname: "Hedi", places: [] }

  const formatedNickname =
    user.nickname.charAt(0).toUpperCase() +
    user.nickname.slice(1).toLowerCase();

  // async function handlePress(){
  //   const res = await fetch("https://api-adresse.data.gouv.fr/search/?q=paris");
  //   const data = await res.json();
  // }

  function handlePress() {
    fetch(`https://api-adresse.data.gouv.fr/search/?q=${city}`)
      .then((res) => res.json())
      .then((data) => {
        const utilsData = data.features[0];
        const newCity = {
          name: utilsData.properties.city,
          latitude: utilsData.geometry.coordinates[1].toFixed(2),
          longitude: utilsData.geometry.coordinates[0].toFixed(2),
        };

        dispatch(addCity(newCity));
        setCity("");
      });
  }

  const places = user.places.map((place, id) => {
    console.log(place);

    return (
      <View key={id} style={styles.placeCard}>
        <View>
          <Text style={styles.name}>{place.name}</Text>
          <Text>
            LAT : {place.latitude} LON : {place.longitude}
          </Text>
        </View>
        <TouchableOpacity onPress={() => dispatch(removeCity(place.name))}>
          <FontAwesome name="trash-o" style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{formatedNickname}'s Places</Text>

      <View style={styles.inputBlock}>
        <TextInput
          placeholder="New city"
          onChangeText={(value) => setCity(value)}
          value={city}
          style={styles.input}
        />
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => handlePress()}
        >
          <Text style={styles.textButton}>Add</Text>
        </TouchableOpacity>
      </View>

      {user.places.length === 0 ? (
        <EmptyList />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollView}>
          {places}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

function EmptyList() {
  return (
    <View style={styles.empty}>
      <Text style={styles.emptyText}>No places yet</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginTop: 30,
    marginBottom: 20,
    fontFamily: "Pacifico_400Regular",
  },
  name: {
    fontSize: 18,
  },
  inputBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    width: "80%",
    marginTop: 30,
    padding: 20,
    borderRadius: 12,
  },
  input: {
    width: "65%",
    borderBottomWidth: 1,
    borderBottomColor: "#B733D0",
    fontSize: 17,
    marginBottom: 6,
  },
  button: {
    backgroundColor: "#B733D0",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 7,
  },
  textButton: {
    color: "#fff",
  },
  scrollView: {
    alignItems: "center",
    marginTop: 20,
    maxWidth: "100%",
  },
  placeCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  icon: {
    color: "#B733D0",
    fontSize: 23,
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 20,
  },
});