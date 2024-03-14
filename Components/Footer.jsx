// Footer.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';

const Footer = () => {
  const handleGithubLink = () => {
    Linking.openURL('https://github.com/pipetboy2001');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGithubLink}>
        <Text style={styles.text}>
          Hecho por{" "}
          <Text style={styles.link}>Pipetboy</Text>, versión 1.0.0
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 12,
    color: '#888',
  },
  link: {
    color: '#FFFFFF', // Cambia el color del enlace a blanco
    textDecorationLine: 'underline',
  },
});

export default Footer;
