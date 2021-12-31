import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {Platform} from './src/helper/platform';

const App = () => {
  const [count, setCount] = useState(0);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello from {'\n'}React Native Web!</Text>
      <TextInput placeholder="Input username ..." style={styles.input} />
      <TextInput placeholder="Input password ..." style={styles.input} />
      <TouchableOpacity
        onPress={() => setCount(count + 1)}
        style={styles.button}>
        <Text>Login</Text>
      </TouchableOpacity>

      <Text>You clicked {count} times!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C3E8BD',
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#ADBDFF',
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginVertical: 20,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 40,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    maxWidth: Platform.handleScale(375, 375),
  },
});

export default App;
