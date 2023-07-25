import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useState } from 'react';
import jsonData from './data.json';

const Question = ({ options, selectedValue, onOptionChange }) => {
  return (
    <div className='questionnaire'>
      {options.map((option, index) => (
        <div key={index}>
          <label>
            <input
              type='radio'
              value={option}
              checked={selectedValue === option}
              onChange={() => onOptionChange(option)}
            />
            {option}
          </label>
        </div>
      ))}
    </div>
  );
};

const Test = () => {
  const [questionnaire, setQuestionnaire] = useState({
    question1: '',
    question2: '',
    // Add more questions as needed...
  });

  const handleOptionChange = (question, value) => {
    setQuestionnaire((prev) => ({
      ...prev,
      [question]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform scoring and interpretation here (not shown in this example)
    // Display the result or redirect to appropriate resources
  };

  return (
    <div className='test'>
      <Navbar />
      <div className='diagnostic-Test'>
        <div>
          <h1>Diagnostic Test</h1>
          <form onSubmit={handleSubmit}>
            {jsonData.Questions.map((question, index) => (
              <Question
                key={index}
                options={[...question]}
                selectedValue={questionnaire[`question${index + 1}`]}
                onOptionChange={(value) =>
                  handleOptionChange(`question${index + 1}`, value)
                }
              />
            ))}
            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Test;
