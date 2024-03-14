import React from 'react';
import { View, Text, StyleSheet, Pressable, ImageBackground, Animated } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Footer from './../Components/Footer'; // Importa el componente Footer

const HomeScreen = ({ navigation }) => {
  // Animación para los botones
  const buttonOpacity = new Animated.Value(0);
  Animated.timing(buttonOpacity, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,

  }).start();

  return (
    <ImageBackground
      source={require('./../assets/Moon.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Vinculum 💑</Text>
        </View>
        <Animated.View style={[styles.buttonGroup, { opacity: buttonOpacity }]}>
          <View style={styles.buttonContainer}>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                styles.buttonConexion,
                { opacity: pressed ? 0.6 : 1 },
                { pointerEvents: 'auto' }
              ]}
              onPress={() => navigation.navigate('Question', { category: 'Vinculum' })}
            >

              <Text style={styles.buttonText}><FontAwesome5 name="heart" size={15} color="white" style={styles.icon} /> Preguntas sobre relaciones y emociones</Text>
              <Text style={[styles.buttonDescription, { userSelect: 'none' }]}>
                Preguntas de unión, relaciones, introspección, confesión y aspiración
              </Text>

            </Pressable>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                styles.buttonHormonal,
                { opacity: pressed ? 0.6 : 1 }
              ]}
              onPress={() => navigation.navigate('Question', { category: 'Hormonal' })}
            >
              <Text style={styles.buttonText}> <FontAwesome5 name="fire" size={15} color="white" style={styles.icon} /> Preguntas sobre sexualidad y deseos</Text>
              <Text style={styles.buttonDescription}>Preguntas más sexuales y candentes</Text>
            </Pressable>
          </View>
        </Animated.View>
      </View>
      <Footer />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titleContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'sans-serif-condensed',
  },
  buttonGroup: {
    backgroundColor: 'rgba(155, 48, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
  },
  buttonContainer: {
    marginBottom: 10,
  },
  button: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 15,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
  buttonConexion: {
    backgroundColor: '#B452CD', // Fuscia
  },
  buttonHormonal: {
    backgroundColor: '#D462FF', // Morado claro
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center', 
  },
  buttonDescription: {
    color: '#FFFFFF', 
    textAlign: 'center',
    marginTop: 5,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default HomeScreen;
