import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function PostQuestion() {
  const [question, setQuestion] = useState('');
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [marks, setMarks] = useState(0);
  const navigate = useNavigate();

  const getDefaultMarks = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 5;
      case 'Medium':
        return 10;
      case 'Hard':
        return 20;
      default:
        return 0;
    }
  };

  const postQuestion = async () => {
    try {
      const postedMarks = marks || getDefaultMarks(difficulty);

      const response = await axios.post('http://localhost:5000/api/post-question', {
        question,
        subject,
        topic,
        difficulty,
        marks: postedMarks,
      });

      console.log('Question posted successfully:', response.data);
    } catch (error) {
      console.error('Error posting question:', error);
    }
  };

  const redirectToGeneratePaper = () => {
    // Redirect to the /generate-paper endpoint
    navigate('/generate-paper');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-[25rem] flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Post a Question</h2>

        <div className="mb-4">
          <label htmlFor="question" className="block text-sm font-semibold mb-1">
            Question
          </label>
          <input
            type="text"
            id="question"
            className="w-full p-2 border border-gray-600 rounded text-gray-900"
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="subject" className="block text-sm font-semibold mb-1">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            className="w-full p-2 border border-gray-600 rounded text-gray-900"
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="topic" className="block text-sm font-semibold mb-1">
            Topic
          </label>
          <input
            type="text"
            id="topic"
            className="w-full p-2 border border-gray-600 rounded text-gray-900"
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="difficulty" className="block text-sm font-semibold mb-1">
            Difficulty
          </label>
          <select
            id="difficulty"
            className="w-full p-2 border border-gray-600 rounded text-gray-900"
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="">Select Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          {difficulty && (
            <p className="text-sm text-gray-500 mt-2">
              Default Marks: {getDefaultMarks(difficulty)}
            </p>
          )}
        </div>

        <button
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          onClick={postQuestion}
        >
          Post Question
        </button>

        <button
          className="bg-green-500 text-white p-2 rounded mt-2 hover:bg-green-600"
          onClick={redirectToGeneratePaper}
        >
          Generate Paper
        </button>
      </div>
    </div>
  );
}

export default PostQuestion;
