import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function VocabularyScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>生词页面</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
  },
});
