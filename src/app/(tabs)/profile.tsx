import * as Device from "expo-device";
import { Platform, StyleSheet, Text, View } from "react-native";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Utilisateur principal</Text>
      <Text style={styles.text}>
        OS : {Platform.OS} v{Device.osVersion}
      </Text>
      <Text style={styles.text}>
        Modèle : {Device.manufacturer}{" "}
        {Platform.select({ ios: Device.modelName, android: Device.designName })}
      </Text>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  text: {
    fontSize: 22,
  },
});
