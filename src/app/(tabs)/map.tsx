import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";

const MapScreen = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  useEffect(() => {
    Location.requestForegroundPermissionsAsync().then((result) => {
      if (!result.granted) {
        console.log("Permission refusée");
        return;
      } else {
        Location.getCurrentPositionAsync().then((loc) => setLocation(loc));
      }
    });
  }, []);
  console.log(location);
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={
          location
            ? {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }
            : undefined
        }
      />
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
