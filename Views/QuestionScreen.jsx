import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Animated } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Footer from './../Components/Footer'; // Importa el componente Footer
import { db } from './../Database/Firebase'; // Importa el objeto db que representa tu base de datos Firestore


const QuestionScreen = ({ route, navigation }) => {
  const { category } = route.params;

  const [questions, setQuestions] = useState([]);
  const [categoryImage, setCategoryImage] = useState(null);
  const [flipAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await db.collection('Preguntas').doc(category).get();
        if (querySnapshot.exists) {
          const questionsData = querySnapshot.data();
          setCategoryImage(category === 'Vinculum' ? require('./../assets/love-icon.png') : require('./../assets/sex-icon.png'));

          setQuestions(questionsData.questions || []);
        } else {
          console.log("No se encontraron datos para la categoría:", category);
          setQuestions(["No se encontraron preguntas para esta categoría."]);
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
        setQuestions(["Error al obtener las preguntas. Inténtalo de nuevo más tarde."]);
      }
    };

    fetchData();
  }, [category]);


  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    // Cuando se llega al final de las preguntas, reinicia el índice
    if (currentQuestionIndex >= questions.length) {
      setCurrentQuestionIndex(0);
    }
  }, [currentQuestionIndex, questions]);

  const handleNextQuestion = () => {
    Animated.sequence([
      Animated.timing(flipAnimation, {
        toValue: 1, // Rota la tarjeta 90 grados
        duration: 250, // Duración de la primera mitad de la animación
        useNativeDriver: true,
      }),
      Animated.timing(flipAnimation, {
        toValue: 0, // Rota la tarjeta de regreso a 0 grados
        duration: 250, // Duración de la segunda mitad de la animación
        useNativeDriver: true,
      }),
    ]).start(() => {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    });
  };

  return (
    <ImageBackground source={require('./../assets/Moon.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Animated.View style={[styles.questionContainer, { transform: [{ rotateY: flipAnimation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] }) }] }]}>
          {categoryImage && <Image source={categoryImage} style={[styles.categoryImage, { resizeMode: 'contain' }]} />}
          <Text style={styles.title}>{category}</Text>
          <View style={styles.singleQuestionContainer}>
            <Text style={styles.question}>{questions[currentQuestionIndex]}</Text>
          </View>
          <TouchableOpacity onPress={handleNextQuestion} style={styles.nextButton}>
            <Text style={styles.nextButtonText}>Siguiente</Text>
          </TouchableOpacity>
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
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  questionContainer: {
    backgroundColor: '#8630df',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backfaceVisibility: 'hidden', // Oculta la parte trasera de la tarjeta
  },
  categoryImage: {
    width: 30,
    height: 30,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  singleQuestionContainer: {
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8630df',
  },
});

export default QuestionScreen;
