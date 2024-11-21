
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { addCity } from "../reducers/user";

export default function MapScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newPlaceName, setNewPlaceName] = useState("");
  const [newCoordinate, setNewCoordinate] = useState({});

  const [currentPosition, setCurrentPosition] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
          setCurrentPosition({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        });
      }
    })();
  }, []);

  const markers = user.places.map((city, i) => {
    return (
      <Marker
        key={i}
        coordinate={{ latitude: city.latitude, longitude: city.longitude }}
      />
    );
  });

  function openModal(e) {
    let latitude = 0;
    let longitude = 0;
     latitude = e.nativeEvent.coordinate.latitude
     longitude = e.nativeEvent.coordinate.longitude
    setNewCoordinate({ latitude, longitude });
    setIsModalVisible(true);
    console.log(e.nativeEvent.coordinate);

  }

  function closeModal() {
    setIsModalVisible(false);
  }

  function addPlaceToStore() {
    const newCity = {
      name: newPlaceName,
      // latitude: newCoordinate.latitude.toFixed(2),
      // longitude: newCoordinate.longitude.toFixed(2),
    };

    dispatch(addCity(newCity));
    setIsModalVisible(false);
    setNewPlaceName("");
    //navigation.navigate("Places");
  }

  return (
    <View style={styles.container}>
      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              placeholder="New place"
              style={styles.input}
              value={newPlaceName}
              onChangeText={(value) => setNewPlaceName(value)}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.button}
              onPress={addPlaceToStore}
            >
              <Text style={styles.textButton}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.button}
              onPress={() => closeModal()}
            >
              <Text style={styles.textButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <MapView mapType="hybrid" style={styles.map} onLongPress={openModal}>
        <Marker
          title="My location"
          coordinate={{
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
          }}
          pinColor="#fecb2d"
        />

        {markers}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    width: 150,
    borderBottomColor: "#B733D0",
    borderBottomWidth: 1,
    fontSize: 16,
  },
  button: {
    width: 150,
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#B733D0",
    paddingVertical: 10,
    borderRadius: 10,
  },
  textButton: {
    color: "#fff",
    fontSize: 20,
  },
});