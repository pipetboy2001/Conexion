import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const QuestionScreen = ({ route, navigation }) => {
  const { category } = route.params;

  const [questions, setQuestions] = useState([]);
  const [categoryImage, setCategoryImage] = useState(null);

  useEffect(() => {
    let questionsJson;
    if (category === 'Vinculum') {
      questionsJson = require('./../Json/questions_vinculum.json');
      setCategoryImage(require('./../assets/love-icon.png'));
    } else if (category === 'Hormonal') {
      questionsJson = require('./../Json/questions_hormonal.json');
      setCategoryImage(require('./../assets/sex-icon.png'));
    }
    setQuestions(questionsJson.questions);
  }, [category]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    // Cuando se llega al final de las preguntas, reinicia el índice
    if (currentQuestionIndex >= questions.length) {
      setCurrentQuestionIndex(0);
    }
  }, [currentQuestionIndex, questions]);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  return (
    <ImageBackground source={require('./../assets/Moon.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.questionContainer}>
        {categoryImage && <Image source={categoryImage} style={[styles.categoryImage, { resizeMode: 'contain' }]} />}
          <Text style={styles.title}>{category}</Text>
          <View style={styles.singleQuestionContainer}>
            <Text style={styles.question}>{questions[currentQuestionIndex]}</Text>
          </View>
          <TouchableOpacity onPress={handleNextQuestion} style={styles.nextButton}>
            <Text style={styles.nextButtonText}>Siguiente</Text>
          </TouchableOpacity>
        </View>
      </View>
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
