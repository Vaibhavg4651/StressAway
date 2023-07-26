import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import axios from "axios";
import { useState  } from 'react';
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify'
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
              onChange={() => onOptionChange(option, index)}
            />
            {option}
          </label>
        </div>
      ))}
    </div>
  );
};

const Test = () => {
  const dataset = useSelector((state) => state.user.userdata);
  const [questionnaire, setQuestionnaire] = useState({
    question1:{ option: "", score: 0 },
    question2: { option: "", score: 0 },
    question3: { option: "", score: 0 },
    question4: { option: "", score: 0 },
    question5: { option: "", score: 0 },
    question6: { option: "", score: 0 },
    question7: { option: "", score: 0 },
    question8: { option: "", score: 0 },
    question9: { option: "", score: 0 },
    question10: { option: "", score: 0 },
    question11: { option: "", score: 0 },
    question12: { option: "", score: 0 },
    question13: { option: "", score: 0 },
    question14: { option: "", score: 0 },
    question15: { option: "", score: 0 },
    question16: { option: "", score: 0 },
    question17: { option: "", score: 0 },
    question18: { option: "", score: 0 },
    question19: { option: "", score: 0 },
    question20: { option: "", score: 0 },
    question21: { option: "", score: 0 }
  });

  const handleOptionChange = (question, option, score) => {
    setQuestionnaire((prev) => ({
      ...prev,
      [question]: { option, score },
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const check = dataset.googleId ? "guser" :( dataset.facebookId ? "fuser" : "User");
    const totalScore = Object.values(questionnaire).reduce( (acc, curr) => acc + curr.score, 0);

    try {
      await axios.put(
       `http://localhost:5000/user/test`,
       {
         id: dataset._id,
         newValue: { [Date()]: {questionnaire ,totalScore} },
         check: check,
       }
       );
       switch (true) {
        case totalScore < 10:
          toast.success("These ups and downs are considered normal", {
            position: "bottom-right",
            theme: "colored",
          });
          break;
        case totalScore < 16:
          toast.info("Mild mood disturbances.", {
            position: "bottom-right",
            theme: "colored",
          });
          break;
        case totalScore < 20:
          toast.warning("Bordeline clinical depression.", {
            position: "bottom-right",
            theme: "colored",
            color: "yellow"
          });
          break;
        case totalScore < 30:
          toast.warning("Moderate depression.", {
            position: "bottom-right",
            theme: "colored",
            color: "yellow"
          });
          break;
        case totalScore < 40:
          toast.error("Severe depression.", {
            position: "bottom-right",
            theme: "colored",
          });
          break;
        case totalScore > 40:
          toast.error("Extreme depression.", {
            position: "bottom-right",
            theme: "colored",
          });
          break;
        default:
          toast.error("Invalid choice", {
            position: "bottom-right",
            theme: "colored",
          });
      }
      
     } catch (error) {
       console.error(error);
     }
    
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
                selectedValue={questionnaire[`question${index + 1}`].option}
                onOptionChange={(option, score) =>
                  handleOptionChange(`question${index + 1}`, option , score)
                }
              />
            ))}
            <button type='submit' onClick={handleSubmit}>Submit</button>
          </form>
        </div>
        <ToastContainer />
      </div>
      <Footer />
    </div>
  );
};

export default Test;
