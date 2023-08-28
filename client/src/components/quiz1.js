import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateHouse } from '../state/actions'; 

const questions = [
  {
    id: 1,
    question: 'After you have died, what would you most like people to do when they hear your name?',
    options: [
      { id: 1, content: 'Miss you, but smile', increments: { G: 0, H: 100, R: 0, S: 0 } },
      { id: 2, content: 'Ask for more stories about your adventures', increments: { G: 100, H: 0, R: 0, S: 0 } },
      { id: 3, content: 'Think with admiration of your achievements', increments: { G: 0, H: 0, R: 100, S: 0 } },
      {
        id: 4,
        content: "I don't care what people think of me after I'm dead, it's what they think of me while I'm alive that counts",
        increments: { G: 0, H: 0, R: 0, S: 100 },
      },
    ],
  },
  {
    id: 2,
    question: 'How would you like to be known to history?',
    options: [
      { id: 1, content: 'The Wise', increments: { G: 0, H: 0, R: 100, S: 0 } },
      { id: 2, content: 'The Good', increments: { G: 0, H: 100, R: 0, S: 0 } },
      { id: 3, content: 'The Great', increments: { G: 0, H: 0, R: 0, S: 100 } },
      { id: 4, content: 'The Bold', increments: { G: 100, H: 0, R: 0, S: 0 } },
    ],
  },
  {
    id: 3,
    question: 'What kind of instrument most pleases your ear?',
    options: [
      { id: 1, content: 'Violin', increments: { G: 0, H: 0, R: 0, S: 100 } },
      { id: 2, content: 'Trumpet', increments: { G: 0, H: 100, R: 0, S: 0 } },
      { id: 3, content: 'Piano', increments: { G: 0, H: 0, R: 100, S: 0 } },
      { id: 4, content: 'Drum', increments: { G: 100, H: 0, R: 0, S: 0 } },
    ],
  },
  {
    id: 4,
    question: 'Which road tempts you most?',
    options: [
      { id: 1, content: 'The wide, sunny, grassy lane', increments: { G: 0, H: 100, R: 0, S: 0 } },
      { id: 2, content: 'The narrow, dark, lantern-lit alley', increments: { G: 0, H: 0, R: 0, S: 100 } },
      { id: 3, content: 'The twisting, leaf-strewn path through woods', increments: { G: 100, H: 0, R: 0, S: 0 } },
      { id: 4, content: 'The cobbled street lined with ancient buildings', increments: { G: 0, H: 0, R: 100, S: 0 } },
    ],
  },
  {
    id: 5,
    question: 'Given the choice, would you rather invent a potion that would guarantee you:',
    options: [
      { id: 1, content: 'Love', increments: { G: 0, H: 100, R: 0, S: 0 } },
      { id: 2, content: 'Glory', increments: { G: 100, H: 0, R: 0, S: 0 } },
      { id: 3, content: 'Wisdom', increments: { G: 0, H: 0, R: 100, S: 0 } },
      { id: 4, content: 'Power', increments: { G: 0, H: 0, R: 0, S: 100 } },
    ],
  },
  {
    id: 6,
    question: 'Once every century, the Flutterby bush produces flowers that adapt their scent to attract the unwary. If it lured you, it would smell of:',
    options: [
      { id: 1, content: 'A crackling log fire', increments: { G: 100, H: 0, R: 0, S: 0 } },
      { id: 2, content: 'The sea', increments: { G: 0, H: 0, R: 0, S: 100 } },
      { id: 3, content: 'Fresh parchment', increments: { G: 0, H: 0, R: 100, S: 0 } },
      { id: 4, content: 'Home', increments: { G: 0, H: 100, R: 0, S: 0 } },
    ],
  },
  {
    id: 7,
    question: 'Now this is a Rapid Fire, Be quick!!',
    options: [
      { id: 1, content: 'Start', increments: { G: 0, H: 0, R: 0, S: 0 } },
    ],
  },
  {
    id: 8,
    question: 'Forest or river?',
    options: [
      { id: 1, content: 'Forest', increments: { G: 50, H: 0, R: 50, S: 0 } },
      { id: 2, content: 'River', increments: { G: 0, H: 50, R: 0, S: 50 } },
    ],
  },
  {
    id: 9,
    question: 'Dawn or Dusk?',
    options: [
      { id: 1, content: 'Dawn', increments: { G: 50, H: 0, R: 50, S: 0 } },
      { id: 2, content: 'Dusk', increments: { G: 0, H: 50, R: 0, S: 50 } },
    ],
  },
  {
    id: 10,
    question: 'Moon or stars?',
    options: [
      { id: 1, content: 'Moon', increments: { G: 0, H: 0, R: 50, S: 50 } },
      { id: 2, content: 'Stars', increments: { G: 50, H: 50, R: 0, S: 0 } },
    ],
  },
  {
    id: 11,
    question: 'Black or white?',
    options: [
      { id: 1, content: 'Black', increments: { G: 50, H: 0, R: 0, S: 50 } },
      { id: 2, content: 'White', increments: { G: 0, H: 50, R: 50, S: 0 } },
    ],
  },
  {
    id: 12,
    question: 'Heads or tails?',
    options: [
      { id: 1, content: 'Heads', increments: { G: 0, H: 50, R: 50, S: 0 } },
      { id: 2, content: 'Tails', increments: { G: 50, H: 0, R: 0, S: 50 } },
    ],
  },
  {
    id: 13,
    question: 'Left or right?',
    options: [
      { id: 1, content: 'Left', increments: { G: 0, H: 0, R: 50, S: 50 } },
      { id: 2, content: 'Right', increments: { G: 50, H: 50, R: 0, S: 0 } },
    ],
  },
];

const Question = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [scores, setScores] = useState({ G: 0, H: 0, R: 0, S: 0 });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const userId = useSelector((state) => state.user._id);
  
    useEffect(() => {
      if (selectedOption !== null) {
        const timer = setTimeout(() => {
          handleNextQuestion();
        }, 300);
        return () => clearTimeout(timer);
      }
    }, [selectedOption]);
  
    const handleOptionSelect = (increments) => {
      const updatedScores = {
        G: scores.G + increments.G,
        H: scores.H + increments.H,
        R: scores.R + increments.R,
        S: scores.S + increments.S,
      };
      setScores(updatedScores);
      setSelectedOption(increments);
    };

    const updateHouseOnServer = async (house) => {
      const response = await fetch(
        `http://localhost:3001/users/${userId}/update-house/${house}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.ok) {
        dispatch(updateHouse(house)); // Dispatch the updateHouse action here
      } else {
        // Handle error
      }
    };

    
  
    const handleNextQuestion = () => {
      setSelectedOption(null);
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  
      if (currentQuestion === questions.length - 1) {
        const winningHouse = updateHouse(scores);
        updateHouseOnServer(winningHouse);
      }
    };
  
    const renderOptions = (options) => {
      return options.map((option, index) => (
        <div key={index}>
          <label>
            <input
              type="radio"
              name="options"
              value={option.content}
              checked={selectedOption === option.increments}
              onChange={() => handleOptionSelect(option.increments)}
            />
            {option.content}
          </label>
        </div>
      ));
    };
  
    const renderQuestion = (question) => {
      return (
        <div>
          <h2>{question.question}</h2>
          <div className="options">{renderOptions(question.options)}</div>
        </div>
      );
    };

    const updateHouse = (scores) => {
      const houseMapping = {
        G: "Gryffindor",
        H: "Hufflepuff",
        R: "Ravenclaw",
        S: "Slytherin",
      };
    
      // Finding the house with the maximum score
      const maxScore = Math.max(...Object.values(scores));
      const winningHouseInitial = Object.keys(scores).find(
        (key) => scores[key] === maxScore
      );
      const winningHouse = houseMapping[winningHouseInitial];
      return winningHouse;
    };
    


  
    return (
    <div className="question-container">
        {currentQuestion < questions.length ? (
          renderQuestion(questions[currentQuestion])
        ) : (
            <>
                <div className="result">
                    <h2>Quiz Results</h2>
                    <p>Welcome to {updateHouse(scores)}!!</p>
                    <button onClick={() => navigate('/home')}>Back to Home</button>       
                </div>
            </>
        )}
      </div>
    );
  };
  
  export default Question;
  
          