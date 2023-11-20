import { useState } from "react";
import axios from "axios";

function GenerateQuesPaper() {
  const [totalMarks, setTotalMarks] = useState(0);
  const [easy, setEasy] = useState(0);
  const [medium, setMedium] = useState(0);
  const [hard, setHard] = useState(0);
  const [questionPaper, setQuestionPaper] = useState(null);

  const generateQuestionPaper = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/generate-question-paper",
        {
          totalMarks,
          difficultyDistribution: {
            Easy: easy,
            Medium: medium,
            Hard: hard,
          },
        }
      );
      setQuestionPaper(response.data);
    } catch (error) {
      console.error("Error generating question paper:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-[25rem] flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Generate Question Paper</h2>

        <div className="mb-4">
          <label
            htmlFor="totalMarks"
            className="block text-sm font-semibold mb-1"
          >
            Total Marks
          </label>
          <input
            type="number"
            id="totalMarks"
            className="w-full p-2 border border-gray-600 rounded text-gray-900"
            onChange={(e) => setTotalMarks(parseInt(e.target.value, 10))}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="easy" className="block text-sm font-semibold mb-1">
            Easy
          </label>
          <input
            type="number"
            id="easy"
            className="w-full p-2 border border-gray-600 rounded text-gray-900"
            placeholder="in %"
            onChange={(e) => setEasy(parseInt(e.target.value, 10))}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="medium" className="block text-sm font-semibold mb-1">
            Medium
          </label>
          <input
            type="number"
            id="medium"
            className="w-full p-2 border border-gray-600 rounded text-gray-900"
            placeholder="in %"
            onChange={(e) => setMedium(parseInt(e.target.value, 10))}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="hard" className="block text-sm font-semibold mb-1">
            Hard
          </label>
          <input
            type="number"
            id="hard"
            className="w-full p-2 border border-gray-600 rounded text-gray-900"
            placeholder="in %"
            onChange={(e) => setHard(parseInt(e.target.value, 10))}
          />
        </div>
    
        <button
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          onClick={generateQuestionPaper}
        >
          Generate
        </button>
        {questionPaper && (
          <div className="mt-4">
            <h3>Question Paper is ready</h3>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
              Download Question Paper
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default GenerateQuesPaper;
