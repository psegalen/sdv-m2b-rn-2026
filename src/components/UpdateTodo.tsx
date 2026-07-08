import {
  Button,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { Card } from "react-native-paper";

const UpdateTodo = () => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.cardContainer}>
          <TextInput placeholder="Tâche à faire" style={styles.input} />
          <View style={styles.row}>
            <Switch value={false} />
            <Text>Fait ?</Text>
          </View>
          <Button title="Créer" onPress={() => {}} />
        </View>
      </Card>
    </View>
  );
};

export default UpdateTodo;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    padding: 24,
    backgroundColor: "#FFF",
  },
  cardContainer: {
    gap: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    padding: 8,
  },
});
