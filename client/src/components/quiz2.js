import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updatePatronus } from '../state/actions'; 
  

const Quiz2 = () => {
  const [currentGroup, setCurrentGroup] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [patronusPath, setPatronusPath] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const userId = useSelector((state) => state.user._id);

  const patronusList = [
    { path: 'GGGGG', name: 'Dolphin' },
    { path: 'GGGGB', name: 'Dapple Grey Mare' },
    { path: 'GGGGR', name: 'Nebelung Cat' },
    { path: 'GGGBG', name: 'White Mare' },
    { path: 'GGGBB', name: 'Bassett Hound' },
    { path: 'GGGBR', name: 'Deerhound' },
    { path: 'GGBGG', name: 'Black and White Cat' },
    { path: 'GGBGB', name: 'Red Squirrel' },
    { path: 'GGBGR', name: 'Husky' },
    { path: 'GGBBG', name: 'Chow Dog' },
    { path: 'GGBBB', name: 'Wild Boar' },
    { path: 'GGBBR', name: 'Newfoundland' },
    { path: 'GGRGG', name: 'Tonkinese Cat' },
    { path: 'GGRGB', name: 'Badger' },
    { path: 'GGRGR', name: 'Otter' },
    { path: 'GGRBG', name: 'Siberian Cat' },
    { path: 'GGRBBG', name: 'Stag' },
    { path: 'GGRBBB', name: 'Lynx' },
    { path: 'RBGBB', name: 'Weasel' },
    { path: 'GBGGG', name: 'Manx Cat' },
    { path: 'GBGGB', name: 'Tortoiseshell Cat' },
    { path: 'GBGGR', name: 'Borzoi' },
    { path: 'GBGBG', name: 'West Highland Terrier' },
    { path: 'GBGBB', name: 'Dun Stallion' },
    { path: 'GBGBR', name: 'Irish Wolfhound' },
    { path: 'GBBGG', name: 'Piebald Mare' },
    { path: 'GBBGB', name: 'Black Swan' },
    { path: 'GBBGR', name: 'Ocicat' },
    { path: 'GBBBG', name: 'Ginger Cat' },
    { path: 'GBBBB', name: 'Mole' },
    { path: 'GBBBR', name: 'Mastiff' },
    { path: 'GBRGG', name: 'Bloodhound' },
    { path: 'GBRGB', name: 'Swift' },
    { path: 'GBRGRG', name: 'Eagle Owl' },
    { path: 'GBRGRB', name: 'Scops Owl' },
    { path: 'GBRBG', name: 'Ibizian Hound' },
    { path: 'GBRBB', name: 'Robin' },
    { path: 'GBRBRG', name: 'Brown Owl' },
    { path: 'GBRBRB', name: 'Little Owl' },
    { path: 'BGGGG', name: 'St. Bernard' },
    { path: 'BGGGB', name: 'Osprey' },
    { path: 'BGGGR', name: 'Stoat' },
    { path: 'BGGBG', name: 'Bay Stallion' },
    { path: 'BGGBB', name: 'Marsh Harrier' },
    { path: 'BGGBR', name: 'Pine Marten' },

    // ... Add more animals and their corresponding paths
  ];

  const questionGroups = [
    [
      { options: [{ content: 'Glitter', color: 'G' }, { content: 'Shine', color: 'B' }, { content: 'Glow', color: 'R' }] },
      { options: [{ content: 'Dream', color: 'G' }, { content: 'Discover', color: 'B' }, { content: 'Dance', color: 'R' }] },
      { options: [{ content: 'Leaf', color: 'G' }, { content: 'Thorn', color: 'B' }, { content: 'Blade', color: 'R' }] },
      { options: [{ content: 'Protect', color: 'G' }, { content: 'Seek', color: 'B' }, { content: 'Serve', color: 'R' }] },
      { options: [{ content: 'Sun', color: 'G' }, { content: 'Rain', color: 'B' }, { content: 'Wind', color: 'R' }] },

      // Group 1
    ],
    [
      { options: [{ content: 'Sweet', color: 'G' }, { content: 'Salt', color: 'B' }] },
      { options: [{ content: 'Make', color: 'G' }, { content: 'Improve', color: 'B' }] },
      { options: [{ content: 'Smooth', color: 'G' }, { content: 'Rough', color: 'B' }] },
      { options: [{ content: 'Warm', color: 'G' }, { content: 'Cold', color: 'B' }] },
      { options: [{ content: 'Bright', color: 'G' }, { content: 'Shadow', color: 'B' }] },
      { options: [{ content: 'Bone', color: 'G' }, { content: 'Blood', color: 'B' }] },
      // Group 2
    ],
    [
        { options: [{ content: 'Save', color: 'G' }, { content: 'Lead', color: 'B' }, { content: 'Escape', color: 'R' }] },
        { options: [{ content: 'Play', color: 'G' }, { content: 'Prowl', color: 'B' }, { content: 'Preen', color: 'R' }] },
        { options: [{ content: 'Feel', color: 'G' }, { content: 'Think', color: 'B' }, { content: 'Sense', color: 'R' }] },
        { options: [{ content: 'Wood', color: 'G' }, { content: 'Stone', color: 'B' }, { content: 'Earth', color: 'R' }] },
        { options: [{ content: 'Over', color: 'G' }, { content: 'Under', color: 'B' }, { content: 'Around', color: 'R' }] },
        // Group 3
    ],
    [
        { options: [{ content: 'Forever', color: 'G' }, { content: 'Sometimes', color: 'B' }] },
        { options: [{ content: 'Who', color: 'G' }, { content: 'Why', color: 'B' }] },
        { options: [{ content: 'Safe', color: 'G' }, { content: 'Free', color: 'B' }] },
        { options: [{ content: 'Together', color: 'G' }, { content: 'Alone', color: 'B' }] },
        { options: [{ content: 'Found', color: 'G' }, { content: 'Lost', color: 'B' }] },
        { options: [{ content: 'Speak', color: 'G' }, { content: 'Silence', color: 'B' }] },
        // Group 4
    ],
    [
        { options: [{ content: 'Love', color: 'G' }, { content: 'Hope', color: 'B' }, { content: 'Trust', color: 'R' }] },
        { options: [{ content: 'White', color: 'G' }, { content: 'Black', color: 'B' }, { content: 'Grey', color: 'R' }] },
        { options: [{ content: 'Heart', color: 'G' }, { content: 'Mind', color: 'B' }, { content: 'Spirit', color: 'R' }] },
        { options: [{ content: 'Comfort', color: 'G' }, { content: 'Advise', color: 'B' }, { content: 'Impress', color: 'R' }] },
        { options: [{ content: 'Watch', color: 'G' }, { content: 'Listen', color: 'B' }, { content: 'Touch', color: 'R' }] },
        // Group 5
    ],
    [
        { options: [{ content: 'Sharp', color: 'G' }, { content: 'Sleek', color: 'B' }] },
        { options: [{ content: 'Deep', color: 'G' }, { content: 'High', color: 'B' }] },
        { options: [{ content: 'Awake', color: 'G' }, { content: 'Asleep', color: 'B' }] },
        { options: [{ content: 'Frost', color: 'G' }, { content: 'Dew', color: 'B' }] },
        { options: [{ content: 'Ripple', color: 'G' }, { content: 'Wave', color: 'B' }] },
        { options: [{ content: 'Hunt', color: 'G' }, { content: 'Create', color: 'B' }] },
        // Group 6
    ],
    [
        { options: [{ content: 'Myth', color: 'G' }, { content: 'Legend', color: 'B' }] },
        { options: [{ content: 'Serenity', color: 'G' }, { content: 'Glory', color: 'B' }] },
        { options: [{ content: 'Eternal', color: 'G' }, { content: 'Impossible', color: 'B' }] },
        { options: [{ content: 'Enchant', color: 'G' }, { content: 'Bewitch', color: 'B' }] },
        { options: [{ content: 'Charm', color: 'G' }, { content: 'Jinx', color: 'B' }] },
        // Group 7
    ],
    // Add more question groups
  ];

  useEffect(() => {
    setCurrentQuestion(getRandomQuestion(questionGroups[currentGroup]));
  }, [currentGroup]);

  const getRandomQuestion = (group) => {
    const randomIndex = Math.floor(Math.random() * group.length);
    return group[randomIndex];
  };

  const handleOptionSelect = (color) => {
    setSelectedOption(color);
    setPatronusPath((prevPath) => prevPath + color);
    setTimeout(() => {
        handleNextQuestion();
    }, 300);
  };

  const handleNextQuestion = () => {
    setSelectedOption('');
    if (currentGroup < questionGroups.length - 1) {
      setCurrentGroup((prevGroup) => prevGroup + 1);
    } else {
      const matchingAnimal = patronusList.find((animal) => animal.path === patronusPath);
      if (matchingAnimal) {
        // Update the user's patronus in the database
        updatePatronusOnServer(matchingAnimal.name);
        // Dispatch the updatePatronus action
        dispatch(updatePatronus(matchingAnimal.name));
        navigate('/'); // Navigate to the home page
      } else {
        setCurrentQuestion(null);
      }
    }
  };

  const updatePatronusOnServer = async (patronus) => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/update-patronus`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ patronus }),
      }
    );

    if (!response.ok) {
      // Handle error
    }
  };

  
  
  

  const renderQuestion = (question) => {
    return (
      <div>
        <h3>Question {currentGroup + 1}</h3>
        <div>
          {question.options.map((option, index) => (
            <div key={index}>
              <input
                type="radio"
                name="option"
                checked={selectedOption === option.color}
                onChange={() => handleOptionSelect(option.color)}
              />
              {option.content}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderQuiz = () => {
    if (currentQuestion) {
        const matchingAnimal = patronusList.find((animal) => animal.path === patronusPath);
        if (matchingAnimal) {
            <div>
                <p>Your patronus is: {matchingAnimal.name}</p>
                <button onClick={() => navigate('/')}>Back to Home</button>
            </div>
          }

        else{
            return renderQuestion(currentQuestion);
        }
    }
    // Quiz completed, find the matching animal
    const matchingAnimal = patronusList.find((animal) => animal.path === patronusPath);
    if (matchingAnimal) {
      return ( 
        <div>
           <p>Your patronus is: {matchingAnimal.name}</p>
           <button onClick={() => navigate('/home')}>Back to Home</button>
        </div>
       );       
    }
    // else {
    //     return <div>No matching animal found for the given patronus path.</div>;
    // }
  };

  return (
    <div>
      <h1>Quiz 2</h1>
      {renderQuiz()}
    </div>
  );
};

export default Quiz2;
